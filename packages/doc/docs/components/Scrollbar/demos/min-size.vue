<template>
  <n-scrollbar height="400px" :track-begin-end-spacing="[[0, 10], [0, 10]]">
    <div v-for="item of 1000" :key="item" class="item">
      {{ item }}
    </div>
  </n-scrollbar>
</template>

<script setup lang="ts">
</script>

<style scoped>
.item {
  width: 120%;
  height: 40px;
  background: var(--n-bg-info-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
</style>
