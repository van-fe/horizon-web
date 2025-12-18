<template>
  <n-radio-group v-model="placement" style="margin-bottom: 20px">
    <n-radio label="right">右 - right（默认）</n-radio>
    <n-radio label="bottom">下 - bottom</n-radio>
    <n-radio label="left">左 - left</n-radio>
    <n-radio label="top">上 - top</n-radio>
  </n-radio-group>
  <n-button @click="visible = true">Open Drawer ({{ placement }})</n-button>
  <n-drawer v-model="visible" title="Title" :placement="placement" @ok="onOk" @cancel="onCancel">
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const visible = ref(false);
const placement = ref('right');

const onOk = () => {
  console.log('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
};
const onCancel = () => {
  console.log('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
};
</script>
