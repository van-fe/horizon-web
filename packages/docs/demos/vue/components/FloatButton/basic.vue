<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-switch v-model="visible" label="Show floating actions" />
    </div>

    <h-float-button :visible="visible" icon="message" tooltip="Open support chat" />
    <h-float-button :visible="visible" description="Help" tooltip="View help center" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
</script>
