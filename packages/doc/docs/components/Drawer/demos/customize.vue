<template>
  <n-space direction="vertical" block>
    <n-radio-group v-model="mode" class="example">
      <n-radio :label="0">默认</n-radio>
      <n-radio :label="1">自定义顶部</n-radio>
      <n-radio :label="2">自定义标题</n-radio>
      <n-radio :label="3">自定义底部</n-radio>
      <n-radio :label="4">隐藏标题</n-radio>
      <n-radio :label="5">隐藏顶部和底部</n-radio>
      <n-radio :label="6">隐藏蒙层</n-radio>
    </n-radio-group>
    <n-button type="normal" @click="visible = true">打开抽屉</n-button>
  </n-space>
  <n-drawer
    v-model:visible="visible"
    v2
    :title="mode !== 4 ? 'Default Title' : ''"
    :header="mode !== 5"
    :footer="mode !== 5"
    :mask="mode !== 6"
    position="right"
  >
    <template v-if="mode === 1" #header>
      <n-space size="4" block direction="vertical">
        <n-space size="4">
          <div class="text-subtitle-1">Great declaration</div>
          <n-tag :clickable="false">NIO</n-tag>
        </n-space>
        <div class="text-caption-1">Make NIO great again</div>
      </n-space>
    </template>

    <template v-if="mode === 2" #title>Customize Title</template>
    <div>
      You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
    <template v-if="mode === 3" #footer>
      <n-button type="danger" style="margin-right: 8px" @click="onOk">Confirm Delete</n-button>
      <n-button type="secondary" @click="onCancel">Close</n-button>
    </template>
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const visible = ref(false);
const mode = ref(0);

const onOk = () => {
  console.log('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
};
const onCancel = () => {
  console.log('cancel button clicked!');
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
