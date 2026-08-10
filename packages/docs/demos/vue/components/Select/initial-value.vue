<script setup lang="ts">
import { computed, ref } from 'vue';

const channels = [
  { value: 'email', label: '邮件' },
  { value: 'chat', label: '即时消息' },
  { value: 'webhook', label: 'Webhook' },
];
const primary = ref<string | null>();
const fallback = ref<string[] | undefined>();
const primaryState = computed(() => (primary.value === null ? 'null' : String(primary.value)));
const fallbackState = computed(() =>
  Array.isArray(fallback.value) ? `[${fallback.value.join(', ')}]` : String(fallback.value),
);
</script>

<template>
  <div class="comparison-row">
    <label>
      <span>初始值 null</span>
      <h-select v-model="primary" :initial-value="null" clearable :to-body="false">
        <h-option v-for="channel in channels" :key="channel.value" v-bind="channel" />
      </h-select>
      <small>{{ primaryState }}</small>
    </label>
    <label>
      <span>初始值 []</span>
      <h-select v-model="fallback" multiple :initial-value="[]" clearable :to-body="false">
        <h-option v-for="channel in channels" :key="channel.value" v-bind="channel" />
      </h-select>
      <small>{{ fallbackState }}</small>
    </label>
  </div>
</template>

<style scoped>
.comparison-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.comparison-row label {
  display: grid;
  min-width: 0;
  gap: 7px;
}

.comparison-row span,
.comparison-row small {
  color: var(--h-text-secondary);
  font-size: 12px;
}

.comparison-row :deep(.h-select) {
  width: 100%;
  min-width: 0;
}

@media (max-width: 560px) {
  .comparison-row {
    grid-template-columns: 1fr;
  }
}
</style>
