<template>
  <h-form inline>
    <h-form-item label="User name">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item>
      <template #label>&nbsp;</template>
      <h-button size="medium" @click="submit">Submit</h-button>
    </h-form-item>
  </h-form>
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
