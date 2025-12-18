<template>
  <n-row>
    <n-col>
      <div class="mr-4">必填星号位置</div>
      <n-radio-group v-model="requireMarkPosition" size="small">
        <n-radio-button label="left" />
        <n-radio-button label="right" />
      </n-radio-group>
    </n-col>
  </n-row>
  <n-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    :require-mark-position="requireMarkPosition"
    scroll-to-error
    @submit="submit()"
  >
    <n-form-item label="User name" prop="username">
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Email" prop="email">
      <n-input v-model="formData.email" />
    </n-form-item>
    <n-form-item label="Province" prop="province">
      <n-select v-model="formData.province" placeholder="Please select">
        <n-option label="Beijing" value="beijing" />
        <n-option label="Shanghai" value="shanghai" />
        <n-option label="Hefei" value="hefei" />
      </n-select>
    </n-form-item>
    <n-form-item label="Notes" prop="notes">
      <n-input v-model="formData.notes" type="textarea" />
    </n-form-item>
    <div>
      <n-button native-type="submit">Submit</n-button>
      <n-button :plain="true" @click="clearValidate">Clear Validate</n-button>
      <n-button :plain="true" @click="resetFields">Reset Fields</n-button>
    </div>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { NFormInstance, NFormRule } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const formRef = ref<NFormInstance | null>(null);
    const formData = ref({
      username: '',
      email: '',
      notes: '',
      province: null,
    });

    const requireMarkPosition = ref('right');

    const rules = ref<Partial<Record<keyof typeof formData.value, NFormRule | NFormRule[]>>>({
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
            console.log('errors:', errors);
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
.n-button + .n-button {
  margin-left: 10px;
}
</style>
