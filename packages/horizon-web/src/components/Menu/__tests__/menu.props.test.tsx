import { describe, expect, test } from 'vitest';
import MenuHelper from './MenuHelper';
import { nextTick } from 'vue';

describe('Menu.tsx props', () => {
  test('is-default-expand-all', async () => {
    const instance = new MenuHelper({
      isDefaultExpandAll: true,
    });

    await nextTick();

    expect(instance.domRef.value?.expandMenus.length).toBe(11);
  });
});
