<script setup lang="ts">
import { computed, ref } from 'vue';

const preset = ref('medium');
const customSize = ref(32);

const size = computed(() => (preset.value === 'custom' ? customSize.value : preset.value));
const presets = ['small', 'medium', 'large', 'custom'];
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span>间距规格</span>
        <h-segmented v-model:active-key="preset" size="small">
          <h-segmented-item v-for="item in presets" :key="item" :value="item" :label="item" />
        </h-segmented>
      </label>
      <label v-if="preset === 'custom'" class="docs-demo__control docs-demo__control--grow">
        <span>自定义间距：{{ customSize }}px</span>
        <h-slider v-model="customSize" :min="4" :max="64" :step="2" />
      </label>
    </div>

    <h-space wrap :size="size">
      <h-button>保存</h-button>
      <h-button type="normal">预览</h-button>
      <h-button type="normal">取消</h-button>
    </h-space>
  </div>
</template>
