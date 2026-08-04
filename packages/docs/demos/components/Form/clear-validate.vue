<template>
  <section class="form-clear-demo">
    <div class="form-clear-demo__control" role="group" aria-label="Required mark position">
      <span>Required mark</span>
      <h-segmented v-model:active-key="requireMarkPosition" size="small">
        <h-segmented-item value="left" label="Left" />
        <h-segmented-item value="right" label="Right" />
      </h-segmented>
    </div>

    <h-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :require-mark-position="requireMarkPosition"
      scroll-to-error
      spacing="dynamic"
      @submit="submit"
    >
      <h-form-item label="Service" prop="service">
        <h-input v-model="formData.service" placeholder="Service name" />
      </h-form-item>
      <h-form-item label="Owner email" prop="ownerEmail">
        <h-input v-model="formData.ownerEmail" placeholder="owner@example.com" />
      </h-form-item>
      <h-form-item label="Region" prop="region">
        <h-select v-model="formData.region" placeholder="Choose a region">
          <h-option label="Asia Pacific" value="apac" />
          <h-option label="Europe" value="europe" />
          <h-option label="North America" value="north-america" />
        </h-select>
      </h-form-item>
      <h-form-item>
        <h-space wrap>
          <h-button native-type="submit">Validate</h-button>
          <h-button plain @click="clearValidation">Clear messages</h-button>
          <h-button plain @click="resetFields">Reset values</h-button>
        </h-space>
      </h-form-item>
    </h-form>
    <p class="form-clear-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import type { HFormInstance, HFormRule } from '@aurora/horizon-web';
import { reactive, ref } from 'vue';

const formRef = ref<HFormInstance | null>(null);
const formData = reactive({ service: '', ownerEmail: '', region: null as string | null });
const requireMarkPosition = ref<'left' | 'right'>('right');
const status = ref('Validation has not run');
const rules: Record<string, HFormRule | HFormRule[]> = {
  service: [
    { required: true, message: 'Enter a service name' },
    { min: 3, message: 'Use at least 3 characters' },
  ],
  ownerEmail: [
    { required: true, message: 'Enter an owner email' },
    { type: 'email', message: 'Enter a valid email address' },
  ],
  region: { required: true, message: 'Choose a deployment region' },
};

function submit() {
  formRef.value
    ?.validate()
    .then(() => {
      status.value = 'All deployment fields are valid';
    })
    .catch(() => {
      status.value = 'Validation found fields that need attention';
    });
}

function clearValidation() {
  formRef.value?.clearValidate();
  status.value = 'Validation messages cleared; values kept';
}

function resetFields() {
  formRef.value?.resetFields();
  status.value = 'Values and validation reset';
}
</script>

<style scoped>
.form-clear-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.form-clear-demo__control {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
  padding: var(--h-spacing-4);
  border-radius: var(--h-radius-m);
  background: var(--h-bg-secondary);
}

.form-clear-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
