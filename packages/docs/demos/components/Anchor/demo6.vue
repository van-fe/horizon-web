<script setup lang="ts">
import { ref } from 'vue';

const clickMessage = ref('Click: waiting');
const changeMessage = ref('Change: waiting');

function handleClick(link: { href: string; title: string }) {
  clickMessage.value = `Click: ${link.title}`;
}

function handleChange(link: string, previousLink: string) {
  changeMessage.value = previousLink ? `Change: ${previousLink} → ${link}` : `Change: ${link}`;
}
</script>

<template>
  <div class="anchor-events-demo">
    <div class="anchor-events-demo__status" aria-live="polite">
      <span>{{ clickMessage }}</span>
      <span>{{ changeMessage }}</span>
    </div>

    <div class="anchor-events-demo__layout">
      <div class="anchor-events-demo__nav">
        <h-anchor
          scroll-container="#anchor-events-scroll"
          :change-hash="false"
          @click="handleClick"
          @change="handleChange"
        >
          <h-anchor-link href="#anchor-events-brief" title="Brief" />
          <h-anchor-link href="#anchor-events-feedback" title="Feedback" />
          <h-anchor-link href="#anchor-events-decision" title="Decision" />
        </h-anchor>
      </div>

      <div id="anchor-events-scroll" class="anchor-events-demo__scroll">
        <div id="anchor-events-brief" class="anchor-events-demo__target">
          <h4>Brief</h4>
          <p>Define the problem and constraints.</p>
        </div>
        <div id="anchor-events-feedback" class="anchor-events-demo__target">
          <h4>Feedback</h4>
          <p>Group comments by theme.</p>
        </div>
        <div id="anchor-events-decision" class="anchor-events-demo__target">
          <h4>Decision</h4>
          <p>Capture the chosen direction.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./demo.css"></style>
