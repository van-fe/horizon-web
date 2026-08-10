<template>
  <h-space wrap align="center" size="large">
    <h-button-group type="primary">
      <h-button :icon="IconArrowLeft">Previous</h-button>
      <h-button>
        Next
        <template #suffix><IconArrowRight :size="16" /></template>
      </h-button>
    </h-button-group>

    <h-button-group>
      <h-button plain :icon="IconEye" aria-label="Preview record" />
      <h-button plain :icon="IconEdit" aria-label="Edit record" />
      <h-button plain :icon="IconRubbish" aria-label="Delete record" />
    </h-button-group>

    <h-button-group type="primary">
      <h-button>Approve</h-button>
      <h-dropdown>
        <h-button :icon="IconArrowDown" aria-label="More approval actions" />
        <h-dropdown-menu>
          <h-dropdown-item>Approve and notify</h-dropdown-item>
          <h-dropdown-item>Request changes</h-dropdown-item>
          <h-dropdown-item>Archive request</h-dropdown-item>
        </h-dropdown-menu>
      </h-dropdown>
    </h-button-group>
  </h-space>
</template>

<script setup lang="ts">
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconEdit,
  IconEye,
  IconRubbish,
} from '@aurora/icon';
</script>
