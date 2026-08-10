<template>
  <section class="form-submit-state-demo">
    <h-form
      ref="formRef"
      :model="formData"
      validate-trigger="change"
      spacing="dynamic"
      @validate="onValidate"
      @submit="submit"
    >
      <h-form-item label="Release title" prop="title" :rules="titleRules">
        <h-input v-model="formData.title" placeholder="At least 6 characters" />
      </h-form-item>
      <h-form-item label="Approver email" prop="approverEmail" :rules="emailRules">
        <h-input v-model="formData.approverEmail" placeholder="approver@example.com" />
      </h-form-item>
      <h-form-item label="Coordinator note">
        <h-input v-model="formData.note" type="textarea" placeholder="Optional handoff note" />
      </h-form-item>
      <h-form-item>
        <h-button native-type="submit" :disabled="!canSubmit">Send for approval</h-button>
      </h-form-item>
    </h-form>
    <div class="form-submit-state-demo__summary" aria-live="polite">
      <span>{{ validCount }}/2 required fields valid</span>
      <strong>{{ status }}</strong>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HFormInstance, HFormRule } from '@aurora/horizon-web';
import { computed, reactive, ref } from 'vue';

const formRef = ref<HFormInstance | null>(null);
const formData = reactive({ title: '', approverEmail: '', note: '' });
const validity = reactive({ title: false, approverEmail: false });
const status = ref('Complete both required fields to enable submission');
const validCount = computed(() => Object.values(validity).filter(Boolean).length);
const canSubmit = computed(() => validCount.value === 2);
const titleRules: HFormRule[] = [
  { required: true, message: 'Enter a release title' },
  { min: 6, max: 80, message: 'Use 6–80 characters' },
];
const emailRules: HFormRule[] = [
  { required: true, message: 'Enter an approver email' },
  { type: 'email', message: 'Enter a valid email address' },
];

function onValidate(prop: string, isValidated: boolean, message?: string) {
  if (prop === 'title' || prop === 'approverEmail') validity[prop] = isValidated;
  status.value = isValidated ? `${prop} is valid` : message || `${prop} needs attention`;
}

function submit() {
  formRef.value
    ?.validate()
    .then(() => {
      status.value = `“${formData.title}” sent for approval`;
    })
    .catch(() => {
      status.value = 'Submission paused until all fields are valid';
    });
}
</script>

<style scoped>
.form-submit-state-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.form-submit-state-demo__summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--h-spacing-2);
  padding: var(--h-spacing-4);
  border-radius: var(--h-radius-m);
  background: var(--h-bg-secondary);
}

.form-submit-state-demo__summary > span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
