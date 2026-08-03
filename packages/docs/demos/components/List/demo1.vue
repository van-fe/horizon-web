<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span class="docs-demo__control-label">Title size</span>
        <h-segmented v-model:active-key="titleSize" size="small" block>
          <h-segmented-item key="small" label="Small" />
          <h-segmented-item key="medium" label="Medium" />
        </h-segmented>
      </label>
      <h-switch v-model="isZebra" label="Zebra" />
      <h-switch v-model="isBorder" label="Border" />
    </div>

    <h-list :data="requests" :max-height="420" :zebra="isZebra" :border="isBorder">
      <template #item="{ item }">
        <h-list-item
          :key="item.id"
          :title="item.title"
          :describe="item.description"
          :subtitle="item.subtitle"
          :title-size="titleSize"
        >
          <template #sider>
            <h-image
              :src="item.image"
              :alt="`${item.title} preview`"
              object-fit="cover"
              :width="48"
              :height="48"
            />
          </template>
          <template #right>
            <div class="request-actions">
              <h-button size="small" plain>Return</h-button>
              <h-button size="small">Approve</h-button>
            </div>
          </template>
        </h-list-item>
      </template>
    </h-list>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const requests = [
  {
    id: 'REQ-142',
    title: 'Checkout accessibility pass',
    subtitle: 'Mira Chen · 12 min ago',
    description: 'Keyboard order, focus visibility, and screen-reader labels are ready for review.',
    image: '/demo-assets/scene-city.svg',
  },
  {
    id: 'REQ-139',
    title: 'Analytics empty states',
    subtitle: 'Noah Williams · 38 min ago',
    description: 'Three responsive illustrations and recovery actions for filtered dashboards.',
    image: '/demo-assets/scene-aurora.svg',
  },
  {
    id: 'REQ-135',
    title: 'Mobile navigation study',
    subtitle: 'Avery Lee · Yesterday',
    description: 'Prototype findings and the proposed compact navigation behavior.',
    image: '/demo-assets/scene-coast.svg',
  },
];
const isZebra = ref(true);
const isBorder = ref(false);
const titleSize = ref<'medium' | 'small'>('medium');
</script>

<style scoped>
.request-actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: var(--h-spacing-2);
}

@media (max-width: 560px) {
  .request-actions {
    justify-content: flex-start;
    margin-top: var(--h-spacing-3);
  }
}
</style>
