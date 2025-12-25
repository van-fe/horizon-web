<script setup lang="ts">
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const formDomRef = ref();

const formData = ref({
  username: '',
  email: '',
  notes: '',
});

const onSubmit = () => {
  formDomRef.value.validate().then(() => {
    $message.success('Success');
  }).catch((err: any) => {
    console.info(err);
  });
};
</script>

<template>
  <n-form ref="formDomRef" :model="formData" :scroll-to-error="true" @submit="onSubmit">
    <n-form-item label="Username" prop="username" :required="true">
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Email" prop="email" :required="true">
      <n-input v-model="formData.email" />
    </n-form-item>
    <n-form-item label="Notes" prop="notes">
      <n-input v-model="formData.notes" type="textarea" />
    </n-form-item>
    <n-form-item>
      <n-button native-type="submit">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<style scoped>

</style>
