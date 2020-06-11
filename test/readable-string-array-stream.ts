// tom-weatherhead/thaw-repl/test/readable-string-array-stream.ts

// 'use strict';

// import { Readable } from 'stream';

// import { stringEncoding } from '../lib/main';

// export class ReadableStringArrayStream extends Readable {
// 	private readonly stringArray: string[] = [];

// 	constructor() {
// 		super();

// 		this.setEncoding(stringEncoding);
// 	}

// 	public pushString(str: string): void {
// 		this.stringArray.push(str);
// 	}

// 	public _read(): void {
// 		let str = this.stringArray.shift(); // Return type: string | undefined

// 		if (typeof str === 'undefined') { // Type of str is undefined
// 			this.push(null);
// 		} else { // Typescript's type inference: Type of str must be string.
// 			const i = str.indexOf('\n'); // Or do a: const astr = str.split('\n');

// 			if (i >= 0) {
// 				this.stringArray.unshift(str.substring(i + 1)); // I.e. string.substring(start, end?)
// 				str = str.substring(0, i);
// 			}

// 			const buf = Buffer.from(str, stringEncoding);

// 			this.push(buf);
// 		}
// 	}
// }
