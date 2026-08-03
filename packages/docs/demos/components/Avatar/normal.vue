<script setup lang="ts">
const avatarSources = [
  '/demo-assets/avatar-coral.svg',
  '/demo-assets/avatar-indigo.svg',
  '/demo-assets/avatar-cyan.svg',
];
</script>

<template>
  <section class="docs-demo avatar-normal-demo">
    <div>
      <h-avatar size="large" :random-src="avatarSources" />
      <span>Random source</span>
    </div>
    <div>
      <h-avatar size="large" :src="avatarSources" />
      <span>Avatar group</span>
    </div>
  </section>
</template>

<style scoped>
.avatar-normal-demo {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--h-spacing-6);
}

.avatar-normal-demo > div {
  display: grid;
  justify-items: center;
  gap: var(--h-spacing-2);
}

.avatar-normal-demo span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
