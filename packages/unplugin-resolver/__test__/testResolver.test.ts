import { describe, expect, test } from 'vitest';
import { HorizonWebPluginResolvers } from '../src';
import components from '../../api-generator/dist/components-dependencies.json';
import directives from '../../api-generator/dist/directives-dependencies.json';

describe('unplugin-resolver', () => {
  const [component, directive] = HorizonWebPluginResolvers();

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

  test('useResetStyle', () => {
    expect(
      HorizonWebPluginResolvers({
        useResetStyle: true,
      })[0].resolve('HButton')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching(/reset\.css$/)]));

    expect(
      HorizonWebPluginResolvers({
        useResetStyle: false,
      })[0].resolve('HButton')?.sideEffects,
    ).not.toEqual(expect.arrayContaining([expect.stringMatching(/reset\.scss$/)]));

    expect(
      HorizonWebPluginResolvers({
        useResetStyle: true,
      })[1].resolve('Loading')?.sideEffects,
    ).toEqual(expect.arrayContaining([expect.stringMatching(/reset\.css$/)]));

    expect(
      HorizonWebPluginResolvers({
        useResetStyle: false,
      })[1].resolve('Loading')?.sideEffects,
    ).not.toEqual(expect.arrayContaining([expect.stringMatching(/reset\.scss$/)]));
  });
});
