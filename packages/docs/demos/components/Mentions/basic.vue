<template>
  <section class="docs-demo">
    <div class="mention-field">
      <label class="mention-label" for="review-comment">Review comment</label>
      <h-mentions
        id="review-comment"
        v-model="comment"
        :options="options"
        placeholder="Add a comment and mention a reviewer"
      />
      <output class="docs-demo__value">{{ comment || 'No comment yet' }}</output>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const comment = ref('Could @design review the empty state?');
const options = [
  { value: 'alice', label: 'Alice Chen · Product' },
  { value: 'bob', label: 'Bob Williams · Engineering' },
  { value: 'design', label: 'Design team' },
];
</script>

<style scoped>
.mention-label {
  color: var(--h-text-primary);
  font-weight: var(--h-weight-strong);
}

.mention-field {
  display: grid;
  gap: var(--h-spacing-3);
}
</style>
