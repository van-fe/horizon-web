<script setup lang="ts">
import { nextTick, ref } from 'vue';

type AnchorInstance = {
  refreshAnchorList: () => void;
};

const anchorRef = ref<AnchorInstance | null>(null);
const showRehearsal = ref(false);

async function toggleRehearsal() {
  showRehearsal.value = !showRehearsal.value;
  await nextTick();
  anchorRef.value?.refreshAnchorList();
}
</script>

<template>
  <div class="anchor-auto-demo">
    <h-button class="anchor-demo-action" size="small" @click="toggleRehearsal">
      {{ showRehearsal ? 'Remove rehearsal' : 'Add rehearsal and refresh' }}
    </h-button>

    <div class="anchor-auto-demo__layout">
      <div class="anchor-auto-demo__nav">
        <h-anchor
          ref="anchorRef"
          scroll-container="#anchor-auto-scroll"
          :change-hash="false"
          auto-render
          :auto-render-rules="['h4', 'h5', 'h6']"
          show-title-suffix
        />
      </div>

      <div id="anchor-auto-scroll" class="anchor-auto-demo__scroll">
        <div class="anchor-auto-demo__target">
          <h4>Release guide</h4>
          <p>Move a reviewed change into production.</p>
        </div>
        <div class="anchor-auto-demo__target">
          <h5>Before deployment</h5>
          <p>Confirm checks, notes, and rollback.</p>
        </div>
        <div class="anchor-auto-demo__target">
          <h6>Data migration</h6>
          <p>Test the recovery path.</p>
        </div>
        <div v-if="showRehearsal" class="anchor-auto-demo__target">
          <h6>Rehearsal</h6>
          <p>Run the complete release once.</p>
        </div>
        <div class="anchor-auto-demo__target">
          <h5>After deployment</h5>
          <p>Monitor errors and support volume.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./demo.css"></style>
