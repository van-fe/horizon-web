<script setup lang="ts">
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconEye,
  IconEdit,
  IconRubbish,
} from '@aurora/icon';
</script>

<template>
  <h-grid :gap="12">
    <h-button-group type="primary">
      <h-button :icon="IconArrowLeft">Previous Page</h-button>
      <h-button>
        Next Page
        <template #suffix>
          <div class="h-button__icon">
            <IconArrowRight :size="16" />
          </div>
        </template>
      </h-button>
    </h-button-group>
    <h-button-group>
      <h-button :plain="true" :icon="IconEye" />
      <h-button :plain="true" :icon="IconEdit" />
      <h-button :plain="true" :icon="IconRubbish" />
    </h-button-group>
    <h-button-group type="primary">
      <h-button>Confirm</h-button>
      <h-dropdown>
        <h-button :icon="IconArrowDown" />
        <h-dropdown-menu>
          <h-dropdown-item>Agree</h-dropdown-item>
          <h-dropdown-item>Disagree</h-dropdown-item>
          <h-dropdown-item>Cancel</h-dropdown-item>
        </h-dropdown-menu>
      </h-dropdown>
    </h-button-group>
  </h-grid>
</template>

<style scoped>
.h-button-group + .h-button-group {
  margin-left: 10px;
}
</style>
