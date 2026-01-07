<template>
  <h-space block direction="vertical">
    <h-space>
      <h-checkbox v-model="noPadding">对话框内容无边距</h-checkbox>
    </h-space>
    <h-button plain type="normal" @click="visible = true">点击打开Dialog</h-button>
  </h-space>
  <h-dialog
    v-model:visible="visible"
    title="标题"
    :class="{ 'no-padding': noPadding }"
    :cancel-button="false"
    @ok="onOk"
    @cancel="onCancel"
  >
    <div class="grey-block">Dolor perspiciatis veniam.</div>
  </h-dialog>
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
  aligh-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 30px;
}

.no-padding {
  --h-dialog-padding--body: 0;
  --h-dialog-margih--body: 16px 0;
}
</style>
