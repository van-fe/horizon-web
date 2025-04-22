<script setup lang="ts">
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconEye,
  IconEdit,
  IconRubbish,
} from '@nio-fe/icon';
</script>

<template>
  <n-row>
    <n-button-group type="primary">
      <n-button :icon="IconArrowLeft">Previous Page</n-button>
      <n-button>
        Next Page
        <template #suffix>
          <div class="n-button__icon">
            <IconArrowRight :size="16" />
          </div>
        </template>
      </n-button>
    </n-button-group>
    <n-button-group>
      <n-button :plain="true" :icon="IconEye" />
      <n-button :plain="true" :icon="IconEdit" />
      <n-button :plain="true" :icon="IconRubbish" />
    </n-button-group>
    <n-button-group type="primary">
      <n-button>Confirm</n-button>
      <n-dropdown>
        <n-button :icon="IconArrowDown" />
        <n-dropdown-menu>
          <n-dropdown-item>Agree</n-dropdown-item>
          <n-dropdown-item>Disagree</n-dropdown-item>
          <n-dropdown-item>Cancel</n-dropdown-item>
        </n-dropdown-menu>
      </n-dropdown>
    </n-button-group>
  </n-row>
</template>

<style scoped>
.n-button-group + .n-button-group {
  margin-left: 10px;
}
</style>
