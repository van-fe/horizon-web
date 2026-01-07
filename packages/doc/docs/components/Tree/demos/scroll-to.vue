<template>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">普通渲染</div>
      <p>
        <h-button @click="scroll(1)">滚动</h-button>
        <h-button @click="expandAll(1)">全部展开</h-button>
        <h-button @click="collapseAll(1)">全部收起</h-button>
      </p>
      <h-tree
        ref="treeDomRef1"
        :tree-data="baseTreeData"
        :max-height="300"
        :multiple="true"
        :tooltip="false"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">虚拟滚动</div>
      <p>
        <h-button @click="scroll(2)">滚动</h-button>
        <h-button @click="expandAll(2)">全部展开</h-button>
        <h-button @click="collapseAll(2)">全部收起</h-button>
      </p>
      <h-tree
        ref="treeDomRef2"
        :tree-data="baseTreeData"
        :use-virtual-scroll="true"
        :max-height="300"
        :multiple="true"
        :tooltip="false"
        :expand-wrapper-by-children="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { HorizonWebComponentInstance } from '@aurora/utils';
import { NTree, TreeExposes } from '@aurora/horizon-web';

const baseTreeData = ref([]);
const treeDomRef1 = ref<HorizonWebComponentInstance<typeof NTree, TreeExposes>>();
const treeDomRef2 = ref<HorizonWebComponentInstance<typeof NTree, TreeExposes>>();

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
