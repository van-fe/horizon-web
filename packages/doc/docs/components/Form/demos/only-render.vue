<template>
  <n-form ref="formRef" validate-trigger="blur" :only-render="true">
    <n-form-item label="Username" prop="username" :required="true" :error="errorInfo['username']">
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Email" prop="email" :required="true" :error="errorInfo['email']">
      <n-input v-model="formData.email" />
    </n-form-item>
    <n-form-item label="Notes" prop="notes" :required="true" :error="errorInfo['notes']">
      <n-input v-model="formData.notes" type="textarea" />
    </n-form-item>
    <div>
      <n-button @click="submit">Submit</n-button>
    </div>
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

    const errorInfo = ref<Partial<Record<keyof (typeof formData)['value'], string>>>({});

    const submit = () => {
      errorInfo.value = {};

      if (!formData.value.username) {
        errorInfo.value.username = 'Please enter Username';
      }

      if (!formData.value.email) {
        errorInfo.value.email = 'Please enter Email';
      } else if (!/^[\w.-_]+@gmail.com/.test(formData.value.email)) {
        errorInfo.value.email = 'Only support Gmail!';
      }

      if (!formData.value.notes) {
        errorInfo.value.notes = 'Please enter Notes';
      }

      if (Object.keys(errorInfo.value).length === 0) {
        $message.success('Submit!');
      } else {
        $message.error('Please check error message');
      }
    };

    return {
      formData,
      errorInfo,
      submit,
    };
  },
});
</script>
