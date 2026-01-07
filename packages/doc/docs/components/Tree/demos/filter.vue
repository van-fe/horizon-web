<template>
  <h-form>
    <h-form-item label="whether to hide children">
      <h-switch v-model="filterToHideChildren" status />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">Single</div>
      <h-tree
        :tree-data="baseTreeData"
        :filterable="true"
        :max-height="300"
        :filter-to-hide-children="filterToHideChildren"
        @update:filter-value="handleFilterValue"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">Multiple</div>
      <h-tree
        :tree-data="baseTreeData"
        :filterable="true"
        :max-height="300"
        :multiple="true"
        :filter-to-hide-children="filterToHideChildren"
        @update:filter-value="handleFilterValue"
      />
    </h-col>
  </h-row>
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
