<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { HFormInstance } from '@aurora/horizon-web';

const formRef = ref<HFormInstance | null>(null);
const visible = ref(false);
const status = ref('尚未保存');
const formData = reactive({
  username: 'Aurora Admin',
  email: 'admin@example.com',
});
const rules = {
  username: [{ required: true, message: '请输入成员名称' }],
  email: [
    { required: true, message: '请输入邮箱地址' },
    { type: 'email', message: '请输入有效的邮箱地址' },
  ],
};

async function submit() {
  await formRef.value?.validate();
  status.value = `${formData.username} 的资料已更新`;
  visible.value = false;
}
</script>

<template>
  <section class="dialog-form-demo">
    <h-button @click="visible = true">编辑资料</h-button>
    <p role="status">{{ status }}</p>

    <h-dialog v-model:visible="visible" title="编辑成员资料" ok-text="保存更改" @ok="submit">
      <h-form ref="formRef" :model="formData" :rules="rules" label-position="top">
        <h-form-item label="成员名称" prop="username">
          <h-input v-model="formData.username" />
        </h-form-item>
        <h-form-item label="邮箱地址" prop="email">
          <h-input v-model="formData.email" />
        </h-form-item>
      </h-form>
    </h-dialog>
  </section>
</template>

<style scoped>
.dialog-form-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
}

.dialog-form-demo > p {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .dialog-form-demo {
    inline-size: 100%;
  }
}
</style>
