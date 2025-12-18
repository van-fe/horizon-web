<template>
  <n-space block direction="vertical">
    <n-space>
      <n-checkbox v-model="noPadding">对话框内容无边距</n-checkbox>
    </n-space>
    <n-button plain type="normal" @click="visible = true">点击打开Dialog</n-button>
  </n-space>
  <n-dialog
    v-model:visible="visible"
    title="标题"
    :class="{ 'no-padding': noPadding }"
    :cancel-button="false"
    @ok="onOk"
    @cancel="onCancel"
  >
    <div class="grey-block">Dolor perspiciatis veniam.</div>
  </n-dialog>
</template>

<script setup lang="ts">
import { $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const visible = ref(false);
const noPadding = ref(false);
const onOk = () => {
  $message.success('确认按钮被点击！');
  visible.value = false;
};
const onCancel = () => {
  $message.info('取消按钮被点击！');
};
</script>

<style lang="scss">
.grey-block {
  background-color: #f6f7fa;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 30px;
}

.no-padding {
  --n-dialog-padding--body: 0;
  --n-dialog-margin--body: 16px 0;
}
</style>
