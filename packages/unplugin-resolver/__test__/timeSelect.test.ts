import { describe, expect, test } from 'vitest';
import { HorizonWebPluginResolvers } from '../src';

describe('TimeSelect resolver', () => {
  test('resolves HTimeSelect and its on-demand style', () => {
    const [component] = HorizonWebPluginResolvers();

    expect(component.resolve('HTimeSelect')).toEqual({
      name: 'HTimeSelect',
      from: '@aurora/horizon-vue/es/components/TimeSelect',
      sideEffects: [
        '@aurora/horizon-vue/es/styles/base.css',
        '@aurora/horizon-vue/es/styles/global-variables.css',
        '@aurora/horizon-vue/es/components/TimeSelect/src/style/index.css',
      ],
    });
  });
});
