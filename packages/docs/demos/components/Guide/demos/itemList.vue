<template>
  <n-row>
    <n-col :span="24">
      <n-button ref="firstRef">First</n-button>
      <n-button class="guide-second-2">Second</n-button>
      <n-button ref="thirdRef">Third</n-button>
    </n-col>
    <n-divider />
    <n-col :span="24">
      <n-button @click="start">Start</n-button>
    </n-col>
  </n-row>

  <n-guide v-model:visible="visible" :item-list="itemList" @close="onClose" @finish="onFinish" />
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import type { GuideItemProps } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';

const firstRef = shallowRef<HTMLElement | null>(null);
const thirdRef = shallowRef<HTMLElement | null>(null);
const itemList = ref<GuideItemProps[]>([]);

const visible = ref(false);

function start() {
  visible.value = true;
}

function onClose() {
  $message.warning('跳过了新手引导');
}

function onFinish() {
  $message.success('完成了新手引导');
}

onMounted(() => {
  itemList.value = [
    {
      target: firstRef,
      title: '第一步',
      content: '第一步就是第一步',
    },
    {
      target: '.guide-second-2',
      title: '第二步',
      content: '第二步就是第二步',
      placement: 'top-start',
      image: 'https://static.nio.com/fx-static/design-system/clgkp3u9z0002082h1dfr888x/indexbg.jpg?imageView2/2/w/300',
    },
    {
      target: thirdRef,
      title: "第三步",
      content: "第三步就是第三步",
      placement:"right-start",
    },
    {
      title:"第四步",
      content: "第四步全局居中了",
    },
  ];
});
</script>

<style scoped>
</style>
