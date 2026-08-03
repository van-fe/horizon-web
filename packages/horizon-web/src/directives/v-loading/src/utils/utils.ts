import { generatorSymbolKeyName } from '@aurora/utils';

export const LoadingInstance = Symbol(generatorSymbolKeyName('loading'));
export const LoadingTimer = Symbol(generatorSymbolKeyName('loading', 'timer'));
export const LoadingIsShow = Symbol(generatorSymbolKeyName('loading', 'is-show'));
