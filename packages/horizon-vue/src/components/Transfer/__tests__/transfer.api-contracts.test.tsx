import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HTransfer from '..';
import { useTransferEmits } from '../src/composables/useEmits';
import type { TransferDataProps } from '../src/composables/useProps';
import type { CheckboxUnionType } from '../src/composables/useProps';
import TransferPanel from '../src/TransferPanel';

type FooterScope = { filterData: TransferDataProps[]; type: string };
type ItemScope = { item?: TransferDataProps; type: string };
type BodyScope = { data: TransferDataProps[] };

async function settle() {
  await nextTick();
  await nextTick();
}

const data: TransferDataProps[] = [
  { key: 1, label: 'Alpha' },
  { key: 2, label: 'Beta' },
  { key: 3, label: 'Gamma' },
];

describe('Transfer public API contracts', () => {
  test('emits search, transfer directions, checked arrays, model values, and native blur payloads', async () => {
    const model = ref<Array<number>>([]);
    const listeners = {
      update: vi.fn((value: CheckboxUnionType | CheckboxUnionType[]) => {
        model.value = (Array.isArray(value) ? value : [value]) as number[];
      }),
      change: vi.fn(),
      left: vi.fn(),
      right: vi.fn(),
      search: vi.fn(),
      blur: vi.fn(),
    };
    const wrapper = mount(() => (
      <HTransfer
        data={data}
        modelValue={model.value}
        filterable
        onUpdate:modelValue={listeners.update}
        onChange={listeners.change}
        onLeftCheckChange={listeners.left}
        onRightCheckChange={listeners.right}
        onSearch={listeners.search}
        onBlur={listeners.blur}
      />
    ));
    await settle();

    await wrapper.get('.h-transfer--left .h-input__inner').setValue('alp');
    await settle();
    expect(listeners.search).toHaveBeenLastCalledWith('alp');

    await wrapper
      .get<HTMLInputElement>('.h-transfer--left .h-transfer-panel__item input[type="checkbox"]')
      .setValue(true);
    await settle();
    expect(model.value).toEqual([1]);
    expect(listeners.update).toHaveBeenLastCalledWith([1]);
    expect(listeners.change).toHaveBeenLastCalledWith([1], 'right', [1]);
    expect(listeners.left).toHaveBeenLastCalledWith([1]);

    await wrapper.get('.h-transfer--right .h-transfer-panel__item--right .ml-3').trigger('click');
    await settle();
    expect(model.value).toEqual([]);
    expect(listeners.change).toHaveBeenLastCalledWith([], 'left', [1]);
    expect(listeners.right).toHaveBeenLastCalledWith([]);

    const focus = new FocusEvent('blur', { bubbles: true });
    wrapper.get('.h-transfer').element.dispatchEvent(focus);
    expect(listeners.blur).toHaveBeenLastCalledWith(focus);
  });

  test('renders targetOrder variants and custom field maps/filter methods', async () => {
    const renderOrder = async (targetOrder: 'push' | 'unshift' | 'original') => {
      const wrapper = mount(() => (
        <HTransfer data={data} modelValue={[3, 1, 2]} targetOrder={targetOrder} />
      ));
      await settle();
      const labels = wrapper
        .findAll('.h-transfer--right .h-transfer-panel__item-label')
        .map(item => item.text());
      wrapper.unmount();
      return labels;
    };
    await expect(renderOrder('push')).resolves.toEqual(['Gamma', 'Alpha', 'Beta']);
    await expect(renderOrder('original')).resolves.toEqual(['Alpha', 'Beta', 'Gamma']);
    await expect(renderOrder('unshift')).resolves.toEqual(['Beta', 'Alpha', 'Gamma']);

    const filterMethod = vi.fn((value: string, item: Record<string, unknown>) =>
      String(item.text).startsWith(value),
    );
    const mapped = mount(HTransfer, {
      props: {
        data: [
          { code: 10, text: 'North' },
          { code: 20, text: 'South' },
        ] as unknown as TransferDataProps[],
        fieldMap: { key: 'code', label: 'text' },
        filterable: true,
        filterMethod,
      },
      slots: {
        leftBody: (scope?: BodyScope) => (
          <div class="mapped-left-body">
            {scope?.data.map(item => (item as unknown as { text: string }).text).join(',')}
          </div>
        ),
      },
    });
    await settle();
    await mapped.get('.h-transfer--left .h-input__inner').setValue('N');
    await settle();
    expect(filterMethod).toHaveBeenCalledWith('N', expect.objectContaining({ text: 'North' }));
    expect(mapped.get('.mapped-left-body').text()).toBe('North');
  });

  test('renders every declared slot and exposes scoped footer/body/item values', async () => {
    const wrapper = mount(HTransfer, {
      props: { data, modelValue: [2] },
      slots: {
        leftHeader: () => <div class="left-header">LH</div>,
        rightHeader: () => <div class="right-header">RH</div>,
        leftFilter: () => <div class="left-filter">LF</div>,
        control: () => <div class="control">CTRL</div>,
        leftFooter: (scope?: FooterScope) =>
          <div class="left-footer">{scope?.type}:{scope?.filterData.length}</div>,
        rightFooter: (scope?: FooterScope) =>
          <div class="right-footer">{scope?.type}:{scope?.filterData.length}</div>,
        item: (scope?: ItemScope) =>
          <span class="custom-item">{scope?.type}:{scope?.item?.label}</span>,
      },
    });
    await settle();
    expect(wrapper.get('.left-header').text()).toBe('LH');
    expect(wrapper.get('.right-header').text()).toBe('RH');
    expect(wrapper.get('.left-filter').text()).toBe('LF');
    expect(wrapper.get('.control').text()).toBe('CTRL');
    expect(wrapper.get('.left-footer').text()).toBe('left:3');
    expect(wrapper.get('.right-footer').text()).toBe('right:1');
    expect(wrapper.findAll('.custom-item').map(node => node.text())).toEqual(
      expect.arrayContaining(['left:Alpha', 'left:Beta', 'left:Gamma', 'right:Beta']),
    );
    wrapper.unmount();

    const bodies = mount(HTransfer, {
      props: { data, modelValue: [2] },
      slots: {
        leftBody: (scope?: BodyScope) =>
          <div class="left-body">
            {scope?.data.map((item: TransferDataProps) => item.label).join(',')}
          </div>,
        rightBody: (scope?: BodyScope) =>
          <div class="right-body">
            {scope?.data.map((item: TransferDataProps) => item.label).join(',')}
          </div>,
      },
    });
    await settle();
    expect(bodies.get('.left-body').text()).toBe('Alpha,Beta,Gamma');
    expect(bodies.get('.right-body').text()).toBe('Beta');
  });

  test('renders both empty slots and validates all public emit payload shapes', async () => {
    const wrapper = mount(HTransfer, {
      props: { data: [], emptyTxt: ['Left fallback', 'Right fallback'] },
      slots: {
        leftEmpty: () => <div class="left-empty">LE</div>,
        rightEmpty: () => <div class="right-empty">RE</div>,
      },
    });
    await settle();
    expect(wrapper.get('.left-empty').text()).toBe('LE');
    expect(wrapper.get('.right-empty').text()).toBe('RE');

    expect(useTransferEmits['update:modelValue']([1, 2])).toEqual([1, 2]);
    expect(useTransferEmits.blur(new FocusEvent('blur'))).toBe(true);
    expect(useTransferEmits.blur(new Event('blur') as FocusEvent)).toBe(false);
    expect(useTransferEmits.change([1], 'right', [1])).toBe(true);
    expect(useTransferEmits.leftCheckChange([1])).toEqual([1]);
    expect(useTransferEmits.rightCheckChange([1])).toEqual([1]);
    expect(useTransferEmits.search('query')).toBe('query');
  });

  test('renders Panel breadcrumb slots and emits expand/root-collapse/remove payloads', async () => {
    const nested: TransferDataProps = {
      key: 10,
      label: 'Parent',
      children: [{ key: 11, label: 'Child' }],
    };
    const onExpand = vi.fn();
    const left = mount(TransferPanel, {
      props: {
        data: [nested],
        type: 'left',
        props: { key: 'key', label: 'label', disabled: 'disabled', children: 'children' },
        breadcrumb: 'All nodes',
        onExpand,
      },
      slots: {
        breadcrumb: () => <strong data-test="breadcrumb">Custom root</strong>,
        breadcrumbItem: () => <em data-test="breadcrumb-item">Custom item</em>,
      },
      attachTo: document.body,
    });
    await settle();
    await left.get('.h-transfer-panel__item button').trigger('click');
    await settle();
    expect(left.get('[data-test="breadcrumb"]').text()).toBe('Custom root');
    expect(left.get('[data-test="breadcrumb-item"]').text()).toBe('Custom item');
    expect(onExpand).toHaveBeenCalledWith(false, nested);

    await left.get('[data-test="breadcrumb-item"]').trigger('click');
    expect(onExpand).toHaveBeenLastCalledWith(false, nested);
    await left.get('[data-test="breadcrumb"]').trigger('click');
    expect(onExpand).toHaveBeenLastCalledWith(true);
    left.unmount();

    const onRemove = vi.fn();
    const right = mount(TransferPanel, {
      props: {
        data: [data[0]],
        type: 'right',
        props: { key: 'key', label: 'label', disabled: 'disabled', children: 'children' },
        onRemove,
      },
      attachTo: document.body,
    });
    await settle();
    await right.get('.h-transfer-panel__item--right .ml-3').trigger('click');
    expect(onRemove).toHaveBeenCalledWith([1]);
    right.unmount();
  });

  test('calls every drag prop with real DragEvent payloads and performs a drop', async () => {
    const onDragStart = vi.fn();
    const onDragOver = vi.fn();
    const onDragLeave = vi.fn();
    const onDragEnd = vi.fn();
    const onDrop = vi.fn();
    const rect = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        const rows = [
          ...(this.closest('.h-transfer-panel')?.querySelectorAll(
            '.h-transfer-panel__item--right',
          ) ?? []),
        ];
        return new DOMRect(0, Math.max(0, rows.indexOf(this)) * 38, 100, 38);
      });
    const wrapper = mount(HTransfer, {
      props: {
        data,
        modelValue: [1, 2, 3],
        draggable: true,
        onDragStart,
        onDragOver,
        onDragLeave,
        onDragEnd,
        onDrop,
      },
      attachTo: document.body,
    });
    await settle();
    const rows = wrapper.findAll('.h-transfer--right .h-transfer-panel__item--right');
    const source = rows[0];
    const target = rows[2];

    const start = new DragEvent('dragstart', { bubbles: true, cancelable: true });
    source.element.dispatchEvent(start);
    const over = new DragEvent('dragover', {
      bubbles: true,
      cancelable: true,
      clientY: 110,
    });
    target.element.dispatchEvent(over);
    const leave = new DragEvent('dragleave', { bubbles: true, cancelable: true });
    target.element.dispatchEvent(leave);
    target.element.dispatchEvent(
      new DragEvent('dragover', { bubbles: true, cancelable: true, clientY: 110 }),
    );
    const drop = new DragEvent('drop', { bubbles: true, cancelable: true, clientY: 110 });
    target.element.dispatchEvent(drop);
    const end = new DragEvent('dragend', { bubbles: true, cancelable: true });
    source.element.dispatchEvent(end);
    await settle();

    expect(onDragStart).toHaveBeenCalledWith(
      start,
      expect.objectContaining({ key: 1, label: 'Alpha' }),
    );
    expect(onDragOver).toHaveBeenCalledWith(
      over,
      expect.objectContaining({ key: 3, label: 'Gamma' }),
    );
    expect(onDragLeave).toHaveBeenCalledWith(
      leave,
      expect.objectContaining({ key: 3, label: 'Gamma' }),
    );
    expect(onDragEnd).toHaveBeenCalledWith(
      end,
      expect.objectContaining({ key: 1, label: 'Alpha' }),
    );
    expect(onDrop).toHaveBeenCalledWith(
      drop,
      expect.objectContaining({ key: 3, label: 'Gamma' }),
      expect.objectContaining({ key: 1, label: 'Alpha' }),
    );
    rect.mockRestore();
    wrapper.unmount();
  });
});
