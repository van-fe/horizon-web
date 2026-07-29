<template>
  <h-form>
    <h-form-item label="紧凑布局">
      <h-switch v-model="compact" :status="true" />
    </h-form-item>
  </h-form>
  <h-form ref="formRef" :model="formData" :compact="compact" label-position="left" label-vertical-align="middle" label-justify-align="right" label-width="120px" @submit.prevent="submit">
    <h-form-item label="User name" prop="username" :required="true">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email" :required="true">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes" prop="notes" :required="true">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <h-form-item>
      <h-button native-type="submit">Submit</h-button>
    </h-form-item>
  </h-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message, HFormInstance } from '@aurora/horizon-web';

const formRef = ref<HFormInstance>(null);
const compact = ref(true);
const formData = ref({
  username: '',
  email: '',
  notes: '',
});

const submit = () => {
  formRef.value?.validate().then((res) => {
    console.info('formData:', formData.value, res);
    $message.success('Submit');
  });
};
</script>
