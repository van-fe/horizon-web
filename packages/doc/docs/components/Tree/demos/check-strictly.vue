<template>
  <n-form label-position="left" label-vertical-align="middle" label-width="150px">
    <n-form-item label="是否忽视父子关系">
      <n-switch v-model="checkStrictly" :status="true" status-off-text="否" status-on-text="是" />
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="12">
      <div class="demo-title">单选</div>
      <n-tree
        :tree-data="baseTreeData"
        :check-strictly="checkStrictly"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选</div>
      <n-tree
        :tree-data="baseTreeData"
        :check-strictly="checkStrictly"
        :selected-values="['guide', 'feedback', 'navigation']"
        :multiple="true"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const checkStrictly = ref(false);
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
