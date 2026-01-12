import { defineComponent, ref } from 'vue';
import { NRecycleScroller } from '@aurora/horizon-web';
import { faker } from '@faker-js/faker';

type Item = {
  id: number;
  name: string;
};

export default defineComponent({
  name: 'ChatDemo',
  setup() {
    const items = ref<Item[]>();

    function getData() {
      const list: Item[] = [];

      for (let i = 0; i < 5000; i++) {
        list.push({
          id: i,
          name: faker.name.fullName(),
        });
      }

      return list;
    }

    items.value = getData();

    return () => (
      <NRecycleScroller
        items={items.value}
        itemSize={50}
        scrollerHeight={500}
        v-slots={{
          default: (row: unknown) => <div>{JSON.stringify(row)}</div>,
        }}
      />
    );
  },
});
