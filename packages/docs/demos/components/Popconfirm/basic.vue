<script setup lang="ts">
import { ref } from 'vue';
const visible = ref(false);
</script>
<template>
  <h-popconfirm
    v-model:visible="visible"
    title="确定删除这条记录吗？"
    @confirm="console.info('confirmed')"
  >
    <template #reference><h-button>删除</h-button></template>
  </h-popconfirm>
</template>
