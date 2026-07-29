<template>
  <h-row>
    <h-col>
      <div class="mr-4">必填星号位置</div>
      <h-radio-group v-model="requireMarkPosition" size="small">
        <h-radio-button label="left" />
        <h-radio-button label="right" />
      </h-radio-group>
    </h-col>
  </h-row>
  <h-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    :require-mark-position="requireMarkPosition"
    scroll-to-error
    @submit="submit()"
  >
    <h-form-item label="User name" prop="username">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Province" prop="province">
      <h-select v-model="formData.province" placeholder="Please select">
        <h-option label="Beijing" value="beijing" />
        <h-option label="Shanghai" value="shanghai" />
        <h-option label="Hefei" value="hefei" />
      </h-select>
    </h-form-item>
    <h-form-item label="Notes" prop="notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <div>
      <h-button native-type="submit">Submit</h-button>
      <h-button :plain="true" @click="clearValidate">Clear Validate</h-button>
      <h-button :plain="true" @click="resetFields">Reset Fields</h-button>
    </div>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HFormInstance, HFormRule } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const formRef = ref<HFormInstance | null>(null);
    const formData = ref({
      username: '',
      email: '',
      notes: '',
      province: null,
    });

    const requireMarkPosition = ref('right');

    const rules = ref<Partial<Record<keyof typeof formData.value, HFormRule | HFormRule[]>>>({
      username: [
        {
          required: true,
          message: 'User name is required!',
        },
        {
          min: 3,
          max: 100,
          message: 'User name should be 3 to 100.',
        },
      ],
      email: [
        {
          required: true,
          message: 'Email is required!',
        },
        {
          type: 'email',
          message: 'Email format invalid!',
        },
        {
          validator(rule, value: string | null) {
            if (!value?.endsWith('@gmail.com')) {
              return new Error('Only support gmail!');
            }
            return true;
          },
        },
      ],
    });

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

    const clearValidate = () => {
      formRef.value?.clearValidate();
    };

    const resetFields = () => {
      formRef.value?.resetFields();
    };

    return {
      formData,
      formRef,
      submit,
      rules,
      clearValidate,
      resetFields,
      requireMarkPosition,
    };
  },
});
</script>

<style>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
