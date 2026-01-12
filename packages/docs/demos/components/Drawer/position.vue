<template>
  <h-radio-group v-model="placement" style="margin-bottom: 20px">
    <h-radio label="right">右 - right（默认）</h-radio>
    <h-radio label="bottom">下 - bottom</h-radio>
    <h-radio label="left">左 - left</h-radio>
    <h-radio label="top">上 - top</h-radio>
  </h-radio-group>
  <h-button @click="visible = true">Open Drawer ({{ placement }})</h-button>
  <h-drawer v-model="visible" title="Title" :placement="placement" @ok="onOk" @cancel="onCancel">
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
const placement = ref('right');

const onOk = () => {
  console.info('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
};
const onCancel = () => {
  console.info('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
};
</script>
