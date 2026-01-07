<template>
  <h-radio-group v-model="size" style="margin-bottom: 20px">
    <h-radio label="small">小 - small</h-radio>
    <h-radio label="medium">中(默认) - medium</h-radio>
    <h-radio label="large">大 - large</h-radio>
    <h-radio label="500px">固定像素 - 500px</h-radio>
    <h-radio label="75%">固定尺寸 - 75%</h-radio>
  </h-radio-group>
  <h-button @click="onOpen()">Open Drawer ({{ size }})</h-button>
  <h-drawer v-model:visible="visible" title="Title" :size="size" @ok="onOk" @cancel="onCancel">
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const visible = ref(false);
const size = ref('medium');

const onOpen = () => {
  visible.value = true;
};

const onOk = () => {
  console.info('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
};
const onCancel = () => {
  console.info('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
};
</script>
