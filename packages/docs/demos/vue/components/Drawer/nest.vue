<script setup lang="ts">
import { reactive, ref } from 'vue';

const visible = ref(false);
const detailVisible = ref(false);
const status = ref('可在抽屉中继续编辑详细权限');
const permissions = reactive({ view: true, edit: true, publish: false });

const saveAll = () => {
  detailVisible.value = false;
  visible.value = false;
  status.value = '体验设计组的权限已保存';
};
</script>

<template>
  <div class="drawer-nest-demo">
    <h-button @click="visible = true">管理团队权限</h-button>
    <p class="status" role="status">{{ status }}</p>

    <h-drawer v-model:visible="visible" title="管理团队权限" size="large">
      <div class="drawer-content">
        <p>选择团队后打开第二层抽屉。</p>
        <h-button type="normal" @click="detailVisible = true">编辑体验设计组</h-button>
      </div>
    </h-drawer>

    <h-drawer v-model:visible="detailVisible" title="体验设计组" ok-text="保存" @ok="saveAll">
      <div class="permission-list">
        <h-checkbox v-model="permissions.view">查看项目内容</h-checkbox>
        <h-checkbox v-model="permissions.edit">编辑组件文档</h-checkbox>
        <h-checkbox v-model="permissions.publish">管理发布任务</h-checkbox>
      </div>
    </h-drawer>
  </div>
</template>

<style scoped>
.drawer-nest-demo,
.drawer-content,
.permission-list {
  display: grid;
  justify-items: start;
  gap: 12px;
}

p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .drawer-nest-demo,
  .drawer-content,
  .permission-list {
    gap: 10px;
  }
}
</style>
