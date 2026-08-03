<script setup lang="ts">
import { ref } from 'vue';

const changeHash = ref(false);
</script>

<template>
  <div class="anchor-hash-demo">
    <label class="anchor-hash-demo__setting">
      <span>Update URL hash</span>
      <h-switch
        v-model="changeHash"
        status
        status-on-text="On"
        status-off-text="Off"
        aria-label="Update URL hash"
      />
    </label>

    <div class="anchor-hash-demo__layout">
      <div class="anchor-hash-demo__nav">
        <h-anchor scroll-container="#anchor-hash-scroll" :change-hash="changeHash">
          <h-anchor-link href="#anchor-hash-summary" title="Summary" />
          <h-anchor-link href="#anchor-hash-scope" title="Scope" />
          <h-anchor-link href="#anchor-hash-risks" title="Risks" />
        </h-anchor>
      </div>

      <div id="anchor-hash-scroll" class="anchor-hash-demo__scroll">
        <div id="anchor-hash-summary" class="anchor-hash-demo__target">
          <h4>Summary</h4>
          <p>A guided workflow replaces three entry points.</p>
        </div>
        <div id="anchor-hash-scope" class="anchor-hash-demo__target">
          <h4>Scope</h4>
          <p>Creation, invitations, and permissions.</p>
        </div>
        <div id="anchor-hash-risks" class="anchor-hash-demo__target">
          <h4>Risks</h4>
          <p>Migration and rollback need extra review.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./demo.css"></style>
