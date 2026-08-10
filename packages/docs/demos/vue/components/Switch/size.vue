<script setup lang="ts">
import { ref } from 'vue';

const medium = ref(true);
const small = ref(true);
</script>

<template>
  <div class="size-grid">
    <div>
      <span>medium</span>
      <h-switch v-model="medium" status label="桌面端设置" />
    </div>
    <div>
      <span>small</span>
      <h-switch v-model="small" size="small" status label="紧凑表格设置" />
    </div>
  </div>
</template>

<style scoped>
.size-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.size-grid > div {
  display: grid;
  justify-items: start;
  gap: 14px;
  padding: 10px 0;
}

.size-grid span {
  color: var(--h-text-secondary);
  font-size: 12px;
}

@media (max-width: 480px) {
  .size-grid {
    grid-template-columns: 1fr;
  }
}
</style>
