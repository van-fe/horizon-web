<script setup lang="ts">
import { $message } from '@nio-fe/lego';
import { ref } from 'vue';

const visible = ref(false);
const onOk = () => {
  $message.success('确认按钮被点击！');
  visible.value = false;
};
const onCancel = () => {
  $message.info('取消按钮被点击！');
  visible.value = false;
};
</script>

<template>
  <n-button type="normal" @click="visible = !visible">点击打开Dialog</n-button>
  <n-dialog v-model:visible="visible" title="Title" class="customize">
    <n-divider />
    <div class="grey-block">Dolor perspiciatis veniam.</div>
    <template #footer>
      <div class="customize-footer">
        <n-divider />
        <n-space block style="justify-content: end; padding-right: 24px">
          <n-button type="normal" @click="onCancel">Cancel</n-button>
          <n-button @click="onOk">Ok</n-button>
        </n-space>
      </div>
    </template>
  </n-dialog>
</template>

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

.customize-footer {
  --n-divider-margin--horizontal: 0 0 16px;
}

.customize {
  --n-dialog-margin--body: 0;
  --n-dialog-padding--body: 0;
  --n-divider-margin--horizontal: 16px 0 0;
  --n-dialog-padding--footer: 0 0 24px;
}
</style>
