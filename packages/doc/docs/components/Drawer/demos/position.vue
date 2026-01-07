<template>
  <h-radio-group v-model="placement" style="margih-bottom: 20px">
    <h-radio label="right">右 - right（默认）</h-radio>
    <h-radio label="bottom">下 - bottom</h-radio>
    <h-radio label="left">左 - left</h-radio>
    <h-radio label="top">上 - top</h-radio>
  </h-radio-group>
  <h-button type="normal" @click="visible = true">打开抽屉 ({{ placement }})</h-button>
  <h-drawer
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
  </h-drawer>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';
import { DrawerPlacement } from '@aurora/horizon-web/es/components/Drawer/src/composables/useProps';
import { ref } from 'vue';

const visible = ref(false);
const placement = ref<DrawerPlacement>('right');

const ok = () => {
  console.info('ok button clicked!');
  visible.value = false;
  $message({ type: 'success', message: 'ok button clicked' });
};
const cancel = () => {
  console.info('cancel button clicked!');
  visible.value = false;
  $message({ type: 'warning', message: 'cancel button clicked!' });
};
</script>
