<template>
  <n-row>
    <n-col :span="12">
      <div class="demo-title">单选</div>
      <n-tree
        :tree-data="baseTreeData"
        :fold-icon="customIcon"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选</div>
      <n-tree
        :tree-data="baseTreeData"
        :fold-icon="customIcon"
        :multiple="true"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">单选-加减符号</div>
      <n-tree
        :tree-data="baseTreeData"
        :expand-icon="customIconExpand"
        :fold-icon="customIconFold"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选-加减符号</div>
      <n-tree
        :tree-data="baseTreeData"
        :expand-icon="customIconExpand"
        :fold-icon="customIconFold"
        :multiple="true"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref, h } from 'vue';
import { IconArrowRight, IconAdd, IconReduce } from '@aurora/icon';

const baseTreeData = ref([]);

const customIcon = h(IconArrowRight, {
  size: 12,
});

const customIconFold = h(IconAdd, {
  size: 12,
});

const customIconExpand = h(IconReduce, {
  size: 12,
});

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
