<template>
  <section class="form-basic-demo">
    <h-form :model="formData" :cols="{ xs: 1, md: 2 }" :gap="16" @submit="submit">
      <h-form-item label="Release name" tip="Use a name teammates can recognize.">
        <h-input v-model="formData.releaseName" placeholder="August reliability release" />
      </h-form-item>
      <h-form-item label="Owner email">
        <h-input v-model="formData.ownerEmail" placeholder="owner@example.com" />
      </h-form-item>
      <h-form-item label="Release summary" :span="{ xs: 1, md: 2 }">
        <h-input
          v-model="formData.summary"
          type="textarea"
          :maxlength="160"
          show-limit
          placeholder="What changes and who is affected?"
        />
      </h-form-item>
      <h-form-item :span="{ xs: 1, md: 2 }">
        <h-button native-type="submit">Save release brief</h-button>
      </h-form-item>
    </h-form>
    <p class="form-basic-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const formData = reactive({
  releaseName: 'August reliability release',
  ownerEmail: 'maya@example.com',
  summary: 'Improves retry visibility and the incident handoff experience.',
});
const status = ref('Draft changes are local');

function submit() {
  status.value = `Saved “${formData.releaseName || 'Untitled release'}” for ${formData.ownerEmail || 'an unassigned owner'}`;
}
</script>

<style scoped>
.form-basic-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.form-basic-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
