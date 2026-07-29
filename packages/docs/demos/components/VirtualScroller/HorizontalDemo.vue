<template>
  <div class="virtual-scroller-horizontal">
    <section class="toolbar">
      <h-row>
        <h-col :span="10">
          <h-input v-model="tmpKw" placeholder="type kw to search">
            <template #append>
              <h-button :icon="IconSearch" size="medium" type="info" @click="doSearch"></h-button>
            </template>
          </h-input>
        </h-col>
        <h-col :span="20"></h-col>
      </h-row>
    </section>

    <h-virtual-scroller
      :items="filteredItems"
      :min-item-size="54"
      direction="horizontal"
      :scroller-height="500"
      class="scroller-h"
    >
      <template #default="{ item, index, active }">
        <h-virtual-scroller-item
          :item="item"
          :active="active"
          :title="`Click to change message ${index}`"
          :style="{
            width: `${Math.max(130, Math.round((item.message.length / 20) * 20))}px`,
          }"
          class="message-h"
        >
          <div class="avatar-h">
            <img :key="item.avatar" :src="item.avatar" alt="avatar" class="image-h" />
          </div>
          <div class="text-h">
            {{ item.message }}
          </div>
          <div class="index-h">
            <span>{{ item.id }} (id)</span>
            <span>{{ index }} (index)</span>
          </div>
        </h-virtual-scroller-item>
      </template>
    </h-virtual-scroller>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { faker } from '@faker-js/faker';
import { IconSearch } from '@aurora/icon';

type Message = {
  id: number | string;
  avatar: string;
  message: string;
};

const items = ref<Message[]>([]);
const kw = ref<string>('');
const tmpKw = ref<string>('');

const filteredItems = computed((): Message[] => {
  let ret: Message[] = [];
  if (!kw.value) ret = items.value;
  const lowerKw = kw.value.toLowerCase();
  ret = items.value.filter(i => i.message.toLowerCase().includes(lowerKw));
  return ret;
});

function generateItems() {
  for (let i = 0; i < 10000; i++) {
    items.value.push({
      id: i + '_sjifeji',
      message: faker.lorem.text(),
      avatar: 'https://www.example.com/cdn-static/mydemo/nextjs/images/home/demoApp/demo-app-logo.png',
    });
  }
}

function doSearch() {
  kw.value = tmpKw.value;
}

generateItems();
</script>

<style lang="scss" scoped>
.virtual-scroller-horizontal {
  height: 100%;
  min-height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.scroller-h {
  flex: auto 1 1;
  flex-direction: column;
}
.message-h {
  display: flex;
  flex-direction: column;
  min-height: 32px;
  padding: 12px;
  box-sizing: border-box;
}

.avatar-h {
  flex: auto 0 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
  margin-bottom: 10px;
}

.avatar-h .image-h {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}

.index-h,
.text-h {
  flex: 1;
  margin-bottom: 10px;
}

.index-h {
  opacity: 0.5;
  display: flex;
  flex-direction: column;
}

.index-h span {
  display: inline-block;
}
</style>
