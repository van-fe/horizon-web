<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-button ref="firstRef">First</h-button>
      <h-button class="guide-second-mask">Second</h-button>
      <h-button ref="thirdRef">Third</h-button>
    </h-grid-item>
    <h-divider />
    <h-grid-item :span="24">
      <h-button @click="start">Start</h-button>
    </h-grid-item>
  </h-grid>

  <h-guide v-model:visible="visible" :mask="false" type="primary" @close="onClose" @finish="onFinish">
    <h-guide-item :target="firstRef" title="第一步" content="第一步就是第一步" />
    <h-guide-item target=".guide-second-mask" title="第二步" content="第二步就是第二步" placement="top-start" image="/demo-assets/guide-card.svg" />
    <h-guide-item :target="thirdRef" title="第三步" content="第三步就是第三步" placement="right-start" />
    <h-guide-item title="第四步" content="第四步全局居中了" />
  </h-guide>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { $message } from '@aurora/horizon-web';

const firstRef = shallowRef<HTMLElement | null>(null);
const thirdRef = shallowRef<HTMLElement | null>(null);

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
</script>

<style scoped>
</style>
