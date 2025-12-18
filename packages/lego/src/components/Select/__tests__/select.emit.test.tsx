import { describe, expect, test, vi } from 'vitest';
import SelectHelper from './SelectHelper';

describe('Select.tsx', () => {
  test('dropdown-visible-change', async () => {
    const onDropdownVisibleChange = vi.fn();

    const instance = new SelectHelper({
      clearable: true,
      onDropdownVisibleChange,
    });

    await instance.open();

    expect(onDropdownVisibleChange).toHaveBeenCalledOnce();
    expect(onDropdownVisibleChange).toHaveBeenCalledWith(true);

    await instance.close();

    expect(onDropdownVisibleChange).toHaveBeenCalledTimes(2);
    expect(onDropdownVisibleChange).toHaveBeenCalledWith(false);
  });
});
