import { describe, expect, it } from 'vitest';
import { focusPopconfirmAction, getPopconfirmAction } from '..';

describe('Popconfirm DOM primitives', () => {
  it('finds and focuses the preferred enabled action', () => {
    const dialog = document.createElement('div');
    dialog.innerHTML = `
      <button data-popconfirm-action="cancel">Cancel</button>
      <button data-popconfirm-action="confirm">Confirm</button>
    `;
    document.body.append(dialog);

    const confirm = getPopconfirmAction(dialog, 'confirm');
    expect(confirm?.textContent).toBe('Confirm');
    expect(focusPopconfirmAction(dialog, 'cancel')?.textContent).toBe('Cancel');
    expect(document.activeElement?.textContent).toBe('Cancel');
    dialog.remove();
  });

  it('falls back when the preferred action is disabled', () => {
    const dialog = document.createElement('div');
    dialog.innerHTML = `
      <button data-popconfirm-action="cancel" disabled>Cancel</button>
      <button data-popconfirm-action="confirm">Confirm</button>
    `;
    document.body.append(dialog);

    expect(focusPopconfirmAction(dialog)?.textContent).toBe('Confirm');
    expect(document.activeElement?.textContent).toBe('Confirm');
    dialog.remove();
  });
});
