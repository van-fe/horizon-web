<script setup lang="ts">
const samples = [
  {
    label: 'Team icon',
    icon: 'friend',
  },
  {
    label: 'Platform Design',
    src: 'PD',
  },
  {
    label: 'Growth',
    icon: 'friend',
    color: 'var(--h-text-success-default)',
  },
  {
    label: 'Risk',
    icon: 'friend',
    color: 'var(--h-text-warning-default)',
  },
  {
    label: 'Operations',
    icon: 'friend',
    color: 'var(--h-text-error-default)',
  },
];
</script>

<template>
  <div class="avatar-work-demo">
    <div v-for="sample in samples" :key="sample.label">
      <h-avatar
        :icon="sample.icon"
        :src="sample.src"
        type="work"
        size="large"
        :style="sample.color ? { color: sample.color, borderColor: sample.color } : undefined"
      />
      <span>{{ sample.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.avatar-work-demo {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--h-spacing-5);
}

.avatar-work-demo > div {
  display: grid;
  justify-items: center;
  gap: var(--h-spacing-2);
}

.avatar-work-demo span {
  color: var(--h-text-secondary);
  font-size: 12px;
}
</style>
