import { describe, expect, test, vi } from 'vitest';
import AutoCompleteHelper from '~/components/AutoComplete/__tests__/autoCompleteHelper';
import { sleep } from '~/utils/tools';

describe('AutoComplete.tsx props', () => {
  test('basic', async () => {
    const instance = new AutoCompleteHelper();

    await instance.open();

    expect(instance.element.exists()).toBeTruthy();
  });

  test('changePanelVisible controls the Picker popover', async () => {
    const onDropdownVisibleChange = vi.fn();
    const instance = new AutoCompleteHelper({
      hidePanelWhenEmptyList: false,
      onDropdownVisibleChange,
    });

    const exposed = instance.element.getCurrentComponent().exposed!;

    exposed.changePanelVisible(true);
    await sleep(300);
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(true);

    exposed.changePanelVisible(false);
    await sleep(300);

    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(false);
  });
});
