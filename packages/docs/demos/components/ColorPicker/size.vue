<script setup lang="ts">
import { reactive } from 'vue';

const sizes = [
  { key: 'small' as const, label: 'Small' },
  { key: 'medium' as const, label: 'Medium' },
  { key: 'large' as const, label: 'Large' },
];
const values = reactive({
  small: '#E83030',
  medium: '#178CA6',
  large: '#6F5AE8',
});
</script>

<template>
  <div class="color-size-demo">
    <label v-for="size in sizes" :key="size.key">
      <span>{{ size.label }}</span>
      <h-color-picker
        v-model="values[size.key]"
        trigger-type="square"
        square-text
        :size="size.key"
        alpha
      >
        <template #squareText>{{ size.label }}</template>
      </h-color-picker>
    </label>
  </div>
</template>

<style scoped>
.color-size-demo {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: var(--h-spacing-5);
}

.color-size-demo label {
  display: grid;
  gap: var(--h-spacing-2);
}

.color-size-demo label > span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
