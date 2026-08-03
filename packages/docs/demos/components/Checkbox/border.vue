<template>
  <div class="checkbox-border-demo">
    <h-segmented v-model:active-key="size" size="small">
      <h-segmented-item key="medium" label="Medium" />
      <h-segmented-item key="large" label="Large" />
    </h-segmented>
    <div class="checkbox-border-demo__options">
      <h-checkbox v-model="email" border :size="size">Email</h-checkbox>
      <h-checkbox v-model="push" border :size="size">Push</h-checkbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref<'medium' | 'large'>('medium');
const email = ref(true);
const push = ref(false);
</script>

<style scoped>
.checkbox-border-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-5);
}

.checkbox-border-demo__options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
}
</style>
