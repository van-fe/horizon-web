import { resolve } from 'node:path';
import { compile } from 'sass';
import { describe, expect, test } from 'vitest';
import { testScssOptions } from '~/__tests__/sass-options';

const compileCarouselStyleRules = () => {
  const css = compile(resolve(__dirname, '../src/style/index.scss'), testScssOptions).css;
  return [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => {
    const declarations = new Map<string, string>();
    body
      .split(';')
      .map(declaration => declaration.trim())
      .filter(Boolean)
      .forEach(declaration => {
        const separator = declaration.indexOf(':');
        if (separator < 0) return;
        declarations.set(
          declaration.slice(0, separator).trim(),
          declaration.slice(separator + 1).trim(),
        );
      });
    return { declarations, selector: selector.trim() };
  });
};

describe('Carousel styles', () => {
  test('uses one global active layer without card-specific stacking tiers', () => {
    const rules = compileCarouselStyleRules();
    const globalActiveRule = rules.find(rule => rule.selector === '.h-carousel-item.is-active');
    const cardViewportRule = rules.find(
      rule => rule.selector === '.h-carousel--card .h-carousel__viewport',
    );
    const baseCardItemRule = rules.find(
      rule => rule.selector === '.h-carousel--card .h-carousel-item',
    );
    const cardItemRules = rules.filter(
      rule =>
        rule.selector.includes('.h-carousel--card') && rule.selector.includes('.h-carousel-item'),
    );
    const itemZIndexRules = rules.filter(
      rule => rule.selector.includes('.h-carousel-item') && rule.declarations.has('z-index'),
    );

    expect(globalActiveRule?.declarations.get('z-index')).toBe('1');
    expect(itemZIndexRules.map(rule => rule.selector)).toEqual(['.h-carousel-item.is-active']);
    expect(cardViewportRule).toBeDefined();
    expect([...cardViewportRule!.declarations.keys()]).toEqual(['perspective']);
    expect(baseCardItemRule?.declarations.get('will-change')).toBe('auto');
    expect(cardItemRules.length).toBeGreaterThan(0);
    for (const rule of cardItemRules) {
      for (const property of [
        'animation-fill-mode',
        'backface-visibility',
        'isolation',
        'transform-style',
        'z-index',
      ])
        expect(rule.declarations.has(property)).toBe(false);
    }
  });

  test('keeps slide bystanders hidden and only assigns animations to transition roles', () => {
    const rules = compileCarouselStyleRules();
    const baseSlideItemRule = rules.find(
      rule => rule.selector === '.h-carousel--slide .h-carousel-item',
    );
    const activeSlideItemRule = rules.find(
      rule => rule.selector === '.h-carousel--slide .h-carousel-item.is-active',
    );
    const slideAnimationRules = rules.filter(
      rule =>
        rule.selector.includes('.h-carousel--slide') && rule.declarations.has('animation-name'),
    );

    expect(baseSlideItemRule?.declarations.get('visibility')).toBe('hidden');
    expect(baseSlideItemRule?.declarations.get('transform')).toBe('none');
    expect(baseSlideItemRule?.declarations.get('transition')).toBe('none');
    expect(activeSlideItemRule?.declarations.get('visibility')).toBe('visible');
    expect(slideAnimationRules).toHaveLength(8);
    expect(slideAnimationRules.map(rule => rule.declarations.get('animation-name')).sort()).toEqual(
      [
        'h-carousel-slide-x-in',
        'h-carousel-slide-x-in-reverse',
        'h-carousel-slide-x-out',
        'h-carousel-slide-x-out-reverse',
        'h-carousel-slide-y-in',
        'h-carousel-slide-y-in-reverse',
        'h-carousel-slide-y-out',
        'h-carousel-slide-y-out-reverse',
      ].sort(),
    );
    for (const rule of slideAnimationRules) {
      expect(rule.selector).toMatch(/\.is-slide-(?:in|out)$/);
    }
  });

  test('keeps horizontal side indicators clear of their same-side arrows', () => {
    const rules = compileCarouselStyleRules();
    const leftArrowRule = rules.find(
      rule =>
        rule.selector ===
        '.h-carousel--horizontal.h-carousel--indicator-position-left .h-carousel__arrow--previous',
    );
    const rightArrowRule = rules.find(
      rule =>
        rule.selector ===
        '.h-carousel--horizontal.h-carousel--indicator-position-right .h-carousel__arrow--next',
    );
    const sideControlOffset =
      'calc(var(--h-carousel-size-indicator-wrapper) + var(--h-carousel-spacing-arrow-offset))';

    expect(leftArrowRule?.declarations.get('left')).toBe(sideControlOffset);
    expect(rightArrowRule?.declarations.get('right')).toBe(sideControlOffset);
    expect(leftArrowRule?.selector).not.toContain('h-carousel--vertical');
    expect(rightArrowRule?.selector).not.toContain('h-carousel--vertical');
  });
});
