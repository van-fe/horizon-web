import { h } from 'vue';
import { describe, expect, test } from 'vitest';
import HDropdownMenu from '../src/DropdownMenu';
import pickDropdownMenu from '../src/utils/useDropdown';

describe('Dropdown vnode partitioning', () => {
  test('separates only named DropdownMenu component nodes from reference content', () => {
    const nativeReference = h('button', 'Open');
    const anonymousReference = h({ render: () => null });
    const dropdownMenu = h(HDropdownMenu);
    const nodes = [nativeReference, anonymousReference, dropdownMenu];

    expect(pickDropdownMenu(nodes, 'default')).toEqual([nativeReference, anonymousReference]);
    expect(pickDropdownMenu(nodes, 'dropdownMenu')).toEqual([dropdownMenu]);
  });
});
