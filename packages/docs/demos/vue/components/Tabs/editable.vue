<script setup lang="ts">
import { ref } from 'vue';
import type { HTabValue } from '@aurora/horizon-web';

interface DocumentTab {
  key: string;
  label: string;
  closable: boolean;
}

const activeKey = ref('overview');
const counter = ref(2);
const status = ref('Use + to add a tab or close an editable tab.');
const documents = ref<DocumentTab[]>([
  { key: 'overview', label: 'Overview', closable: false },
  { key: 'brief-1', label: 'Research brief', closable: true },
  { key: 'brief-2', label: 'Launch notes', closable: true },
]);

function addDocument() {
  counter.value += 1;
  const document = {
    key: `brief-${counter.value}`,
    label: `Untitled ${counter.value}`,
    closable: true,
  };
  documents.value = [...documents.value, document];
  activeKey.value = document.key;
  status.value = `${document.label} added.`;
}

function closeDocument(key: HTabValue) {
  const target = documents.value.find(document => document.key === key);
  documents.value = documents.value.filter(document => document.key !== key);
  if (activeKey.value === key) activeKey.value = documents.value[0]?.key ?? '';
  status.value = `${target?.label ?? String(key)} closed.`;
}
</script>

<template>
  <div class="tabs-editable-demo">
    <h-tabs
      v-model:active-key="activeKey"
      editable
      type="card"
      @add="addDocument"
      @close="closeDocument"
    >
      <h-tab
        v-for="document in documents"
        :key="document.key"
        :label="document.label"
        :closable="document.closable"
      />
    </h-tabs>
    <p aria-live="polite">{{ status }}</p>
  </div>
</template>

<style scoped>
.tabs-editable-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-editable-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
