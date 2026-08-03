<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span class="docs-demo__control-label">Type</span>
        <h-segmented v-model:active-key="type" size="small" block>
          <h-segmented-item key="normal" label="Normal" />
          <h-segmented-item key="primary" label="Primary" />
        </h-segmented>
      </label>
    </div>

    <h-float-button icon="filter" :type="type" tooltip="Filter results" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const type = ref('primary');
</script>
