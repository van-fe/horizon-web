<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="点击整行折叠">
      <n-switch v-model="expandOnClickNode" :status="true" />
    </n-form-item>
    <n-form-item label="点击整行选中">
      <n-switch v-model="checkOnClickNode" :status="true" />
    </n-form-item>
    <n-form-item label="是否忽略父子级关系">
      <n-switch v-model="checkStrictly" :status="true" />
    </n-form-item>
    <n-form-item label="是否显示 Radio">
      <n-switch v-model="showRadio" :status="true" />
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="12">
      <div class="demo-title">单选</div>
      <n-tree
        :tree-data="baseTreeData"
        :expand-on-click-node="expandOnClickNode"
        :check-on-click-node="checkOnClickNode"
        :check-strictly="checkStrictly"
        :show-radio="showRadio"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选</div>
      <n-tree
        :tree-data="baseTreeData"
        :expand-on-click-node="expandOnClickNode"
        :check-on-click-node="checkOnClickNode"
        :check-strictly="checkStrictly"
        :multiple="true"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import {  onMounted, ref } from 'vue';

const expandOnClickNode = ref(true);
const checkOnClickNode = ref(false);
const checkStrictly = ref(false);
const showRadio = ref(false);
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
