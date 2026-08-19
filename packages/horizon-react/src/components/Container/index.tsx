import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Children, forwardRef, isValidElement, useMemo } from 'react';
import type {
  AsideCommonProps,
  ContainerCommonProps,
  ContainerRegion,
  FooterCommonProps,
  HeaderCommonProps,
} from '@aurora/core';
import { resolveContainerDimension, resolveContainerDirection } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

interface RegionProps {
  /** 区域内容。 @en Region content. */
  children?: ReactNode;
}

export interface HeaderProps
  extends HeaderCommonProps, Omit<HTMLAttributes<HTMLElement>, 'children'>, RegionProps {}

export interface AsideProps
  extends AsideCommonProps, Omit<HTMLAttributes<HTMLElement>, 'children'>, RegionProps {}

export interface MainProps extends Omit<HTMLAttributes<HTMLElement>, 'children'>, RegionProps {}

export interface FooterProps
  extends FooterCommonProps, Omit<HTMLAttributes<HTMLElement>, 'children'>, RegionProps {}

export interface ContainerProps
  extends ContainerCommonProps, Omit<HTMLAttributes<HTMLElement>, 'children'>, RegionProps {}

function useLayoutClasses(block: string): ComponentClassBlock {
  const config = useHorizonWebConfig();
  return useMemo(
    () => new ComponentClassBlock(block, config.namespace.toLowerCase()),
    [block, config.namespace],
  );
}

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { height, children, className, style, ...nativeProps },
  ref,
): ReactElement {
  const classes = useLayoutClasses('header');
  return (
    <header
      {...nativeProps}
      className={cls(classes.block, className)}
      ref={ref}
      style={{ ...style, height: resolveContainerDimension(height) ?? style?.height }}
    >
      {children}
    </header>
  );
});

export const Aside = forwardRef<HTMLElement, AsideProps>(function Aside(
  { width, children, className, style, ...nativeProps },
  ref,
): ReactElement {
  const classes = useLayoutClasses('aside');
  return (
    <aside
      {...nativeProps}
      className={cls(classes.block, className)}
      ref={ref}
      style={{ ...style, width: resolveContainerDimension(width) ?? style?.width }}
    >
      {children}
    </aside>
  );
});

export const Main = forwardRef<HTMLElement, MainProps>(function Main(
  { children, className, ...nativeProps },
  ref,
): ReactElement {
  const classes = useLayoutClasses('main');
  return (
    <main {...nativeProps} className={cls(classes.block, className)} ref={ref}>
      {children}
    </main>
  );
});

export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  { height, children, className, style, ...nativeProps },
  ref,
): ReactElement {
  const classes = useLayoutClasses('footer');
  return (
    <footer
      {...nativeProps}
      className={cls(classes.block, className)}
      ref={ref}
      style={{ ...style, height: resolveContainerDimension(height) ?? style?.height }}
    >
      {children}
    </footer>
  );
});

function resolveChildRegion(child: ReactNode): ContainerRegion {
  if (!isValidElement(child)) return 'other';
  if (child.type === Header) return 'header';
  if (child.type === Aside) return 'aside';
  if (child.type === Main) return 'main';
  if (child.type === Footer) return 'footer';
  return 'other';
}

export const Container = forwardRef<HTMLElement, ContainerProps>(function Container(
  { direction, children, className, ...nativeProps },
  ref,
): ReactElement {
  const classes = useLayoutClasses('container');
  const resolvedDirection = resolveContainerDirection(
    direction,
    Children.toArray(children).map(resolveChildRegion),
  );
  return (
    <section
      {...nativeProps}
      className={cls(
        classes.block,
        classes.is('vertical', resolvedDirection === 'vertical'),
        className,
      )}
      ref={ref}
    >
      {children}
    </section>
  );
});

Header.displayName = 'Header';
Aside.displayName = 'Aside';
Main.displayName = 'Main';
Footer.displayName = 'Footer';
Container.displayName = 'Container';

export const HHeader = Header;
export const HAside = Aside;
export const HMain = Main;
export const HFooter = Footer;
export const HContainer = Container;
export type { ContainerDimension, ContainerDirection } from '@aurora/core';
