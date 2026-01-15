<template>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :stress="true"
        :to-body="false"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :stress="true"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
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
