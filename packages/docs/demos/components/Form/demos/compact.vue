<template>
  <n-form>
    <n-form-item label="紧凑布局">
      <n-switch v-model="compact" :status="true" />
    </n-form-item>
  </n-form>
  <n-form ref="formRef" :model="formData" :compact="compact" label-position="left" label-vertical-align="middle" label-justify-align="right" label-width="120px" @submit.prevent="submit">
    <n-form-item label="User name" prop="username" :required="true">
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Email" prop="email" :required="true">
      <n-input v-model="formData.email" />
    </n-form-item>
    <n-form-item label="Notes" prop="notes" :required="true">
      <n-input v-model="formData.notes" type="textarea" />
    </n-form-item>
    <n-form-item>
      <n-button native-type="submit">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message, NFormInstance } from '@nio-fe/lego';

const formRef = ref<NFormInstance>(null);
const compact = ref(true);
const formData = ref({
  username: '',
  email: '',
  notes: '',
});

const submit = () => {
  formRef.value?.validate().then((res) => {
    console.log('formData:', formData.value, res);
    $message.success('Submit');
  });
};
</script>
