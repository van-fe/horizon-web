<script setup lang="ts">
import { ref } from 'vue';

const accentColor = ref('#178CA6');
</script>

<template>
  <h-color-picker v-model="accentColor" :need-confirm="false" :clearable="false">
    <template #trigger="color">
      <h-button plain>
        <span
          class="custom-color-trigger-demo__swatch"
          :style="{ background: color.resultsValue.value }"
        ></span>
        Edit {{ color.resultsValue.value }}
      </h-button>
    </template>
  </h-color-picker>
</template>

<style scoped>
.custom-color-trigger-demo__swatch {
  width: 12px;
  height: 12px;
  border-radius: var(--h-radius-circle);
}
</style>
