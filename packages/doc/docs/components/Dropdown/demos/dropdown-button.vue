<template>
  <h-button :class="{ 'is-visible': visible, 'not-content': !$slots.default }">
    <slot />
    <template #suffix>
      <div class="h-button__icon">
        <IconArrowDown />
      </div>
    </template>
  </h-button>
</template>

<script setup lang="ts">
import { IconArrowDown } from '@aurora/icon';

defineProps({
  visible: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped>
.h-button__icon {
  transition: 0.3s;

  .is-visible & {
    transform: rotate(180deg);
  }
}

.not-content {
  width: 32px !important;

  :deep(.h-button__content) {
    display: none;
  }
}
</style>
