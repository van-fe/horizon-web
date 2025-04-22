<template>
  <n-row>
    <n-col :span="12">
      <div class="demo-title">自定义渲染全部节点</div>

      <n-tree :tree-data="baseTreeData" :multiple="true">
        <template #treeNodeRender="{ data }">
          <div class="tree-item">
            {{ data.label }} ({{ data.value }})
            <n-dropdown @command="action">
              <n-button icon="ellipsis" type="normal" size="small" :text="true" @click.stop />
              <n-dropdown-menu>
                <n-dropdown-item command="view" icon="eye">查看</n-dropdown-item>
                <n-dropdown-item command="edit" icon="edit">修改</n-dropdown-item>
              </n-dropdown-menu>
            </n-dropdown>
          </div>
        </template>
      </n-tree>
    </n-col>
    <n-col :span="12">
      <div class="demo-title">自定义渲染指定节点</div>

      <n-tree :tree-data="renderTreeData" :multiple="true">
        <template #treeNodeRender="{ data }">
          <div>{{ data.label }} ({{ data.value }})</div>
        </template>
      </n-tree>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import type { NTreeNodeData } from '@nio-fe/lego';
import { $message } from '@nio-fe/lego';

const renderTreeData = ref<NTreeNodeData[]>([
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
              style: 'color: var(--n-text-warning-default)',
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
  fetch('https://static.nio.com/fx-static/lego/clrk8znpi000109bebmtiggbz/tree-data.json')
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
