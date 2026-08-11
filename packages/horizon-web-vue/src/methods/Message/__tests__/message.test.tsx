import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';
import { HMessage } from '../index';

async function waitForMessages(count: number) {
  await vi.waitFor(() => {
    expect(document.querySelectorAll('.h-message')).toHaveLength(count);
  });
}

describe('Message.tsx', () => {
  afterEach(async () => {
    HMessage.closeAll();
    HMessage.config({ maxCount: Number.MAX_SAFE_INTEGER, duration: 3000 });
    await vi.waitFor(() => {
      expect(document.querySelectorAll('.h-message')).toHaveLength(0);
    });
    document.body.replaceChildren();
  });

  test.each([
    ['success', 'success test', 'h-icon_success_filled_light'],
    ['warning', 'warning test', 'h-icon_warning_filled_light'],
    ['error', 'error test', 'h-icon_error_filled_light'],
    ['info', 'info test', 'h-icon_info_filled_light'],
  ] as const)('renders a visible %s message with its status icon', async (type, content, iconClass) => {
    const message = HMessage[type]({ message: content, duration: 0 });
    await nextTick();

    const element = document.querySelector<HTMLElement>(`.h-message.is-${type}`);
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element?.querySelector('.h-message__content')?.textContent).toBe(content);
    expect(element?.querySelector(`.${iconClass}`)).toBeInstanceOf(SVGElement);
    expect(element?.style.top).toBe('32px');
    expect(Number(element?.style.zIndex)).toBeGreaterThan(0);

    message.close();
  });

  test('updates a loading message in place', async () => {
    const message = HMessage.loading({ message: 'loading test', duration: 0 });
    await nextTick();

    const loading = document.querySelector<HTMLElement>('.h-message.is-loading');
    expect(loading).toBeInstanceOf(HTMLElement);
    expect(loading?.querySelector('.h-loading-icon')).toBeInstanceOf(SVGElement);
    expect(loading?.textContent).toContain('loading test');

    message.update({ message: 'updated loading test', type: 'success', duration: 0 });
    await nextTick();

    const updated = document.querySelector<HTMLElement>('.h-message.is-success');
    expect(updated).toBe(loading);
    expect(updated?.textContent).toContain('updated loading test');
    expect(updated?.querySelector('.h-loading-icon')).toBeNull();
    message.close();
  });

  test('stacks messages using their real rendered height', async () => {
    HMessage.success({ message: 'message 1', duration: 0 });
    HMessage.warning({ message: 'message 2', duration: 0 });
    await waitForMessages(2);

    const messages = Array.from(document.querySelectorAll<HTMLElement>('.h-message'));
    const firstTop = Number.parseFloat(messages[0].style.top);
    const secondTop = Number.parseFloat(messages[1].style.top);
    expect(firstTop).toBe(32);
    expect(secondTop).toBeGreaterThan(firstTop);
  });

  test('closeAll removes every active message', async () => {
    HMessage.success({ message: 'message 1', duration: 0 });
    HMessage.warning({ message: 'message 2', duration: 0 });
    await waitForMessages(2);

    HMessage.closeAll();

    await waitForMessages(0);
  });

  test('maxCount keeps only the newest message after the leave transition', async () => {
    HMessage.config({ maxCount: 1 });
    HMessage.success({ message: 'message 1', duration: 0 });
    await waitForMessages(1);
    HMessage.info({ message: 'message 2', duration: 0 });

    await vi.waitFor(() => {
      const messages = document.querySelectorAll('.h-message');
      expect(messages).toHaveLength(1);
      expect(messages[0].textContent).toContain('message 2');
    });
  });
});
