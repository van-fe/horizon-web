<template>
  <n-form>
    <n-form-item label="whether to hide children">
      <n-switch v-model="filterToHideChildren" status />
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="12">
      <div class="demo-title">Single</div>
      <n-tree
        :tree-data="baseTreeData"
        :filterable="true"
        :max-height="300"
        :filter-to-hide-children="filterToHideChildren"
        @update:filter-value="handleFilterValue"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">Multiple</div>
      <n-tree
        :tree-data="baseTreeData"
        :filterable="true"
        :max-height="300"
        :multiple="true"
        :filter-to-hide-children="filterToHideChildren"
        @update:filter-value="handleFilterValue"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const filterToHideChildren = ref(true);
const baseTreeData = ref([]);

function handleFilterValue(value: string) {
  console.info('filterValue:', value);
}

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
