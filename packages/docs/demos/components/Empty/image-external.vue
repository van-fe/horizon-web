<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__stage">
      <h-empty
        :size="120"
        :image="demoAssetUrl('empty-state.svg')"
        description="No analytics snapshots have been generated yet."
      />
    </div>
  </section>
</template>
