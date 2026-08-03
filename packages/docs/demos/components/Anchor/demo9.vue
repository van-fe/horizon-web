<script setup lang="ts">
import { ref } from 'vue';

const collapsed = ref(true);
</script>

<template>
  <div class="anchor-collapse-demo">
    <span class="anchor-collapse-demo__status" aria-live="polite">
      {{ collapsed ? 'Collapsed' : 'Expanded' }}
    </span>

    <div class="anchor-collapse-demo__layout">
      <div class="anchor-collapse-demo__nav">
        <h-anchor
          v-model:collapse="collapsed"
          scroll-container="#anchor-collapse-scroll"
          :change-hash="false"
          use-collapse
          collapse-text="On this page"
        >
          <h-anchor-link href="#anchor-collapse-context" title="Context" />
          <h-anchor-link href="#anchor-collapse-principles" title="Principles" />
          <h-anchor-link href="#anchor-collapse-patterns" title="Patterns" />
          <h-anchor-link href="#anchor-collapse-checklist" title="Checklist" />
        </h-anchor>
      </div>

      <div id="anchor-collapse-scroll" class="anchor-collapse-demo__scroll">
        <div id="anchor-collapse-context" class="anchor-collapse-demo__target">
          <h4>Context</h4>
          <p>Explain who should use the guidance.</p>
        </div>
        <div id="anchor-collapse-principles" class="anchor-collapse-demo__target">
          <h4>Principles</h4>
          <p>Use a small set of durable rules.</p>
        </div>
        <div id="anchor-collapse-patterns" class="anchor-collapse-demo__target">
          <h4>Patterns</h4>
          <p>Pair guidance with realistic examples.</p>
        </div>
        <div id="anchor-collapse-checklist" class="anchor-collapse-demo__target">
          <h4>Checklist</h4>
          <p>Finish with clear, testable checks.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./demo.css"></style>
