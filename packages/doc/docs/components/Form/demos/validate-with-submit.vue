<template>
  <h-form ref="formRef" :model="formData" validate-trigger="change" @validate="onValidateChange">
    <h-form-item
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
    >
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email" :rules="emailRules">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes" prop="notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <div>
      <h-button :disabled="!canSubmit" @click="submit">Submit</h-button>
    </div>
  </h-form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import type { NFormInstance } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const formRef = ref<NFormInstance | null>(null);
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });

    const validateInfo = ref<Record<string, boolean>>({
      username: false,
      email: false,
      notes: true,
    });

    const canSubmit = computed(() => !Object.values(validateInfo.value).some(curr => !curr));

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
        validator(rule: any, value: string) {
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
            console.info('errors:', errors);
          });
      }
    };

    const onValidateChange = (
      prop: keyof (typeof formData)['value'],
      isValidated: boolean,
      message?: string,
    ) => {
      console.info(`[${prop}] field is ${isValidated}${isValidated ? '' : `: ${message}`}`);
      validateInfo.value[prop] = isValidated;
    };

    return {
      formData,
      emailRules,
      formRef,
      submit,
      canSubmit,
      onValidateChange,
      validateInfo,
    };
  },
});
</script>
