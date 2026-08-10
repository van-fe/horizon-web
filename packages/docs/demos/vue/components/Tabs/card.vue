<script setup lang="ts">
import { computed, ref } from 'vue';

const activeKey = ref('profile');
const settings = [
  { key: 'profile', label: 'Profile', detail: 'Name, avatar, role, and contact information.' },
  { key: 'security', label: 'Security', detail: 'Password, passkeys, and recent activity.' },
  { key: 'notifications', label: 'Notifications', detail: 'Updates, alerts, and summaries.' },
];
const activeSetting = computed(() => settings.find(item => item.key === activeKey.value)!);
</script>

<template>
  <div class="tabs-card-demo">
    <h-tabs v-model:active-key="activeKey" type="card">
      <h-tab v-for="item in settings" :key="item.key" :label="item.label" />
    </h-tabs>
    <p aria-live="polite">{{ activeSetting.detail }}</p>
  </div>
</template>

<style scoped>
.tabs-card-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-card-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}
</style>
