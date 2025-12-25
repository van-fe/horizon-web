<template>
  <n-form inline>
    <n-form-item label="User name">
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Email">
      <n-input v-model="formData.email" />
    </n-form-item>
    <n-form-item>
      <template #label>&nbsp;</template>
      <n-button size="medium" @click="submit">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });
    const submit = () => {
      console.info('formData:', formData.value);
      $message.success('Submit');
    };
    return {
      formData,
      submit,
    };
  },
});
</script>
