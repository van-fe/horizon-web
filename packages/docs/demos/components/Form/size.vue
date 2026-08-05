<template>
  <section class="form-size-demo">
    <div class="form-size-demo__control" role="group" aria-label="Form size">
      <span>Form size</span>
      <h-segmented v-model:active-key="size" size="small">
        <h-segmented-item value="small" label="Small" />
        <h-segmented-item value="medium" label="Medium" />
        <h-segmented-item value="large" label="Large" />
      </h-segmented>
    </div>
    <h-form :model="formData" :size="size" @submit="submit">
      <h-grid :cols="{ xs: 1, md: 2 }" :gap="16">
        <h-grid-item>
          <h-form-item label="Environment">
            <h-select v-model="formData.environment" aria-label="Environment">
              <h-option label="Production" value="production" />
              <h-option label="Staging" value="staging" />
              <h-option label="Preview" value="preview" />
            </h-select>
          </h-form-item>
        </h-grid-item>
        <h-grid-item>
          <h-form-item label="Change owner">
            <h-input v-model="formData.owner" placeholder="Owner name" />
          </h-form-item>
        </h-grid-item>
      </h-grid>
      <h-form-item label="Change note">
        <h-input v-model="formData.note" placeholder="Short deployment note" />
      </h-form-item>
      <h-form-item><h-button native-type="submit">Queue deployment</h-button></h-form-item>
    </h-form>
    <p class="form-size-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const size = ref<'small' | 'medium' | 'large'>('medium');
const formData = reactive({
  environment: 'staging',
  owner: 'Maya Chen',
  note: 'Verify retry metrics before promotion.',
});
const status = ref('Compare how size propagates to every form control');

function submit() {
  status.value = `${formData.environment} deployment queued at ${size.value} size`;
}
</script>

<style scoped>
.form-size-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.form-size-demo__control {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
  padding: var(--h-spacing-4);
  border-radius: var(--h-radius-m);
  background: var(--h-bg-secondary);
}

.form-size-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
