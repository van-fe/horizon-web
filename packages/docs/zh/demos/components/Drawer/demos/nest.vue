<template>
  <n-button @click="visible = true">Open Drawer</n-button>

  <n-drawer v-model:visible="visible" title="Title" size="large" @ok="onOk" @cancel="onCancel">
    <div style="margin-bottom: 20px">
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
    <n-button @click="visible2 = true">Two-level Drawer</n-button>
  </n-drawer>
  <n-drawer version="v2" v-model:visible="visible2" title="Two-level Drawer">
    This is two-level drawer
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@nio-fe/lego';

const visible = ref(false);
const visible2 = ref(false);

const onOk = () => {
  console.log('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
};
const onCancel = () => {
  console.log('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
};
</script>
