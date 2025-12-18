<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="尺寸">
      <n-radio-group v-model="size">
        <n-radio label="small" />
        <n-radio label="medium" />
        <n-radio label="large" />
        <n-radio label="huge" />
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="12">
      <div class="demo-title">单选</div>
      <n-tree
        :tree-data="baseTreeData"
        :size="size"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选</div>
      <n-tree
        :selected-values="['guide', 'disciplines', 'feedback', 'navigation']"
        :tree-data="baseTreeData"
        :size="size"
        :multiple="true"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, onMounted, ref } from 'vue';
import { useTreeProps } from '@aurora/horizon-web';

const size = ref<Exclude<ExtractPropTypes<typeof useTreeProps>['size'], undefined>>('medium');
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
