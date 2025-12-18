<template>
  <n-form label-position="left" label-vertical-align="middle" label-width="150px">
    <n-form-item label="是否忽视父子关系">
      <n-switch v-model="checkStrictly" :status="true" status-off-text="否" status-on-text="是" />
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="24">
      <div class="demo-title">最多勾选3个</div>
      <n-tree
        :tree-data="baseTreeData"
        :multiple="true"
        :multiple-limit="3"
        :check-strictly="checkStrictly"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);
const checkStrictly = ref<boolean>(false);

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
