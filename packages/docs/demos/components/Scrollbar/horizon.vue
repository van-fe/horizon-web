<template>
  <h-scrollbar size="small" max-height="400px">
    <div class="wrap">
      <div v-for="item of 50" :key="item" class="item">
        {{ item }}
      </div>
    </div>
  </h-scrollbar>
</template>

<script setup lang="ts">
</script>

<style scoped>
.wrap {
  display: flex;
  flex-wrap: nowrap;
  column-gap: 10px;
}

.item {
  flex: 0 0 80px;
  height: 40px;
  background: var(--h-bg-warning-weak-default);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
