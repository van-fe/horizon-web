<template>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">普通单选</div>
      <n-tree-select v-model="value1" :tree-data="baseTreeData" :to-body="false" />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">有 Radio 组件</div>
      <n-tree-select v-model="value2" :tree-data="baseTreeData" :show-radio="true" :collapse="true" :to-body="false" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value1 = ref();
const value2 = ref();

const baseTreeData = ref([]);

onMounted(() => {
  fetch('https://static.nio.com/fx-static/lego/clrk8znpi000109bebmtiggbz/tree-data.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
</style>
