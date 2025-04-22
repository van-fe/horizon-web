import * as components from './components';
import makeInstaller from './makeInstaller';

export default makeInstaller(Object.values(components));
