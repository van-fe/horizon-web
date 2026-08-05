<script setup lang="ts">
import { ref } from 'vue';

const score = ref(4);
const tooltipText = ['很不满意', '不满意', '一般', '满意', '非常满意'];
</script>

<template>
  <div class="docs-demo">
    <h-rate v-model="score" show-tooltip :tooltip="tooltipText" />
    <span aria-live="polite">{{ tooltipText[score - 1] }}</span>
  </div>
</template>
