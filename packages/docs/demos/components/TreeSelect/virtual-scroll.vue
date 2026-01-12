<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        v-if="baseTreeData.length"
        :tree-data="baseTreeData"
        :use-virtual-scroll="true"
        :max-height="300"
        :is-default-expand-all="true"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        v-if="baseTreeData.length"
        :tree-data="baseTreeData"
        :use-virtual-scroll="true"
        :max-height="300"
        :is-default-expand-all="true"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
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
