<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :filterable="true"
        :highlight-method="highlightMethod"
        :max-height="300"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :filterable="true"
        :highlight-method="highlightMethod"
        :max-height="300"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref, h } from 'vue';
import type { NTreeHighlightMethod, NExtendTreeNodeData } from '@aurora/horizon-web';

const baseTreeData = ref([]);

const highlightMethod: NTreeHighlightMethod = (inputValue, node) => {
  if (!node) return '';

  if (inputValue) {
    return h('span', {
      innerHTML: (node.label as string).replace(new RegExp(inputValue, 'ig'),
        substring => `<span class='kw'>${substring}</span>`),
    });
  } else {
    return node.stringLabel ?? '';
  }
};

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style>
.kw {
  color: var(--h-text-error-default);
}
</style>
