<template>
  <n-form label-width="fit-content" label-position="left" label-vertical-align="middle">
    <n-form-item label="展开收起">
      <n-space>
        <n-button @click="getExpand">获取已展开</n-button>
        <n-button @click="setExpand">设置展开</n-button>
        <n-button @click="setFold">设置收起</n-button>
        <n-button @click="setExpandAll">全部展开</n-button>
        <n-button @click="setFoldAll">全部收起</n-button>
      </n-space>
    </n-form-item>
    <n-form-item label="选中处理">
      <n-space>
        <n-button @click="getAllCheckedValues">获取所有已选（不含半选）</n-button>
        <n-button @click="getHalfCheckedValues">获取所有半选</n-button>
        <n-button @click="getUnCheckedValues">获取所有未选</n-button>
        <n-button @click="setSelectedValues">增加选中</n-button>
        <n-button @click="deleteSelectedValues">取消选中</n-button>
      </n-space>
    </n-form-item>
    <n-form-item label="节点数据">
      <n-space>
        <n-button @click="getNodes">获取节点</n-button>
        <n-button @click="setNode">设置节点</n-button>
        <n-button @click="delNode">删除节点</n-button>
        <n-button @click="addNodeChildren">添加节点</n-button>
      </n-space>
    </n-form-item>
  </n-form>
  <n-row>
    <n-col>
      <n-tree
        ref="treeDomRef"
        :tree-data="baseTreeData"
        :multiple="true"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NTree, useTreeExposes } from '@aurora/horizon-web';
import { ExtractExposeTypes } from '@aurora/utils';

const baseTreeData = ref([]);
const treeDomRef = ref<InstanceType<typeof NTree> & ExtractExposeTypes<typeof useTreeExposes>>();

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
  fetch('https://static.nio.com/fx-static/horizon-web/clrk8znpi000109bebmtiggbz/tree-data.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
</style>
