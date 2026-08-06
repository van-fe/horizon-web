import { createApp, h } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import HButton from '../../components/Button/src/Button';
import HCheckbox from '../../components/Checkbox/src/Checkbox';
import HInput from '../../components/Input/src/Input';
import HInputNumber from '../../components/InputNumber/src/InputNumber';
import HInputOtp from '../../components/InputOtp/src/InputOtp';
import HLink from '../../components/Link/src/Link';
import HRadio from '../../components/Radio/src/Radio';
import HSwitch from '../../components/Switch/src/Switch';
import '../base.scss';
import '../global-variables.scss';
import '../../components/Button/src/style/index.scss';
import '../../components/Checkbox/src/style/index.scss';
import '../../components/Input/src/style/index.scss';
import '../../components/InputNumber/src/style/index.scss';
import '../../components/InputOtp/src/style/index.scss';
import '../../components/Link/src/style/index.scss';
import '../../components/Radio/src/style/index.scss';
import '../../components/Switch/src/style/index.scss';

const mountedApps: ReturnType<typeof createApp>[] = [];

afterEach(() => {
  mountedApps.splice(0).forEach(app => app.unmount());
  document.body.replaceChildren();
});

async function expectFocusRing(
  root: HTMLElement,
  selector: string,
  treatment: 'halo' | 'outline' = 'halo',
) {
  await expect
    .poll(() => {
      const element = root.querySelector(selector);
      if (!(element instanceof HTMLElement)) return { hasRing: false, rounded: false };

      const style = getComputedStyle(element);
      const ringColor = 'rgba(52, 117, 248, 0.2)';
      const hasRing =
        treatment === 'outline'
          ? style.outlineStyle === 'solid' &&
            style.outlineWidth === '2px' &&
            style.outlineOffset === '1px' &&
            style.outlineColor === ringColor
          : style.outlineStyle === 'none' &&
            style.boxShadow.includes(ringColor) &&
            style.boxShadow.endsWith('0px 2px');

      return {
        hasRing,
        rounded: style.borderRadius !== '0px',
      };
    }, { message: `Expected ${selector} to expose the ${treatment} focus treatment` })
    .toEqual({ hasRing: true, rounded: true });
}

describe('keyboard focus appearance', () => {
  it('uses one visible ring for native, wrapped, and proxy controls in on-demand styles', async () => {
    const root = document.createElement('div');
    document.body.append(root);

    const app = createApp({
      render() {
        return h('div', [
          h(HButton, { disabled: true }, () => 'Disabled'),
          h(HButton, null, () => 'Action'),
          h(HLink, null, () => 'Action link'),
          h(HInput, { 'aria-label': 'Name' }),
          h(HInput, { embedded: true, 'aria-label': 'Embedded name' }),
          h(HInputNumber, { modelValue: 0, 'aria-label': 'Quantity' }),
          h(HCheckbox, null, () => 'Choice'),
          h(HRadio, { value: 'one', modelValue: '' }, () => 'Option'),
          h(HSwitch, { modelValue: false, label: 'Notifications' }),
          h(HInputOtp, { 'aria-label': 'Verification code' }),
          h(
            'div',
            {
              class: 'h-test-control',
              role: 'button',
              tabindex: 0,
              style: { borderRadius: 'var(--h-radius-m)' },
            },
            'Custom control',
          ),
        ]);
      },
    });
    mountedApps.push(app);
    app.mount(root);

    const cases = [
      ['.h-button:not(:disabled)', '.h-button:not(:disabled)', 'halo'],
      ['.h-link', '.h-link', 'halo'],
      ['.h-input__inner', '.h-input__inner-wrap', 'halo'],
      ['.h-input__embedded-inner', '.h-input__embedded-inner', 'halo'],
      ['.h-input-number__inner', '.h-input-number__group--inner', 'halo'],
      ['.h-checkbox__original', '.h-checkbox__icon', 'outline'],
      ['.h-radio__input--original', '.h-radio__input--cursor', 'outline'],
      ['.h-switch__core input', '.h-switch__core', 'halo'],
      ['.h-input-otp__native', '.h-input-otp__cell--active', 'halo'],
      ['.h-test-control', '.h-test-control', 'halo'],
    ] as const;

    for (const [focusSelector, ringSelector, treatment] of cases) {
      await userEvent.tab();
      expect(document.activeElement).toBe(root.querySelector(focusSelector));
      await expectFocusRing(root, ringSelector, treatment);
    }

    const button = root.querySelector<HTMLButtonElement>('.h-button:not(:disabled)')!;
    await userEvent.click(button);
    expect(button.matches(':focus-visible')).toBe(false);
    expect(getComputedStyle(button).boxShadow).toBe('none');
  });
});
