<template>
  <n-row>
    <n-col :span="24">
      <div class="demo-title">选中了 Component、Basic、Color、Data 四个节点</div>
      <n-tree
        v-model:expand-values="expandValues"
        v-model:selected-values="selectedValues"
        :tree-data="baseTreeData"
        :multiple="true"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const selectedValues = ref(['component', 'basic', 'color', 'data']);
const expandValues = ref(['component', 'basic', 'color', 'data']);
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
