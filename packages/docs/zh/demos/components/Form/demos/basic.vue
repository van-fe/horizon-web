<template>
  <n-form>
    <n-form-item label="User name">
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Email">
      <n-input v-model="formData.email" />
    </n-form-item>
    <n-form-item label="Notes">
      <n-input v-model="formData.notes" type="textarea" />
    </n-form-item>
    <n-form-item>
      <n-button @click="submit">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@nio-fe/lego';
export default defineComponent({
  setup() {
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });
    const submit = () => {
      console.log('formData:', formData.value);
      $message.success('Submit');
    };
    return {
      formData,
      submit,
    };
  },
});
</script>
