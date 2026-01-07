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
  background: var(--n-bg-info-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
</style>
