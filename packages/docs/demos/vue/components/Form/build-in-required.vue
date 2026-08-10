<template>
  <section class="form-required-demo">
    <h-form
      ref="formRef"
      :model="formData"
      required-use-label
      scroll-to-error
      spacing="dynamic"
      @submit="submit"
    >
      <h-form-item label="Release name" prop="releaseName" required>
        <h-input v-model="formData.releaseName" placeholder="Release name" />
      </h-form-item>
      <h-form-item label="Owner email" prop="ownerEmail" required>
        <h-input v-model="formData.ownerEmail" placeholder="owner@example.com" />
      </h-form-item>
      <h-form-item label="Coordination note">
        <h-input v-model="formData.note" type="textarea" placeholder="Optional note" />
      </h-form-item>
      <h-form-item><h-button native-type="submit">Check required fields</h-button></h-form-item>
    </h-form>
    <p class="form-required-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import type { HFormInstance } from '@aurora/horizon-web';
import { reactive, ref } from 'vue';

const formRef = ref<HFormInstance | null>(null);
const formData = reactive({ releaseName: '', ownerEmail: '', note: '' });
const status = ref('Submit to see localized required messages');

function submit() {
  formRef.value
    ?.validate()
    .then(() => {
      status.value = `Required fields complete for ${formData.releaseName}`;
    })
    .catch(() => {
      status.value = 'Complete each required field';
    });
}
</script>

<style scoped>
.form-required-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.form-required-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
}

.form-required-demo__status {
  font-size: var(--h-text-sm);
}
</style>
