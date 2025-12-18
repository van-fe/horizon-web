<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="显示单选框">
      <n-switch v-model="showRadio" :status="true" />
    </n-form-item>
    <n-form-item label="点击叶子节点勾选">
      <n-switch v-model="expandOnClickLeaf" :status="true" />
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-tree-select
        :tree-data="baseTreeData"
        :check-on-click-leaf="expandOnClickLeaf"
        :show-radio="showRadio"
        :to-body="false"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-tree-select
        :tree-data="baseTreeData"
        :check-on-click-leaf="expandOnClickLeaf"
        :multiple="true"
        :to-body="false"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import {  onMounted, ref } from 'vue';

const showRadio = ref(false);
const expandOnClickLeaf = ref(true);
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
