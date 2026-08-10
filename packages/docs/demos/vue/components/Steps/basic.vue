<script setup lang="ts">
import { ref } from 'vue';

const status = ref('process');
const statuses = ['wait', 'process', 'finish', 'warning', 'error'];
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span>当前状态</span>
        <h-select v-model="status">
          <h-option v-for="item in statuses" :key="item" :value="item" :label="item" />
        </h-select>
      </label>
    </div>
    <div class="steps-stage">
      <h-steps :model-value="1" :status="status">
        <h-step title="创建项目" subtitle="资料已保存" />
        <h-step title="配置成员" subtitle="正在处理" description="今天 10:24" />
        <h-step title="设置权限" subtitle="等待处理" />
        <h-step title="完成" subtitle="等待处理" />
      </h-steps>
    </div>
    <p class="docs-demo__status">当前步骤使用 {{ status }} 状态</p>
  </div>
</template>

<style scoped>
.steps-stage {
  overflow-x: auto;
  padding-block: 12px;
}

.steps-stage :deep(.h-steps) {
  min-width: 560px;
}
</style>
