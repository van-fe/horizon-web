<script setup lang="ts">
import { ref } from 'vue';

const active = ref('team');
const plans = [
  { key: 'solo', name: 'Solo', detail: '1 workspace', icon: 'user_filled' },
  { key: 'team', name: 'Team', detail: '20 seats', icon: 'friend' },
  { key: 'scale', name: 'Scale', detail: 'Unlimited', icon: 'operation_mgmt' },
];
</script>

<template>
  <h-segmented v-model:active-key="active" block>
    <h-segmented-item v-for="plan in plans" :key="plan.key" :value="plan.key">
      <template #default>
        <span class="custom-item">
          <a-icon :name="plan.icon" size="16" />
          <strong>{{ plan.name }}</strong>
          <small>{{ plan.detail }}</small>
        </span>
      </template>
    </h-segmented-item>
  </h-segmented>
</template>

<style scoped>
.custom-item {
  display: grid;
  justify-items: center;
  gap: var(--h-spacing-1);
}

.custom-item small {
  color: var(--h-text-secondary);
}
</style>
