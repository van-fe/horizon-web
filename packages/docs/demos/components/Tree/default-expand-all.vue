<template>
  <h-grid :gap="12">
    <h-grid-item :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        v-if="baseTreeData.length"
        :tree-data="baseTreeData"
        :is-default-expand-all="true"
        :max-height="300"
      />
    </h-grid-item>
    <h-grid-item :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        v-if="baseTreeData.length"
        :tree-data="baseTreeData"
        :is-default-expand-all="true"
        :max-height="300"
        :multiple="true"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
</style>
