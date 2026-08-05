<script setup lang="ts">
import { ref } from 'vue';

const showLine = ref(true);
const showHighlightLine = ref(true);
</script>

<template>
  <div class="anchor-line-demo">
    <div class="anchor-demo-settings-inline anchor-line-demo__settings">
      <label>
        <span>Guide line</span>
        <h-switch v-model="showLine" aria-label="Show guide line" />
      </label>
      <label>
        <span>Active line</span>
        <h-switch v-model="showHighlightLine" :disabled="!showLine" aria-label="Show active line" />
      </label>
    </div>

    <div class="anchor-line-demo__layout">
      <div class="anchor-line-demo__nav">
        <h-anchor
          scroll-container="#anchor-line-scroll"
          :change-hash="false"
          :show-line="showLine"
          :show-highlight-line="showHighlightLine"
        >
          <h-anchor-link href="#anchor-line-intake" title="Intake" />
          <h-anchor-link href="#anchor-line-review" title="Review" />
          <h-anchor-link href="#anchor-line-approval" title="Approval" />
        </h-anchor>
      </div>

      <div id="anchor-line-scroll" class="anchor-line-demo__scroll">
        <div id="anchor-line-intake" class="anchor-line-demo__target">
          <h4>Intake</h4>
          <p>Capture the request and owner.</p>
        </div>
        <div id="anchor-line-review" class="anchor-line-demo__target">
          <h4>Review</h4>
          <p>Resolve questions and validate the plan.</p>
        </div>
        <div id="anchor-line-approval" class="anchor-line-demo__target">
          <h4>Approval</h4>
          <p>Record the decision and follow-up.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./demo.css"></style>
