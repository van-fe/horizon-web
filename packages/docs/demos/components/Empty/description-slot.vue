<template>
  <section class="docs-demo">
    <div class="docs-demo__stage">
      <h-empty>
        <template #description>
          <span>
            No matching customers.
            <h-link @click="resetStatus = 'Filters reset'">Reset filters</h-link>
          </span>
        </template>
      </h-empty>
      <output class="docs-demo__value" aria-live="polite">{{ resetStatus }}</output>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const resetStatus = ref('Three filters active');
</script>
