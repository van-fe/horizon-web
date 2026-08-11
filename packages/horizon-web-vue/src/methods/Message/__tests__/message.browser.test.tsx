import { nextTick } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import { HMessage } from '../index';
import '../src/style/index.scss';

afterEach(() => {
  HMessage.closeAll();
  document.body.replaceChildren();
});

describe('Message animation', () => {
  it('rotates the status icon only while loading', async () => {
    const message = HMessage.loading({ message: 'Loading', duration: 0 });
    await nextTick();

    const icon = document.querySelector<SVGElement>('.h-message.is-loading .h-loading-icon');
    const path = icon?.querySelector<SVGCircleElement>('.h-loading-icon__path');
    expect(icon).toBeInstanceOf(SVGElement);
    expect(path).toBeInstanceOf(SVGCircleElement);

    const animation = icon!.getAnimations()[0];
    const pathAnimation = path!.getAnimations()[0];
    expect(animation).toBeDefined();
    expect(animation.playState).toBe('running');
    expect(pathAnimation).toBeDefined();
    expect(pathAnimation.playState).toBe('running');

    const firstTransform = getComputedStyle(icon!).transform;
    await new Promise(resolve => setTimeout(resolve, 100));
    const nextTransform = getComputedStyle(icon!).transform;

    expect(firstTransform).not.toBe('none');
    expect(nextTransform).not.toBe(firstTransform);

    message.update({ type: 'success' });
    await nextTick();

    const successIcon = document.querySelector<SVGElement>(
      '.h-message.is-success .h-message__status-icon',
    );
    expect(successIcon).toBeInstanceOf(SVGElement);
    expect(successIcon!.classList).not.toContain('h-loading-icon');
    expect(successIcon!.getAnimations()).toHaveLength(0);
  });
});
