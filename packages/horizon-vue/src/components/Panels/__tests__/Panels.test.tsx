import { mount } from '@vue/test-utils';
import { HPanels, HPanel } from '../index';
import { describe, test, expect } from 'vitest';
import { h, nextTick, ref } from 'vue';

describe('Panels', () => {
  test('should renders correct panel content', async () => {
    const modelValue = ref('p1');

    const wrapper = mount(() => (
      <HPanels modelValue={modelValue.value}>
        <HPanel name="p1">panel1</HPanel>
        <HPanel name="p2">panel2</HPanel>
        <HPanel name="p3">panel3</HPanel>
      </HPanels>
    ));
    expect(wrapper.text()).toMatchSnapshot();
    modelValue.value = 'p2';
    await nextTick();
    expect(wrapper.text()).toMatchSnapshot();
    modelValue.value = 'p3';
    await nextTick();
    expect(wrapper.text()).toMatchSnapshot();
  });

  test('should enabled animated or not', async () => {
    const modelValue = ref('p1');
    const animated = ref(true);

    const wrapper = mount(() => (
      <HPanels modelValue={modelValue.value} animated={animated.value}>
        <HPanel name="p1">panel1</HPanel>
        <HPanel name="p2">panel2</HPanel>
        <HPanel name="p3">panel3</HPanel>
      </HPanels>
    ));
    expect(wrapper.html()).toMatchSnapshot();
    modelValue.value = 'p1';
    animated.value = false;
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('uses vertical direction and excludes disabled panels from public output', async () => {
    const modelValue = ref('first');
    const wrapper = mount(() => (
      <HPanels modelValue={modelValue.value} animated vertical>
        <HPanel name="first">First panel</HPanel>
        <HPanel name="disabled" disabled>
          Disabled panel
        </HPanel>
        <HPanel name="last">Last panel</HPanel>
      </HPanels>
    ));

    expect(wrapper.get('[role="tabpanel"]').text()).toBe('First panel');
    modelValue.value = 'last';
    await nextTick();

    expect(wrapper.get('[role="tabpanel"]').text()).toBe('Last panel');
    expect(wrapper.findComponent({ name: 'HTransition' }).props('name')).toBe('slide-up');

    modelValue.value = 'disabled';
    await nextTick();
    expect(wrapper.get('[role="tabpanel"]').text()).toBe('');
  });

  test('Panels and Panel default slots render the selected public content', () => {
    const wrapper = mount(HPanels, {
      props: { modelValue: 'contract' },
      slots: {
        default: () =>
          h(
            HPanel,
            { name: 'contract' },
            {
              default: () => h('strong', { 'data-test': 'panel-default' }, 'Panel default slot'),
            },
          ),
      },
    });
    expect(wrapper.get('[data-test="panel-default"]').text()).toBe('Panel default slot');

    const standalone = mount(HPanel, {
      props: { name: 'standalone' },
      slots: { default: () => <span data-test="standalone-panel">Standalone</span> },
    });
    expect(standalone.get('[data-test="standalone-panel"]').text()).toBe('Standalone');
  });

  test('resolves reverse horizontal motion with shared enabled-panel order', async () => {
    const modelValue = ref('last');
    const wrapper = mount(() => (
      <HPanels modelValue={modelValue.value} animated>
        <HPanel name="first">First</HPanel>
        <HPanel name="disabled" disabled>
          Disabled
        </HPanel>
        <HPanel name="last">Last</HPanel>
      </HPanels>
    ));

    modelValue.value = 'first';
    await nextTick();

    expect(wrapper.findComponent({ name: 'HTransition' }).props('name')).toBe('slide-right');
  });

  test('keeps long content inside a 390px container', () => {
    const wrapper = mount(() => (
      <div style="width: 390px">
        <HPanels modelValue="long">
          <HPanel name="long">{'UnbrokenContent'.repeat(80)}</HPanel>
        </HPanels>
      </div>
    ));
    const root = wrapper.get('.h-panels').element as HTMLElement;

    expect(root.scrollWidth).toBeLessThanOrEqual(root.clientWidth);
  });

  test('renders a numeric zero panel key', () => {
    const wrapper = mount(() => (
      <HPanels modelValue={0}>
        <HPanel name={0}>Zero</HPanel>
        <HPanel name={1}>One</HPanel>
      </HPanels>
    ));

    expect(wrapper.get('[role="tabpanel"]').text()).toBe('Zero');
  });

  test('ignores slot children that are not public Panel components', () => {
    const wrapper = mount(() => (
      <HPanels modelValue="valid">
        <span>Missing props</span>
        <div data-test="native-child">Native child</div>
        <HPanel name="valid">Valid panel</HPanel>
      </HPanels>
    ));

    expect(wrapper.get('[role="tabpanel"]').text()).toBe('Valid panel');
    expect(wrapper.find('[data-test="native-child"]').exists()).toBe(false);
  });
});
