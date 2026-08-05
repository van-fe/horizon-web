import { createApp, h, nextTick, ref } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import HDropdown from '../../Dropdown/src/Dropdown';
import HDropdownItem from '../../Dropdown/src/DropdownItem';
import HDropdownMenu from '../../Dropdown/src/DropdownMenu';
import HMentions from '../src/Mentions';
import '../../../styles/global-variables.scss';
import '../src/style/index.scss';
import '../../Popover/src/style/index.scss';
import '../../Scrollbar/src/style/index.scss';

const mountedApps: ReturnType<typeof createApp>[] = [];

async function waitForFrame() {
  await nextTick();
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
}

afterEach(() => {
  mountedApps.splice(0).forEach(app => app.unmount());
  document.body.replaceChildren();
  document.documentElement.classList.remove('horizon-web-dark-mode');
});

describe('Mentions caret popup', () => {
  test('follows the real caret across textarea scrolling and selection changes', async () => {
    const root = document.createElement('div');
    root.style.width = '260px';
    root.style.margin = '40px';
    document.body.append(root);

    const modelValue = ref('');
    const app = createApp({
      render: () =>
        h(HMentions, {
          modelValue: modelValue.value,
          'onUpdate:modelValue': (value: string) => (modelValue.value = value),
          options: [
            { value: 'alice', label: 'Alice' },
            { value: 'bob', label: 'Bob' },
          ],
          rows: 3,
        }),
    });
    mountedApps.push(app);
    app.mount(root);

    const textarea = root.querySelector<HTMLTextAreaElement>('textarea')!;
    const value = '@al\nline two\nline three\nline four\n@bo';
    textarea.focus();
    textarea.value = value;
    textarea.setSelectionRange(value.length, value.length);
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    await waitForFrame();

    textarea.scrollTop = textarea.scrollHeight;
    textarea.dispatchEvent(new Event('scroll', { bubbles: true }));
    await waitForFrame();

    const assertPopupAligned = async () => {
      await vi.waitFor(
        () => {
          const caret = root.querySelector<HTMLElement>('.h-mentions__caret')!;
          const popper = document.querySelector<HTMLElement>('.h-mentions__popper')!;
          const caretRect = caret.getBoundingClientRect();
          const popperRect = popper.getBoundingClientRect();

          expect(getComputedStyle(popper).display).not.toBe('none');
          expect(popper.dataset.popperPlacement).toBe('bottom-start');
          expect(Math.abs(popperRect.left - caretRect.left)).toBeLessThan(3);
          expect(Math.abs(popperRect.top - (caretRect.bottom + 4))).toBeLessThan(3);
        },
        { timeout: 1500, interval: 20 },
      );
    };

    await assertPopupAligned();
    const scrolledCaretTop = root
      .querySelector<HTMLElement>('.h-mentions__caret')!
      .getBoundingClientRect().top;

    textarea.scrollTop = 0;
    textarea.setSelectionRange(3, 3);
    textarea.dispatchEvent(new Event('scroll', { bubbles: true }));
    textarea.dispatchEvent(new Event('select', { bubbles: true }));
    await waitForFrame();
    await assertPopupAligned();

    const movedCaretTop = root
      .querySelector<HTMLElement>('.h-mentions__caret')!
      .getBoundingClientRect().top;
    expect(movedCaretTop).toBeLessThan(scrolledCaretTop);
    expect(document.querySelector('.h-mentions__dropdown')?.textContent).toContain('Alice');
  });

  test('mirrors soft wrapping and right-to-left text direction', async () => {
    const root = document.createElement('div');
    root.style.width = '190px';
    root.style.margin = '120px 200px';
    document.body.append(root);

    const modelValue = ref('');
    const app = createApp({
      render: () =>
        h(HMentions, {
          modelValue: modelValue.value,
          'onUpdate:modelValue': (value: string) => (modelValue.value = value),
          options: [{ value: 'alice', label: 'Alice' }],
          rows: 6,
          dir: 'rtl',
        }),
    });
    mountedApps.push(app);
    app.mount(root);

    const textarea = root.querySelector<HTMLTextAreaElement>('textarea')!;
    const value = 'هذه مقدمة عربية طويلة لاختبار التفاف السطر داخل حقل الإدخال قبل كتابة @al';
    textarea.focus();
    textarea.value = value;
    textarea.setSelectionRange(value.length, value.length);
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    await waitForFrame();

    await vi.waitFor(
      () => {
        const mirror = root.querySelector<HTMLElement>('.h-mentions__measure')!;
        const caret = root.querySelector<HTMLElement>('.h-mentions__caret')!;
        const popper = document.querySelector<HTMLElement>('.h-mentions__popper')!;
        const textareaRect = textarea.getBoundingClientRect();
        const caretRect = caret.getBoundingClientRect();
        const popperRect = popper.getBoundingClientRect();
        const lineHeight = Number.parseFloat(getComputedStyle(textarea).lineHeight);

        expect(getComputedStyle(textarea).direction).toBe('rtl');
        expect(getComputedStyle(mirror).direction).toBe('rtl');
        expect(caretRect.top - textareaRect.top).toBeGreaterThan(lineHeight);
        expect(popper.dataset.popperPlacement).toBe('bottom-end');
        expect(Math.abs(popperRect.right - caretRect.right)).toBeLessThan(3);
        expect(Math.abs(popperRect.top - (caretRect.bottom + 4))).toBeLessThan(3);
      },
      { timeout: 1500, interval: 20 },
    );
  });

  test('flips a top placement when the caret is against the viewport edge', async () => {
    const root = document.createElement('div');
    root.style.position = 'fixed';
    root.style.inset = '0 auto auto 40px';
    root.style.width = '260px';
    document.body.append(root);

    const modelValue = ref('');
    const app = createApp({
      render: () =>
        h(HMentions, {
          modelValue: modelValue.value,
          'onUpdate:modelValue': (value: string) => (modelValue.value = value),
          options: [{ value: 'alice', label: 'Alice' }],
          placement: 'top',
        }),
    });
    mountedApps.push(app);
    app.mount(root);

    const textarea = root.querySelector<HTMLTextAreaElement>('textarea')!;
    textarea.focus();
    textarea.value = '@al';
    textarea.setSelectionRange(3, 3);
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    await waitForFrame();

    await vi.waitFor(
      () => {
        const caret = root.querySelector<HTMLElement>('.h-mentions__caret')!;
        const popper = document.querySelector<HTMLElement>('.h-mentions__popper')!;
        const caretRect = caret.getBoundingClientRect();
        const popperRect = popper.getBoundingClientRect();

        expect(popper.dataset.popperPlacement).toBe('bottom-start');
        expect(Math.abs(popperRect.left - caretRect.left)).toBeLessThan(3);
        expect(Math.abs(popperRect.top - (caretRect.bottom + 4))).toBeLessThan(3);
      },
      { timeout: 1500, interval: 20 },
    );
  });

  test('matches the default Dropdown surface and item styles in both themes', async () => {
    const root = document.createElement('div');
    root.style.width = '640px';
    root.style.margin = '80px';
    document.body.append(root);

    const modelValue = ref('');
    const app = createApp({
      render: () =>
        h('div', [
          h(HMentions, {
            modelValue: modelValue.value,
            'onUpdate:modelValue': (value: string) => (modelValue.value = value),
            options: [
              { value: 'alice', label: 'Alice' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ],
          }),
          h(
            HDropdown,
            { visible: true, trigger: 'manual', size: 'medium' },
            {
              default: () => [
                h('button', 'Dropdown reference'),
                h(
                  HDropdownMenu,
                  {},
                  {
                    default: () => [
                      h(HDropdownItem, { active: true }, { default: () => 'Alice' }),
                      h(HDropdownItem, { disabled: true }, { default: () => 'Disabled' }),
                    ],
                  },
                ),
              ],
            },
          ),
        ]),
    });
    mountedApps.push(app);
    app.mount(root);

    const textarea = root.querySelector<HTMLTextAreaElement>('textarea')!;
    textarea.focus();
    textarea.value = '@';
    textarea.setSelectionRange(1, 1);
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    await waitForFrame();

    const getSurfaces = () => {
      const mentions = document.querySelector<HTMLElement>('.h-mentions__dropdown');
      const dropdown = Array.from(
        document.querySelectorAll<HTMLElement>('.h-dropdown__inner--default'),
      ).find(element => !element.classList.contains('h-mentions__dropdown'));
      return { mentions, dropdown };
    };
    await vi.waitFor(
      () => {
        const surfaces = getSurfaces();
        expect(surfaces.mentions).toBeTruthy();
        expect(surfaces.dropdown).toBeTruthy();
      },
      { timeout: 1500, interval: 20 },
    );

    const surfaceProperties = [
      'background-color',
      'border-top-color',
      'border-top-style',
      'border-top-width',
      'border-radius',
      'box-shadow',
      'max-width',
      'min-width',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
    ];
    const itemProperties = ['color', 'cursor', 'font-size', 'font-weight'];
    const itemInnerProperties = [
      'align-items',
      'background-color',
      'display',
      'min-height',
      'padding-left',
      'padding-right',
    ];
    const getStyleValues = (element: Element, properties: string[]) => {
      const style = getComputedStyle(element);
      return Object.fromEntries(
        properties.map(property => [property, style.getPropertyValue(property)]),
      );
    };

    for (const darkMode of [false, true]) {
      document.documentElement.classList.toggle('horizon-web-dark-mode', darkMode);
      await waitForFrame();

      const { mentions, dropdown } = getSurfaces();
      expect(getStyleValues(mentions!, surfaceProperties)).toEqual(
        getStyleValues(dropdown!, surfaceProperties),
      );

      for (const stateClass of ['is-active', 'is-disabled']) {
        const mentionsItem = mentions!.querySelector<HTMLElement>(
          `.h-dropdown-item.${stateClass}`,
        )!;
        const dropdownItem = dropdown!.querySelector<HTMLElement>(
          `.h-dropdown-item.${stateClass}`,
        )!;
        const mentionsInner = mentionsItem.querySelector<HTMLElement>('.h-dropdown-item__inner')!;
        const dropdownInner = dropdownItem.querySelector<HTMLElement>('.h-dropdown-item__inner')!;

        expect(getStyleValues(mentionsItem, itemProperties)).toEqual(
          getStyleValues(dropdownItem, itemProperties),
        );
        expect(getStyleValues(mentionsInner, itemInnerProperties)).toEqual(
          getStyleValues(dropdownInner, itemInnerProperties),
        );
        expect(mentionsItem.getBoundingClientRect().height).toBeCloseTo(
          dropdownItem.getBoundingClientRect().height,
          1,
        );
      }

      const mentionsItems = mentions!.querySelectorAll<HTMLElement>('.h-dropdown-item');
      const dropdownItems = dropdown!.querySelectorAll<HTMLElement>('.h-dropdown-item');
      const mentionsRect = mentions!.getBoundingClientRect();
      const dropdownRect = dropdown!.getBoundingClientRect();
      expect(mentionsItems[0].getBoundingClientRect().top - mentionsRect.top).toBeCloseTo(
        dropdownItems[0].getBoundingClientRect().top - dropdownRect.top,
        1,
      );
      expect(mentionsRect.bottom - mentionsItems[1].getBoundingClientRect().bottom).toBeCloseTo(
        dropdownRect.bottom - dropdownItems[1].getBoundingClientRect().bottom,
        1,
      );
    }
  });
});
