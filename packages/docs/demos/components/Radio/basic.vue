<script setup lang="ts">
import { ref } from 'vue';

const delivery = ref('standard');
</script>

<template>
  <div class="docs-demo">
    <h-space wrap size="large">
      <h-radio v-model="delivery" value="standard">标准配送 · 免费</h-radio>
      <h-radio v-model="delivery" value="express">次日达 · ¥18</h-radio>
    </h-space>
    <p class="docs-demo__status">已选择：{{ delivery === 'standard' ? '标准配送' : '次日达' }}</p>
  </div>
</template>
