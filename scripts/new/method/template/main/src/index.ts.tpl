import { defineMethod } from '@aurora/utils';
import type { ${capitalName}Options } from './composables/useOptions';
import { use${capitalName}Options } from './composables/useOptions';

const methods = {
  /**
   * 方法说明
   */
  method1(): void {},
};

/**
 * 默认方法说明
 */
const ${name}Method = (options: Partial<${capitalName}Options>) => {};

export default defineMethod({
  name: '${name}',
  desc: '',
  options: use${capitalName}Options,
  methods,
  default: ${name}Method,
});
