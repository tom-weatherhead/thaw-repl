// tom-weatherhead/thaw-repl/test/main.test.ts

'use strict';

import { Readable } from 'stream';

import { readEvaluatePrintLoop } from '..';

// import { ReadableStringArrayStream } from './readable-string-array-stream';
import { WritableStringArrayStream } from './writable-string-array-stream';

// test('Placeholder test', () => {
// 	// Arrange
// 	// Act
// 	// Assert
// 	expect(true).toBeTruthy();
// 	expect(readEvaluatePrintLoop).toBeTruthy();
// });

/*

From node_modules/typescript/lib/lib.es2015.iterable.d.ts :

interface Iterator<T, TReturn = any, TNext = undefined> {
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
    return?(value?: TReturn): IteratorResult<T, TReturn>;
    throw?(e?: any): IteratorResult<T, TReturn>;
}

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

 */

function* syncGenerate(): Iterator<string> {
	// This function generates a synchronous iterator.
	yield 'abc';
	yield 'def';
	yield 'ghi';
}

class ThAWSyncIterable implements Iterable<string> {
	public [Symbol.iterator](): Iterator<string> {
		// Implementing this method makes objects of this class iterable.
		return syncGenerate();
	}
}

test('Extra: Sync Generator test 1', () => {
	// Arrange
	const expectedResult = ['abc', 'def', 'ghi'];

	// Act
	const syncIterable = new ThAWSyncIterable();

	// const actualResult = Array.from(Object(syncGenerate())  .prototype.call(Symbol.iterator));
	// const actualResult = Array.from(syncGenerate(). as Iterable<string>);
	const actualResult = Array.from(syncIterable);

	// Assert
	expect(actualResult).toStrictEqual(expectedResult);
});

test('Extra: Sync Generator test 2', () => {
	expect.assertions(1);

	// Arrange
	const expectedResult = ['abc', 'def', 'ghi'];

	// Act
	const syncIterable = new ThAWSyncIterable();

	const actualResult: string[] = [];

	for (const str of syncIterable) {
		actualResult.push(str);
	}

	// Assert
	expect(actualResult).toStrictEqual(expectedResult);
});

/*

From node_modules/typescript/lib/lib.es2018.asynciterable.d.ts :

interface AsyncIterator<T, TReturn = any, TNext = undefined> {
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn>>;
    return?(value?: TReturn | PromiseLike<TReturn>): Promise<IteratorResult<T, TReturn>>;
    throw?(e?: any): Promise<IteratorResult<T, TReturn>>;
}

interface AsyncIterable<T> {
    [Symbol.asyncIterator](): AsyncIterator<T>;
}

 */

async function* asyncGenerate(): AsyncIterator<string> {
	// This function generates an asynchronous iterator.
	yield 'abc';
	yield 'def';
	yield 'ghi';
}

class ThAWAsyncIterable implements AsyncIterable<string> {
	public [Symbol.asyncIterator](): AsyncIterator<string> {
		// Implementing this method makes objects of this class iterable.
		return asyncGenerate();
	}
}

test('Extra: Async Generator test', async () => {
	// Notice the async here.
	expect.assertions(1);

	// Arrange
	const expectedResult = ['abc', 'def', 'ghi'];

	// Act
	const asyncIterable = new ThAWAsyncIterable();

	/*
	await (async function() {
		const actualResult: string[] = [];

		for await (const str of asyncIterable) {
			actualResult.push(str);
		}

		expect(actualResult).toStrictEqual(expectedResult);
	})();
	 */

	const actualResult: string[] = [];

	for await (const str of asyncIterable) {
		actualResult.push(str);
	}

	// Assert
	expect(actualResult).toStrictEqual(expectedResult);
});

test('repl success test 1', async () => {
	expect.assertions(6);

	// Arrange
	// const readableStringArrayStream = new ReadableStringArrayStream();
	const writableStringArrayStream = new WritableStringArrayStream();

	const input1 = 'Ho!';
	const expectedResultFromInput1 = 'Command x 3 is: Ho! Ho! Ho!';
	const exitCommand = 'exit';
	const expectedResult = [
		'\nStarting the read-evaluate-print loop:\n\n> ',
		expectedResultFromInput1 + '\n\n> ',
		'Exiting...\n\n'
	];
	const fnIsExitCommand = (command: string) => command === exitCommand;
	const fnEvaluate = (command: string) =>
		`Command x 3 is: ${command} ${command} ${command}`;
	const commands = [input1, exitCommand];

	// for (const command of commands) {
	// 	readableStringArrayStream.pushString(command + '\n');
	// }

	// Instead of the loop above, do this:
	const readableStream = Readable.from(commands);

	// Act
	// await readEvaluatePrintLoop(fnIsExitCommand, fnEvaluate, readableStringArrayStream, writableStringArrayStream);
	await readEvaluatePrintLoop(
		fnIsExitCommand,
		fnEvaluate,
		readableStream,
		writableStringArrayStream
	);

	// Act 1) Test the synchronous behaviour:
	const actualSyncResult = Array.from(
		writableStringArrayStream.synchronousIterator
	);

	// Act 2) Test the synchronous behaviour:
	const actualAsyncResult: string[] = [];

	for await (const str of writableStringArrayStream) {
		actualAsyncResult.push(str);
	}

	// Assert

	// Assert 1) Test the synchronous behaviour:
	expect(actualSyncResult).toBeTruthy();
	expect(actualSyncResult.length).toBe(expectedResult.length);
	expect(actualSyncResult).toStrictEqual(expectedResult);

	// Assert 2) Test the synchronous behaviour:
	expect(actualAsyncResult).toBeTruthy();
	expect(actualAsyncResult.length).toBe(expectedResult.length);
	expect(actualAsyncResult).toStrictEqual(expectedResult);
});

test('repl failure test 1', async () => {
	expect.assertions(1);

	// Arrange
	// const readableStringArrayStream = new ReadableStringArrayStream();
	const writableStringArrayStream = new WritableStringArrayStream();

	const input1 = 'Ho!';
	const exitCommand = 'exit';
	const explodeCommand = 'boom';
	const fnIsExitCommand = (command: string) => {
		if (command === explodeCommand) {
			throw new Error('The explodeCommand was issued.');
		}

		return command === exitCommand;
	};
	const fnEvaluate = (command: string) =>
		`Command x 3 is: ${command} ${command} ${command}`;
	const commands = [input1, explodeCommand, exitCommand];

	// for (const command of commands) {
	// 	readableStringArrayStream.pushString(command + '\n');
	// }

	const readableStream = Readable.from(commands);

	// Act
	// Assert
	await expect(
		readEvaluatePrintLoop(
			fnIsExitCommand,
			fnEvaluate,
			// readableStringArrayStream,
			readableStream,
			writableStringArrayStream
		)
	).rejects.toStrictEqual(new Error('The explodeCommand was issued.'));
});
