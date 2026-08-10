<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const status = ref('可自定义抽屉的头部和底部');
const selectedTags = ref(['review']);

const finish = (message: string) => {
  status.value = message;
  visible.value = false;
};
</script>

<template>
  <div class="drawer-custom-demo">
    <h-button @click="visible = true">批量更新标签</h-button>
    <p class="status" role="status">{{ status }}</p>

    <h-drawer v-model:visible="visible" placement="right">
      <template #header>
        <div class="custom-header">
          <strong>批量更新标签</strong>
          <span>已选择 24 个项目</span>
        </div>
      </template>

      <div class="drawer-content">
        <p>所选标签将应用到全部项目。</p>
        <h-select v-model="selectedTags" multiple placeholder="请选择标签">
          <h-option label="高优先级" value="priority" />
          <h-option label="等待评审" value="review" />
          <h-option label="本周发布" value="release" />
        </h-select>
      </div>

      <template #footer>
        <h-space>
          <h-button @click="finish('标签已更新')">应用</h-button>
          <h-button type="normal" @click="finish('已取消更新')">取消</h-button>
        </h-space>
      </template>
    </h-drawer>
  </div>
</template>

<style scoped>
.drawer-custom-demo,
.custom-header,
.drawer-content {
  display: grid;
  gap: 12px;
}

.drawer-custom-demo {
  justify-items: start;
}

.custom-header {
  gap: 2px;
}

.custom-header strong {
  color: var(--h-text-primary);
}

.custom-header span,
p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: 13px;
}

.drawer-content {
  width: 100%;
}

@media (max-width: 390px) {
  .drawer-custom-demo,
  .drawer-content {
    gap: 10px;
  }
}
</style>
