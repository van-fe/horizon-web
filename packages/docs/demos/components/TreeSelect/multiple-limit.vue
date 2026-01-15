<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="150px">
    <h-form-item label="是否忽视父子关系">
      <h-switch v-model="checkStrictly" :status="true" status-off-text="否" status-on-text="是" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">最多勾选3个</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :multiple="true"
        :multiple-limit="3"
        :check-strictly="checkStrictly"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);
const checkStrictly = ref<boolean>(false);

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
