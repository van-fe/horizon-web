<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(false);
const active = ref('Wednesday');
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-switch v-model="disabled" label="Disable all" />
    </div>
    <h-segmented v-model:active-key="active" block>
      <h-segmented-item value="Monday" label="Monday" disabled />
      <h-segmented-item value="Tuesday" label="Tuesday" :disabled="disabled" />
      <h-segmented-item value="Wednesday" label="Wednesday" :disabled="disabled" />
      <h-segmented-item value="Thursday" label="Thursday" :disabled="disabled" />
      <h-segmented-item value="Friday" label="Friday" disabled />
    </h-segmented>
  </section>
</template>
