<template>
  <section class="form-label-append-demo">
    <h-form label-position="top" :model="formData" @submit="submit">
      <h-form-item label="Release name">
        <h-input v-model="formData.releaseName" />
      </h-form-item>
      <h-form-item label="Approval gates">
        <template #labelAppend>
          <h-space wrap>
            <h-button
              link
              size="small"
              :disabled="tags.length >= availableTags.length"
              @click="addTag"
            >
              Add gate
            </h-button>
            <h-button link size="small" :disabled="tags.length === 0" @click="clearTags">
              Clear
            </h-button>
          </h-space>
        </template>
        <h-space v-if="tags.length" wrap>
          <h-tag v-for="tag in tags" :key="tag" is-pure>{{ tag }}</h-tag>
        </h-space>
        <span v-if="tags.length === 0" class="form-label-append-demo__empty">
          No approval gates selected
        </span>
      </h-form-item>
      <h-form-item><h-button native-type="submit">Save approval flow</h-button></h-form-item>
    </h-form>
    <p class="form-label-append-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const availableTags = ['Security', 'Accessibility', 'Reliability', 'Support'];
const tags = ref(['Security', 'Accessibility']);
const formData = reactive({ releaseName: 'August reliability release' });
const status = ref('2 approval gates configured');

function addTag() {
  const nextTag = availableTags.find(tag => !tags.value.includes(tag));
  if (nextTag) tags.value.push(nextTag);
  status.value = `${tags.value.length} approval gates configured`;
}

function clearTags() {
  tags.value = [];
  status.value = 'Approval gates cleared';
}

function submit() {
  status.value = `Saved ${tags.value.length} gates for ${formData.releaseName}`;
}
</script>

<style scoped>
.form-label-append-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.form-label-append-demo__empty,
.form-label-append-demo__status {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.form-label-append-demo__status {
  margin: 0;
}
</style>
