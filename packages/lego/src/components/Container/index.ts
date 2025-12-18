import { default as Aside } from './src/Aside';
import { default as Container } from './src/Container';
import { default as Footer } from './src/Footer';
import { default as Header } from './src/Header';
import { default as Main } from './src/Main';
import { withInstall } from '@nio-fe/shared';

export const NAside = withInstall(Aside);
export const NContainer = withInstall(Container);
export const NFooter = withInstall(Footer);
export const NHeader = withInstall(Header);
export const NMain = withInstall(Main);

export default NContainer;
