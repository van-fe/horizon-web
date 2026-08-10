<script setup lang="ts">
import { ref } from 'vue';

const affix = ref<{ updatePosition: () => void }>();
</script>

<template>
  <div class="outer" @scroll="affix?.updatePosition()">
    <div class="outer-track">
      <div class="spacer">Outer content</div>
      <div id="affix-inner" class="inner">
        <div class="inner-track">
          <h-affix ref="affix" target="#affix-inner" :offset="12">
            <h-button size="small">Batch action</h-button>
          </h-affix>
          <div v-for="item in 8" :key="item" class="row">Inner item {{ item }}</div>
        </div>
      </div>
      <div class="spacer">Outer content</div>
    </div>
  </div>
</template>

<style scoped>
.outer,
.inner {
  overflow: auto;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-l);
}

.outer {
  height: 300px;
}

.outer-track {
  display: grid;
  min-height: 680px;
  gap: var(--h-spacing-4);
  padding: var(--h-spacing-4);
}

.inner {
  height: 200px;
}

.inner-track {
  display: grid;
  min-height: 520px;
  align-content: start;
  gap: var(--h-spacing-2);
  padding: var(--h-spacing-3);
}

.spacer,
.row {
  border-radius: var(--h-radius-m);
  padding: var(--h-spacing-3);
  color: var(--h-text-secondary);
  background: var(--h-bg-secondary);
}

.spacer {
  display: grid;
  min-height: 120px;
  place-items: center;
}
</style>
