<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

const spinning = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

const refresh = () => {
  if (spinning.value) return;

  spinning.value = true;
  timer = setTimeout(() => {
    spinning.value = false;
    timer = undefined;
  }, 900);
};

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <section class="spin-nested-demo">
    <h-button :loading="spinning" @click="refresh">Load content</h-button>
    <h-spin :spinning="spinning" :delay="150" tip="Loading content">
      <div class="spin-nested-demo__content">
        <strong>Release checklist</strong>
        <p>Keyboard, dark-theme, and responsive checks are ready.</p>
      </div>
    </h-spin>
  </section>
</template>

<style scoped>
.spin-nested-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.spin-nested-demo > :deep(.h-button) {
  justify-self: start;
}

.spin-nested-demo__content {
  display: grid;
  align-content: center;
  gap: var(--h-spacing-2);
  min-block-size: 120px;
  padding-block: var(--h-spacing-4);
  border-block: 1px solid var(--h-divider-default);
}

.spin-nested-demo__content p {
  margin: 0;
  color: var(--h-text-secondary);
}
</style>
