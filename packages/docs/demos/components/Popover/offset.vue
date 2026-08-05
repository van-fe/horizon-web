<script setup lang="ts">
import { ref } from 'vue';

const distance = ref(12);
const skidding = ref(0);
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control docs-demo__control--grow">
        <span>主轴距离：{{ distance }}px</span>
        <h-slider v-model="distance" :min="-12" :max="36" :step="2" />
      </label>
      <label class="docs-demo__control docs-demo__control--grow">
        <span>辅轴偏移：{{ skidding }}px</span>
        <h-slider v-model="skidding" :min="-36" :max="36" :step="4" />
      </label>
    </div>
    <div class="offset-stage">
      <h-popover trigger="click" placement="top" :distance="distance" :skidding="skidding">
        <template #reference><h-button>查看偏移</h-button></template>
        <template #popper>
          <h-pop-content>distance {{ distance }} / skidding {{ skidding }}</h-pop-content>
        </template>
      </h-popover>
    </div>
  </div>
</template>

<style scoped>
.offset-stage {
  display: grid;
  min-height: 160px;
  place-items: center;
  border-radius: 8px;
  background: var(--h-bg-secondary);
}
</style>
