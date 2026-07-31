<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="点击整行折叠">
      <h-switch v-model="expandOnClickNode" :status="true" />
    </h-form-item>
    <h-form-item label="点击整行选中">
      <h-switch v-model="checkOnClickNode" :status="true" />
    </h-form-item>
    <h-form-item label="是否忽略父子级关系">
      <h-switch v-model="checkStrictly" :status="true" />
    </h-form-item>
    <h-form-item label="是否显示 Radio">
      <h-switch v-model="showRadio" :status="true" />
    </h-form-item>
  </h-form>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :expand-on-click-node="expandOnClickNode"
        :check-on-click-node="checkOnClickNode"
        :check-strictly="checkStrictly"
        :show-radio="showRadio"
        :to-body="false"
      />
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :expand-on-click-node="expandOnClickNode"
        :check-on-click-node="checkOnClickNode"
        :check-strictly="checkStrictly"
        :multiple="true"
        :to-body="false"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import {  onMounted, ref } from 'vue';

const expandOnClickNode = ref(true);
const checkOnClickNode = ref(false);
const checkStrictly = ref(false);
const showRadio = ref(false);
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
