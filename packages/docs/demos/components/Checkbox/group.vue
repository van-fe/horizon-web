<template>
  <div class="checkbox-group-demo">
    <h-checkbox-group v-model="selectedTeams">
      <h-checkbox v-for="team in teams" :key="team" :label="team">{{ team }}</h-checkbox>
    </h-checkbox-group>
    <p aria-live="polite">Editable: {{ selectedTeams.join(', ') || 'none' }}</p>

    <h-checkbox-group v-model="lockedTeams" disabled>
      <h-checkbox v-for="team in teams" :key="team" :label="team">{{ team }}</h-checkbox>
    </h-checkbox-group>
    <p>Inherited (disabled): {{ lockedTeams.join(', ') }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const teams = ['Design', 'Engineering', 'Operations'];
const selectedTeams = ref(['Design', 'Engineering']);
const lockedTeams = ref(['Operations']);
</script>

<style scoped>
.checkbox-group-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.checkbox-group-demo :deep(.h-checkbox-group) {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-4);
}

.checkbox-group-demo p {
  margin: 0 0 var(--h-spacing-3);
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.checkbox-group-demo p:last-child {
  margin-bottom: 0;
}
</style>
