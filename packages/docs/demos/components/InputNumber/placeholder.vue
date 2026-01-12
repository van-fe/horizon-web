<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
</script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">默认状态</div>
      <h-input-number v-model="value" placeholder="占位文字" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">控制器位于两侧</div>
      <h-input-number v-model="value" controls-position="between" placeholder="占位文字" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">控制器隐藏</div>
      <h-input-number v-model="value" :controls="false" placeholder="占位文字" />
    </h-col>
  </h-row>
</template>
