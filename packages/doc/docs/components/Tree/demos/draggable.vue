<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="开启拖拽">
      <h-switch v-model="draggable" :status="true" />
    </h-form-item>
    <h-form-item label="仅能操作拖拽图标进行拖拽">
      <h-switch v-model="dragOnHandler" :status="true" />
    </h-form-item>
    <h-form-item label="可以拖拽到叶子节点下">
      <h-switch v-model="dragToLeaf" :status="true" />
    </h-form-item>
    <h-form-item label="始终显示拖拽图标">
      <h-switch v-model="draggableIconAlwaysVisible" :status="true" />
    </h-form-item>
    <h-form-item label="拦截确认拖拽">
      <h-switch v-model="useBeforeDrop" :status="true" />
    </h-form-item>
  </h-form>
  <h-row class="flex">
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <div class="tree-box">
        <h-tree
          v-if="baseTreeData1.length"
          v-model:tree-data="baseTreeData1"
          :draggable="draggable"
          :drag-oh-handler="dragOnHandler"
          :drag-to-leaf="dragToLeaf"
          :draggable-icoh-always-visible="draggableIconAlwaysVisible"
          :before-drop="useBeforeDrop ? beforeDrop : undefined"
          @update:tree-data="onUpdate"
        />
      </div>
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <div class="tree-box">
        <h-tree
          v-if="baseTreeData2.length"
          v-model:tree-data="baseTreeData2"
          :draggable="draggable"
          :drag-oh-handler="dragOnHandler"
          :drag-to-leaf="dragToLeaf"
          :draggable-icoh-always-visible="draggableIconAlwaysVisible"
          :before-drop="useBeforeDrop ? beforeDrop : undefined"
          :multiple="true"
          @update:tree-data="onUpdate"
        />
      </div>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { $confirm, $message } from '@aurora/horizon-web';
import type { NTreeNodeDataWithLevel, NTreeNodeData } from '@aurora/horizon-web';

const draggable = ref(true);
const dragOnHandler = ref(true);
const dragToLeaf = ref(true);
const draggableIconAlwaysVisible = ref(false);
const useBeforeDrop = ref(false);
const baseTreeData1 = ref([]);
const baseTreeData2 = ref([]);

function beforeDrop(current: NTreeNodeDataWithLevel, to: NTreeNodeDataWithLevel | null, prev: NTreeNodeDataWithLevel | null) {
  return new Promise((resolve) => {
    $confirm(`是否确定将 ${current.label} 移动到 ${to?.label ?? '根节点'} 下，且${prev?.label ? `在 ${prev.label} 之后` : '放在其第一位'}`, '提示').then((close) => {
      resolve(true);
      close();
    }).catch(() => {
      $message.error('取消了操作');
      resolve(false);
      // or reject();
    });
  });
}

function onUpdate(treeData: NTreeNodeData[]) {
  console.info('update:', treeData);
}

onMounted(() => {
  fetch('https://static.nio.com/fx-static/horizon-web/cm5nijv7000mb083a5m3n3l46/tree-data-undraggable.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData1.value = res.concat();
      baseTreeData2.value = res.concat();
    });
});
</script>

<style scoped>
</style>
