import { describe, expect, it } from 'vitest';
import {
  getLinkLoadingIconSize,
  isLinkActionRole,
  isLinkAnchorOffset,
  isLinkUnderline,
  isLinkVariant,
  resolveLinkAction,
} from '../contract';

describe('Link contract', () => {
  it('validates public semantic values', () => {
    expect(isLinkVariant('primary')).toBe(true);
    expect(isLinkVariant('warning')).toBe(false);
    expect(isLinkUnderline(false)).toBe(true);
    expect(isLinkUnderline('always')).toBe(true);
    expect(isLinkUnderline('hover')).toBe(false);
    expect(isLinkAnchorOffset(-12)).toBe(true);
    expect(isLinkAnchorOffset(Number.NaN)).toBe(false);
  });

  it('resolves interaction priority without renderer knowledge', () => {
    expect(resolveLinkAction({ disabled: true, href: '/guide' })).toBe('blocked');
    expect(resolveLinkAction({ loading: true, route: '/guide', canNavigateRoute: true })).toBe(
      'blocked',
    );
    expect(resolveLinkAction({ anchor: 'usage', route: '/guide', canNavigateRoute: true })).toBe(
      'anchor',
    );
    expect(resolveLinkAction({ route: '/guide', canNavigateRoute: true, href: '/fallback' })).toBe(
      'route',
    );
    expect(resolveLinkAction({ route: '/guide', canNavigateRoute: false, href: '/fallback' })).toBe(
      'href',
    );
    expect(resolveLinkAction({})).toBe('click');
  });

  it('derives action accessibility and loading geometry', () => {
    expect(isLinkActionRole(undefined, undefined)).toBe(true);
    expect(isLinkActionRole(undefined, '/guide')).toBe(false);
    expect(isLinkActionRole('usage', undefined)).toBe(false);
    expect(getLinkLoadingIconSize('small')).toBe(12);
    expect(getLinkLoadingIconSize('medium')).toBe(16);
    expect(getLinkLoadingIconSize('large')).toBe(16);
  });
});
