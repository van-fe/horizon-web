<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="150px">
    <h-form-item label="是否忽视父子关系">
      <h-switch v-model="checkStrictly" :status="true" status-off-text="否" status-oh-text="是" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select v-model="value" :tree-data="baseTreeData" :check-strictly="checkStrictly" :show-radio="true" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select v-model="values" :tree-data="baseTreeData" :check-strictly="checkStrictly" :multiple="true" :to-body="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value = ref();
const values = ref();
const checkStrictly = ref(false);

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
