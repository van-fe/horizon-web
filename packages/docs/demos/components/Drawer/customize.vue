<template>
  <h-space direction="vertical" block>
    <h-radio-group v-model="mode" class="example">
      <h-radio :label="0">Default</h-radio>
      <h-radio :label="1">Customize Header</h-radio>
      <h-radio :label="2">Customize Title</h-radio>
      <h-radio :label="3">Customize Footer</h-radio>
      <h-radio :label="4">No Title</h-radio>
      <h-radio :label="5">No Header and No Footer</h-radio>
      <h-radio :label="6">Hide Mask</h-radio>
    </h-radio-group>
    <h-button @click="visible = true">Open Drawer</h-button>
  </h-space>
  <h-drawer
    v-model:visible="visible"
    v2
    :title="mode !== 4 ? 'Default Title' : ''"
    :header="mode !== 5"
    :footer="mode !== 5"
    :mask="mode !== 6"
    position="right"
  >
    <template v-if="mode === 1" #header>
      <h-space size="4" block direction="vertical">
        <h-space size="4">
          <div class="text-subtitle-1">Great declaration</div>
          <h-tag :clickable="false">Demo</h-tag>
        </h-space>
        <div class="text-caption-1">Make Demo great again</div>
      </h-space>
    </template>

    <template v-if="mode === 2" #title>Customize Title</template>
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
    <template v-if="mode === 3" #footer>
      <h-button type="danger" style="margin-right: 8px" @click="onOk">Confirm Delete</h-button>
      <h-button type="secondary" @click="onCancel">Close</h-button>
    </template>
  </h-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const visible = ref(false);
const mode = ref(0);

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
.example {
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
</style>
