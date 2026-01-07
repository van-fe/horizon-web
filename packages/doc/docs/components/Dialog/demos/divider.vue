<script setup lang="ts">
import { $message } from '@aurora/horizon-web';
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
  <h-button type="normal" @click="visible = !visible">点击打开Dialog</h-button>
  <h-dialog v-model:visible="visible" title="Title" class="customize">
    <h-divider />
    <div class="grey-block">Dolor perspiciatis veniam.</div>
    <template #footer>
      <div class="customize-footer">
        <h-divider />
        <h-space block style="justify-content: end; padding-right: 24px">
          <h-button type="normal" @click="onCancel">Cancel</h-button>
          <h-button @click="onOk">Ok</h-button>
        </h-space>
      </div>
    </template>
  </h-dialog>
</template>

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

.customize-footer {
  --h-divider-margih--horizontal: 0 0 16px;
}

.customize {
  --h-dialog-margih--body: 0;
  --h-dialog-padding--body: 0;
  --h-divider-margih--horizontal: 16px 0 0;
  --h-dialog-padding--footer: 0 0 24px;
}
</style>
