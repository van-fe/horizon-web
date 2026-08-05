import { createApp, h, nextTick, ref } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import HSwitch from '../src/Switch';
import '../../../styles/base.scss';
import '../../../styles/global-variables.scss';
import '../src/style/index.scss';

const mountedApps: ReturnType<typeof createApp>[] = [];

afterEach(() => {
  mountedApps.splice(0).forEach(app => app.unmount());
  document.body.replaceChildren();
});

describe('Switch pointer interaction', () => {
  it('keeps an even inset around the thumb and toggles when the thumb is clicked', async () => {
    const root = document.createElement('div');
    document.body.append(root);
    const modelValue = ref(false);

    const app = createApp({
      render: () =>
        h(HSwitch, {
          modelValue: modelValue.value,
          'onUpdate:modelValue': value => (modelValue.value = value),
        }),
    });
    mountedApps.push(app);
    app.mount(root);
    await new Promise(resolve => requestAnimationFrame(resolve));

    const core = root.querySelector<HTMLElement>('.h-switch__core')!;
    const thumb = root.querySelector<HTMLElement>('.h-switch__inner')!;
    const input = root.querySelector<HTMLInputElement>('input[role="switch"]')!;
    const coreRect = core.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();

    expect(thumbRect.top - coreRect.top).toBe(2);
    expect(coreRect.bottom - thumbRect.bottom).toBe(2);
    expect(thumbRect.left - coreRect.left).toBe(2);

    const thumbCenterX = thumbRect.left + thumbRect.width / 2;
    const thumbCenterY = thumbRect.top + thumbRect.height / 2;
    const thumbHitTarget = document.elementFromPoint(thumbCenterX, thumbCenterY);
    expect(thumbHitTarget).toBe(input);

    (thumbHitTarget as HTMLElement).click();
    await nextTick();
    expect(modelValue.value).toBe(true);
    await Promise.all(thumb.getAnimations().map(animation => animation.finished));

    const activeThumbRect = thumb.getBoundingClientRect();
    expect(coreRect.right - activeThumbRect.right).toBe(2);
  });
});
