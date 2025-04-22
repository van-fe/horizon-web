<template>
  <n-form ref="formRef" :model="formData" validate-trigger="blur">
    <n-form-item
      label="User name"
      prop="username"
      :rules="[
        {
          required: true,
          message: 'User name is required!',
        },
        {
          min: 3,
          max: 100,
          message: 'User name should be 3 to 100.',
        },
      ]"
      validate-trigger="change"
    >
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Email" prop="email" :rules="emailRules">
      <n-input v-model="formData.email" />
    </n-form-item>
    <n-form-item label="Notes" prop="notes">
      <n-input v-model="formData.notes" type="textarea" />
    </n-form-item>
    <div>
      <n-button @click="submit">Submit</n-button>
    </div>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { NFormInstance } from '@nio-fe/lego';
import { $message } from '@nio-fe/lego';
export default defineComponent({
  setup() {
    const formRef = ref<NFormInstance | null>(null);
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });
    const emailRules = ref([
      {
        required: true,
        message: 'Email is required!',
      },
      {
        type: 'email',
        message: 'Email format invalid!',
      },
      {
        validator(rule, value: string) {
          if (!value.endsWith('@gmail.com')) {
            return new Error('Only support gmail!');
          }
          return true;
        },
      },
    ]);

    const submit = () => {
      if (formRef.value) {
        formRef.value
          .validate()
          .then(() => {
            $message.success('Submit');
          })
          .catch(errors => {
            console.log('errors:', errors);
          });
      }
    };

    return {
      formData,
      emailRules,
      formRef,
      submit,
    };
  },
});
</script>
