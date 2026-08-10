<script setup lang="ts">
import { ref } from 'vue';

const value = ref('Review the launch checklist');
const lastEvent = ref('Waiting for interaction');

function record(name: string, detail?: unknown) {
  lastEvent.value = detail === undefined ? name : `${name}: ${String(detail || 'empty')}`;
}
</script>

<template>
  <label class="input-event-demo" for="event-input">
    <span>Task note</span>
    <h-input
      id="event-input"
      v-model="value"
      clearable
      placeholder="Type, clear, focus, blur, or press Enter"
      @input="record('input', $event)"
      @change="record('change', $event)"
      @clear="record('clear')"
      @keyup.enter="record('enter', value)"
      @focus="record('focus')"
      @blur="record('blur')"
    />
    <small role="status">Latest: {{ lastEvent }}</small>
  </label>
</template>

<style scoped>
.input-event-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 640px;
}

.input-event-demo > span,
.input-event-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.input-event-demo > small {
  overflow-wrap: anywhere;
}
</style>
