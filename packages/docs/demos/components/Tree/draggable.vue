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
    <h-form-item label="拦截确认拖拽">
      <h-switch v-model="useBeforeDrop" :status="true" />
    </h-form-item>
  </h-form>
  <h-grid class="tree-grid" :gap="12">
    <h-grid-item :span="12">
      <div class="demo-title">单选</div>
      <div class="tree-box">
        <h-tree
          v-if="baseTreeData1.length"
          :tree-data="baseTreeData1"
          :draggable="draggable"
          :drag-on-handler="dragOnHandler"
          :drag-to-leaf="dragToLeaf"
          :before-drop="useBeforeDrop ? beforeDrop : undefined"
        />
      </div>
    </h-grid-item>
    <h-grid-item :span="12">
      <div class="demo-title">多选</div>
      <div class="tree-box">
        <h-tree
          v-if="baseTreeData2.length"
          :tree-data="baseTreeData2"
          :draggable="draggable"
          :drag-on-handler="dragOnHandler"
          :drag-to-leaf="dragToLeaf"
          :before-drop="useBeforeDrop ? beforeDrop : undefined"
          :multiple="true"
        />
      </div>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { $confirm, $message, HTreeNodeDataWithLevel } from '@aurora/horizon-web';

const draggable = ref(true);
const dragOnHandler = ref(true);
const dragToLeaf = ref(true);
const useBeforeDrop = ref(false);
const baseTreeData1 = ref([]);
const baseTreeData2 = ref([]);

function beforeDrop(from: HTreeNodeDataWithLevel, to: HTreeNodeDataWithLevel | null, prev: HTreeNodeDataWithLevel | null) {
  return new Promise((resolve) => {
    $confirm(`是否确定将 ${from.label} 移动到 ${to?.label ?? '根节点'} 下，且${prev?.label ? `在 ${prev.label} 之后` : '放在其第一位'}`, '提示').then((close) => {
      resolve(true);
      close();
    }).catch(() => {
      $message.error('取消了操作');
      resolve(false);
      // or reject();
    });
  });
}

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData1.value = res;
      baseTreeData2.value = res;
    });
});
</script>

<style scoped>
</style>
