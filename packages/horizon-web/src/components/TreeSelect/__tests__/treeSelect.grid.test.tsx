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
});
