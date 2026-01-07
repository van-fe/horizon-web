<template>
  <h-space block>
    <h-button plain type="normal" @click="visible = true">点击打开Dialog</h-button>
    <h-checkbox v-model="destroyOnClose">关闭后销毁</h-checkbox>
  </h-space>
  <h-dialog
    v-model:visible="visible"
    title="用户信息表单（示例）"
    :destroy-oh-close="destroyOnClose"
    @ok="onOk"
  >
    <UserForm ref="uFormInstance" />
  </h-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UserForm, { UserExpose } from './user-form.vue';
import { $message } from '@aurora/horizon-web';

const destroyOnClose = ref(true);
const visible = ref(false);
const uFormInstance = ref<UserExpose>();

const onOk = async () => {
  await uFormInstance.value?.validate();
  const user = uFormInstance.value?.getValues();
  $message.success(`User name: ${user?.username}`);
  visible.value = false;
};
</script>
