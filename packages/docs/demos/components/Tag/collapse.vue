<script setup lang="ts">
import { computed, ref } from 'vue';

const services = [
  { id: 'gateway', name: 'API Gateway' },
  { id: 'identity', name: 'Identity Service' },
  { id: 'billing', name: 'Billing API' },
  { id: 'catalog', name: 'Catalog Indexer' },
  { id: 'analytics', name: 'Analytics Pipeline' },
  { id: 'notifications', name: 'Notification Worker' },
  { id: 'audit', name: 'Audit Service' },
  { id: 'flags', name: 'Feature Flags' },
  { id: 'mobile', name: 'Mobile Backend' },
  { id: 'search', name: 'Search Aggregator' },
];
const width = ref(520);
const stageStyle = computed(() => ({ maxWidth: `${width.value}px` }));
</script>

<template>
  <div class="tag-collapse-demo">
    <label class="tag-collapse-demo__option">
      <span>Available width · {{ width }}px</span>
      <h-slider v-model="width" :min="220" :max="720" :step="20" />
    </label>

    <div class="tag-collapse-demo__stage" :style="stageStyle">
      <h-tag-group collapse expand :min-displayed="2" tooltip-render-type="innerText">
        <h-tag v-for="service in services" :id="service.id" :key="service.id" :clickable="false">
          {{ service.name }}
        </h-tag>
      </h-tag-group>
    </div>
  </div>
</template>

<style scoped>
.tag-collapse-demo {
  display: grid;
  gap: var(--h-spacing-5);
}

.tag-collapse-demo__option {
  display: grid;
  max-width: 520px;
  gap: var(--h-spacing-2);
}

.tag-collapse-demo__option span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.tag-collapse-demo__stage {
  box-sizing: border-box;
  width: 100%;
  padding: var(--h-spacing-4);
  border-radius: var(--h-radius-m);
  background: var(--h-bg-secondary);
}
</style>
