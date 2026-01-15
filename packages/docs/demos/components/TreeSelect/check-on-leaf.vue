<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="显示单选框">
      <h-switch v-model="showRadio" :status="true" />
    </h-form-item>
    <h-form-item label="点击叶子节点勾选">
      <h-switch v-model="expandOnClickLeaf" :status="true" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :check-on-click-leaf="expandOnClickLeaf"
        :show-radio="showRadio"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :check-on-click-leaf="expandOnClickLeaf"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import {  onMounted, ref } from 'vue';

const showRadio = ref(false);
const expandOnClickLeaf = ref(true);
const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
</style>
