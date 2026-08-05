<template>
  <h-collapse v-model:active-key="activeKey" accordion filled>
    <h-collapse-item
      v-for="question in questions"
      :key="question.id"
      :name="question.id"
      :title="question.title"
    >
      <p>{{ question.answer }}</p>
    </h-collapse-item>
  </h-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeKey = ref<string | undefined>('sharing');
const questions = [
  {
    id: 'sharing',
    title: 'How do I share a workspace?',
    answer: 'Open workspace settings, choose Members, and invite teammates by email.',
  },
  {
    id: 'history',
    title: 'Where can I review recent changes?',
    answer: 'The activity panel records edits, comments, and status updates.',
  },
  {
    id: 'export',
    title: 'Can I export a project summary?',
    answer: 'Use Export from the project menu to create a PDF or structured data file.',
  },
];
</script>

<style scoped>
p {
  margin: 0;
  color: var(--h-text-secondary);
  line-height: 1.7;
}
</style>
