<template>
  <p class="my-4">center-point，按中心点对齐</p>
  <n-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="num"
    :content="item"
    :num-max="99"
    style="margin-right: 20px"
  >
    <div style="background: gray; width: 50px; height: 50px"></div>
  </n-badge>
  <p class="my-4">inner，内部对齐</p>
  <n-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="num"
    align="inner"
    :content="item"
    :num-max="99"
    style="margin-right: 20px"
  >
    <div style="background: gray; width: 50px; height: 50px"></div>
  </n-badge>
  <p class="my-4">outer，外部对齐</p>
  <n-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="num"
    align="outer"
    :content="item"
    :num-max="99"
    style="margin-right: 20px"
  >
    <div style="background: gray; width: 50px; height: 50px"></div>
  </n-badge>
  <p class="my-4">fix-left，固定左边边距，长度向右延伸</p>
  <n-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="num"
    align="fix-left"
    :content="item"
    :num-max="99"
    style="margin-right: 20px"
  >
    <div style="background: gray; width: 50px; height: 50px"></div>
  </n-badge>
  <p class="my-4">自定义偏移量</p>
  <n-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="num"
    align="fix-left"
    :offset="{ top: '-2px', right: '-2px' }"
    :content="item"
    :num-max="99"
    style="margin-right: 20px"
  >
    <div style="background: gray; width: 50px; height: 50px"></div>
  </n-badge>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      listRef: ref([0, 8, 15, 10000]),
    };
  },
});
</script>

<style>
.my-4 {
  margin: 16px 0;
}
</style>
