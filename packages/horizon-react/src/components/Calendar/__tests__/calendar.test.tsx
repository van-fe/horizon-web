import type { ReactElement } from 'react';
import { act, createElement as h, createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { CalendarHandle } from '..';
import { Calendar } from '..';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
const date = new Date(2026, 7, 19, 9);

async function render(element: ReactElement) {
  await act(async () => root.render(element));
}
async function click(element: Element) {
  await act(async () => element.dispatchEvent(new MouseEvent('click', { bubbles: true })));
}
async function key(element: Element, value: string) {
  await act(async () =>
    element.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: value })),
  );
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});

describe('React Calendar', () => {
  it('renders a native month grid and supports click and keyboard selection', async () => {
    const onValueChange = vi.fn();
    await render(h(Calendar, { defaultValue: date, pickable: true, onValueChange }));
    const grid = container.querySelector('[role="grid"]')!;
    expect(grid.classList.contains('h-calendar-month')).toBe(true);
    expect(grid.querySelectorAll('[role="gridcell"]')).toHaveLength(42);
    const cell = container.querySelector('[data-calendar-date="2026-08-20"]')!;
    await click(cell);
    expect(onValueChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ getDate: expect.any(Function) }),
      expect.objectContaining({ mode: 'month', reason: 'set-date' }),
    );
    await key(cell, 'Enter');
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('keeps controlled values authoritative across repeated proposals', async () => {
    const onValueChange = vi.fn();
    const controlled = h(Calendar, { value: date, pickable: true, onValueChange });
    await render(controlled);
    const cell = container.querySelector('[data-calendar-date="2026-08-20"]')!;
    await click(cell);
    await click(cell);
    expect(onValueChange).toHaveBeenCalledTimes(2);
    expect(
      container.querySelector('[aria-selected="true"]')?.getAttribute('data-calendar-date'),
    ).toBe('2026-08-19');
  });

  it('navigates and switches all four modes through the shared model', async () => {
    const calendar = createRef<CalendarHandle>();
    await render(
      h(Calendar, {
        defaultValue: date,
        defaultMode: 'month',
        modeSwitchable: true,
        modeSwitchableList: ['month', 'year', 'week', 'day'],
        ref: calendar,
      }),
    );
    await act(async () => calendar.current?.next());
    expect(container.querySelector('time')?.textContent).toBe('2026-09');
    for (const mode of ['year', 'week', 'day'] as const) {
      await act(async () => calendar.current?.setMode(mode));
      expect(container.querySelector(`.h-calendar-${mode}`)).not.toBeNull();
    }
    await act(async () => calendar.current?.previous());
    await act(async () => calendar.current?.today());
    expect(calendar.current?.element).toBe(container.firstElementChild);
  });

  it('renders disabled dates, custom cells and custom header regions', async () => {
    await render(
      h(Calendar, {
        defaultValue: date,
        disabledDate: value => value.getDate() === 20,
        pickable: true,
        renderDateCell: context => h('strong', null, `cell-${context.date.getDate()}`),
        renderHeader: () => h('span', null, 'Project calendar'),
      }),
    );
    const cell = container.querySelector('[data-calendar-date="2026-08-20"]')!;
    expect(cell.getAttribute('aria-disabled')).toBe('true');
    expect(cell.textContent).toBe('cell-20');
    expect(container.textContent).toContain('Project calendar');
  });

  it('renders year headers and switches dates from a mini month', async () => {
    const onValueChange = vi.fn();
    await render(
      h(Calendar, {
        defaultMode: 'year',
        defaultValue: date,
        modeSwitchableList: ['year'],
        pickable: true,
        onValueChange,
        renderMonthHeader: value => `M${value.getMonth() + 1}`,
      }),
    );
    expect(container.querySelectorAll('.h-calendar-year__month')).toHaveLength(12);
    expect(container.textContent).toContain('M12');
    await click(container.querySelector('.h-calendar-year__month--day:not([disabled])')!);
    expect(onValueChange).toHaveBeenCalledOnce();
  });

  it('renders clickable schedule flags and their time labels', async () => {
    const onPinFlagClick = vi.fn();
    const flag = {
      id: 'release',
      title: 'Release',
      startAt: new Date(2026, 7, 19, 10),
      endAt: new Date(2026, 7, 19, 11),
      clickable: true,
      showTime: true,
    };
    await render(h(Calendar, { defaultValue: date, pinFlags: [flag], onPinFlagClick }));
    const button = container.querySelector('[data-calendar-flag="release"]')!;
    expect(button.textContent).toContain('Release');
    expect(button.querySelector('time')).not.toBeNull();
    await click(button);
    expect(onPinFlagClick).toHaveBeenCalledWith(flag);
  });

  it('renders week and day timeline regions with accessible labels', async () => {
    const today = new Date();
    await render(
      h(Calendar, {
        defaultMode: 'week',
        defaultValue: today,
        modeSwitchableList: ['week'],
        renderWeekDayHeader: context => `week-${context.date.getDate()}`,
        renderTimezone: timezone => `zone-${timezone}`,
      }),
    );
    expect(container.querySelectorAll('[data-calendar-day]')).toHaveLength(7);
    expect(container.textContent).toContain(`week-${today.getDate()}`);
    expect(container.textContent).toContain('zone-');
    expect(container.querySelector('.h-calendar-week__body--current-time')).not.toBeNull();
  });

  it('scrolls the native timeline to the configured start hour', async () => {
    const scrollTo = vi.spyOn(HTMLElement.prototype, 'scrollTo');
    const scrollHeight = vi
      .spyOn(HTMLElement.prototype, 'scrollHeight', 'get')
      .mockReturnValue(1440);
    await render(
      h(Calendar, {
        defaultMode: 'day',
        defaultStartHour: 6,
        defaultValue: date,
        modeSwitchableList: ['day'],
      }),
    );
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: expect.any(Number) }));
    expect((scrollTo.mock.calls.at(-1)?.[0] as ScrollToOptions).top).toBeGreaterThan(0);
    scrollHeight.mockRestore();
    scrollTo.mockRestore();
  });

  it('lays overlapping day entries into lanes from the Core schedule', async () => {
    await render(
      h(Calendar, {
        defaultMode: 'day',
        defaultValue: date,
        modeSwitchableList: ['day'],
        pinFlags: [
          {
            id: 'first',
            title: 'First',
            startAt: new Date(2026, 7, 19, 10),
            endAt: new Date(2026, 7, 19, 12),
          },
          {
            id: 'second',
            title: 'Second',
            startAt: new Date(2026, 7, 19, 11),
            endAt: new Date(2026, 7, 19, 13),
          },
        ],
      }),
    );
    const first = container.querySelector<HTMLElement>('[data-calendar-flag="first"]')!;
    const second = container.querySelector<HTMLElement>('[data-calendar-flag="second"]')!;
    expect(first.style.left).toBe('0%');
    expect(second.style.left).toBe('50%');
    expect(first.style.width).toBe('50%');
    expect(second.style.width).toBe('50%');
  });

  it('renders disabled hours and stops created ranges before them', async () => {
    const onCreatePinFlag = vi.fn(async flag => flag);
    await render(
      h(Calendar, {
        createFlagCanThroughDisabledRange: false,
        defaultMode: 'day',
        defaultValue: date,
        disabledHours: value => [
          [
            new Date(value.getFullYear(), value.getMonth(), value.getDate(), 11),
            new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12),
          ],
        ],
        enableCreatePinFlags: true,
        modeSwitchableList: ['day'],
        onCreatePinFlag,
      }),
    );
    expect(container.querySelector('[aria-label="Unavailable time"]')).not.toBeNull();
    const column = container.querySelector<HTMLElement>('[data-calendar-day]')!;
    column.getBoundingClientRect = () =>
      ({ top: 0, left: 0, right: 100, bottom: 1440, width: 100, height: 1440 }) as DOMRect;
    const textTarget = document.createTextNode('timeline');
    column.append(textTarget);
    textTarget.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        isPrimary: true,
        pointerId: 10,
      }),
    );
    expect(onCreatePinFlag).not.toHaveBeenCalled();
    await act(async () => {
      column.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          button: 0,
          clientY: 600,
          isPrimary: true,
          pointerId: 21,
        }),
      );
      document.dispatchEvent(
        new PointerEvent('pointerup', {
          bubbles: true,
          clientY: 840,
          isPrimary: true,
          pointerId: 21,
        }),
      );
      await Promise.resolve();
    });
    expect(onCreatePinFlag).toHaveBeenCalledOnce();
    const created = onCreatePinFlag.mock.calls[0][0];
    expect(new Date(created.startAt).getHours()).toBe(10);
    expect(new Date(created.endAt).getHours()).toBe(11);
  });

  it('rejects blocked creation starts and stale ranges without committing a flag', async () => {
    const onCreatePinFlag = vi.fn();
    const blocked = (value: Date) => [
      [
        new Date(value.getFullYear(), value.getMonth(), value.getDate(), 9),
        new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12),
      ] as const,
      [
        new Date(value.getFullYear(), value.getMonth(), value.getDate() + 1, 9),
        new Date(value.getFullYear(), value.getMonth(), value.getDate() + 1, 12),
      ] as const,
    ];
    await render(
      h(Calendar, {
        defaultMode: 'day',
        defaultValue: date,
        disabledHours: blocked,
        enableCreatePinFlags: true,
        modeSwitchableList: ['day'],
        onCreatePinFlag,
      }),
    );
    expect(container.querySelectorAll('[aria-label="Unavailable time"]')).toHaveLength(1);
    const column = container.querySelector<HTMLElement>('[data-calendar-day]')!;
    column.getBoundingClientRect = () =>
      ({ top: 0, left: 0, right: 100, bottom: 1440, width: 100, height: 1440 }) as DOMRect;
    await act(async () => {
      column.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          button: 0,
          clientY: 630,
          isPrimary: true,
          pointerId: 22,
        }),
      );
      document.dispatchEvent(
        new PointerEvent('pointerup', {
          bubbles: true,
          clientY: 660,
          isPrimary: true,
          pointerId: 22,
        }),
      );
    });
    expect(onCreatePinFlag).not.toHaveBeenCalled();

    let blockSelection = false;
    await render(
      h(Calendar, {
        defaultMode: 'day',
        defaultValue: date,
        disabledHours: value => (blockSelection ? blocked(value) : []),
        enableCreatePinFlags: true,
        modeSwitchableList: ['day'],
        onCreatePinFlag,
      }),
    );
    const changingColumn = container.querySelector<HTMLElement>('[data-calendar-day]')!;
    changingColumn.getBoundingClientRect = column.getBoundingClientRect;
    await act(async () => {
      changingColumn.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          button: 0,
          clientY: 600,
          isPrimary: true,
          pointerId: 23,
        }),
      );
      blockSelection = true;
      document.dispatchEvent(
        new PointerEvent('pointerup', {
          bubbles: true,
          clientY: 630,
          isPrimary: true,
          pointerId: 23,
        }),
      );
    });
    expect(onCreatePinFlag).not.toHaveBeenCalled();
  });

  it('creates a schedule through the shared desktop pointer hook', async () => {
    const onPinFlagsChange = vi.fn();
    const onCreatePinFlag = vi.fn(async flag => ({ ...flag, title: 'Created' }));
    await render(
      h(Calendar, {
        defaultMode: 'day',
        defaultValue: date,
        modeSwitchableList: ['day'],
        enableCreatePinFlags: true,
        onCreatePinFlag,
        onPinFlagsChange,
      }),
    );
    const column = container.querySelector<HTMLElement>('[data-calendar-day]')!;
    column.getBoundingClientRect = () =>
      ({ top: 0, left: 0, right: 100, bottom: 1440, width: 100, height: 1440 }) as DOMRect;
    await act(async () => {
      column.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          button: 0,
          isPrimary: true,
          pointerId: 9,
          clientY: 60,
        }),
      );
      document.dispatchEvent(
        new PointerEvent('pointerup', {
          bubbles: true,
          button: 0,
          isPrimary: true,
          pointerId: 9,
          clientY: 120,
        }),
      );
      await Promise.resolve();
    });
    expect(onCreatePinFlag).toHaveBeenCalledOnce();
    expect(onPinFlagsChange).toHaveBeenCalledWith([expect.objectContaining({ title: 'Created' })]);
  });

  it('keeps non-pickable and disabled cells inert while accepting Space', async () => {
    const onValueChange = vi.fn();
    await render(h(Calendar, { defaultValue: date, onValueChange }));
    const target = container.querySelector('[data-calendar-date="2026-08-20"]')!;
    await click(target);
    await key(target, 'Escape');
    expect(onValueChange).not.toHaveBeenCalled();
    await render(
      h(Calendar, {
        defaultValue: date,
        pickable: true,
        disabledDate: value => value.getDate() === 20,
        onValueChange,
      }),
    );
    await click(container.querySelector('[data-calendar-date="2026-08-20"]')!);
    expect(onValueChange).not.toHaveBeenCalled();
    await key(container.querySelector('[data-calendar-date="2026-08-21"]')!, ' ');
    expect(onValueChange).toHaveBeenCalledOnce();
  });

  it('uses provider defaults, native attributes and the mode select', async () => {
    await render(
      h(Calendar, {
        autoFit: true,
        className: 'project-calendar',
        'data-test': 'calendar',
        defaultValue: date,
        modeSwitchable: true,
        modeSwitchableList: ['month', 'day'],
      }),
    );
    const calendar = container.querySelector<HTMLElement>('[data-test="calendar"]')!;
    expect(calendar.className).toContain('is-auto-fit');
    expect(calendar.className).toContain('project-calendar');
    expect(calendar.getAttribute('aria-label')).toBe('Calendar');
    const select = calendar.querySelector('select')!;
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')!.set!.call(
        select,
        'day',
      );
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(container.querySelector('.h-calendar-day')).not.toBeNull();
  });

  it('runs native header navigation and every imperative date command', async () => {
    const calendar = createRef<CalendarHandle>();
    await render(h(Calendar, { defaultValue: date, ref: calendar }));
    await click(container.querySelector('[aria-label="Previous"]')!);
    expect(container.querySelector('time')?.textContent).toBe('2026-07');
    await click(container.querySelector('[aria-label="Next"]')!);
    expect(container.querySelector('time')?.textContent).toBe('2026-08');
    await act(async () => calendar.current?.setDate(new Date(2025, 0, 2)));
    expect(container.querySelector('time')?.textContent).toBe('2025-01');
    await click(container.querySelector('.h-calendar__header--today')!);
    expect(container.querySelector('time')?.textContent).toBe('2026-08');
  });

  it('supports 24-hour day content without a current-time marker', async () => {
    await render(
      h(Calendar, {
        currentTimeLine: false,
        defaultMode: 'day',
        defaultValue: date,
        hourFormat: '24',
        modeSwitchableList: ['day'],
        renderDayHeader: context => `day-${context.value}`,
      }),
    );
    expect(container.textContent).toContain('day-2026-08-19');
    expect(container.textContent).toContain('23:00');
    expect(container.querySelector('.h-calendar-day__body--current-time-line')).toBeNull();
  });

  it('renders fallback flag identity, duration, type and tooltip branches', async () => {
    await render(
      h(Calendar, {
        defaultValue: date,
        pinFlagsShowTime: true,
        pinFlags: [
          { title: 'Untyped', startAt: new Date(2026, 7, 19, 12), tooltip: true },
          {
            id: 'warning',
            title: 'Warning',
            type: 'warning',
            startAt: new Date(2026, 7, 19, 13),
            tooltip: 'Details',
          },
        ],
      }),
    );
    const flags = container.querySelectorAll('.h-calendar-month__flag');
    expect(flags).toHaveLength(2);
    expect(flags[0].className).toContain('--default');
    expect(flags[0].querySelector('time')).not.toBeNull();
    expect(flags[1].getAttribute('title')).toBe('Details');
  });

  it('handles pointer movement, cancellation and rejected creation', async () => {
    const onCreatePinFlag = vi.fn(async () => false);
    await render(
      h(Calendar, {
        defaultMode: 'day',
        defaultValue: date,
        enableCreatePinFlags: true,
        modeSwitchableList: ['day'],
        onCreatePinFlag,
      }),
    );
    const column = container.querySelector<HTMLElement>('[data-calendar-day]')!;
    column.getBoundingClientRect = () =>
      ({ top: 0, left: 0, right: 100, bottom: 1440, width: 100, height: 1440 }) as DOMRect;
    await act(async () => {
      column.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          button: 0,
          isPrimary: true,
          pointerId: 11,
          clientY: 60,
        }),
      );
      document.dispatchEvent(
        new PointerEvent('pointermove', {
          bubbles: true,
          isPrimary: true,
          pointerId: 11,
          clientY: 180,
        }),
      );
      document.dispatchEvent(
        new PointerEvent('pointerup', {
          bubbles: true,
          isPrimary: true,
          pointerId: 11,
          clientY: 180,
        }),
      );
      await Promise.resolve();
    });
    expect(onCreatePinFlag).toHaveBeenCalledOnce();
    await act(async () => {
      column.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          button: 0,
          isPrimary: true,
          pointerId: 12,
          clientY: 60,
        }),
      );
      document.dispatchEvent(
        new PointerEvent('pointercancel', {
          bubbles: true,
          isPrimary: true,
          pointerId: 12,
        }),
      );
    });
    expect(onCreatePinFlag).toHaveBeenCalledOnce();

    const onPinFlagsChange = vi.fn();
    await render(
      h(Calendar, {
        defaultMode: 'day',
        defaultValue: date,
        enableCreatePinFlags: true,
        modeSwitchableList: ['day'],
        onPinFlagsChange,
      }),
    );
    const nextColumn = container.querySelector<HTMLElement>('[data-calendar-day]')!;
    nextColumn.getBoundingClientRect = column.getBoundingClientRect;
    await act(async () => {
      nextColumn.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          button: 0,
          isPrimary: true,
          pointerId: 13,
          clientY: 60,
        }),
      );
      document.dispatchEvent(
        new PointerEvent('pointerup', {
          bubbles: true,
          isPrimary: true,
          pointerId: 13,
          clientY: 60,
        }),
      );
      await Promise.resolve();
    });
    expect(onPinFlagsChange).toHaveBeenCalledOnce();
  });
});
