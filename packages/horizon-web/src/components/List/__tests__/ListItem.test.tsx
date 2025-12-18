import { mount } from '@vue/test-utils';
import { NList, NListItem } from '..';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';
import type { ListItemProps } from '../src/composables/useProps';

const templateData = Array(20)
  .fill(0)
  .map((_, index) => ({
    title: `Title-${index}`,
    subtitle: `Subtitle-${index}`,
    describe: `Describe-${index}`,
  }));

describe('ListItem.tsx', () => {
  describe('props', () => {
    test('titleSize', async () => {
      const titleSize = ref<ListItemProps['titleSize']>('small');
      const wrapper = mount(() => (
        <NList data={templateData}>
          {{
            item: ({ item }: { item: (typeof templateData)[number] }) => (
              <NListItem
                title={item.title}
                subtitle={item.subtitle}
                describe={item.describe}
                titleSize={titleSize.value}
              />
            ),
          }}
        </NList>
      ));

      const listItemElm = wrapper.find('.n-list-item__main--title');

      expect(listItemElm.classes().join(',')).not.contain('medium');

      titleSize.value = 'medium';

      await nextTick();

      expect(listItemElm.classes().join(',')).contain('medium');
    });

    test('titleBold', async () => {
      const titleBold = ref(false);
      const wrapper = mount(() => (
        <NList data={templateData}>
          {{
            item: ({ item }: { item: (typeof templateData)[number] }) => (
              <NListItem
                title={item.title}
                subtitle={item.subtitle}
                describe={item.describe}
                titleBold={titleBold.value}
              />
            ),
          }}
        </NList>
      ));

      const listItemElm = wrapper.find('.n-list-item__main--title-wrapper');

      expect(listItemElm.classes('is-bold')).toBeFalsy();

      titleBold.value = true;

      await nextTick();

      expect(listItemElm.classes('is-bold')).toBeTruthy();
    });
  });

  describe('slots', () => {
    test('default', () => {
      const wrapper = mount(() => (
        <NList data={templateData}>
          {{
            item: () => (
              <NListItem>
                {{
                  default: () => <div>DEFAULT</div>,
                }}
              </NListItem>
            ),
          }}
        </NList>
      ));

      expect(wrapper.find('.n-list-item__main--default').text()).eq('DEFAULT');
    });

    test('title', () => {
      const wrapper = mount(() => (
        <NList data={templateData}>
          {{
            item: () => (
              <NListItem>
                {{
                  title: () => <div>TITLE</div>,
                }}
              </NListItem>
            ),
          }}
        </NList>
      ));

      expect(wrapper.find('.n-list-item__main--content').text()).eq('TITLE');
    });

    test('sider', () => {
      const wrapper = mount(() => (
        <NList data={templateData}>
          {{
            item: () => (
              <NListItem>
                {{
                  sider: () => <div>SIDER</div>,
                }}
              </NListItem>
            ),
          }}
        </NList>
      ));

      expect(wrapper.find('.n-list-item__main--sider').text()).eq('SIDER');
    });

    test('describe', () => {
      const wrapper = mount(() => (
        <NList data={templateData}>
          {{
            item: () => (
              <NListItem>
                {{
                  describe: () => <div>DESCRIBE</div>,
                }}
              </NListItem>
            ),
          }}
        </NList>
      ));

      expect(wrapper.find('.n-list-item__main--content').text()).eq('DESCRIBE');
    });

    test('right', () => {
      const wrapper = mount(() => (
        <NList data={templateData}>
          {{
            item: () => (
              <NListItem>
                {{
                  right: () => <div>RIGHT</div>,
                }}
              </NListItem>
            ),
          }}
        </NList>
      ));

      expect(wrapper.find('.n-list-item__right').text()).eq('RIGHT');
    });
  });
});
