import * as readline from 'node:readline/promises';

import { stdin as input, stdout as output } from 'node:process';
import { Lexer } from './lexer';
import { TokenKind } from './token';

const rl = readline.createInterface({ input, output });

async function main() {
  rl.write('Welcome to the Monkey REPL. Type exit to exit\n');
  while (true) {
    const input = await rl.question('>> ');

    if (input === 'exit') {
      rl.close();
      return;
    }
    const l = new Lexer(input);
    let token = l.nextToken();
    while (token.kind != TokenKind.EOF) {
      output.write(`${JSON.stringify(token)}\n`);
      token = l.nextToken();
    }
  }
}

main();
