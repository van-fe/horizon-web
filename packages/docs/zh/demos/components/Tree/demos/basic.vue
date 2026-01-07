<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="尺寸">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
        <h-radio label="huge" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :size="size"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :selected-values="['guide', 'disciplines', 'feedback', 'navigation']"
        :tree-data="baseTreeData"
        :size="size"
        :multiple="true"
      />
    </h-col>
  </h-row>
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
