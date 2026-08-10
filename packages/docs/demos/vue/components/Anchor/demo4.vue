<script setup lang="ts">
import { ref } from 'vue';

type OffsetPreset = 'start' | 'center' | 'end';

const scrollOffset = ref<OffsetPreset>('start');
const boundsOffset = ref<OffsetPreset>('center');
</script>

<template>
  <div class="anchor-offset-demo">
    <div class="anchor-offset-demo__settings">
      <label>
        <span>Scroll target</span>
        <h-segmented v-model:active-key="scrollOffset" size="small" block>
          <h-segmented-item value="start" label="Start" />
          <h-segmented-item value="center" label="Center" />
          <h-segmented-item value="end" label="End" />
        </h-segmented>
      </label>
      <label>
        <span>Active boundary</span>
        <h-segmented v-model:active-key="boundsOffset" size="small" block>
          <h-segmented-item value="start" label="Start" />
          <h-segmented-item value="center" label="Center" />
          <h-segmented-item value="end" label="End" />
        </h-segmented>
      </label>
    </div>

    <div class="anchor-offset-demo__layout">
      <div class="anchor-offset-demo__nav">
        <h-anchor
          scroll-container="#anchor-offset-scroll"
          :change-hash="false"
          :scroll-offset="scrollOffset"
          :bounds-offset="boundsOffset"
        >
          <h-anchor-link href="#anchor-offset-discovery" title="Discovery" />
          <h-anchor-link href="#anchor-offset-design" title="Design" />
          <h-anchor-link href="#anchor-offset-build" title="Build" />
          <h-anchor-link href="#anchor-offset-release" title="Release" />
        </h-anchor>
      </div>

      <div id="anchor-offset-scroll" class="anchor-offset-demo__scroll">
        <div id="anchor-offset-discovery" class="anchor-offset-demo__target">
          <h4>Discovery</h4>
          <p>Define the outcome and audience.</p>
        </div>
        <div id="anchor-offset-design" class="anchor-offset-demo__target">
          <h4>Design</h4>
          <p>Test the critical workflow.</p>
        </div>
        <div id="anchor-offset-build" class="anchor-offset-demo__target">
          <h4>Build</h4>
          <p>Deliver in small, reviewable slices.</p>
        </div>
        <div id="anchor-offset-release" class="anchor-offset-demo__target">
          <h4>Release</h4>
          <p>Roll out gradually and monitor.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./demo.css"></style>
