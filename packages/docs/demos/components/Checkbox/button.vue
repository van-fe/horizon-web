<template>
  <div class="checkbox-button-demo">
    <h-checkbox-group v-model="selectedTeams">
      <h-checkbox-button v-for="team in teams" :key="team" :label="team" />
    </h-checkbox-group>
    <p aria-live="polite">Selected: {{ selectedTeams.join(', ') || 'none' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const teams = ['Design', 'Engineering', 'Research'];
const selectedTeams = ref(['Design', 'Research']);
</script>

<style scoped>
.checkbox-button-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-4);
}

.checkbox-button-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 480px) {
  .checkbox-button-demo {
    overflow-x: auto;
  }
}
</style>
