import components from './components.json';
import directives from './directives.json';
import methods from './methods.json';

export default {
  ...components,
  ...directives,
  ...methods,
} as Record<string, string[]>;
