<script setup lang="ts">
import { ref } from 'vue';

const color = ref('rgba(23, 140, 166, 0.72)');
const alpha = ref(true);
</script>

<template>
  <div class="color-alpha-demo">
    <h-switch v-model="alpha" label="Enable alpha" status />
    <div class="color-alpha-demo__sample">
      <span class="color-alpha-demo__checker">
        <i :style="{ background: color }"></i>
      </span>
      <h-color-picker
        v-model="color"
        trigger-type="square"
        square-text
        :alpha="alpha"
        :need-confirm="false"
        :clearable="false"
      />
    </div>
  </div>
</template>

<style scoped>
.color-alpha-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-4);
}

.color-alpha-demo__sample {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
}

.color-alpha-demo__checker {
  display: grid;
  width: 64px;
  height: 64px;
  padding: var(--h-spacing-2);
  box-sizing: border-box;
  background-color: var(--h-bg-secondary);
  background-image:
    linear-gradient(45deg, var(--h-border-default) 25%, transparent 25%),
    linear-gradient(-45deg, var(--h-border-default) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--h-border-default) 75%),
    linear-gradient(-45deg, transparent 75%, var(--h-border-default) 75%);
  background-position:
    0 0,
    0 8px,
    8px -8px,
    -8px 0;
  background-size: 16px 16px;
}

.color-alpha-demo__checker i {
  display: block;
}
</style>
