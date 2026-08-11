import { default as Aside } from './src/Aside';
import { default as Container } from './src/Container';
import { default as Footer } from './src/Footer';
import { default as Header } from './src/Header';
import { default as Main } from './src/Main';
import { withInstall } from '@aurora/utils';

export const HAside = withInstall(Aside);
export const HContainer = withInstall(Container);
export const HFooter = withInstall(Footer);
export const HHeader = withInstall(Header);
export const HMain = withInstall(Main);

export default HContainer;
