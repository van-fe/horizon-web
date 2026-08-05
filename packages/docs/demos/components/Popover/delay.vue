<script setup lang="ts">
import { ref } from 'vue';

const showDelay = ref(100);
const hideDelay = ref(300);
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control docs-demo__control--grow">
        <span>显示延迟：{{ showDelay }} ms</span>
        <h-slider v-model="showDelay" :min="0" :max="600" :step="100" />
      </label>
      <label class="docs-demo__control docs-demo__control--grow">
        <span>隐藏延迟：{{ hideDelay }} ms</span>
        <h-slider v-model="hideDelay" :min="0" :max="600" :step="100" />
      </label>
    </div>
    <div class="popover-stage">
      <h-popover :hover-show-delay="showDelay" :hover-hide-delay="hideDelay">
        <template #reference><h-button type="normal">悬浮查看</h-button></template>
        <template #popper><h-pop-content>移动到浮层中继续停留</h-pop-content></template>
      </h-popover>
    </div>
  </div>
</template>

<style scoped>
.popover-stage {
  display: flex;
  justify-content: center;
  padding-block: 24px;
}
</style>
