<script setup lang="ts">
import { ref } from 'vue';

const initial = ['Owner: Mia', 'Status: Active', 'Version: v3.8'];
const tags = ref([...initial]);
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__actions">
      <h-button
        size="small"
        :disabled="tags.length === initial.length"
        @click="tags = [...initial]"
      >
        Reset
      </h-button>
    </div>
    <div class="tag-row">
      <h-tag
        v-for="tag in tags"
        :key="tag"
        closable
        plain
        :clickable="false"
        @close="tags = tags.filter(item => item !== tag)"
      >
        {{ tag }}
      </h-tag>
    </div>
  </section>
</template>

<style scoped>
.tag-row {
  display: flex;
  gap: var(--h-spacing-3);
  flex-wrap: wrap;
}
</style>
