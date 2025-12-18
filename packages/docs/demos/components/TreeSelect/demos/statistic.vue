<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="size">
      <n-radio-group v-model="size">
        <n-radio label="small" />
        <n-radio label="medium" />
        <n-radio label="large" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="inputStyle">
      <n-radio-group v-model="inputStyle">
        <n-radio label="normal" />
        <n-radio label="emphasize" />
        <n-radio label="no-border" />
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">默认国际化配置</div>
      <n-tree-select v-model="value" :tree-data="baseTreeData" :size="size" :input-style="inputStyle" :use-statistic="true" :multiple="true" :to-body="false" />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">自定义为“组件”</div>
      <n-tree-select v-model="values" :tree-data="baseTreeData" :size="size" :input-style="inputStyle" :use-statistic="true" statistic-text="组件" :multiple="true" :to-body="false" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value = ref();
const values = ref([]);

const size = ref('medium');
const inputStyle = ref('normal');
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
