<template>
  <n-radio-group v-model="placement" style="margin-bottom: 20px">
    <n-radio label="right">右 - right（默认）</n-radio>
    <n-radio label="bottom">下 - bottom</n-radio>
    <n-radio label="left">左 - left</n-radio>
    <n-radio label="top">上 - top</n-radio>
  </n-radio-group>
  <n-button type="normal" @click="visible = true">打开抽屉 ({{ placement }})</n-button>
  <n-drawer
    v-model:visible="visible"
    v2
    title="Title"
    :placement="placement"
    @ok="ok"
    @cancel="cancel"
  >
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </n-drawer>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';
import { DrawerPlacement } from '@aurora/horizon-web/es/components/Drawer/src/composables/useProps';
import { ref } from 'vue';

const visible = ref(false);
const placement = ref<DrawerPlacement>('right');

const ok = () => {
  console.log('ok button clicked!');
  visible.value = false;
  $message({ type: 'success', message: 'ok button clicked' });
};
const cancel = () => {
  console.log('cancel button clicked!');
  visible.value = false;
  $message({ type: 'warning', message: 'cancel button clicked!' });
};
</script>
