<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">自定义渲染全部节点</div>

      <h-tree-select :tree-data="baseTreeData" :multiple="true" :to-body="false">
        <template #treeNodeRender="{ data }">
          <div class="tree-item">
            {{ data.label }} ({{ data.value }})
            <h-dropdown @command="action">
              <h-button icon="ellipsis" type="normal" size="small" :text="true" @click.stop />
              <h-dropdown-menu>
                <h-dropdown-item command="view" icon="eye">查看</h-dropdown-item>
                <h-dropdown-item command="edit" icon="edit">修改</h-dropdown-item>
              </h-dropdown-menu>
            </h-dropdown>
          </div>
        </template>
      </h-tree-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">自定义渲染指定节点</div>

      <h-tree-select :tree-data="renderTreeData" :multiple="true" :to-body="false">
        <template #treeNodeRender="{ data }">
          <div>{{ data.label }} ({{ data.value }})</div>
        </template>
      </h-tree-select>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';

const renderTreeData = ref<HTreeNodeData[]>([
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
      },
      {
        value: 'navigation',
        label: (data: any) =>
          h(
            'div',
            {
              style: 'color: var(--h-text-warning-default)',
            },
            ['😂 ', data.value],
          ),
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
]);

function action(command: unknown) {
  $message.success(command as 'view' | 'edit');
}
const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
.tree-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
}
</style>
