<template>
  <n-button type="normal" @click="visible = true">打开抽屉</n-button>
  <n-drawer
    v-model:visible="visible"
    v2
    title="Title"
    position="right"
    :before-close="onBeforeClose"
    @ok="onOk"
    @cancel="onCancel"
  >
    <div v-loading="{ isShow: loading, loadingType: 'dots' }">
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const visible = ref(false);
const loading = ref(false);

const onOk = () => {
  console.log('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
  // visible.value = false;
};
const onCancel = () => {
  console.log('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
  visible.value = false;
};

const wait = (n: number) => new Promise(r => setTimeout(r, n));
const onBeforeClose = async () => {
  const seed = Math.floor(Math.random() * 100) % 2 === 0;
  loading.value = true;
  $message.info({ message: `Drawer will ${seed ? 'close' : 'not close'}`, type: 'info' });
  await wait(3000);
  loading.value = false;
  return seed;
};
</script>
