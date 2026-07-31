<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="inputStyle">
      <h-radio-group v-model="inputStyle">
        <h-radio label="normal" />
        <h-radio label="emphasize" />
        <h-radio label="no-border" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <div class="demo-title">默认国际化配置</div>
      <h-tree-select v-model="value" :tree-data="baseTreeData" :size="size" :input-style="inputStyle" :use-statistic="true" :multiple="true" :to-body="false" />
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">自定义为“组件”</div>
      <h-tree-select v-model="values" :tree-data="baseTreeData" :size="size" :input-style="inputStyle" :use-statistic="true" statistic-text="组件" :multiple="true" :to-body="false" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value = ref();
const values = ref([]);

const size = ref('medium');
const inputStyle = ref('normal');
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
