<template>
  <div class="badge-icon-list">
    <div v-for="item in samples" :key="item.iconSize">
      <h-badge
        type="icon"
        content="owner_os"
        :icon-size="item.iconSize"
        icon-color="var(--h-text-brand-default)"
        align="inner"
        bottom
      >
        <h-avatar type="work" :src="item.avatar" :size="item.size" />
      </h-badge>
      <span>{{ item.iconSize }}px</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const samples = [
  { avatar: 'UX', size: 'small' as const, iconSize: 12 },
  { avatar: 'Web', size: 'medium' as const, iconSize: 16 },
  { avatar: 'Core', size: 'large' as const, iconSize: 20 },
];
</script>

<style scoped>
.badge-icon-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-4);
}

.badge-icon-list > div {
  display: grid;
  justify-items: center;
  gap: var(--h-spacing-2);
}

.badge-icon-list span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
