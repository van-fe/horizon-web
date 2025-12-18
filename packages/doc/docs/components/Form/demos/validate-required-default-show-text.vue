<template>
  <n-form ref="formRef" :model="formData" :required-use-label="true">
    <n-form-item
      label="User name"
      prop="username"
      :required="true"
    >
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Email" prop="email" :required="true">
      <n-input v-model="formData.email" />
    </n-form-item>
    <n-form-item label="Notes" prop="notes" :required="true">
      <n-input v-model="formData.notes" type="textarea" />
    </n-form-item>
    <div>
      <n-button @click="submit">Submit</n-button>
    </div>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { NFormInstance } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';

const formRef = ref<NFormInstance | null>(null);
const formData = ref({
  username: '',
  email: '',
  notes: '',
});

const submit = () => {
  if (formRef.value) {
    formRef.value
      ?.validate()
      .then(() => {
        $message.success('Submit');
      })
      .catch(errors => {
        console.log('errors:', errors);
      });
  }
};
</script>
