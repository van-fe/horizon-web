<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(1);

    return {
      value,
    };
  },
});
</script>

<template>
  <h-grid :gap="12">
    <h-grid-item :span="8">
      <div class="demo-title">默认（居右）</div>
      <h-input-number v-model="value" :min="0" />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">两侧</div>
      <h-input-number v-model="value" controls-position="between" :min="0" />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">隐藏</div>
      <h-input-number v-model="value" :controls="false" :min="0" />
    </h-grid-item>
  </h-grid>
</template>
