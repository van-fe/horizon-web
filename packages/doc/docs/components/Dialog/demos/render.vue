<template>
  <n-space block>
    <n-button plain type="normal" @click="visible = true">点击打开Dialog</n-button>
    <n-checkbox v-model="destroyOnClose">关闭后销毁</n-checkbox>
  </n-space>
  <n-dialog
    v-model:visible="visible"
    title="用户信息表单（示例）"
    :destroy-on-close="destroyOnClose"
    @ok="onOk"
  >
    <UserForm ref="uFormInstance" />
  </n-dialog>
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
