<template>
  <h-button type="normal" @click="visible = true">打开抽屉</h-button>
  <h-drawer
    v-model:visible="visible"
    v2
    title="Title"
    placement="right"
    style="--h-drawer-bg--mask: transparent"
    @ok="ok"
    @open="open"
    @close="close"
  >
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </h-drawer>
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
