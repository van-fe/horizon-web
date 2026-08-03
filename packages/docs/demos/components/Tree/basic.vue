<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="尺寸">
      <h-radio-group v-model="size">
        <h-radio value="small" />
        <h-radio value="medium" />
        <h-radio value="large" />
        <h-radio value="huge" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-grid :gap="12">
    <h-grid-item :span="12">
      <div class="demo-title">单选</div>
      <h-tree :tree-data="baseTreeData" :size="size" />
    </h-grid-item>
    <h-grid-item :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :selected-values="['guide', 'disciplines', 'feedback', 'navigation']"
        :tree-data="baseTreeData"
        :size="size"
        :multiple="true"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ExtractPropTypes, onMounted, ref } from 'vue';
import { useTreeProps } from '@aurora/horizon-web';

const size = ref<Exclude<ExtractPropTypes<typeof useTreeProps>['size'], undefined>>('medium');
const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped></style>
