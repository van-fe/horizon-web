import { describe, expect, test } from 'vitest';
import { LegoPluginResolvers } from '../src';
import components from '../../api-generator/dist/components-dependencies.json';
import directives from '../../api-generator/dist/directives-dependencies.json';

describe('unplugin-resolver', () => {
  const [component, directive] = LegoPluginResolvers();

  test('component', () => {
    for (const comp of components) {
      const res = component.resolve(comp.name);
      expect(res).not.toBeUndefined();
      expect(res?.name).toEqual(comp.name);
      expect(res?.from).toContain(comp.dirName);
      expect(res?.sideEffects).toEqual(
        expect.arrayContaining([expect.stringMatching(new RegExp(comp.dirName))]),
      );
    }
  });

  test('directive', () => {
    for (const dir of directives) {
      const dirName = dir.name.replace(/^NV/, '');
      const res = directive.resolve(dirName);
      expect(res).not.toBeUndefined();
      expect(res?.name).toEqual(dir.name);
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
      LegoPluginResolvers({
        directives: false,
      })[1].resolve('ClickOutside'),
    ).toBeUndefined();
  });

  test('exclude', () => {
    expect(
      LegoPluginResolvers({
        exclude: /NButton/,
      })[0].resolve('NButton'),
    ).toBeUndefined();

    expect(
      LegoPluginResolvers({
        exclude: /NButton/,
      })[0].resolve('NInput'),
    ).not.toBeUndefined();

    expect(
      LegoPluginResolvers({
        exclude: /ClickOutside/,
      })[1].resolve('ClickOutside'),
    ).toBeUndefined();

    expect(
      LegoPluginResolvers({
        exclude: /ClickOutside/,
      })[1].resolve('Tooltip'),
    ).not.toBeUndefined();
  });

  test('ssr', () => {
    expect(
      LegoPluginResolvers({
        ssr: false,
      })[0].resolve('NButton')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching('/es/')]));

    expect(
      LegoPluginResolvers({
        ssr: true,
      })[0].resolve('NButton')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching('/lib/')]));
  });

  test('import style', () => {
    expect(
      LegoPluginResolvers({
        importStyle: 'css',
      })[0].resolve('NButton')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching(/\.css$/)]));

    expect(
      LegoPluginResolvers({
        importStyle: 'scss',
      })[0].resolve('NButton')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching(/\.scss$/)]));

    expect(
      LegoPluginResolvers({
        importStyle: 'css',
      })[1].resolve('Loading')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching(/\.css$/)]));

    expect(
      LegoPluginResolvers({
        importStyle: 'scss',
      })[1].resolve('Loading')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching(/\.scss$/)]));
  });

  test('useResetStyle', () => {
    expect(
      LegoPluginResolvers({
        useResetStyle: true,
      })[0].resolve('NButton')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching(/reset\.css$/)]));

    expect(
      LegoPluginResolvers({
        useResetStyle: false,
      })[0].resolve('NButton')?.sideEffects,
    ).not.toEqual(expect.arrayContaining([expect.stringMatching(/reset\.scss$/)]));

    expect(
      LegoPluginResolvers({
        useResetStyle: true,
      })[1].resolve('Loading')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching(/reset\.css$/)]));

    expect(
      LegoPluginResolvers({
        useResetStyle: false,
      })[1].resolve('Loading')?.sideEffects,
    ).not.toEqual(expect.arrayContaining([expect.stringMatching(/reset\.scss$/)]));
  });
});
