import { kebabCase } from '@aurora/utils';

function log(type: 'info' | 'warn' | 'error', plugin: string, ...data: unknown[]) {
  if (globalThis?.process?.env?.NODE_ENV === 'development' || localStorage.getItem('debug')) {
    // eslint-disable-next-line no-console
    console[type](`[horizon-web ${kebabCase(plugin)}]: `, ...data);
  }
}

export default function (plugin: string, ...data: unknown[]) {
  log('info', plugin, ...data);
}

export function warn(plugin: string, ...data: unknown[]) {
  log('warn', plugin, ...data);
}

export function error(plugin: string, ...data: unknown[]) {
  log('error', plugin, ...data);
}

export function info(plugin: string, ...data: unknown[]) {
  log('info', plugin, ...data);
}

export function throwError(plugin: string, message: string) {
  throw new Error(`[horizon-web ${kebabCase(plugin)}]: ${message}`);
}
