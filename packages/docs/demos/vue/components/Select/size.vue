<script setup lang="ts">
import { reactive } from 'vue';

type SelectSize = 'small' | 'medium' | 'large';

const sizes = ['small', 'medium', 'large'] as const;
const values = reactive<Record<SelectSize, string>>({
  small: 'starter',
  medium: 'team',
  large: 'enterprise',
});
const plans = [
  { value: 'starter', label: '基础版' },
  { value: 'team', label: '团队版' },
  { value: 'enterprise', label: '企业版' },
];
</script>

<template>
  <div class="size-row">
    <label v-for="size in sizes" :key="size">
      <span>{{ size }}</span>
      <h-select v-model="values[size]" :size="size" :to-body="false">
        <h-option v-for="plan in plans" :key="plan.value" v-bind="plan" />
      </h-select>
    </label>
  </div>
</template>

<style scoped>
.size-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.size-row label {
  display: grid;
  min-width: 0;
  gap: 7px;
}

.size-row span {
  color: var(--h-text-secondary);
  font-size: 12px;
}

.size-row :deep(.h-select) {
  width: 100%;
  min-width: 0;
}

@media (max-width: 560px) {
  .size-row {
    grid-template-columns: 1fr;
  }
}
</style>
