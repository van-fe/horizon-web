import { describe, expect, it } from 'vitest';
import {
  getSelectComboboxAria,
  getSelectListboxAria,
  getSelectOptionAria,
} from '..';

describe('Select ARIA primitives', () => {
  it('creates combobox attributes without renderer types', () => {
    expect(
      getSelectComboboxAria({
        listboxId: 'cities',
        open: true,
        activeOptionId: 'city-shanghai',
        required: true,
      }),
    ).toEqual({
      role: 'combobox',
      'aria-activedescendant': 'city-shanghai',
      'aria-controls': 'cities',
      'aria-disabled': undefined,
      'aria-expanded': true,
      'aria-haspopup': 'listbox',
      'aria-invalid': undefined,
      'aria-labelledby': undefined,
      'aria-required': true,
    });
  });

  it('creates listbox and option attributes', () => {
    expect(getSelectListboxAria('cities', 'label')).toEqual({
      id: 'cities',
      role: 'listbox',
      'aria-labelledby': 'label',
    });
    expect(getSelectOptionAria({ selected: true, disabled: true })).toEqual({
      role: 'option',
      'aria-disabled': true,
      'aria-selected': true,
    });
  });
});
