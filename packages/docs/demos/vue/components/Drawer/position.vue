<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const placement = ref('right');
const placements = ['right', 'bottom', 'left', 'top'];
</script>

<template>
  <div class="drawer-position-demo">
    <div class="controls">
      <h-segmented v-model:active-key="placement" size="small">
        <h-segmented-item v-for="item in placements" :key="item" :value="item" :label="item" />
      </h-segmented>
      <h-button @click="visible = true">打开抽屉</h-button>
    </div>
    <p role="status">当前方向：{{ placement }}</p>

    <h-drawer v-model:visible="visible" title="筛选项目" :placement="placement">
      <p>抽屉会从所选方向进入页面。</p>
    </h-drawer>
  </div>
</template>

<style scoped>
.drawer-position-demo {
  display: grid;
  justify-items: start;
  gap: 12px;
}

.controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .controls {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
