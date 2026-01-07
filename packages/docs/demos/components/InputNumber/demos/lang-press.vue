<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">默认</div>
      <h-input-number v-model="value" enable-lang-press />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">两侧（设置了步长）</div>
      <h-input-number v-model="value" enable-lang-press controls-position="between" :step="5" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0);
</script>
