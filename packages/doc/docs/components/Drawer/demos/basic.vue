<template>
  <n-button type="normal" @click="visible = true">打开抽屉</n-button>
  <n-drawer
    v-model:visible="visible"
    v2
    title="Title"
    placement="right"
    @ok="ok"
    @open="open"
    @close="close"
  >
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </n-drawer>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const visible = ref(false);
const ok = () => {
  $message.success('ok clicked!');
  visible.value = false;
};

const open = () => {
  console.debug('open');
};

const close = () => {
  console.debug('close');
};
</script>
