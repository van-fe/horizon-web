<template>
  <h-space direction="vertical" block>
    <h-radio-group v-model="mode" class="example">
      <h-radio :label="0">默认</h-radio>
      <h-radio :label="1">自定义顶部</h-radio>
      <h-radio :label="2">自定义标题</h-radio>
      <h-radio :label="3">自定义底部</h-radio>
      <h-radio :label="4">隐藏标题</h-radio>
      <h-radio :label="5">隐藏顶部和底部</h-radio>
      <h-radio :label="6">隐藏蒙层</h-radio>
    </h-radio-group>
    <h-button type="normal" @click="visible = true">打开抽屉</h-button>
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
          <h-tag :clickable="false">NIO</h-tag>
        </h-space>
        <div class="text-caption-1">Make NIO great again</div>
      </h-space>
    </template>

    <template v-if="mode === 2" #title>Customize Title</template>
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
    <template v-if="mode === 3" #footer>
      <h-button type="danger" style="margih-right: 8px" @click="onOk">Confirm Delete</h-button>
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
