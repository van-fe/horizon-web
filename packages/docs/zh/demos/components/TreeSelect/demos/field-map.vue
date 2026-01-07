<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :field-map="{value: 'key', label: 'text', children: 'items'}"
      >
        <template #treeNodeRender="{data}">
          {{ data.label }}
        </template>
      </h-tree-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :field-map="{value: 'key', label: 'text', children: 'items'}"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);

onMounted(() => {
  fetch('https://static.nio.com/fx-static/horizon-web/clronbwg5000i09be0nxgaxh8/field-map-options.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
</style>
