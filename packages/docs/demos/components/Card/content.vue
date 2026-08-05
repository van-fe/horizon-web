<template>
  <h-grid :cols="{ xs: 1, md: 3 }" :gap="16">
    <h-grid-item>
      <h-card title="Visual summary">
        <img
          class="card-content-demo__image"
          :src="demoAssetUrl('scene-city.svg')"
          alt="Illustrated city skyline"
        />
        <p class="card-content-demo__copy">
          A visual can establish context before the supporting details.
        </p>
      </h-card>
    </h-grid-item>
    <h-grid-item>
      <h-card title="Recent activity">
        <ul class="card-content-demo__list">
          <li v-for="item in activity" :key="item.title">
            <span>{{ item.time }}</span>
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </div>
          </li>
        </ul>
      </h-card>
    </h-grid-item>
    <h-grid-item>
      <h-card>
        <template #header>
          <h-tabs v-model="tab" size="medium">
            <h-tab v-for="item in tabs" :key="item" :label="item" />
          </h-tabs>
        </template>
        <div class="card-content-demo__tab-panel" aria-live="polite">
          <strong>{{ tab }}</strong>
          <p>{{ tabContent[tab] }}</p>
        </div>
      </h-card>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
import { ref } from 'vue';

const activity = [
  { time: '09:20', title: 'Review completed', description: 'Navigation states approved.' },
  { time: '11:45', title: 'Build promoted', description: 'Candidate available in staging.' },
  { time: '14:10', title: 'Notes updated', description: 'Localization copy is ready.' },
];
const tabs = ['Overview', 'Activity', 'Files'];
const tab = ref('Overview');
const tabContent: Record<string, string> = {
  Overview: 'The release is on track with no blocking issues.',
  Activity: 'Seven updates were recorded during the current review cycle.',
  Files: 'Three design files and two verification reports are attached.',
};
</script>

<style scoped>
.card-content-demo__image {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--h-radius-m);
  object-fit: cover;
}

.card-content-demo__copy,
.card-content-demo__list p,
.card-content-demo__tab-panel p {
  color: var(--h-text-secondary);
  line-height: 1.6;
}

.card-content-demo__copy,
.card-content-demo__tab-panel p {
  margin: var(--h-spacing-3) 0 0;
}

.card-content-demo__list {
  display: grid;
  gap: var(--h-spacing-4);
  padding: 0;
  margin: 0;
  list-style: none;
}

.card-content-demo__list li {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--h-spacing-3);
}

.card-content-demo__list span {
  color: var(--h-text-brand-default);
  font-size: var(--h-text-sm);
}

.card-content-demo__list strong,
.card-content-demo__tab-panel strong {
  color: var(--h-text-primary);
}

.card-content-demo__list p {
  margin: var(--h-spacing-1) 0 0;
}
</style>
