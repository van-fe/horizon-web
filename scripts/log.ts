import * as chalk from 'chalk';

type ConsoleType = 'command' | 'info' | 'error';

const [command, info, error] = ['command', 'info', 'error'].map((symbol: string) => {
  return (msg: string) => `[${symbol}] ${msg}`;
});

function getMethod(type?: ConsoleType) {
  switch (type) {
    case 'command':
      return command;
    case 'error':
      return error;
    case 'info':
    default:
      return info;
  }
}

export function cyan(str: string, type?: ConsoleType): void {
  console.info(getMethod(type)(chalk.default.cyan(str)));
}

export function yellow(str: string, type?: ConsoleType): void {
  console.info(getMethod(type)(chalk.default.yellow(str)));
}

export function green(str: string, type?: ConsoleType): void {
  console.info(getMethod(type)(chalk.default.green(str)));
}

export function red(str: string, type?: ConsoleType): void {
  console.info(getMethod(type)(chalk.default.red(str)));
}

export function errorAndExit(e: Error): never {
  red(e.stack ?? e.message);
  process.exit(1);
}

export { command, info, error };
