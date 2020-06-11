// tom-weatherhead/thaw-repl/test/writable-string-array-stream.ts

'use strict';

import { Writable } from 'stream';

import { stringEncoding } from '../lib/main';

export class WritableStringArrayStream extends Writable {
	private readonly stringArray: string[] = [];

	constructor() {
		super();

		this.setDefaultEncoding(stringEncoding);
	}

	// Q: ThAW 2020-01-11 : Can a class implement both [Symbol.iterator]() and [Symbol.asyncIterator]() ?
	public get synchronousIterator(): Iterable<string> {
		return this.syncGenerate();
	}

	public [Symbol.asyncIterator](): AsyncIterator<string> {
		// Implementing this method makes objects of this class asynchronously iterable.
		return this.asyncGenerate();
	}

	public _write(chunk: string, encoding: string, callback: () => void) {
		if (Buffer.isBuffer(chunk)) {
			chunk = chunk.toString();
		}

		this.stringArray.push(chunk);
		callback();
	}

	// public _final(callback: () => void) {
	// 	callback();
	// }

	// **** Iterator generators. Private. ****

	private *syncGenerate(): Iterable<string> {
		// This function generates an iterator.

		for (const str of this.stringArray) {
			yield str;
		}
	}

	private async *asyncGenerate(): AsyncIterator<string> {
		// This function generates an asynchronous iterator.

		for (const str of this.stringArray) {
			yield str;
		}
	}
}
