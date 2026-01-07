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
  <h-form ref="formDomRef" :model="formData" :scroll-to-error="true" @submit="onSubmit">
    <h-form-item label="Username" prop="username" :required="true">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email" :required="true">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes" prop="notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <h-form-item>
      <h-button native-type="submit">Submit</h-button>
    </h-form-item>
  </h-form>
</template>

<style scoped>

</style>
