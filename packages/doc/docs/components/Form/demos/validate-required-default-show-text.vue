<template>
  <h-form ref="formRef" :model="formData" :required-use-label="true">
    <h-form-item
      label="User name"
      prop="username"
      :required="true"
    >
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email" :required="true">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes" prop="notes" :required="true">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <div>
      <h-button @click="submit">Submit</h-button>
    </div>
  </h-form>
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
        console.info('errors:', errors);
      });
  }
};
</script>
