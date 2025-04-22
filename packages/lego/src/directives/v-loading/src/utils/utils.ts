import { generatorSymbolKeyName } from '@nio-fe/shared';

export const LoadingInstance = Symbol(generatorSymbolKeyName('loading'));
export const LoadingTimer = Symbol(generatorSymbolKeyName('loading', 'timer'));
export const LoadingIsShow = Symbol(generatorSymbolKeyName('loading', 'is-show'));
