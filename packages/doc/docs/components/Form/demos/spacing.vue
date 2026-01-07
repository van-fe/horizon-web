<template>
  <h-form>
    <h-form-item label="Label Position">
      <h-radio-group v-model="labelPosition">
        <h-radio label="left">left</h-radio>
        <h-radio label="top">top</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="Spacing">
      <h-radio-group v-model="spacing">
        <h-radio label="default">default</h-radio>
        <h-radio label="static">static</h-radio>
        <h-radio label="compact">compact</h-radio>
        <h-radio label="dynamic">dynamic</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item v-if="!['compact', 'dynamic'].includes(spacing)" label="Tips Height">
      <h-input-number v-model="tipsHeight" :formatter="(val: number) => `${val}px`" :parser="(val: string) => val.replace(/px$/, '')" :min="6" />
    </h-form-item>
  </h-form>

  <h-divider />

  <h-form
    ref="formRef"
    :model="formData"
    :spacing="spacing"
    :label-position="labelPosition"
    label-vertical-align="top"
    :label-justify-align="labelPosition === 'left' ? 'right' : 'left'"
    label-width="120px"
    :style="{['--h-form-mih-height--ext-info']: `${['compact', 'dynamic'].includes(spacing) ? 16 : tipsHeight}px`}"
    @submit.prevent="submit"
  >
    <h-form-item label="User name" prop="username" :required="true" tip="Your username">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email" :required="true" tip="Your e-mail">
      <h-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes" prop="notes" :required="true" tip="Your notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <h-form-item>
      <h-button native-type="submit">Submit</h-button>
      <h-button @click="clearValidate">Clear Validate</h-button>
    </h-form-item>
  </h-form>
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
    console.info('formData:', formData.value, res);
    $message.success('Submit');
  });
};

function clearValidate() {
  formRef.value?.clearValidate();
}
</script>
