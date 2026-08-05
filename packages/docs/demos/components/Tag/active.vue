<script setup lang="ts">
import { computed, reactive } from 'vue';

const filters = reactive([
  { label: 'Mine', active: true },
  { label: 'In progress', active: true },
  { label: 'At risk', active: false },
]);
const selected = computed(() => filters.filter(item => item.active).map(item => item.label));
</script>

<template>
  <section class="docs-demo">
    <div class="tag-row">
      <h-tag v-for="item in filters" :key="item.label" v-model="item.active" round>
        {{ item.label }}
      </h-tag>
    </div>
    <p class="docs-demo__status">{{ selected.join(', ') || 'All' }}</p>
  </section>
</template>

<style scoped>
.tag-row {
  display: flex;
  gap: var(--h-spacing-3);
  flex-wrap: wrap;
}
</style>
