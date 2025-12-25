<template>
  <div ref="innerEl" class="customize">
    <n-button @click="openDrawer(innerEl)">Open Drawer on Inner</n-button>
    <n-button class="ml-2" @click="openDrawer()">Open Drawer on Body</n-button>
  </div>
  <n-drawer
    v-model:visible="visible"
    v2
    :to="to"
    size="small"
    title="Title"
    position="right"
    @ok="onOk"
    @cancel="onCancel"
  >
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
const innerEl = ref();
const to = ref();

const openDrawer = (el?: HTMLElement) => {
  if (el) to.value = el;
  else to.value = document.body;
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

<style scoped>
.customize {
  position: relative;
  height: 500px;
  background-color: #efefef;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
