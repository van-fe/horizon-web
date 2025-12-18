<template>
  <n-row>
    <n-col :span="12">
      <div class="demo-title">普通渲染</div>
      <p>
        <n-button @click="scroll(1)">滚动</n-button>
        <n-button @click="expandAll(1)">全部展开</n-button>
        <n-button @click="collapseAll(1)">全部收起</n-button>
      </p>
      <n-tree
        ref="treeDomRef1"
        :tree-data="baseTreeData"
        :max-height="300"
        :multiple="true"
        :tooltip="false"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">虚拟滚动</div>
      <p>
        <n-button @click="scroll(2)">滚动</n-button>
        <n-button @click="expandAll(2)">全部展开</n-button>
        <n-button @click="collapseAll(2)">全部收起</n-button>
      </p>
      <n-tree
        ref="treeDomRef2"
        :tree-data="baseTreeData"
        :use-virtual-scroll="true"
        :max-height="300"
        :multiple="true"
        :tooltip="false"
        :expand-wrapper-by-children="true"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LegoComponentInstance } from '@aurora/utils';
import { NTree, TreeExposes } from '@aurora/horizon-web';

const baseTreeData = ref([]);
const treeDomRef1 = ref<LegoComponentInstance<typeof NTree, TreeExposes>>();
const treeDomRef2 = ref<LegoComponentInstance<typeof NTree, TreeExposes>>();

function scroll(type: 1 | 2) {
  type === 1 ? treeDomRef1.value?.scrollTo('rate') : treeDomRef2.value?.scrollTo('rate');
}

function expandAll(type: 1 | 2) {
  type === 1 ? treeDomRef1.value?.setAllCollapseStatus(true) : treeDomRef2.value?.setAllCollapseStatus(true);
}

function collapseAll(type: 1 | 2) {
  type === 1 ? treeDomRef1.value?.setAllCollapseStatus(false) : treeDomRef2.value?.setAllCollapseStatus(false);
}

onMounted(() => {
  fetch('https://static.nio.com/fx-static/horizon-web/clrk8znpi000109bebmtiggbz/tree-data.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>
