<template>
  <h-grid :gap="12">
    <h-grid-item :span="8">
      <div class="demo-title">默认</div>
      <h-input-number v-model="value" enable-lang-press />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">两侧（设置了步长）</div>
      <h-input-number v-model="value" enable-lang-press controls-position="between" :step="5" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0);
</script>
