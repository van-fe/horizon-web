<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const allowClose = ref(false);
const status = ref('关闭前会检查草稿状态');

const open = () => {
  allowClose.value = false;
  visible.value = true;
  status.value = '存在未保存更改';
};

const beforeClose = () => {
  const allowed = allowClose.value;
  status.value = allowed ? '检查通过，抽屉已关闭' : '请先开启“允许关闭”';
  return Promise.resolve(allowed);
};

const save = () => {
  status.value = '发布说明已保存';
  visible.value = false;
};
</script>

<template>
  <div class="drawer-confirm-demo">
    <h-button @click="open">编辑发布说明</h-button>
    <p role="status">{{ status }}</p>

    <h-drawer
      v-model:visible="visible"
      title="发布说明"
      placement="right"
      :before-close="beforeClose"
      @ok="save"
    >
      <div class="drawer-content">
        <h-input type="textarea" :rows="4" model-value="完善了组件示例的交互反馈。" />
        <label>
          <span>允许关闭</span>
          <h-switch v-model="allowClose" status />
        </label>
      </div>
    </h-drawer>
  </div>
</template>

<style scoped>
.drawer-confirm-demo,
.drawer-content {
  display: grid;
  justify-items: start;
  gap: 12px;
}

.drawer-content {
  width: 100%;
}

p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: 13px;
}

label {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--h-text-primary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .drawer-confirm-demo,
  .drawer-content {
    gap: 10px;
  }
}
</style>
