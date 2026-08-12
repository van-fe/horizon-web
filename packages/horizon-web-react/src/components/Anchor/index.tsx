import type {
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefAttributes,
} from 'react';
import {
  Children,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  AnchorCommonProps,
  AnchorLinkCommonProps,
  AnchorLinkInfo,
  AnchorListItem,
  AnchorOffset,
} from '@aurora/core';
import { ANCHOR_DEFAULTS, ANCHOR_LINK_DEFAULTS, resolveActiveAnchorLink } from '@aurora/core';
import type { AnchorScrollController, AnchorScrollTarget } from '@aurora/horizon-web-core';
import {
  createAnchorScrollController,
  getAnchorCustomOffset,
  getAnchorOffsetTop,
  getAnchorScrollTop,
  resolveAnchorHashTarget,
  resolveAnchorScrollTarget,
  scanAnchorHeadings,
} from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export type ReactAnchorScrollTarget = AnchorScrollTarget | (() => AnchorScrollTarget);
type SharedAnchorProps = AnchorCommonProps<ReactAnchorScrollTarget, ReactNode>;

export interface AnchorProps
  extends
    Omit<SharedAnchorProps, 'collapsed'>,
    Omit<HTMLAttributes<HTMLElement>, 'children' | 'onChange' | 'onClick' | 'style'> {
  /** 导航链接。 @en Navigation links. */
  children?: ReactNode;
  /** 受控折叠状态。 @en Controlled collapsed state. */
  collapsed?: boolean;
  /** 根元素样式。 @en Root element style. */
  style?: CSSProperties;
  /** 点击章节链接。 @en Called when a section link is clicked. */
  onLinkClick?: (link: AnchorLinkInfo, event: MouseEvent<HTMLAnchorElement>) => void;
  /** 活动章节变化。 @en Called when the active section changes. */
  onChange?: (link: string, previousLink: string) => void;
  /** 折叠状态变化。 @en Called when the collapsed state changes. */
  onCollapseChange?: (collapsed: boolean) => void;
}

export interface AnchorLinkProps extends AnchorLinkCommonProps {
  /** 子级链接。 @en Nested links. */
  children?: ReactNode;
  /** 自定义标题。 @en Custom title content. */
  titleContent?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface AnchorHandle {
  updateActiveLink(link: string, scroll?: boolean): void;
  refreshAnchorList(): void;
  updateScrollContainer(): void;
  getAnchorList(): AnchorListItem[];
  readonly element: HTMLElement | null;
}

interface AnchorContextValue {
  activeLink: string;
  changeHash: boolean;
  linkTarget?: AnchorLinkProps['target'];
  showTitleSuffix: boolean;
  register(link: string): () => void;
  activate(link: AnchorLinkInfo, event: MouseEvent<HTMLAnchorElement>): void;
}

const AnchorContext = createContext<AnchorContextValue | null>(null);
const AnchorDepthContext = createContext(0);

function resolveTargetValue(target: ReactAnchorScrollTarget | undefined): AnchorScrollTarget {
  return typeof target === 'function' ? target() : target;
}

export const AnchorLink = forwardRef<HTMLDivElement, AnchorLinkProps>(function AnchorLink(
  { title, href, target = ANCHOR_LINK_DEFAULTS.target, children, titleContent, className, style },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const context = useContext(AnchorContext);
  const depth = useContext(AnchorDepthContext);
  const classes = useMemo(
    () => new ComponentClassBlock('anchor', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const childCount = Children.count(children);

  useEffect(() => (href && context ? context.register(href) : undefined), [context, href]);

  const content = title !== undefined ? title : titleContent;
  const suffix =
    context?.showTitleSuffix && depth === 0 && childCount > 0 ? `（${childCount}）` : '';
  return (
    <div className={cls(classes.e('link'), className)} ref={ref} style={style}>
      <div
        className={cls(
          classes.e('link-title'),
          classes.is('active', context?.activeLink === href),
          classes.is('hide', href === undefined && content === undefined),
        )}
      >
        <a
          className={classes.e('link-title-txt')}
          href={href}
          target={context?.linkTarget ?? target}
          title={title}
          onClick={event => {
            if (!href || !context) return;
            if (!context.changeHash) event.preventDefault();
            context.activate({ href, title: title ?? '' }, event);
          }}
        >
          {content}
          {suffix}
        </a>
      </div>
      <AnchorDepthContext.Provider value={depth + 1}>{children}</AnchorDepthContext.Provider>
    </div>
  );
});

function renderAnchorList(items: readonly AnchorListItem[]): ReactNode {
  return items.map((item, index) => (
    <AnchorLink
      href={item.id ? `#${item.id}` : undefined}
      key={`${item.id ?? 'level'}-${index}`}
      title={item.title}
    >
      {item.children ? renderAnchorList(item.children) : null}
    </AnchorLink>
  ));
}

const AnchorImplementation = forwardRef<AnchorHandle, AnchorProps>(function Anchor(
  {
    size = ANCHOR_DEFAULTS.size,
    maxHeight = ANCHOR_DEFAULTS.maxHeight,
    changeHash = ANCHOR_DEFAULTS.changeHash,
    scrollContainer,
    scrollBehavior = ANCHOR_DEFAULTS.scrollBehavior,
    scrollOffset = ANCHOR_DEFAULTS.scrollOffset,
    boundsOffset = ANCHOR_DEFAULTS.boundsOffset,
    useCollapse = ANCHOR_DEFAULTS.useCollapse,
    collapsed,
    defaultCollapsed = ANCHOR_DEFAULTS.defaultCollapsed,
    collapseText = 'Navigation',
    showLine = ANCHOR_DEFAULTS.showLine,
    showHighlightLine = ANCHOR_DEFAULTS.showHighlightLine,
    showTitleSuffix = ANCHOR_DEFAULTS.showTitleSuffix,
    autoRender = ANCHOR_DEFAULTS.autoRender,
    autoRenderRules = ANCHOR_DEFAULTS.autoRenderRules,
    linkTarget,
    children,
    onLinkClick,
    onChange,
    onCollapseChange,
    className,
    style,
    'aria-label': ariaLabel = 'Page sections',
    ...nativeProps
  },
  forwardedRef,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('anchor', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const rootRef = useRef<HTMLElement>(null);
  const targetRef = useRef<HTMLElement | Window | null>(null);
  const scrollControllerRef = useRef<AnchorScrollController | undefined>(undefined);
  const linksRef = useRef<string[]>([]);
  const [activeLink, setActiveLink] = useState('');
  const activeLinkRef = useRef(activeLink);
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [items, setItems] = useState<AnchorListItem[]>([]);
  const [highlightStyle, setHighlightStyle] = useState<CSSProperties>({ top: 0, height: 0 });
  const isScrollingRef = useRef(false);
  const currentCollapsed = collapsed ?? internalCollapsed;
  activeLinkRef.current = activeLink;

  const refreshHighlight = useCallback((link: string) => {
    const root = rootRef.current;
    const anchor = link
      ? Array.from(root?.querySelectorAll<HTMLAnchorElement>('a') ?? []).find(
          element => element.getAttribute('href') === link,
        )
      : undefined;
    const title = anchor?.parentElement;
    setHighlightStyle(
      title ? { top: title.offsetTop, height: title.clientHeight } : { top: 0, height: 0 },
    );
  }, []);

  const scrollToLink = useCallback(
    (link: string) => {
      const target = targetRef.current;
      const document = rootRef.current?.ownerDocument;
      const section = target && document ? resolveAnchorHashTarget(link, document) : null;
      if (!target || !section) return;
      const top =
        getAnchorOffsetTop(section, target) +
        getAnchorScrollTop(target) -
        getAnchorCustomOffset(scrollOffset as AnchorOffset, section, target);
      isScrollingRef.current = true;
      scrollControllerRef.current?.scrollTo(top, scrollBehavior, () => {
        isScrollingRef.current = false;
      });
    },
    [scrollBehavior, scrollOffset],
  );

  const updateActiveLink = useCallback(
    (link: string, scroll = true) => {
      const previous = activeLinkRef.current;
      activeLinkRef.current = link;
      setActiveLink(link);
      if (previous !== link) onChange?.(link, previous);
      refreshHighlight(link);
      if (scroll) scrollToLink(link);
    },
    [onChange, refreshHighlight, scrollToLink],
  );

  const updateScrollContainer = useCallback(() => {
    const document = rootRef.current?.ownerDocument;
    if (!document) return;
    targetRef.current = resolveAnchorScrollTarget(
      resolveTargetValue(scrollContainer),
      document,
      selector => {
        console.warn(
          `[Horizon Web] Anchor scroll container "${selector}" was not found; using window instead.`,
        );
      },
    );
  }, [scrollContainer]);

  const refreshAnchorList = useCallback(() => {
    const target = targetRef.current;
    const root =
      target && !('window' in target) ? target : rootRef.current?.ownerDocument.documentElement;
    if (root) setItems(scanAnchorHeadings(root, autoRenderRules));
  }, [autoRenderRules]);

  useEffect(() => {
    updateScrollContainer();
    const target = targetRef.current;
    if (!target) return;
    scrollControllerRef.current = createAnchorScrollController(target);
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const document = rootRef.current?.ownerDocument;
      if (!document) return;
      const sections = linksRef.current.flatMap(link => {
        const element = resolveAnchorHashTarget(link, document);
        return element ? [{ link, top: getAnchorOffsetTop(element, target) }] : [];
      });
      const first = linksRef.current[0]
        ? resolveAnchorHashTarget(linksRef.current[0], document)
        : null;
      const boundary = first
        ? getAnchorCustomOffset(boundsOffset as AnchorOffset, first, target)
        : typeof boundsOffset === 'number'
          ? boundsOffset
          : 0;
      updateActiveLink(resolveActiveAnchorLink(sections, boundary), false);
    };
    target.addEventListener('scroll', handleScroll, { passive: true });
    if (autoRender) refreshAnchorList();
    if (globalThis.location?.hash) updateActiveLink(decodeURI(globalThis.location.hash), false);
    return () => {
      target.removeEventListener('scroll', handleScroll);
      scrollControllerRef.current?.destroy();
    };
  }, [autoRender, boundsOffset, refreshAnchorList, updateActiveLink, updateScrollContainer]);

  useEffect(
    () => refreshHighlight(activeLink),
    [activeLink, refreshHighlight, size, showTitleSuffix],
  );

  useImperativeHandle(
    forwardedRef,
    () => ({
      updateActiveLink,
      refreshAnchorList,
      updateScrollContainer,
      getAnchorList: () => items,
      get element() {
        return rootRef.current;
      },
    }),
    [items, refreshAnchorList, updateActiveLink, updateScrollContainer],
  );

  const context = useMemo<AnchorContextValue>(
    () => ({
      activeLink,
      changeHash,
      linkTarget,
      showTitleSuffix,
      register(link) {
        if (!link.startsWith('#')) return () => undefined;
        if (!linksRef.current.includes(link)) linksRef.current = [...linksRef.current, link];
        return () => (linksRef.current = linksRef.current.filter(current => current !== link));
      },
      activate(link, event) {
        onLinkClick?.(link, event);
        updateActiveLink(link.href);
      },
    }),
    [activeLink, changeHash, linkTarget, onLinkClick, showTitleSuffix, updateActiveLink],
  );

  const toggleCollapsed = () => {
    const next = !currentCollapsed;
    if (collapsed === undefined) setInternalCollapsed(next);
    onCollapseChange?.(next);
  };

  return (
    <nav
      {...nativeProps}
      aria-label={ariaLabel}
      className={cls(classes.block, classes.m(size), className)}
      ref={rootRef}
      style={{ ...style, maxHeight }}
    >
      {useCollapse && (
        <button
          aria-expanded={!currentCollapsed}
          className={cls(classes.e('collapse-btn'), classes.is('collapse', currentCollapsed))}
          onClick={toggleCollapsed}
          type="button"
        >
          <span aria-hidden="true">{currentCollapsed ? '›' : '‹'}</span>
          <span className={classes.e('collapse-btn-txt')}>{collapseText}</span>
        </button>
      )}
      <div style={{ maxHeight, overflow: 'auto' }}>
        <div className={classes.e('wrap')} hidden={useCollapse && currentCollapsed}>
          <div className={classes.e('line')} hidden={!showLine}>
            <div
              className={classes.e('line--highlight')}
              hidden={!showHighlightLine}
              style={highlightStyle}
            />
          </div>
          <AnchorContext.Provider value={context}>
            <AnchorDepthContext.Provider value={0}>
              {autoRender ? renderAnchorList(items) : children}
            </AnchorDepthContext.Provider>
          </AnchorContext.Provider>
        </div>
      </div>
    </nav>
  );
});

export const Anchor = AnchorImplementation as ForwardRefExoticComponent<
  AnchorProps & RefAttributes<AnchorHandle>
>;

Anchor.displayName = 'Anchor';
