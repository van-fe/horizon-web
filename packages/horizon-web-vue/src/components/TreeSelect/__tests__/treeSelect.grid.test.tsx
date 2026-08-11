import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, test } from 'vitest';
import { HGrid, HGridItem } from '~/components/Layout';
import HTagGroup from '~/components/Tag/src/TagGroup';
import HTreeSelect from '../src/TreeSelect';

describe('TreeSelect in Grid', () => {
  test('enables automatic tag collapse in a constrained grid item', async () => {
    const wrapper = mount(() => (
      <HGrid gap={12}>
        <HGridItem span={6}>
          <HTreeSelect
            modelValue={['input', 'feedback', 'tree']}
            treeData={[
              { value: 'input', label: 'Input' },
              { value: 'feedback', label: 'Feedback' },
              { value: 'tree', label: 'Tree' },
            ]}
            multiple={true}
            collapseTags={true}
            toBody={false}
          />
        </HGridItem>
      </HGrid>
    ));

    await nextTick();

    const tagGroup = wrapper.findComponent(HTagGroup);
    expect(tagGroup.props('collapse')).toBe(true);
    expect(tagGroup.classes()).toContain('h-tag-group--collapse');
  });

  test('removes disabled multiple-value focus proxies from the tab order', async () => {
    const wrapper = mount(() => (
      <HTreeSelect
        modelValue={['input']}
        treeData={[{ value: 'input', label: 'Input' }]}
        multiple={true}
        disabled={true}
        toBody={false}
      />
    ));

    await nextTick();
    const proxy = wrapper.get('input.is-input-placeholder');

    expect(proxy.attributes()).toHaveProperty('data-focus-visible-proxy');
    expect(proxy.attributes()).toHaveProperty('disabled');
    expect(proxy.attributes('tabindex')).toBe('-1');
  });
});
