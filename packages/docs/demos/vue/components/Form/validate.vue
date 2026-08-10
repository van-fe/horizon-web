<template>
  <section class="form-validate-demo">
    <h-form ref="formRef" :model="formData" spacing="dynamic" @submit="submit">
      <h-form-item label="Change title" prop="title" :rules="titleRules">
        <h-input v-model="formData.title" placeholder="Describe the production change" />
      </h-form-item>
      <h-form-item label="Approver email" prop="approverEmail" :rules="emailRules">
        <h-input v-model="formData.approverEmail" placeholder="approver@example.com" />
      </h-form-item>
      <h-form-item
        label="Risk summary"
        prop="risk"
        :rules="{ required: true, message: 'Describe the release risk' }"
      >
        <h-input
          v-model="formData.risk"
          type="textarea"
          placeholder="Impact, safeguards, and rollback conditions"
        />
      </h-form-item>
      <h-form-item><h-button native-type="submit">Validate request</h-button></h-form-item>
    </h-form>
    <p class="form-validate-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import type { HFormInstance, HFormRule } from '@aurora/horizon-web';
import { reactive, ref } from 'vue';

const formRef = ref<HFormInstance | null>(null);
const formData = reactive({ title: '', approverEmail: '', risk: '' });
const status = ref('Complete the request, then validate every field');
const titleRules: HFormRule[] = [
  { required: true, message: 'Enter a change title' },
  { min: 6, max: 80, message: 'Use 6–80 characters' },
];
const emailRules: HFormRule[] = [
  { required: true, message: 'Enter an approver email' },
  { type: 'email', message: 'Enter a valid email address' },
  {
    validator: (_rule, value: string) =>
      value.endsWith('@example.com') || new Error('Use an @example.com approver'),
  },
];

function submit() {
  formRef.value
    ?.validate()
    .then(() => {
      status.value = `Request “${formData.title}” is ready for approval`;
    })
    .catch(() => {
      status.value = 'Review the highlighted fields before submitting';
    });
}
</script>

<style scoped>
.form-validate-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.form-validate-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
