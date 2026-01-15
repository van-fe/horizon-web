<template>
  <h-row>
    <h-col :span="24">
      <div class="demo-title">选中了 Component、Basic、Color、Data 四个节点</div>
      <h-tree
        v-model:expand-values="expandValues"
        v-model:selected-values="selectedValues"
        :tree-data="baseTreeData"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const selectedValues = ref(['component', 'basic', 'color', 'data']);
const expandValues = ref(['component', 'basic', 'color', 'data']);
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
