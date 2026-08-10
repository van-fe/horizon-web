<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-switch v-model="draggable" label="Draggable" />
      <h-switch v-model="adsorbBottom" label="Allow bottom snap" />
    </div>

    <h-float-button
      :adsorb-bottom="adsorbBottom"
      :draggable="draggable"
      icon="service"
      tooltip="Workspace assistant"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const draggable = ref(true);
const adsorbBottom = ref(false);
</script>
