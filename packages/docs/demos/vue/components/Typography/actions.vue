<script setup lang="ts">
import { ref } from 'vue';

const text = ref('这段文本可以复制，也可以就地编辑。');
const disabledText = ref('禁用状态不会响应复制和编辑操作。');
</script>

<template>
  <div class="typography-actions">
    <section>
      <span class="section-label">多行省略</span>
      <h-typography :ellipsis="2" block>
        Horizon Web 提供统一、清晰且可访问的 Vue 3
        组件体验。较长文本可以按指定行数省略，适配窄容器和不同语言长度，同时保留完整内容的查看入口。
      </h-typography>
    </section>
    <section>
      <span class="section-label">复制与编辑</span>
      <h-typography v-model="text" copyable editable block />
      <p class="value-preview">当前内容：{{ text }}</p>
    </section>
    <section>
      <span class="section-label">禁用状态</span>
      <h-typography v-model="disabledText" copyable editable disabled block />
    </section>
  </div>
</template>

<style scoped>
.typography-actions {
  display: grid;
  gap: var(--h-spacing-6);
  max-width: 640px;
}

.typography-actions section {
  display: grid;
  gap: var(--h-spacing-2);
}

.section-label,
.value-preview {
  color: var(--h-text-secondary);
  font-size: 12px;
}

.value-preview {
  margin: 0;
  overflow-wrap: anywhere;
}
</style>
