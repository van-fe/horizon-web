<script setup lang="ts">
import { reactive, ref } from 'vue';

const visible = ref(false);
const status = ref('修改后可直接保存');
const project = reactive({
  name: '文档体验优化',
  owner: '体验设计组',
});

const save = () => {
  status.value = `已保存“${project.name}”`;
  visible.value = false;
};
</script>

<template>
  <div class="drawer-basic-demo">
    <h-button @click="visible = true">编辑项目</h-button>
    <p role="status">{{ status }}</p>

    <h-drawer
      v-model:visible="visible"
      title="编辑项目信息"
      placement="right"
      ok-text="保存"
      @ok="save"
    >
      <h-form :model="project" label-position="top">
        <h-form-item label="项目名称">
          <h-input v-model="project.name" />
        </h-form-item>
        <h-form-item label="负责团队">
          <h-input v-model="project.owner" />
        </h-form-item>
      </h-form>
    </h-drawer>
  </div>
</template>

<style scoped>
.drawer-basic-demo {
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
  .drawer-basic-demo {
    gap: 10px;
  }
}
</style>
