<script setup lang="ts">
import { ref } from 'vue';

const size = ref<'small' | 'medium'>('medium');
</script>

<template>
  <div class="anchor-size-demo">
    <h-segmented
      v-model:active-key="size"
      class="anchor-demo-action"
      size="small"
      aria-label="Anchor size"
    >
      <h-segmented-item key="small" label="Small" />
      <h-segmented-item key="medium" label="Medium" />
    </h-segmented>

    <div class="anchor-size-demo__layout">
      <div class="anchor-size-demo__nav">
        <h-anchor :size="size" scroll-container="#anchor-size-scroll" :change-hash="false">
          <h-anchor-link href="#anchor-size-overview" title="Overview" />
          <h-anchor-link href="#anchor-size-milestones" title="Milestones" />
          <h-anchor-link href="#anchor-size-owners" title="Owners" />
        </h-anchor>
      </div>

      <div id="anchor-size-scroll" class="anchor-size-demo__scroll">
        <div id="anchor-size-overview" class="anchor-size-demo__target">
          <h4>Overview</h4>
          <p>Goals and scope for the next release.</p>
        </div>
        <div id="anchor-size-milestones" class="anchor-size-demo__target">
          <h4>Milestones</h4>
          <p>Review, pilot, and rollout dates.</p>
        </div>
        <div id="anchor-size-owners" class="anchor-size-demo__target">
          <h4>Owners</h4>
          <p>Teams responsible for design and delivery.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./demo.css"></style>
