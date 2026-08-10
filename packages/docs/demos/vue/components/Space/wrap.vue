<script setup lang="ts">
const filters = ['全部项目', '我创建的', '本周更新', '等待评审', '高优先级', '已归档'];
</script>

<template>
  <h-space block wrap :size="[12, 10]">
    <h-button v-for="(filter, index) in filters" :key="filter" :type="index ? 'normal' : 'primary'">
      {{ filter }}
    </h-button>
  </h-space>
</template>
