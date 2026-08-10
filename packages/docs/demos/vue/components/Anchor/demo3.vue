<script setup lang="ts">
import { ref } from 'vue';

const showTitleSuffix = ref(true);
</script>

<template>
  <div class="anchor-container-demo">
    <label class="anchor-container-demo__setting">
      <span>Show child count</span>
      <h-switch v-model="showTitleSuffix" aria-label="Show child count" />
    </label>

    <div class="anchor-container-demo__layout">
      <div class="anchor-container-demo__nav">
        <h-anchor
          scroll-container="#anchor-container-scroll"
          :change-hash="false"
          :show-title-suffix="showTitleSuffix"
        >
          <h-anchor-link href="#anchor-container-plan" title="Launch plan">
            <h-anchor-link href="#anchor-container-goals" title="Goals" />
            <h-anchor-link href="#anchor-container-stages" title="Stages" />
            <h-anchor-link href="#anchor-container-rollback" title="Rollback" />
          </h-anchor-link>
          <h-anchor-link href="#anchor-container-support" title="Support" />
        </h-anchor>
      </div>

      <div id="anchor-container-scroll" class="anchor-container-demo__scroll">
        <div id="anchor-container-plan" class="anchor-container-demo__target">
          <h4>Launch plan</h4>
          <p>A staged path from preview to release.</p>
        </div>
        <div id="anchor-container-goals" class="anchor-container-demo__target">
          <h5>Goals</h5>
          <p>Measure adoption and task completion.</p>
        </div>
        <div id="anchor-container-stages" class="anchor-container-demo__target">
          <h5>Stages</h5>
          <p>Each cohort has an owner and checkpoint.</p>
        </div>
        <div id="anchor-container-rollback" class="anchor-container-demo__target">
          <h5>Rollback</h5>
          <p>Keep a tested recovery path ready.</p>
        </div>
        <div id="anchor-container-support" class="anchor-container-demo__target">
          <h4>Support</h4>
          <p>Publish notes and escalation contacts.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./demo.css"></style>
