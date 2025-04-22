import { kebabCase } from '../helpers';

export function generatorInjectedKeyName(block: string, efficacy?: string) {
  return generatorSymbolKeyName(block, efficacy);
}

export function generatorSymbolKeyName(block: string, efficacy?: string) {
  return `[lego-${kebabCase(block)}]${efficacy ? ` ${efficacy}` : ''}`;
}
