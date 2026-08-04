<script setup lang="ts">
import { ref } from 'vue';

const shape = ref<'round' | 'equally'>('round');
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="shape" size="small">
        <h-segmented-item value="round" label="Round" />
        <h-segmented-item value="equally" label="Equally" />
      </h-segmented>
    </div>

    <div class="tag-row">
      <h-tag :round="shape === 'round'" :equally="shape === 'equally'" :clickable="false">P0</h-tag>
      <h-tag
        type="warning"
        :round="shape === 'round'"
        :equally="shape === 'equally'"
        :clickable="false"
      >
        P1
      </h-tag>
      <h-tag
        type="info"
        :round="shape === 'round'"
        :equally="shape === 'equally'"
        :clickable="false"
      >
        P2
      </h-tag>
    </div>
  </section>
</template>

<style scoped>
.tag-row {
  display: flex;
  align-items: center;
  gap: var(--h-spacing-3);
  flex-wrap: wrap;
}
</style>
