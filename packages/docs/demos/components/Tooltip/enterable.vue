<script setup lang="ts">
import { computed, ref } from 'vue';

const mode = ref<'quick' | 'enterable' | 'copy'>('enterable');
const content = computed(() => {
  if (mode.value === 'quick') return '只用于快速说明，不支持移入交互';
  if (mode.value === 'copy') return 'release-2026-08-03-042';
  return 'api.internal.example/v2/releases';
});
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="mode" size="small">
        <h-segmented-item key="quick" label="Quick" />
        <h-segmented-item key="enterable" label="Enterable" />
        <h-segmented-item key="copy" label="Copy" />
      </h-segmented>
    </div>

    <h-tooltip
      :content="content"
      :enterable="mode !== 'quick'"
      :click-to-copy="mode === 'copy'"
      copy-success-text="发布编号已复制"
    >
      <h-button>{{ mode === 'copy' ? '复制发布编号' : '查看提示' }}</h-button>
    </h-tooltip>
  </div>
</template>
