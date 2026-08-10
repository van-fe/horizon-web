<template>
  <section class="form-render-only-demo">
    <h-form only-render :model="formData" spacing="dynamic" @submit="submit">
      <h-form-item label="Project key" prop="projectKey" required :error="errors.projectKey">
        <h-input v-model="formData.projectKey" placeholder="HORIZON" />
      </h-form-item>
      <h-form-item label="Owner email" prop="ownerEmail" required :error="errors.ownerEmail">
        <h-input v-model="formData.ownerEmail" placeholder="owner@example.com" />
      </h-form-item>
      <h-form-item label="Access reason" prop="reason" required :error="errors.reason">
        <h-input
          v-model="formData.reason"
          type="textarea"
          placeholder="Why does this project need access?"
        />
      </h-form-item>
      <h-form-item><h-button native-type="submit">Run external validation</h-button></h-form-item>
    </h-form>
    <p class="form-render-only-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const formData = reactive({ projectKey: '', ownerEmail: '', reason: '' });
const errors = reactive({ projectKey: '', ownerEmail: '', reason: '' });
const status = ref('External validation has not run');

function submit() {
  errors.projectKey = /^[A-Z][A-Z0-9_-]{2,15}$/.test(formData.projectKey)
    ? ''
    : 'Use 3–16 uppercase letters, numbers, hyphens, or underscores';
  errors.ownerEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ownerEmail)
    ? ''
    : 'Enter a valid owner email';
  errors.reason =
    formData.reason.trim().length >= 12 ? '' : 'Explain the request in 12+ characters';
  const errorCount = Object.values(errors).filter(Boolean).length;
  status.value = errorCount
    ? `External validator found ${errorCount} issue${errorCount === 1 ? '' : 's'}`
    : 'External validation passed';
}
</script>

<style scoped>
.form-render-only-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.form-render-only-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
}

.form-render-only-demo__status {
  font-size: var(--h-text-sm);
}
</style>
