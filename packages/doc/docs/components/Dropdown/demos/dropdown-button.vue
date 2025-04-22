<template>
  <n-button :class="{ 'is-visible': visible, 'not-content': !$slots.default }">
    <slot />
    <template #suffix>
      <div class="n-button__icon">
        <IconArrowDown />
      </div>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { IconArrowDown } from '@nio-fe/icon';

defineProps({
  visible: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped>
.n-button__icon {
  transition: 0.3s;

  .is-visible & {
    transform: rotate(180deg);
  }
}

.not-content {
  width: 32px !important;

  :deep(.n-button__content) {
    display: none;
  }
}
</style>
