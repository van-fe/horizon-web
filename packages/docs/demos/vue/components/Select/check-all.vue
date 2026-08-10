<script setup lang="ts">
import { ref } from 'vue';

const selected = ref<string[]>([]);
const permissions = [
  { value: 'read', label: 'View workspace' },
  { value: 'comment', label: 'Comment' },
  { value: 'edit', label: 'Edit content' },
  { value: 'invite', label: 'Invite members' },
];
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="selected"
      multiple
      use-check-all
      use-check-all-summary
      check-all-summary-text="完整访问权限"
      :to-body="false"
    >
      <h-option v-for="permission in permissions" :key="permission.value" v-bind="permission" />
    </h-select>
    <p class="docs-demo__status">{{ selected.length }}/{{ permissions.length }} 项权限</p>
  </div>
</template>

<style scoped>
.select-demo {
  display: grid;
  min-width: 0;
  gap: 10px;
}

.select-demo :deep(.h-select) {
  width: 100%;
  min-width: 0;
}
</style>
