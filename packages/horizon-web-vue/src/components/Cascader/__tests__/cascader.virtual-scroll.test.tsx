import { defineComponent, h, nextTick, provide, ref } from 'vue';
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import CascaderPanel from '../src/components/CascaderPanel';
import type { HCascaderExtendOption } from '../src/utils/types';
import {
  HCascaderEmitsInjectKey,
  HCascaderPopperVisibleInjectKey,
  HCascaderPropsInjectKey,
  HCascaderSlotsInjectKey,
  HCascaderTreeHelperInjectKey,
} from '../src/utils/injectKeys';

describe('Cascader virtual scroll', () => {
  test('renders string and render-function group labels', async () => {
    const list = [
      { _uuid: 'group-1', groupLabel: 'components' },
      { _uuid: 'group-2', groupLabel: () => h('strong', 'directives') },
    ];
    const Host = defineComponent({
      setup() {
        provide(HCascaderPropsInjectKey, {
          maxHeight: 300,
          useBuildInPanelFilter: false,
          useVirtualScroll: true,
        } as never);
        provide(HCascaderEmitsInjectKey, (() => undefined) as never);
        provide(HCascaderSlotsInjectKey, {} as never);
        provide(HCascaderPopperVisibleInjectKey, ref(true));
        provide(HCascaderTreeHelperInjectKey, {
          getOptionValue: (option: Record<string, unknown>, key: string) => option[key],
        } as never);

        return () => <CascaderPanel list={list as HCascaderExtendOption[]} />;
      },
    });
    const wrapper = mount(Host);

    await nextTick();
    await nextTick();
    await nextTick();

    expect(
      wrapper.findAll('.h-cascader-panel__group-label').map(group => group.text()),
      wrapper.html(),
    ).toStrictEqual(['components', 'directives']);
  });
});
