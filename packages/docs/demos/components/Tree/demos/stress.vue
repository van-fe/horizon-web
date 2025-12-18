<template>
  <n-row>
    <n-col :span="12">
      <div class="demo-title">单选</div>
      <n-tree
        :tree-data="baseTreeData"
        :stress="true"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选</div>
      <n-tree
        :tree-data="baseTreeData"
        :stress="true"
        :multiple="true"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

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
