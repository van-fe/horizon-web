<script setup lang="ts">
import { ref } from 'vue';

const nextId = ref(4);
const items = ref([
  { id: 1, label: 'Design review' },
  { id: 2, label: 'Accessibility check' },
  { id: 3, label: 'Release approval' },
]);

function add() {
  items.value.push({ id: nextId.value, label: `Task ${nextId.value}` });
  nextId.value += 1;
}
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__actions">
      <h-button @click="add">Add</h-button>
      <h-button :disabled="!items.length" @click="items.shift()">Remove first</h-button>
    </div>
    <h-transition name="float" group>
      <div v-for="item in items" :key="item.id" class="list-item">{{ item.label }}</div>
    </h-transition>
  </section>
</template>

<style scoped>
.list-item {
  margin-bottom: var(--h-spacing-2);
  border-radius: var(--h-radius-m);
  padding: var(--h-spacing-3);
  color: var(--h-text-secondary);
  background: var(--h-bg-secondary);
}
</style>
