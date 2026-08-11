import { describe, expect, test } from 'vitest';
import { HorizonWebPluginResolvers } from '../src';

describe('TimeSelect resolver', () => {
  test('resolves HTimeSelect and its on-demand style', () => {
    const [component] = HorizonWebPluginResolvers();

    expect(component.resolve('HTimeSelect')).toEqual({
      name: 'HTimeSelect',
      from: '@aurora/horizon-web-vue/es/components/TimeSelect',
      sideEffects: [
        '@aurora/horizon-web-vue/es/styles/base.css',
        '@aurora/horizon-web-vue/es/styles/global-variables.css',
        '@aurora/horizon-web-vue/es/components/TimeSelect/src/style/index.css',
      ],
    });
  });
});
