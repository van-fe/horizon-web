<template>
  <div class="checkbox-inverse-demo">
    <h-button size="small" @click="invertSelection">Invert selection</h-button>
    <div class="checkbox-inverse-demo__options">
      <h-checkbox
        v-for="(channel, index) in channels"
        :ref="element => setCheckboxRef(element, index)"
        :key="channel.label"
        v-model="channel.checked"
      >
        {{ channel.label }}
      </h-checkbox>
    </div>
    <p aria-live="polite">{{ selectedCount }} of {{ channels.length }} selected</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface CheckboxExpose {
  toggle: () => Promise<void>;
}

const channels = ref([
  { label: 'Email', checked: true },
  { label: 'Push', checked: false },
  { label: 'SMS', checked: false },
  { label: 'Desktop', checked: true },
]);
const checkboxRefs = ref<CheckboxExpose[]>([]);
const selectedCount = computed(() => channels.value.filter(channel => channel.checked).length);

function setCheckboxRef(element: unknown, index: number) {
  if (element) checkboxRefs.value[index] = element as CheckboxExpose;
}

async function invertSelection() {
  await Promise.all(checkboxRefs.value.map(checkbox => checkbox.toggle()));
}
</script>

<style scoped>
.checkbox-inverse-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-4);
}

.checkbox-inverse-demo__options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-4) var(--h-spacing-6);
}

.checkbox-inverse-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
