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
  <h-form ref="formInstance" :model="formData" class="mt-4">
    <h-form-item
      label="User name"
      prop="username"
      :rules="[{ required: true, message: 'User name is required!' }]"
    >
      <h-input v-model="formData.username" />
    </h-form-item>
  </h-form>
</template>
