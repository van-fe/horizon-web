<template>
  <n-radio-group v-model="size" style="margin-bottom: 20px">
    <n-radio label="small">小 - small</n-radio>
    <n-radio label="medium">中(默认) - medium</n-radio>
    <n-radio label="large">大 - large</n-radio>
    <n-radio label="500px">固定像素 - 500px</n-radio>
    <n-radio label="75%">固定尺寸 - 75%</n-radio>
  </n-radio-group>
  <n-button @click="onOpen()">Open Drawer ({{ size }})</n-button>
  <n-drawer v-model:visible="visible" title="Title" :size="size" @ok="onOk" @cancel="onCancel">
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@nio-fe/lego';

const visible = ref(false);
const size = ref('medium');

const onOpen = () => {
  visible.value = true;
};

const onOk = () => {
  console.log('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
};
const onCancel = () => {
  console.log('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
};
</script>
