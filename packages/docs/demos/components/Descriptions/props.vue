<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span class="docs-demo__control-label">
          Layout ·
          <code>type</code>
        </span>
        <h-segmented v-model:active-key="type" size="small" block>
          <h-segmented-item value="horizontal" label="Horizontal" />
          <h-segmented-item value="vertical" label="Vertical" />
        </h-segmented>
      </label>
      <label class="docs-demo__control">
        <span class="docs-demo__control-label">
          Size ·
          <code>size</code>
        </span>
        <h-segmented v-model:active-key="size" size="small" block>
          <h-segmented-item value="small" label="Small" />
          <h-segmented-item value="medium" label="Medium" />
          <h-segmented-item value="large" label="Large" />
        </h-segmented>
      </label>
      <label class="docs-demo__control">
        <span class="docs-demo__control-label">边框</span>
        <h-switch v-model="border" label="Border" />
      </label>
    </div>

    <article class="description-preview">
      <h-descriptions
        title="Workspace profile"
        :border="border"
        :type="type"
        :size="size"
        :column="2"
      >
        <h-description-item
          v-for="(item, index) in details"
          :key="item.label"
          :label="item.label"
          :value="item.value"
          :span-col="index === details.length - 1 ? 2 : 1"
        />
      </h-descriptions>
    </article>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const details = [
  { label: 'Workspace', value: 'Horizon Studio' },
  { label: 'Plan', value: 'Enterprise' },
  { label: 'Members', value: '128' },
  { label: 'Region', value: 'Singapore' },
  { label: 'Data retention', value: '365 days' },
];
const border = ref(false);
const type = ref('vertical');
const size = ref('medium');
</script>

<style scoped>
.description-preview {
  overflow-x: auto;
}
</style>
