<template>
  <div class="virtual-scroller-demo">
    <section class="toolbar">
      <h-grid :gap="12">
        <h-grid-item :span="10">
          <h-input v-model="tmpKw" placeholder="type kw to search">
            <template #append>
              <h-button :icon="IconSearch" size="medium" @click="doSearch"></h-button>
            </template>
          </h-input>
        </h-grid-item>
        <h-grid-item :span="20"></h-grid-item>
      </h-grid>
    </section>
    <h-virtual-scroller class="scroller" :items="filteredItems" :min-item-size="54">
      <template #before>
        <div class="notice">这是一个消息列表, 我们并不清楚任意一个消息元素的高度~</div>
      </template>
      <template #after>
        <div class="notice">已经没有更多了~</div>
      </template>
      <template #empty>no data yet~!</template>

      <template #default="{ item, active, index }">
        <h-virtual-scroller-item
          :item="item"
          :active="active"
          :data-active="active"
          :data-index="index"
          :size-dependencies="[item.message]"
          :title="`Click to change message ${index}`"
          class="message"
        >
          <div class="avatar">
            <img :key="item.avatar" :src="item.avatar" alt="avatar" class="image" />
          </div>
          <div class="text">
            {{ item.message }}
          </div>
          <div class="index">
            <span>{{ item.id }} (id)</span>
            <span>{{ index }} (index)</span>
          </div>
        </h-virtual-scroller-item>
        <!-- <div class="">{{ JSON.stringify(props) }}</div> -->
      </template>
    </h-virtual-scroller>
  </div>
</template>

<script lang="ts">
import { faker } from '@faker-js/faker';
import { defineComponent, onMounted, ref, computed } from 'vue';
import { IconSearch } from '@aurora/icon';

type Message = {
  id: number;
  avatar: string;
  message: string;
};

export default defineComponent({
  name: 'VirtualScrollerDemo',
  setup() {
    const items = ref<Message[]>([]);
    const kw = ref<string>('');
    const tmpKw = ref<string>('');

    function generateMessage() {
      return {
        avatar: '/demo-assets/avatar-indigo.svg',
        message: faker.lorem.text(),
      };
    }

    const filteredItems = computed((): Message[] => {
      let ret: Message[] = [];
      if (!kw.value) ret = items.value;
      const lowerKw = kw.value.toLowerCase();
      ret = items.value.filter(i => i.message.toLowerCase().includes(lowerKw));
      return ret;
    });

    onMounted(() => {
      for (let i = 0; i < 10000; i++) {
        items.value.push({
          id: i,
          ...generateMessage(),
        });
      }
    });

    function doSearch() {
      kw.value = tmpKw.value;
    }

    return {
      filteredItems,
      tmpKw,
      doSearch,
    };
  },
  computed: {
    IconSearch() {
      return IconSearch;
    },
  },
});
</script>

<style lang="scss">
.virtual-scroller-demo {
  height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.scroller {
  flex: auto 1 1;
  border: solid 1px #42b983;
}

.toolbar {
  flex: auto 0 0;
  text-align: center;
}

.notice {
  padding: 24px;
  font-size: 20px;
  color: #999;
}

.message {
  display: flex;
  min-height: 32px;
  padding: 12px;
  box-sizing: border-box;
}

.avatar {
  flex: auto 0 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
}

.avatar .image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}

.index,
.text {
  flex: 1;
}

.text {
  max-width: 400px;
}

.index {
  opacity: 0.5;
}

.index span {
  display: inline-block;
  width: 160px;
  text-align: right;
}
</style>
