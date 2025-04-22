<template>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-tree-select
        :tree-data="baseTreeData"
        :filterable="true"
        :highlight-method="highlightMethod"
        :max-height="300"
        :to-body="false"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-tree-select
        :tree-data="baseTreeData"
        :filterable="true"
        :highlight-method="highlightMethod"
        :max-height="300"
        :multiple="true"
        :to-body="false"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref, h } from 'vue';
import type { NTreeHighlightMethod, NExtendTreeNodeData } from '@nio-fe/lego';

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
  fetch('https://static.nio.com/fx-static/lego/clrk8znpi000109bebmtiggbz/tree-data.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style>
.kw {
  color: var(--n-text-error-default);
}
</style>
