<template>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">内置面板</div>
      <n-tree-select
        :tree-data="baseTreeData"
        :panel-filterable="true"
        :use-build-in-panel-filter="true"
        :max-height="300"
        :multiple="true"
        :to-body="false"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">自定义插槽</div>
      <n-tree-select
        :tree-data="baseTreeData"
        :panel-filterable="true"
        :panel-filter-input-value="filterValue"
        :max-height="300"
        :multiple="true"
        :to-body="false"
      >
        <template #panelHeaderRender>
          <n-input v-model="filterValue" class="filter-input" />
        </template>
      </n-tree-select>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);
const filterValue = ref();

onMounted(() => {
  fetch('https://static.nio.com/fx-static/lego/clrk8znpi000109bebmtiggbz/tree-data.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
.filter-input {
  padding: 10px;
}
</style>
