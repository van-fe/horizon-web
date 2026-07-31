<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
</script>

<template>
  <h-grid :gap="12">
    <h-grid-item :span="8">
      <div class="demo-title">large</div>
      <h-input-number v-model="value" size="large" clearable />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">medium (default)</div>
      <h-input-number v-model="value" clearable />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">small</div>
      <h-input-number v-model="value" size="small" clearable />
    </h-grid-item>
  </h-grid>
  <h-grid :gap="12">
    <h-grid-item :span="8">
      <div class="demo-title">默认</div>
      <h-input-number v-model="value" clearable />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">控制器位于两侧</div>
      <h-input-number v-model="value" controls-position="between" clearable />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">控制器隐藏</div>
      <h-input-number v-model="value" :controls="false" clearable />
    </h-grid-item>
  </h-grid>
</template>
