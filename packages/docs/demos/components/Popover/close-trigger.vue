<script setup lang="ts">
import { ref } from 'vue';

const hideEventType = ref<'click' | 'mousedown' | 'mouseup'>('click');
const shown = ref(false);
const eventTypes = ['click', 'mousedown', 'mouseup'];
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span>全局关闭事件</span>
        <h-segmented v-model:active-key="hideEventType" size="small">
          <h-segmented-item v-for="item in eventTypes" :key="item" :label="item" />
        </h-segmented>
      </label>
      <h-popover
        trigger="click"
        :hide-event-type="hideEventType"
        @show="shown = true"
        @hide="shown = false"
      >
        <template #reference><h-button>打开详情</h-button></template>
        <template #popper>
          <h-pop-content>
            <div class="popover-copy">
              <strong>项目详情</strong>
              <p>点击外部区域关闭此浮层。</p>
            </div>
          </h-pop-content>
        </template>
      </h-popover>
    </div>

    <div class="event-grid">
      <button type="button" @click.stop>阻止 click</button>
      <button type="button" @mousedown.stop>阻止 mousedown</button>
      <button type="button" @mouseup.stop>阻止 mouseup</button>
    </div>
    <p class="docs-demo__status" role="status">
      {{ shown ? `浮层已显示；阻止 ${hideEventType} 时不会关闭` : '浮层当前已关闭' }}
    </p>
  </div>
</template>

<style scoped>
.event-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.event-grid button {
  padding: 12px;
  border: 1px solid var(--h-border-default);
  border-radius: 8px;
  color: var(--h-text-primary);
  background: var(--h-bg-secondary);
  font: inherit;
  cursor: pointer;
}

.popover-copy p {
  color: var(--h-text-secondary);
  font-size: 12px;
}

.popover-copy {
  width: 220px;
}

.popover-copy p {
  margin: 5px 0 0;
}

@media (max-width: 560px) {
  .event-grid {
    grid-template-columns: 1fr;
  }
}
</style>
