// tom-weatherhead/thaw-repl/src/main.ts

// This is basically a Transform stream that applies fnEvaluate as a mapping
// function to each line of text in the stream.

'use strict';

import { finished, Readable, Writable } from 'stream';
import { promisify } from 'util';

const finishedPromisified = promisify(finished);

export const stringEncoding = 'utf8';

export function readEvaluatePrintLoop(
	fnIsExitCommand: (command: string) => boolean,
	fnEvaluate: (command: string) => string,
	inStreamParameter?: Readable,
	outStreamParameter?: Writable
): Promise<void> {
	return new Promise<void>(
		(
			resolve: (value?: void | PromiseLike<void> | undefined) => void,
			reject: (reason?: any) => void
		): void => {
			const inStream: Readable =
				inStreamParameter !== undefined
					? inStreamParameter
					: process.stdin;
			const outStream: Writable =
				outStreamParameter !== undefined
					? outStreamParameter
					: process.stdout;
			const fnInStreamReadableEventListener = (): void => {
				try {
					let input: string = inStream.read();

					while (input) {
						// Or while (input && outStream.writable) ?
						input = input.trimRight(); // Remove trailing whitespace, including any line ending characters

						if (fnIsExitCommand(input)) {
							outStream.write('Exiting...\n\n');
							inStream.off(
								'readable',
								fnInStreamReadableEventListener
							); // Make this listener remove itself from the list of listeners for the 'readable' event.

							if (outStream === process.stdout) {
								resolve();
							} else {
								outStream.end(); // This will cause outStream.finished to become true.
								finishedPromisified(outStream).then(() =>
									resolve()
								);
							}

							return;
						}

						outStream.write(`${fnEvaluate(input)}\n\n> `);

						input = inStream.read();
					}
				} catch (error) {
					reject(error);
				}
			};

			try {
				if (inStream === process.stdin) {
					outStream.write(
						`Calling process.stdin.setEncoding('${stringEncoding}');\n`
					);
					inStream.setEncoding(stringEncoding);
				}

				outStream.write(
					'\nStarting the read-evaluate-print loop:\n\n> '
				);

				inStream.on('readable', fnInStreamReadableEventListener);
			} catch (error) {
				reject(error);
			}
		}
	);
}
