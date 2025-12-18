<template>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-tree-select v-model="value" :tree-data="baseTreeData" :clearable="true" :to-body="false" />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-tree-select v-model="values" :tree-data="baseTreeData" :clearable="true" :multiple="true" :to-body="false" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value = ref();
const values = ref();

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
