<script setup lang="ts">
import { ref } from 'vue';

const size = ref<'small' | 'medium'>('medium');
const maxHeight = ref(180);
const showTitleSuffix = ref(true);
const deliveryTitle = ref('Delivery');
</script>

<template>
  <div class="anchor-dynamic-demo">
    <div class="anchor-dynamic-demo__settings">
      <label>
        <span>Size</span>
        <h-segmented v-model:active-key="size" size="small" block>
          <h-segmented-item key="small" label="Small" />
          <h-segmented-item key="medium" label="Medium" />
        </h-segmented>
      </label>
      <label class="anchor-dynamic-demo__switch">
        <span>Child count</span>
        <h-switch v-model="showTitleSuffix" aria-label="Show child count" />
      </label>
      <label>
        <span>Anchor height · {{ maxHeight }}px</span>
        <h-slider v-model="maxHeight" :min="140" :max="240" :step="20" />
      </label>
      <label>
        <span>Link title</span>
        <h-input v-model="deliveryTitle" placeholder="Delivery" />
      </label>
    </div>

    <div class="anchor-dynamic-demo__layout">
      <div class="anchor-dynamic-demo__nav">
        <h-anchor
          :size="size"
          :max-height="maxHeight"
          :show-title-suffix="showTitleSuffix"
          scroll-container="#anchor-dynamic-scroll"
          :change-hash="false"
        >
          <h-anchor-link href="#anchor-dynamic-overview" title="Overview" />
          <h-anchor-link href="#anchor-dynamic-plan" title="Plan">
            <h-anchor-link href="#anchor-dynamic-audience" title="Audience" />
            <h-anchor-link href="#anchor-dynamic-timeline" title="Timeline" />
          </h-anchor-link>
          <h-anchor-link href="#anchor-dynamic-delivery" :title="deliveryTitle || 'Delivery'" />
          <h-anchor-link href="#anchor-dynamic-support" title="Support" />
        </h-anchor>
      </div>

      <div id="anchor-dynamic-scroll" class="anchor-dynamic-demo__scroll">
        <div id="anchor-dynamic-overview" class="anchor-dynamic-demo__target">
          <h4>Overview</h4>
          <p>A compact launch reference.</p>
        </div>
        <div id="anchor-dynamic-plan" class="anchor-dynamic-demo__target">
          <h4>Plan</h4>
          <p>Start with audience and timeline.</p>
        </div>
        <div id="anchor-dynamic-audience" class="anchor-dynamic-demo__target">
          <h5>Audience</h5>
          <p>Validate with internal teams first.</p>
        </div>
        <div id="anchor-dynamic-timeline" class="anchor-dynamic-demo__target">
          <h5>Timeline</h5>
          <p>Give every stage an owner.</p>
        </div>
        <div id="anchor-dynamic-delivery" class="anchor-dynamic-demo__target">
          <h4>{{ deliveryTitle || 'Delivery' }}</h4>
          <p>Check migration and permissions.</p>
        </div>
        <div id="anchor-dynamic-support" class="anchor-dynamic-demo__target">
          <h4>Support</h4>
          <p>Share escalation paths.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./demo.css"></style>
