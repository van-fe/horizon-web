<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">普通单选</div>
      <h-tree-select v-model="value1" :tree-data="baseTreeData" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">有 Radio 组件</div>
      <h-tree-select v-model="value2" :tree-data="baseTreeData" :show-radio="true" :collapse="true" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value1 = ref();
const value2 = ref();

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
