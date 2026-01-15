<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select v-model="value" :tree-data="baseTreeData" :clearable="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select v-model="values" :tree-data="baseTreeData" :clearable="true" :multiple="true" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value = ref();
const values = ref();

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
