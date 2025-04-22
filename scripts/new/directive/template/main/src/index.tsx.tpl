import { defineDirective } from '@nio-fe/shared';
import { use${capitalName}Options } from './composables/useOptions';

const ${name}Handler = () => {
};

export default defineDirective<HTMLElement, typeof use${capitalName}Options>({
  name: '${name}',
  options: use${capitalName}Options,
  desc: '',
  mounted: ${name}Handler,
  updated: ${name}Handler,
});
