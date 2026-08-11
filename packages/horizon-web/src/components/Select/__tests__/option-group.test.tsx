import { mount } from '@vue/test-utils';
import HSelect from '../src/Select';
import HOption from '../src/Option';
import { describe, expect, test, vi } from 'vitest';
import { HOptionGroup } from '../index';
import { sleep } from '~/utils/tools';
import type { OptionGroupProps, OptionProps } from '~/components/Select/src/composables/useProps';
import { computed, defineComponent, inject, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  HSelectAddOptionInjectKey,
  HSelectRemoveOptionInjectKey,
  HSelectVisibleOptionsInjectKey,
  type SelectCollectedOptionData,
} from '../src/utils/injectKeys';

const ProbeOption = defineComponent({
  props: { value: { type: String, required: true } },
  setup(props) {
    const addOption = inject(HSelectAddOptionInjectKey);
    const removeOption = inject(HSelectRemoveOptionInjectKey);
    const data = {
      type: 'option',
      props: { value: props.value, label: props.value },
      slots: {},
      attrs: {},
      el: ref<HTMLElement | null>(null),
      active: computed(() => false),
      disabled: computed(() => false),
      children: null,
    } as SelectCollectedOptionData<'option'>;

    onMounted(() => addOption?.(data));
    onBeforeUnmount(() => removeOption?.(props.value));
    return () => <div data-probe={props.value} />;
  },
});

describe('OptionGroup.tsx', () => {
  test('enable filterable and the group which not includes visible options will disappear', async () => {
    const wrapper = mount(
      () => (
        <HSelect filterable={true} toBody={false}>
          <HOptionGroup>
            <HOption value={1} label={1} />
            <HOption value={2} label={2} />
          </HOptionGroup>
          <HOptionGroup>
            <HOption value={3} label={3} />
            <HOption value={4} label={4} />
          </HOptionGroup>
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(HSelect).trigger('click');

    const input = wrapper.find('input');

    await input.setValue('1');

    await sleep(200);

    const [g1, g2] = wrapper.findAllComponents(HOptionGroup);

    expect(g1.isVisible()).toBeTruthy();
    expect(g2.isVisible()).toBeFalsy();
  });

  test('dynamic add option to group should render correctly', async () => {
    const group = ref<
      Array<Partial<OptionGroupProps> & { children: Pick<OptionProps, 'label' | 'value'>[] }>
    >([
      {
        label: '1',
        children: [
          { value: '1-1', label: '1-1' },
          { value: '1-2', label: '1-2' },
          { value: '1-3', label: '1-3' },
          { value: '1-4', label: '1-4' },
          { value: '1-5', label: '1-5' },
        ],
      },
      {
        label: '2',
        children: [
          { value: '2-1', label: '2-1' },
          { value: '2-2', label: '2-2' },
          { value: '2-3', label: '2-3' },
          { value: '2-4', label: '2-4' },
          { value: '2-5', label: '2-5' },
        ],
      },
    ]);

    const wrapper = mount(
      () => (
        <HSelect filterable={true} toBody={false}>
          {group.value.map(item => (
            <HOptionGroup label={item.label}>
              {item.children.map(option => (
                <HOption label={option.label} value={option.value} />
              ))}
            </HOptionGroup>
          ))}
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.findAllComponents(HOption).length).toBe(10);

    group.value[0].children.push({
      value: '1-6',
      label: '1-6',
    });

    await nextTick();

    expect(wrapper.findAllComponents(HOption).length).toBe(11);

    group.value[1].children.splice(0, 1);

    await nextTick();

    expect(wrapper.findAllComponents(HOption).length).toBe(10);
  });

  test('renders titled and untitled group recipes and inherits disabled state', async () => {
    const wrapper = mount(() => (
      <HSelect toBody={false}>
        <HOptionGroup label="Disabled group" disabled>
          <HOption value="disabled" label="Disabled option" />
        </HOptionGroup>
        <HOptionGroup>
          <HOption value="plain" label="Plain option" />
        </HOptionGroup>
      </HSelect>
    ));
    await wrapper.findComponent(HSelect).trigger('click');
    const groups = wrapper.findAllComponents(HOptionGroup);

    expect(groups[0].classes()).toContain('has-title');
    expect(groups[0].get('.h-select-option-group__title').text()).toBe('Disabled group');
    expect(groups[0].get('.h-select-option').classes()).toContain('is-disabled');
    expect(groups[1].find('.h-select-option-group__title').exists()).toBe(false);
    expect(groups[1].find('.h-select-option-group__divider').exists()).toBe(true);
  });

  test('forwards options added and removed after mount and unregisters the group', async () => {
    const showProbe = ref(false);
    const addOption = vi.fn();
    const removeOption = vi.fn();
    const visibleOptions = ref([
      { props: { value: 'late' } } as SelectCollectedOptionData<'option'>,
    ]);
    const wrapper = mount(
      () => (
        <HOptionGroup label="Lifecycle group" disabled data-group="forwarded">
          {showProbe.value && <ProbeOption value="late" />}
        </HOptionGroup>
      ),
      {
        global: {
          provide: {
            [HSelectAddOptionInjectKey as symbol]: addOption,
            [HSelectRemoveOptionInjectKey as symbol]: removeOption,
            [HSelectVisibleOptionsInjectKey as symbol]: visibleOptions,
          },
        },
      },
    );
    await nextTick();

    const group = addOption.mock.calls[0][0] as SelectCollectedOptionData<'option-group'>;
    expect(group.type).toBe('option-group');
    expect(group.attrs).toMatchObject({ 'data-group': 'forwarded' });
    expect(group.active.value).toBe(false);
    expect(group.disabled.value).toBe(true);

    showProbe.value = true;
    await nextTick();
    expect(addOption).toHaveBeenCalledTimes(2);
    expect(addOption.mock.calls[1][0]).toMatchObject({ type: 'option', props: { value: 'late' } });
    expect(wrapper.find('[data-probe="late"]').exists()).toBe(true);

    showProbe.value = false;
    await nextTick();
    expect(removeOption).toHaveBeenCalledWith('late');

    wrapper.unmount();
    expect(removeOption).toHaveBeenCalledTimes(2);
    expect(removeOption.mock.calls[1][0]).not.toBe('late');
  });
});
