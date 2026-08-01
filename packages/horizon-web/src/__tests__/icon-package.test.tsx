import { createSSRApp, defineComponent, h, nextTick, ref } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { mount } from '@vue/test-utils';
import { AIcon, IconAdd, IconLoadingLine } from '@aurora/icon';
import HTab from '../components/Tabs/src/Tab';
import HTabs from '../components/Tabs/src/Tabs';

describe('@aurora/icon integration', () => {
  it('renders AIcon content synchronously on the client and server', async () => {
    const wrapper = mount(AIcon, {
      props: {
        name: 'add',
        size: 20,
      },
    });

    expect(wrapper.find('path').exists()).toBe(true);
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['a-icon', 'h-icon_add', 'h-icon__add']),
    );
    expect(wrapper.attributes('style')).toContain('font-size: 20px');

    const html = await renderToString(createSSRApp(() => h(AIcon, { name: 'add' })));
    expect(html).toContain('<path');
  });

  it('forwards click events from dynamic and generated icons', async () => {
    const dynamicClick = vi.fn();
    const generatedClick = vi.fn();
    const dynamicIcon = mount(AIcon, {
      props: {
        name: 'close',
        onClick: dynamicClick,
      },
    });
    const generatedIcon = mount(IconAdd, {
      props: {
        onClick: generatedClick,
      },
    });

    await dynamicIcon.trigger('click');
    await generatedIcon.trigger('click');

    expect(dynamicClick).toHaveBeenCalledOnce();
    expect(generatedClick).toHaveBeenCalledOnce();
  });

  it('keeps click-driven component behavior working after the migration', async () => {
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <HTabs editable arrow={false}>
        <HTab key="tab1" label="tab1" closable onClose={onClose} />
      </HTabs>
    ));

    await wrapper.find('.h-tabs__close').trigger('click');
    expect(onClose).toHaveBeenCalledWith('tab1');
  });

  it('applies component classes and spin animation to generated icons', () => {
    const wrapper = mount(IconLoadingLine, {
      props: {
        spin: 'cw',
      },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['a-icon', 'h-icon_loading_line', 'h-icon__loading_line']),
    );
    expect(wrapper.find('animateTransform').exists()).toBe(true);
    expect(wrapper.find('animateTransform').attributes('to')).toBe('360 12 12');
  });

  it('clears stale SVG content when the dynamic icon name is missing', async () => {
    const name = ref('add');
    const Host = defineComponent(() => () => h(AIcon, { name: name.value }));
    const wrapper = mount(Host);

    expect(wrapper.find('path').exists()).toBe(true);
    name.value = 'not_found';
    await nextTick();
    expect(wrapper.find('path').exists()).toBe(false);
  });
});
