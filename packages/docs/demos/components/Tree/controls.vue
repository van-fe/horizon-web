<template>
  <h-form label-width="fit-content" label-position="left" label-vertical-align="middle">
    <h-form-item label="展开收起">
      <h-space>
        <h-button @click="getExpand">获取已展开</h-button>
        <h-button @click="setExpand">设置展开</h-button>
        <h-button @click="setFold">设置收起</h-button>
        <h-button @click="setExpandAll">全部展开</h-button>
        <h-button @click="setFoldAll">全部收起</h-button>
      </h-space>
    </h-form-item>
    <h-form-item label="选中处理">
      <h-space>
        <h-button @click="getAllCheckedValues">获取所有已选（不含半选）</h-button>
        <h-button @click="getHalfCheckedValues">获取所有半选</h-button>
        <h-button @click="getUnCheckedValues">获取所有未选</h-button>
        <h-button @click="setSelectedValues">增加选中</h-button>
        <h-button @click="deleteSelectedValues">取消选中</h-button>
      </h-space>
    </h-form-item>
    <h-form-item label="节点数据">
      <h-space>
        <h-button @click="getNodes">获取节点</h-button>
        <h-button @click="setNode">设置节点</h-button>
        <h-button @click="delNode">删除节点</h-button>
        <h-button @click="addNodeChildren">添加节点</h-button>
      </h-space>
    </h-form-item>
  </h-form>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-tree
        ref="treeDomRef"
        :tree-data="baseTreeData"
        :multiple="true"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { HTree, useTreeExposes } from '@aurora/horizon-web';
import { ExtractExposeTypes } from '@aurora/utils';

const baseTreeData = ref([]);
const treeDomRef = ref<InstanceType<typeof HTree> & ExtractExposeTypes<typeof useTreeExposes>>();

function getExpand() {
  console.info(treeDomRef.value?.getExpandNodes());
}

function setExpand() {
  treeDomRef.value?.setCollapseStatusByValue(['feedback'], true);
}

function setFold() {
  treeDomRef.value?.setCollapseStatusByValue(['guide', 'disciplines'], false);
}

function setExpandAll() {
  treeDomRef.value?.setAllCollapseStatus(true);
}

function setFoldAll() {
  treeDomRef.value?.setAllCollapseStatus(false);
}

function getAllCheckedValues() {
  console.info(treeDomRef.value?.getSelectedNodes());
}

function getHalfCheckedValues() {
  console.info(treeDomRef.value?.getPartSelectedNodes());
}

function getUnCheckedValues() {
  console.info(treeDomRef.value?.getUnSelectedNodes());
}

function setSelectedValues() {
  treeDomRef.value?.setSelectedStatus(['feedback', 'color'], true);
}

function deleteSelectedValues() {
  treeDomRef.value?.setSelectedStatus(['feedback', 'color'], false);
}

function getNodes() {
  console.info(treeDomRef.value?.getNodeByValues(['feedback']));
}

function setNode() {
  treeDomRef.value?.setNodeByValue({
    label: 'Feedback - modified',
  }, 'feedback');
}

function delNode() {
  treeDomRef.value?.delNodeByValue('feedback');
}

let index = 0;
function addNodeChildren() {
  treeDomRef.value?.addNodeChildrenByValue([
    {
      label: `New Item Child ${index}`,
      value: `new child ${index}`,
    },
  ], 'efficiency');
  index++;
}

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
