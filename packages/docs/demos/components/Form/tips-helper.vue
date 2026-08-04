<template>
  <section class="form-helper-demo">
    <div class="form-helper-demo__control" role="group" aria-label="Helper theme">
      <span>Helper theme</span>
      <h-segmented v-model:active-key="helperTheme" size="small">
        <h-segmented-item value="light" label="Light" />
        <h-segmented-item value="dark" label="Dark" />
      </h-segmented>
    </div>

    <h-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :helper-theme="helperTheme"
      spacing="dynamic"
      @submit="submit"
    >
      <h-form-item
        label="Repository"
        prop="repository"
        helper="Choose the repository that owns the production service."
        helper-placement="before-label"
      >
        <h-select v-model="formData.repository" placeholder="Choose a repository">
          <h-option label="horizon-web" value="horizon-web" />
          <h-option label="customer-portal" value="customer-portal" />
          <h-option label="release-service" value="release-service" />
        </h-select>
      </h-form-item>

      <h-form-item label="Change window" prop="changeWindow" helper-placement="after-label">
        <template #helper>Select the approved UTC deployment window for this service.</template>
        <h-input v-model="formData.changeWindow" placeholder="14:00–15:00 UTC" />
      </h-form-item>

      <h-form-item label="Rollback owner" prop="rollbackOwner" :helper="rollbackHelper">
        <h-input v-model="formData.rollbackOwner" placeholder="on-call@example.com" />
      </h-form-item>

      <h-form-item label="Operator note" tip="Visible to the release coordinator.">
        <h-input
          v-model="formData.note"
          type="textarea"
          :maxlength="120"
          show-limit
          placeholder="Optional coordination note"
        />
      </h-form-item>

      <h-form-item><h-button native-type="submit">Review deployment</h-button></h-form-item>
    </h-form>
    <p class="form-helper-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import type { HFormInstance, HFormItemHelper, HFormRule } from '@aurora/horizon-web';
import { reactive, ref } from 'vue';

const formRef = ref<HFormInstance | null>(null);
const helperTheme = ref<'light' | 'dark'>('light');
const formData = reactive({
  repository: 'horizon-web',
  changeWindow: '14:00–15:00 UTC',
  rollbackOwner: '',
  note: 'Coordinate the dashboard smoke test after rollout.',
});
const status = ref('Open a helper to inspect its placement and theme');
const rollbackHelper: HFormItemHelper = {
  title: 'Rollback contact',
  content: 'Use the address monitored by the team during the full change window.',
  trigger: 'click',
};
const rules: Record<string, HFormRule> = {
  repository: { required: true, message: 'Choose a repository' },
  changeWindow: { required: true, message: 'Enter an approved change window' },
  rollbackOwner: {
    required: true,
    type: 'email',
    message: 'Enter a valid rollback contact',
  },
};

function submit() {
  formRef.value
    ?.validate()
    .then(() => {
      status.value = `Deployment review ready for ${formData.repository}`;
    })
    .catch(() => {
      status.value = 'Complete the required deployment details';
    });
}
</script>

<style scoped>
.form-helper-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.form-helper-demo__control {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
  padding: var(--h-spacing-4);
  border-radius: var(--h-radius-m);
  background: var(--h-bg-secondary);
}

.form-helper-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
