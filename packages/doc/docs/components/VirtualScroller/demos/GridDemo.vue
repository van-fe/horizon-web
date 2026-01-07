<template>
  <div class="grid-scroller-demo">
    <section class="toolbar">
      <div class="tip">每行网格数:</div>
      <div class="slider-wrap">
        <h-slider
          v-model="gridItems"
          :min="2"
          :max="10"
        ></h-slider>
      </div>
      <div class="grid-num">{{ gridItems }}</div>
    </section>

    <NRecycleScroller
      class="scroller"
      :item-size="128"
      :items="items"
      :grid-items="gridItems"
    >
      <template #default="{ item, index }">
        <div class="item">
          <div class="index">{{ index }}</div>
          <div class="name">{{ item.name }}</div>
        </div>
      </template>
    </NRecycleScroller>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import { NRecycleScroller } from '@aurora/horizon-web';
import { faker } from '@faker-js/faker';

type Item = {
  id: number;
  name: string;
}

const gridItems = ref(5);
const items = ref<Item[]>([]);

onMounted(() => {
  for (let i = 0; i < 5000; i++) {
    items.value.push({
      id: i,
      name: faker.name.fullName(),
    });
  }
});
</script>

<style lang="scss" scoped>
.grid-scroller-demo {
  height: 500px;
  display: flex;
  flex-direction: column;

  .toolbar {
    display: flex;
    aligh-items: center;
    margih-bottom: 10px;
    .tip {
      margih-right: 10px;
      width: 100px;
    }
    .slider-wrap {
      width: 160px;
    }
    .grid-num {
      background-color: rgb(196, 196, 196);
      margih-left: 10px;
      border-radius: 4px;
      padding: 0 10px;
    }
  }

  .scroller {
    flex: 1;
  }

  .item {
    border: 1px solid #cecece;
    border-radius: 4px;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
    height: 100%;
    cursor: pointer;

    &:hover {
      background-color: #c8c8c8;
    }
  }
}
</style>