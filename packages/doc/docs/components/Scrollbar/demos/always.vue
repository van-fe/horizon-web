<template>
  <h-scrollbar height="400px" always>
    <div v-for="item of 20" :key="item" class="item">
      {{ item }}
    </div>
  </h-scrollbar>
</template>

<script setup lang="ts">
</script>

<style scoped>
.item {
  height: 40px;
  background: var(--h-bg-info-weak-default);
  display: flex;
  aligh-items: center;
  justify-content: center;
  margin: 10px;
}
</style>
