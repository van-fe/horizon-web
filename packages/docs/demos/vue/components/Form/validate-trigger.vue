<template>
  <section class="form-trigger-demo">
    <h-form
      ref="formRef"
      :model="formData"
      validate-trigger="blur"
      spacing="dynamic"
      @validate="onValidate"
      @submit="submit"
    >
      <h-form-item
        label="Change title · validates on change"
        prop="title"
        :rules="titleRules"
        validate-trigger="change"
      >
        <h-input v-model="formData.title" placeholder="Production change title" />
      </h-form-item>
      <h-form-item label="Owner email · validates on blur" prop="ownerEmail" :rules="emailRules">
        <h-input v-model="formData.ownerEmail" placeholder="owner@example.com" />
      </h-form-item>
      <h-form-item label="Change summary">
        <h-input v-model="formData.summary" type="textarea" placeholder="Optional context" />
      </h-form-item>
      <h-form-item><h-button native-type="submit">Validate all fields</h-button></h-form-item>
    </h-form>
    <p class="form-trigger-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import type { HFormInstance, HFormRule } from '@aurora/horizon-web';
import { reactive, ref } from 'vue';

const formRef = ref<HFormInstance | null>(null);
const formData = reactive({ title: '', ownerEmail: '', summary: '' });
const status = ref('No validation event yet');
const titleRules: HFormRule[] = [
  { required: true, message: 'Enter a change title' },
  { min: 6, message: 'Use at least 6 characters' },
];
const emailRules: HFormRule[] = [
  { required: true, message: 'Enter an owner email' },
  { type: 'email', message: 'Enter a valid email address' },
];

function onValidate(prop: string, valid: boolean, message?: string) {
  status.value = valid ? `${prop} passed validation` : message || `${prop} needs attention`;
}

function submit() {
  formRef.value
    ?.validate()
    .then(() => {
      status.value = 'All release fields are valid';
    })
    .catch(() => {
      status.value = 'Validation found fields that need attention';
    });
}
</script>

<style scoped>
.form-trigger-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.form-trigger-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
}

.form-trigger-demo__status {
  font-size: var(--h-text-sm);
}
</style>
