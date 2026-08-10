<script setup lang="ts">
import { ref } from 'vue';

const plainValue = ref('selected');
const borderedValue = ref('selected');
</script>

<template>
  <div class="disabled-grid">
    <section>
      <span>普通样式</span>
      <h-radio value="unavailable" disabled>不可选</h-radio>
      <h-radio v-model="plainValue" value="selected" disabled>已选后禁用</h-radio>
      <h-radio v-model="plainValue" value="available">可正常选择</h-radio>
    </section>
    <section>
      <span>边框样式</span>
      <h-radio value="unavailable" disabled border>不可选</h-radio>
      <h-radio v-model="borderedValue" value="selected" disabled border>已选后禁用</h-radio>
      <h-radio v-model="borderedValue" value="available" border>可正常选择</h-radio>
    </section>
  </div>
</template>

<style scoped>
.disabled-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.disabled-grid section {
  display: grid;
  justify-items: start;
  gap: 14px;
  padding: 18px;
  border: 1px solid var(--h-border-default);
  border-radius: 10px;
  background: var(--h-bg-default);
}

.disabled-grid span {
  color: var(--h-text-secondary);
  font-size: 12px;
}

@media (max-width: 560px) {
  .disabled-grid {
    grid-template-columns: 1fr;
  }
}
</style>
