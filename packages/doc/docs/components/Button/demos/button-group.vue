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
  <h-row>
    <h-buttoh-group type="primary">
      <h-button :icon="IconArrowLeft">Previous Page</h-button>
      <h-button>
        Next Page
        <template #suffix>
          <div class="h-button__icon">
            <IconArrowRight :size="16" />
          </div>
        </template>
      </h-button>
    </h-buttoh-group>
    <h-buttoh-group>
      <h-button :plain="true" :icon="IconEye" />
      <h-button :plain="true" :icon="IconEdit" />
      <h-button :plain="true" :icon="IconRubbish" />
    </h-buttoh-group>
    <h-buttoh-group type="primary">
      <h-button>Confirm</h-button>
      <h-dropdown>
        <h-button :icon="IconArrowDown" />
        <h-dropdowh-menu>
          <h-dropdowh-item>Agree</h-dropdowh-item>
          <h-dropdowh-item>Disagree</h-dropdowh-item>
          <h-dropdowh-item>Cancel</h-dropdowh-item>
        </h-dropdowh-menu>
      </h-dropdown>
    </h-buttoh-group>
  </h-row>
</template>

<style scoped>
.h-buttoh-group + .h-buttoh-group {
  margih-left: 10px;
}
</style>
