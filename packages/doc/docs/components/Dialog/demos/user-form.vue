<script setup lang="ts">
import { NFormInstance } from '@aurora/horizon-web';
import { ref } from 'vue';

const formInstance = ref<NFormInstance>();

const formData = ref({ username: '' });

const exposeMethods = {
  getValues() {
    return formData.value;
  },
  validate() {
    return formInstance.value?.validate();
  },
};
defineExpose(exposeMethods);
export type UserExpose = typeof exposeMethods;
</script>

<template>
  <n-form ref="formInstance" :model="formData" class="mt-4">
    <n-form-item
      label="User name"
      prop="username"
      :rules="[{ required: true, message: 'User name is required!' }]"
    >
      <n-input v-model="formData.username" />
    </n-form-item>
  </n-form>
</template>
