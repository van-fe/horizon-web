<script setup lang="ts">
import { ref } from 'vue';

const values = ref({ top: true, left: true, right: true });
</script>

<template>
  <div class="position-grid">
    <section>
      <span>top</span>
      <h-switch v-model="values.top" label="自动发送每周项目摘要" label-position="top" />
    </section>
    <section>
      <span>left</span>
      <h-switch v-model="values.left" label="自动发送每周项目摘要" label-position="left" />
    </section>
    <section>
      <span>right</span>
      <h-switch v-model="values.right" label="自动发送每周项目摘要" label-position="right" />
    </section>
  </div>
</template>

<style scoped>
.position-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.position-grid section {
  display: grid;
  justify-items: start;
  align-content: center;
  gap: 14px;
  min-height: 88px;
  padding: 10px 0;
}

.position-grid section > span {
  color: var(--h-text-secondary);
  font-size: 12px;
}

@media (max-width: 720px) {
  .position-grid {
    grid-template-columns: 1fr;
  }
}
</style>
