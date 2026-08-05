<script setup lang="ts">
import { ref } from 'vue';

const selected = ref('选择导出格式');
const select = (value: string) => {
  selected.value = `已选择：${value}`;
};
</script>

<template>
  <div class="dropdown-command-demo">
    <h-dropdown @command="select">
      <h-button>导出报告</h-button>
      <template #dropdown>
        <h-dropdown-menu>
          <h-dropdown-item command="Excel (.xlsx)">Excel (.xlsx)</h-dropdown-item>
          <h-dropdown-item @click="select('CSV (.csv)')">CSV (.csv)</h-dropdown-item>
          <h-dropdown-item command="JSON (.json)" disabled>JSON（暂不可用）</h-dropdown-item>
        </h-dropdown-menu>
      </template>
    </h-dropdown>
    <p role="status">{{ selected }}</p>
  </div>
</template>

<style scoped>
.dropdown-command-demo {
  display: grid;
  justify-items: start;
  gap: 12px;
}

p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .dropdown-command-demo {
    gap: 10px;
  }
}
</style>
