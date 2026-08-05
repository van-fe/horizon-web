<template>
  <section class="form-compact-demo">
    <label class="form-compact-demo__control">
      <h-switch v-model="compact" />
      Compact spacing
    </label>

    <h-form
      ref="formRef"
      :model="formData"
      :spacing="compact ? 'compact' : 'default'"
      label-position="left"
      label-vertical-align="middle"
      label-justify-align="right"
      label-width="132px"
      @submit="submit"
    >
      <h-form-item label="Release name" prop="releaseName" required>
        <h-input v-model="formData.releaseName" placeholder="Release name" />
      </h-form-item>
      <h-form-item label="Owner email" prop="ownerEmail" required>
        <h-input v-model="formData.ownerEmail" placeholder="owner@example.com" />
      </h-form-item>
      <h-form-item label="Change note" prop="note" required tip="Visible in default spacing.">
        <h-input v-model="formData.note" type="textarea" placeholder="Release context" />
      </h-form-item>
      <h-form-item><h-button native-type="submit">Validate spacing</h-button></h-form-item>
    </h-form>
    <p class="form-compact-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import type { HFormInstance } from '@aurora/horizon-web';
import { reactive, ref } from 'vue';

const formRef = ref<HFormInstance | null>(null);
const compact = ref(true);
const formData = reactive({ releaseName: '', ownerEmail: '', note: '' });
const status = ref('Compact spacing is active');

function submit() {
  formRef.value
    ?.validate()
    .then(() => {
      status.value = `Valid form using ${compact.value ? 'compact' : 'default'} spacing`;
    })
    .catch(() => {
      status.value = compact.value
        ? 'Validation ran; switch to default spacing to inspect messages'
        : 'Review the visible validation messages';
    });
}
</script>

<style scoped>
.form-compact-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.form-compact-demo__control {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  gap: var(--h-spacing-2);
}

.form-compact-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
}

.form-compact-demo__status {
  font-size: var(--h-text-sm);
}

@media (max-width: 520px) {
  .form-compact-demo :deep(.h-form-item) {
    flex-direction: column;
  }
}
</style>
