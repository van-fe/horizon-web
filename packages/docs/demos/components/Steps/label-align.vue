<script setup lang="ts">
import { ref } from 'vue';

const labelAlign = ref<'left' | 'center'>('left');
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span>标签对齐</span>
        <h-segmented v-model:active-key="labelAlign" size="small">
          <h-segmented-item label="left" />
          <h-segmented-item label="center" />
        </h-segmented>
      </label>
    </div>
    <div class="steps-stage">
      <h-steps :current="1" :label-align="labelAlign" label-placement="vertical">
        <h-step title="填写信息" description="已完成" />
        <h-step title="身份验证" description="进行中" />
        <h-step title="设置偏好" description="等待中" />
      </h-steps>
    </div>
  </div>
</template>

<style scoped>
.steps-stage {
  min-width: 0;
  overflow-x: auto;
  padding-block: 12px;
}

.steps-stage :deep(.h-steps) {
  min-width: 520px;
}
</style>
