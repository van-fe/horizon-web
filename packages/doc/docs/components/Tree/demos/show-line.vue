<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="尺寸">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
        <h-radio label="huge" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :size="size"
        :show-line="true"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :size="size"
        :multiple="true"
        :show-line="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { TreeProps } from '@aurora/horizon-web';

const size = ref<Exclude<TreeProps['size'], undefined>>('medium');
const baseTreeData = ref([]);

onMounted(() => {
  fetch('https://static.nio.com/fx-static/horizon-web/cm3faqjzf00bw084ogw7l2u62/deep-level-tree-data.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
</style>
