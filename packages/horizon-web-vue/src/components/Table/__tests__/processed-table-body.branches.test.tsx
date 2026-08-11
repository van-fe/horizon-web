import { mount } from '@vue/test-utils';
import { defineComponent, provide, ref } from 'vue';
import { describe, expect, test } from 'vitest';
import ProcessedTableBody from '../src/components/ProcessedTableBody';
import type { TableBodyExposes } from '../src/components/TableBody';
import { HTableFlattenDataInjectKey } from '../src/utils/injectKeys';
import type { HTableTransformedRowDataType } from '../src/utils/types';

describe('ProcessedTableBody adapter branches', () => {
  test('returns safe public fallbacks before a body implementation exposes methods', async () => {
    const rows = [{ id: 1 }, { id: 2 }] as HTableTransformedRowDataType[];
    const StubBody = defineComponent({
      name: 'TableBody',
      props: ['columns'],
      setup: () => () => <tbody data-stub-body="true" />,
    });
    const Harness = defineComponent({
      setup() {
        provide(HTableFlattenDataInjectKey, ref(rows));
        return () => <ProcessedTableBody columns={[]} rows={rows} />;
      },
    });
    const wrapper = mount(Harness, { global: { stubs: { TableBody: StubBody } } });
    const api = wrapper.findComponent(ProcessedTableBody).getCurrentComponent()
      .exposed as TableBodyExposes;
    wrapper.unmount();

    expect(api.scrollToIndex(1)).toBeUndefined();
    expect(api.scrollToRow(2)).toBeUndefined();
    expect(api.getVisibleRange()).toEqual({
      startIndex: 0,
      endIndex: 2,
      visibleStartIndex: 0,
      visibleEndIndex: 2,
    });
    await expect(api.startCellEdit(1, 'id')).resolves.toBe(false);
    await expect(api.commitEdit()).resolves.toBe(true);
    expect(api.cancelEdit()).toBeUndefined();
  });
});
