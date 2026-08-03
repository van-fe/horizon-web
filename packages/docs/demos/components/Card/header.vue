<template>
  <section class="card-header-demo">
    <h-grid :cols="{ xs: 1, md: 2 }" :gap="16">
      <h-grid-item>
        <h-card top-divider>
          <template #header>
            <div class="card-header-demo__row">
              <strong>Release checklist</strong>
              <h-button text size="small" @click="status = 'Checklist opened'">Open</h-button>
            </div>
          </template>
          <p>Use a compact action when the entire card remains the primary context.</p>
        </h-card>
      </h-grid-item>
      <h-grid-item>
        <h-card top-divider>
          <template #header>
            <h-checkbox v-model="selected">Include accessibility report</h-checkbox>
          </template>
          <p>
            {{
              selected
                ? 'The report will be included in the release package.'
                : 'The report is excluded from the release package.'
            }}
          </p>
        </h-card>
      </h-grid-item>
      <h-grid-item>
        <h-card top-divider>
          <template #header>
            <div class="card-header-demo__stack">
              <h-tag size="small" :clickable="false">In review</h-tag>
              <strong>Localization handoff</strong>
            </div>
          </template>
          <p>A status tag helps readers scan a collection of related cards.</p>
        </h-card>
      </h-grid-item>
      <h-grid-item>
        <h-card top-divider>
          <template #header>
            <div class="card-header-demo__stack">
              <IconEye class="card-header-demo__icon" :size="28" />
              <strong>Visual verification</strong>
              <span>Light, dark, and 390px viewports</span>
            </div>
          </template>
          <p>Icons should support the title without replacing its accessible text.</p>
        </h-card>
      </h-grid-item>
    </h-grid>
    <p class="card-header-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { IconEye } from '@aurora/icon';

const selected = ref(true);
const status = ref('No header action yet');

watch(selected, value => {
  status.value = value ? 'Accessibility report included' : 'Accessibility report excluded';
});
</script>

<style scoped>
.card-header-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.card-header-demo__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--h-spacing-4);
}

.card-header-demo__row strong,
.card-header-demo__stack strong {
  color: var(--h-text-primary);
}

.card-header-demo__stack span,
.card-header-demo__status,
.card-header-demo p {
  color: var(--h-text-secondary);
}

.card-header-demo__stack {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-2);
}

.card-header-demo__icon {
  color: var(--h-text-brand-default);
}

.card-header-demo p {
  margin: 0;
  line-height: 1.7;
}
</style>
