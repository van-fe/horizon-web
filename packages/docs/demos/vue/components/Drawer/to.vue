<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const innerEl = ref<HTMLElement | null>(null);
const target = ref<HTMLElement | undefined>();
const targetLabel = ref('尚未选择挂载目标');

const openDrawer = (inside: boolean) => {
  target.value = inside ? (innerEl.value ?? undefined) : document.body;
  targetLabel.value = inside ? '局部容器' : '页面 body';
  visible.value = true;
};
</script>

<template>
  <div class="drawer-to-demo">
    <div ref="innerEl" class="target-stage">
      <h-space wrap>
        <h-button @click="openDrawer(true)">挂载到局部容器</h-button>
        <h-button type="normal" @click="openDrawer(false)">挂载到页面 body</h-button>
      </h-space>
    </div>
    <p role="status">{{ targetLabel }}</p>

    <h-drawer
      v-model:visible="visible"
      :to="target"
      size="small"
      :title="`挂载到${targetLabel}`"
      placement="right"
    >
      <p>局部挂载可限制抽屉的显示范围。</p>
    </h-drawer>
  </div>
</template>

<style scoped>
.drawer-to-demo {
  display: grid;
  gap: 12px;
}

.target-stage {
  position: relative;
  display: grid;
  min-height: 260px;
  overflow: hidden;
  place-items: center;
  padding: 16px;
  border: 1px solid var(--h-border-default);
  background: var(--h-bg-secondary);
}

p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .target-stage {
    min-height: 220px;
  }
}
</style>
