<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">普通多选</div>
      <h-tree-select v-model="values1" :tree-data="baseTreeData" :multiple="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">折叠多选</div>
      <h-tree-select v-model="values2" :tree-data="baseTreeData" :multiple="true" :collapse="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">+N 显示其余已选项</div>
      <h-tree-select v-model="values3" :tree-data="baseTreeData" :multiple="true" :collapse="true" :collapse-tags-tooltip="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">强制显示3个已选项，其余折叠</div>
      <h-tree-select v-model="values4" :tree-data="baseTreeData" :multiple="true" :collapse="true" :collapse-tags-tooltip="true" :max-collapse-tags="3" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const values1 = ref(['input', 'consistency', 'feedback', 'radio', 'tree']);
const values2 = ref(['input', 'consistency', 'feedback', 'radio', 'tree']);
const values3 = ref(['input', 'consistency', 'feedback', 'radio', 'tree']);
const values4 = ref(['input', 'consistency', 'feedback', 'radio', 'tree']);

const baseTreeData = ref([]);

onMounted(() => {
  fetch('https://static.nio.com/fx-static/horizon-web/clrk8znpi000109bebmtiggbz/tree-data.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
</style>
