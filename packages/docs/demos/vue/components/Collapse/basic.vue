<template>
  <div class="collapse-basic-demo">
    <h-switch v-model="filled" label="Filled panels" />
    <h-collapse v-model:active-key="activeKeys" :filled="filled">
      <h-collapse-item
        v-for="panel in panels"
        :key="panel.id"
        :name="panel.id"
        :title="panel.title"
      >
        <p>{{ panel.content }}</p>
      </h-collapse-item>
    </h-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const filled = ref(false);
const activeKeys = ref(['overview', 'timeline']);
const panels = [
  {
    id: 'overview',
    title: 'Outcome and audience',
    content: 'Create a focused workspace for product teams reviewing weekly decisions.',
  },
  {
    id: 'timeline',
    title: 'Delivery timeline',
    content: 'Prototype on Monday, review on Wednesday, and publish on Friday.',
  },
  {
    id: 'measure',
    title: 'Success measure',
    content: 'A reviewer should find the latest decision and owner in under thirty seconds.',
  },
];
</script>

<style scoped>
.collapse-basic-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.collapse-basic-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  line-height: 1.7;
}
</style>
