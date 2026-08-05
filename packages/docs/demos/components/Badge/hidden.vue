<template>
  <div class="docs-demo">
    <h-switch v-model="isHidden" label="隐藏徽标" label-position="left" />
    <h-space wrap size="large">
      <h-badge
        v-for="item in samples"
        :key="item.label"
        :hidden="isHidden"
        :type="item.type"
        :content="item.content"
      >
        <h-button type="normal">{{ item.label }}</h-button>
      </h-badge>
    </h-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isHidden = ref(false);
const samples = [
  { label: 'Dot', type: 'dot' as const, content: '' },
  { label: 'Zero', type: 'num' as const, content: 0 },
];
</script>
