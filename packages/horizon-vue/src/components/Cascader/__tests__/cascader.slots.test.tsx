import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import HCascader from '../src/Cascader';
import HPicker from '../../Picker/src/Picker';
import type {
  HCascaderExtendOption,
  HCascaderFilterPathData,
  HCascaderOption,
} from '../src/utils/types';
import { openCascader } from './cascader-helper';
import { sleep } from '~/utils/tools';

const slotOptions: HCascaderOption[] = [
  {
    value: 'root',
    label: 'Root',
    children: [{ value: 'leaf', label: 'Leaf', isLeaf: true }],
  },
];

describe('Cascader public slots', () => {
  test('renders the custom outer trigger with its reactive visible scope', async () => {
    let visibleScope: { value: boolean } | undefined;
    const wrapper = mount(HCascader, {
      props: { options: slotOptions, toBody: false },
      slots: {
        default: (scope?: { visible: { value: boolean } }) => {
          const visible = scope?.visible ?? ref(false);
          visibleScope = visible;
          return <button class="outer-trigger">{visible.value ? 'Opened' : 'Closed'}</button>;
        },
      },
      attachTo: document.body,
    });

    expect(wrapper.get('.outer-trigger').text()).toBe('Closed');
    expect(visibleScope?.value).toBe(false);
    wrapper.findComponent(HPicker).vm.$emit('show');
    await nextTick();
    expect(visibleScope?.value).toBe(true);
    expect(wrapper.get('.outer-trigger').text()).toBe('Opened');
    wrapper.findComponent(HPicker).vm.$emit('hide');
    await nextTick();
    expect(visibleScope?.value).toBe(false);
  });

  test('renders select, item, header, footer and confirmation slots with live handlers', async () => {
    const confirm = vi.fn();
    const cancel = vi.fn();
    let itemScope: HCascaderExtendOption | undefined;
    let confirmHandlers:
      | { confirmHandle: () => void; cancelHandle: () => void }
      | undefined;
    const wrapper = mount(HCascader, {
      props: {
        options: slotOptions,
        toBody: false,
        needConfirm: true,
        onConfirm: confirm,
        onCancel: cancel,
      },
      slots: {
        selectRender: () => <span class="select-slot">Select a leaf</span>,
        itemRender: (option?: HCascaderExtendOption) => {
          itemScope = option;
          return <span class="item-slot">Item: {option?.label}</span>;
        },
        panelHeaderRender: () => <div class="panel-header-slot">Header</div>,
        panelFooterRender: () => <div class="panel-footer-slot">Footer</div>,
        confirmRender: (scope?: {
          confirmHandle: () => void;
          cancelHandle: () => void;
        }) => {
          const handlers = scope ?? { confirmHandle: vi.fn(), cancelHandle: vi.fn() };
          confirmHandlers = handlers;
          return (
            <div class="confirm-slot">
              <button class="slot-cancel" onClick={handlers.cancelHandle}>Cancel slot</button>
              <button class="slot-confirm" onClick={handlers.confirmHandle}>Confirm slot</button>
            </div>
          );
        },
      },
      attachTo: document.body,
    });

    expect(wrapper.get('.select-slot').text()).toBe('Select a leaf');
    await openCascader(wrapper, 'click', 0);
    expect(wrapper.get('.panel-header-slot').text()).toBe('Header');
    expect(wrapper.get('.panel-footer-slot').text()).toBe('Footer');
    expect(wrapper.get('.item-slot').text()).toContain('Root');
    expect(itemScope).toEqual(expect.objectContaining({ value: 'root', label: 'Root' }));
    expect(confirmHandlers).toEqual(expect.objectContaining({
      confirmHandle: expect.any(Function),
      cancelHandle: expect.any(Function),
    }));
    await wrapper.get('.slot-cancel').trigger('click');
    expect(cancel).toHaveBeenCalled();
  });

  test('renders the confirmation-left slot in the default action row', async () => {
    const wrapper = mount(HCascader, {
      props: { options: slotOptions, toBody: false, needConfirm: true },
      slots: { panelConfirmLeft: () => <div class="confirm-left-slot">Hint</div> },
      attachTo: document.body,
    });
    await openCascader(wrapper, 'click', 0);
    expect(wrapper.get('.confirm-left-slot').text()).toBe('Hint');
  });

  test('renders the selected tag slot with its documented scope', () => {
    let tagScope: HCascaderExtendOption | undefined;
    const wrapper = mount(HCascader, {
      props: {
        options: slotOptions,
        modelValue: ['root', 'leaf'],
        toBody: false,
      },
      slots: {
        tagRender: (option?: HCascaderExtendOption) => {
          tagScope = option;
          return <span class="tag-slot">Selected: {option?.label}</span>;
        },
      },
      attachTo: document.body,
    });

    expect(wrapper.get('.tag-slot').text()).toContain('Root / Leaf');
    expect(tagScope).toEqual(expect.objectContaining({ value: 'leaf', fullPathLabel: 'Root / Leaf' }));
  });

  test('renders the search-result slot with paths and current input', async () => {
    let searchScope: { paths: HCascaderFilterPathData[]; inputValue: string } | undefined;
    const wrapper = mount(HCascader, {
      props: {
        options: slotOptions,
        toBody: false,
        filterable: true,
        multiple: true,
        inputEmitFrequency: 0,
      },
      slots: {
        searchPanelRender: (value?: {
          paths: HCascaderFilterPathData[];
          inputValue: string;
        }) => {
          const scope = value ?? { paths: [], inputValue: '' };
          searchScope = scope;
          return <div class="search-slot">Search: {scope.inputValue}</div>;
        },
      },
      attachTo: document.body,
    });

    const input = wrapper.get('input.h-picker__input--inner');
    await input.setValue('Leaf');
    await sleep(200);
    await nextTick();
    expect(wrapper.get('.search-slot').text()).toBe('Search: Leaf');
    expect(searchScope?.inputValue).toBe('Leaf');
    expect(searchScope?.paths.length).toBeGreaterThan(0);
  });

  test('renders the empty slot for an empty option source', async () => {
    const wrapper = mount(HCascader, {
      props: { options: [], toBody: false, emptyText: 'No records' },
      slots: { empty: () => <div class="empty-slot">Nothing available</div> },
      attachTo: document.body,
    });
    await openCascader(wrapper, 'click', 0);
    expect(wrapper.get('.empty-slot').text()).toBe('Nothing available');
  });
});
