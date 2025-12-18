<template>
  <n-form>
    <n-form-item label="Label Position">
      <n-radio-group v-model="labelPosition">
        <n-radio label="left">left</n-radio>
        <n-radio label="top">top</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="Spacing">
      <n-radio-group v-model="spacing">
        <n-radio label="default">default</n-radio>
        <n-radio label="static">static</n-radio>
        <n-radio label="compact">compact</n-radio>
        <n-radio label="dynamic">dynamic</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item v-if="!['compact', 'dynamic'].includes(spacing)" label="Tips Height">
      <n-input-number v-model="tipsHeight" :formatter="(val: number) => `${val}px`" :parser="(val: string) => val.replace(/px$/, '')" :min="6" />
    </n-form-item>
  </n-form>

  <n-divider />

  <n-form
    ref="formRef"
    :model="formData"
    :spacing="spacing"
    :label-position="labelPosition"
    label-vertical-align="top"
    :label-justify-align="labelPosition === 'left' ? 'right' : 'left'"
    label-width="120px"
    :style="{['--n-form-min-height--ext-info']: `${['compact', 'dynamic'].includes(spacing) ? 16 : tipsHeight}px`}"
    @submit.prevent="submit"
  >
    <n-form-item label="User name" prop="username" :required="true" tip="Your username">
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Email" prop="email" :required="true" tip="Your e-mail">
      <n-input v-model="formData.email" />
    </n-form-item>
    <n-form-item label="Notes" prop="notes" :required="true" tip="Your notes">
      <n-input v-model="formData.notes" type="textarea" />
    </n-form-item>
    <n-form-item>
      <n-button native-type="submit">Submit</n-button>
      <n-button @click="clearValidate">Clear Validate</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message, NFormInstance } from '@aurora/horizon-web';
import type { FormProps } from '@aurora/horizon-web';

const formRef = ref<NFormInstance>();
const spacing = ref<FormProps['spacing']>('default');
const labelPosition = ref<FormProps['labelPosition']>('left');
const tipsHeight = ref(20);
const formData = ref({
  username: '',
  email: '',
  notes: '',
});

const submit = () => {
  formRef.value?.validate().then((res) => {
    console.log('formData:', formData.value, res);
    $message.success('Submit');
  });
};

function clearValidate() {
  formRef.value?.clearValidate();
}
</script>
