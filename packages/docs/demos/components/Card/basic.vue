<template>
  <div class="card-basic-demo">
    <div class="card-basic-demo__options">
      <label>
        <span>Corner radius</span>
        <h-segmented v-model:active-key="radius" size="small">
          <h-segmented-item
            v-for="option in radiusOptions"
            :key="option"
            :value="option"
            :label="option"
          />
        </h-segmented>
      </label>
      <h-switch v-model="border" label="Show border" status />
    </div>

    <h-card title="Horizon Web 2.8" :radius="radius" :border="border">
      <div class="card-basic-demo__content">
        <h-tag size="small" :clickable="false">Ready for review</h-tag>
        <p>
          The accessibility pass is complete and the release candidate is ready for final approval.
        </p>
      </div>
    </h-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const radius = ref<'none' | 'small' | 'medium' | 'large'>('medium');
const radiusOptions = ['none', 'small', 'medium', 'large'];
const border = ref(true);
</script>

<style scoped>
.card-basic-demo,
.card-basic-demo__content,
.card-basic-demo__options label {
  display: grid;
  gap: var(--h-spacing-3);
}

.card-basic-demo {
  max-width: 640px;
  gap: var(--h-spacing-4);
}

.card-basic-demo__options {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  gap: var(--h-spacing-4);
}

.card-basic-demo__options label {
  min-width: min(100%, 280px);
}

.card-basic-demo__options span,
.card-basic-demo__content p {
  color: var(--h-text-secondary);
}

.card-basic-demo__options span {
  font-size: var(--h-text-sm);
}

.card-basic-demo__content {
  justify-items: start;
}

.card-basic-demo__content p {
  margin: 0;
  line-height: 1.7;
}
</style>
