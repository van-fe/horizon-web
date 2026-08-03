<template>
  <div class="controls-access-demo">
    <h-segmented v-model:active-key="role" size="small">
      <h-segmented-item key="viewer" label="Viewer" />
      <h-segmented-item key="editor" label="Editor" />
      <h-segmented-item key="admin" label="Admin" />
    </h-segmented>

    <h-hover v-slot="{ hover }">
      <div class="controls-target">
        <strong>Prototype review</strong>
        <span>{{ roleLabel }}</span>
        <h-mask :absolute="true" :value="hover" :content-full-size="true">
          <h-controls theme="light" :access-list="accessList" @command="onCommand">
            <h-control :icon="IconEye" text="View" label="view" />
            <h-control :icon="IconEdit" text="Edit" label="edit" />
            <h-control :icon="IconRubbish" text="Delete" label="delete" />
          </h-controls>
        </h-mask>
      </div>
    </h-hover>

    <p aria-live="polite">Available: {{ accessList.join(', ') }} · {{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { IconEdit, IconEye, IconRubbish } from '@aurora/icon';
import { computed, ref } from 'vue';

const role = ref<'viewer' | 'editor' | 'admin'>('editor');
const status = ref('No action selected');
const accessList = computed(() => {
  if (role.value === 'viewer') return ['view'];
  if (role.value === 'editor') return ['view', 'edit'];
  return ['view', 'edit', 'delete'];
});
const roleLabel = computed(() => `${role.value[0].toUpperCase()}${role.value.slice(1)} access`);

function onCommand(type: 'view' | 'edit' | 'delete') {
  status.value = `${type} selected`;
}
</script>

<style scoped>
.controls-access-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-4);
}

.controls-target {
  position: relative;
  display: grid;
  align-content: center;
  gap: var(--h-spacing-1);
  width: min(100%, 420px);
  min-height: 120px;
  padding: var(--h-spacing-5);
  box-sizing: border-box;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-l);
  background: var(--h-bg-secondary);
}

.controls-target span,
.controls-access-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
