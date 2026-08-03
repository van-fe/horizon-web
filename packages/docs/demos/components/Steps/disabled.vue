<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0);
</script>

<template>
  <div class="docs-demo">
    <div class="steps-stage">
      <h-steps v-model="value" clickable>
        <h-step title="选择方案" subtitle="可以访问" />
        <h-step title="企业认证" disabled subtitle="当前账号无需此步骤" />
        <h-step title="填写资料" subtitle="可以访问" />
        <h-step title="完成" subtitle="等待中" />
      </h-steps>
    </div>
    <p class="docs-demo__status">“企业认证”不可点击</p>
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
