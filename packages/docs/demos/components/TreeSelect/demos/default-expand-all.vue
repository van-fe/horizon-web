<template>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-tree-select
        v-if="baseTreeData.length"
        :tree-data="baseTreeData"
        :is-default-expand-all="true"
        :max-height="300"
        :to-body="false"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-tree-select
        v-if="baseTreeData.length"
        :tree-data="baseTreeData"
        :is-default-expand-all="true"
        :max-height="300"
        :multiple="true"
        :to-body="false"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

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
