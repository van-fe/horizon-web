<template>
  <section class="form-disabled-demo">
    <label class="form-disabled-demo__control">
      <h-switch v-model="disabled" />
      Lock the full release request
    </label>

    <h-form :model="formData" :disabled="disabled" spacing="dynamic" @submit="submit">
      <h-grid :cols="{ xs: 1, md: 2 }" :gap="16">
        <h-grid-item>
          <h-form-item label="Release name" required>
            <h-input v-model="formData.releaseName" clearable />
          </h-form-item>
        </h-grid-item>
        <h-grid-item>
          <h-form-item label="Environment" required>
            <h-select v-model="formData.environment">
              <h-option label="Production" value="production" />
              <h-option label="Staging" value="staging" />
            </h-select>
          </h-form-item>
        </h-grid-item>
      </h-grid>
      <h-form-item label="Review teams" required>
        <h-cascader
          v-model="formData.reviewTeams"
          aria-label="Review teams"
          :options="workspaceOptions"
          multiple
          clearable
          collapse-tags
          :to-body="false"
        />
      </h-form-item>
      <h-form-item label="Automation">
        <h-space wrap>
          <label>
            <h-switch v-model="formData.autoRollback" />
            Automatic rollback
          </label>
          <h-checkbox v-model="formData.notifyOwners">Notify service owners</h-checkbox>
        </h-space>
      </h-form-item>
      <h-form-item label="Release note">
        <h-input v-model="formData.note" type="textarea" :maxlength="120" show-limit />
      </h-form-item>
      <h-form-item><h-button native-type="submit">Save request</h-button></h-form-item>
    </h-form>
    <p class="form-disabled-demo__status" aria-live="polite">
      {{ disabled ? 'The release request is locked and read-only' : status }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { workspaceOptions } from '../Cascader/options';

const disabled = ref(true);
const formData = reactive({
  releaseName: 'August reliability release',
  environment: 'production',
  reviewTeams: [
    ['product', 'design-system', 'accessibility'],
    ['engineering', 'reliability', 'observability'],
  ],
  autoRollback: true,
  notifyOwners: true,
  note: 'Pause rollout if the retry error budget drops below the threshold.',
});
const status = ref('Release request unlocked for editing');

function submit() {
  status.value = `Saved ${formData.releaseName}`;
}
</script>

<style scoped>
.form-disabled-demo {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--h-spacing-4);
}

.form-disabled-demo__control,
.form-disabled-demo label {
  display: inline-flex;
  align-items: center;
  gap: var(--h-spacing-2);
}

.form-disabled-demo__control {
  width: fit-content;
  padding: var(--h-spacing-3) var(--h-spacing-4);
  border-radius: var(--h-radius-m);
  background: var(--h-bg-secondary);
}

.form-disabled-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
