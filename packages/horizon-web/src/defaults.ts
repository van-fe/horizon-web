import * as components from './components';
import * as directives from './directives';
import makeInstaller from './makeInstaller';

export default makeInstaller([
  ...Object.values(components),
  ...Object.values(
    Object.fromEntries(
      Object.entries(directives).filter(([key]) => {
        return key.startsWith('HV');
      }),
    ),
  ),
]);
