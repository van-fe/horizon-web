<template>
  <section class="docs-demo">
    <div class="picker-stage">
      <label>Owning team</label>
      <h-picker
        v-model="selectedTeam"
        :fit-input-width="false"
        :to-body="false"
        clearable
        arrow
        placeholder="Choose a team"
      >
        <div class="picker-options">
          <span>Available teams</span>
          <h-radio-group v-model="selectedTeam">
            <h-space direction="vertical">
              <h-radio v-for="team in teams" :key="team" :value="team">{{ team }}</h-radio>
            </h-space>
          </h-radio-group>
        </div>
      </h-picker>
      <output class="docs-demo__value">{{ selectedTeam || 'No team selected' }}</output>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const teams = ['Design Systems', 'Frontend Platform', 'Quality Engineering'];
const selectedTeam = ref('Design Systems');
</script>

<style scoped>
.picker-stage {
  display: grid;
  gap: var(--h-spacing-3);
  place-items: start;
}

.picker-stage > label,
.picker-options > span {
  color: var(--h-text-primary);
  font-weight: var(--h-weight-strong);
}

.picker-options {
  display: grid;
  min-width: 220px;
  gap: var(--h-spacing-3);
  padding: var(--h-spacing-4);
}
</style>
