<script setup lang="ts">
import { ref } from 'vue';

const region = ref('华东');
const regions = ['华东', '华北', '华南', '西南'];
</script>

<template>
  <div class="docs-demo">
    <div class="group-row">
      <section>
        <span>默认分组</span>
        <h-radio-group v-model="region" size="medium">
          <h-radio-button v-for="item in regions" :key="item" :value="item" />
        </h-radio-group>
      </section>
      <section>
        <span>整体禁用</span>
        <h-radio-group v-model="region" size="large" disabled>
          <h-radio-button v-for="item in regions" :key="item" :value="item" />
        </h-radio-group>
      </section>
    </div>
    <p class="docs-demo__status">当前区域：{{ region }}</p>
  </div>
</template>

<style scoped>
.group-row {
  display: grid;
  gap: 12px;
}

.group-row section {
  display: grid;
  justify-items: start;
  gap: 12px;
  overflow-x: auto;
  padding: 18px;
  border: 1px solid var(--h-border-default);
  border-radius: 10px;
  background: var(--h-bg-default);
}

.group-row span {
  color: var(--h-text-secondary);
  font-size: 12px;
}
</style>
