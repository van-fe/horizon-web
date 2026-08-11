import { describe, expect, test } from 'vitest';
import {
  getHorizonWebRendererPackage,
  HorizonWebPluginResolvers,
  HorizonWebReactVitePluginStyleImportResolver,
  HorizonWebVitePluginStyleImportResolvers,
  resolveHorizonWebPackageImport,
} from '../src';
import components from '../../api-generator/dist/components-dependencies.json';
import directives from '../../api-generator/dist/directives-dependencies.json';

describe('unplugin-resolver', () => {
  const [component, directive] = HorizonWebPluginResolvers();

  test('component', () => {
    for (const comp of components) {
      const res = component.resolve(comp.name);
      expect(res).not.toBeUndefined();
      expect(res?.name).toEqual(comp.name);
      expect(res?.from).toMatch(/^@aurora\/horizon-web-vue\//);
      expect(res?.from).toContain(comp.dirName);
      expect(res?.sideEffects).toEqual(
        expect.arrayContaining([expect.stringMatching(new RegExp(comp.dirName))]),
      );
    }
  });

  test('directive', () => {
    for (const dir of directives) {
      const dirName = dir.name.replace(/^HV/, '');
      const res = directive.resolve(dirName);
      expect(res).not.toBeUndefined();
      expect(res?.name).toEqual(dir.name);
      expect(res?.from).toMatch(/^@aurora\/horizon-web-vue\//);
      expect(res?.from).toContain(dir.dirName);
      if (res?.sideEffects.length && res?.sideEffects.length > 3) {
        expect(res.sideEffects).toEqual(
          expect.arrayContaining([expect.stringMatching(new RegExp(dir.dirName))]),
        );
      }
    }
  });

  test('no directive', () => {
    expect(
      HorizonWebPluginResolvers({
        directives: false,
      })[1].resolve('ClickOutside'),
    ).toBeUndefined();
  });

  test('exclude', () => {
    expect(
      HorizonWebPluginResolvers({
        exclude: /HButton/,
      })[0].resolve('HButton'),
    ).toBeUndefined();

    expect(
      HorizonWebPluginResolvers({
        exclude: /HButton/,
      })[0].resolve('HInput'),
    ).not.toBeUndefined();

    expect(
      HorizonWebPluginResolvers({
        exclude: /ClickOutside/,
      })[1].resolve('ClickOutside'),
    ).toBeUndefined();

    expect(
      HorizonWebPluginResolvers({
        exclude: /ClickOutside/,
      })[1].resolve('Tooltip'),
    ).not.toBeUndefined();
  });

  test('custom component namespace', () => {
    expect(HorizonWebPluginResolvers({ namespace: 'X' })[0].resolve('XButton')).toMatchObject({
      name: 'HButton',
      from: expect.stringContaining('/Button'),
    });
  });

  test('ssr', () => {
    expect(
      HorizonWebPluginResolvers({
        ssr: false,
      })[0].resolve('HButton')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching('/es/')]));

    expect(
      HorizonWebPluginResolvers({
        ssr: true,
      })[0].resolve('HButton')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching('/lib/')]));
  });

  test('import style', () => {
    expect(
      HorizonWebPluginResolvers({
        importStyle: 'css',
      })[0].resolve('HButton')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching(/\.css$/)]));

    expect(
      HorizonWebPluginResolvers({
        importStyle: 'scss',
      })[0].resolve('HButton')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching(/\.scss$/)]));

    expect(
      HorizonWebPluginResolvers({
        importStyle: 'css',
      })[1].resolve('Loading')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching(/\.css$/)]));

    expect(
      HorizonWebPluginResolvers({
        importStyle: 'scss',
      })[1].resolve('Loading')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching(/\.scss$/)]));
  });

  test('can disable style imports', () => {
    const [componentWithoutStyle, directiveWithoutStyle] = HorizonWebPluginResolvers({
      importStyle: false,
    });

    expect(componentWithoutStyle.resolve('HButton')?.sideEffects).toStrictEqual([]);
    expect(directiveWithoutStyle.resolve('Loading')?.sideEffects).toStrictEqual([]);
  });

  test('uses the Vue renderer package for Vite style imports', () => {
    const resolver = HorizonWebVitePluginStyleImportResolvers();

    expect(resolver.libraryName).toBe('@aurora/horizon-web-vue');
    expect(resolver.resolveStyle('h-button')).toBe(
      '@aurora/horizon-web-vue/es/components/Button/src/style/index.css',
    );
  });

  test('resolves explicit renderer packages without cross-renderer paths', () => {
    expect(getHorizonWebRendererPackage('vue')).toBe('@aurora/horizon-web-vue');
    expect(getHorizonWebRendererPackage('react')).toBe('@aurora/horizon-web-react');
    expect(resolveHorizonWebPackageImport('vue', 'Button')).toMatchObject({
      name: 'HButton',
      from: '@aurora/horizon-web-vue/es/components/Button',
    });
    expect(resolveHorizonWebPackageImport('react', 'Button')).toEqual({
      renderer: 'react',
      packageName: '@aurora/horizon-web-react',
      name: 'Button',
      from: '@aurora/horizon-web-react',
      sideEffects: ['@aurora/horizon-web-react/style.css'],
    });
  });

  test('provides a React style resolver with exclusion and opt-out', () => {
    const resolver = HorizonWebReactVitePluginStyleImportResolver();
    expect(resolver.libraryName).toBe('@aurora/horizon-web-react');
    expect(resolver.resolveStyle('select')).toBe('@aurora/horizon-web-react/style.css');
    expect(HorizonWebReactVitePluginStyleImportResolver({ importStyle: false }).resolveStyle('Button')).toBe('');
    expect(HorizonWebReactVitePluginStyleImportResolver({ exclude: /Button/ }).resolveStyle('Button')).toBe('');
  });
});
