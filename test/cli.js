// tom-weatherhead/thaw-repl/test/cli.js

'use strict';

const repl = require('..');

function isExitCommand(command) {
	return command === 'exit';
}

function evaluate(command) {
	process.stdout.write(`evaluate() : command is '${command}'\n`);

	return command;
}

repl.readEvaluatePrintLoop(isExitCommand, evaluate)
	.then(() => {
		process.stdout.write('readEvaluatePrintLoop() resolved successfully.\n\n');
	}).catch(error => {
		process.stderr.write(`Error in readEvaluatePrintLoop(): ${typeof error} ${error}\n`);
	});
