<script setup lang="ts">
import { ref } from 'vue';

const active = ref('尚未显示');
const examples = [
  { size: 'large', label: 'Large', content: '完整说明与较宽松的内边距', arrow: true, distance: 12 },
  { size: 'medium', label: 'Medium', content: '默认尺寸，适合多数提示', arrow: true, distance: 12 },
  { size: 'small', label: 'Small', content: '紧凑说明', arrow: true, distance: 12 },
  { size: 'small', label: 'No arrow', content: '无箭头、近距离提示', arrow: false, distance: 4 },
] as const;
</script>

<template>
  <div class="docs-demo">
    <h-space wrap size="large">
      <h-tooltip
        v-for="example in examples"
        :key="example.label"
        placement="top"
        :size="example.size"
        :arrow="example.arrow"
        :distance="example.distance"
        :content="example.content"
        @show="active = `${example.label} 已显示`"
        @hide="active = `${example.label} 已隐藏`"
      >
        <h-button type="normal">{{ example.label }}</h-button>
      </h-tooltip>
    </h-space>
    <span aria-live="polite">{{ active }}</span>
  </div>
</template>
