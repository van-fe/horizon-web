<script setup lang="ts">
import { ref } from 'vue';

const enabled = ref(true);
</script>

<template>
  <div class="docs-demo">
    <div class="switch-stage">
      <h-switch v-model="enabled" label="自动保存" status />
    </div>
    <p class="docs-demo__status">{{ enabled ? '自动保存已开启' : '更改需要手动保存' }}</p>
  </div>
</template>

<style scoped>
.switch-stage {
  display: flex;
  align-items: center;
  min-height: 48px;
}
</style>
