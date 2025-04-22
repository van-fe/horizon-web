<template>
  <n-row>
    <n-col :span="24">
      <n-button ref="firstRef">First</n-button>
      <n-button ref="secondRef">Second</n-button>
      <n-button ref="thirdRef">Third</n-button>
    </n-col>
    <n-divider />
    <n-col :span="24">
      <n-button @click="start">Start</n-button>
    </n-col>
  </n-row>

  <n-guide
    v-model="current"
    v-model:visible="visible"
    type="primary"
    draggable
    @close="onClose"
    @finish="onFinish"
  >
    <n-guide-item :target="firstRef" title="第一步" content="第一步就是第一步" />
    <n-guide-item
      :target="secondRef"
      title="第二步"
      content="第二步就是第二步"
      placement="top-start"
      image="https://static.nio.com/fx-static/design-system/clgkp3u9z0002082h1dfr888x/indexbg.jpg?imageView2/2/w/300"
    />
    <n-guide-item
      :target="thirdRef"
      title="第三步"
      content="第三步就是第三步"
      placement="right-start"
    />
    <n-guide-item title="第四步" content="第四步全局居中了" draggable finishText="知道了" />
  </n-guide>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { $message } from '@nio-fe/lego';

const firstRef = shallowRef<HTMLElement | null>(null);
const thirdRef = shallowRef<HTMLElement | null>(null);
const secondRef = shallowRef<HTMLElement | null>(null);

const current = ref(0);
const visible = ref(false);

function start() {
  current.value = 0;
  visible.value = true;
}

function onClose() {
  $message.warning('跳过了新手引导');
}

function onFinish() {
  $message.success('完成了新手引导');
}
</script>

<style scoped></style>
