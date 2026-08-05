<template>
  <section class="backtop-custom-demo">
    <span aria-live="polite">{{ status }}</span>
    <h-backtop
      :right="24"
      :bottom="170"
      :visibility-height="160"
      @click="status = 'Custom action returned to the top'"
    >
      <span class="backtop-custom-demo__action">
        <IconArrowUp :size="14" />
        Top
      </span>
    </h-backtop>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconArrowUp } from '@aurora/icon';

const status = ref('Scroll the page to preview the custom action');
</script>

<style scoped>
.backtop-custom-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.backtop-custom-demo > span {
  color: var(--h-text-secondary);
}

.backtop-custom-demo__action {
  display: inline-flex;
  align-items: center;
  gap: var(--h-spacing-1);
  font-size: var(--h-text-sm);
  font-weight: var(--h-weight-strong);
}
</style>
