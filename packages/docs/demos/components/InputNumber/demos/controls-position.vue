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
  <n-row :gutter="12">
    <n-col :span="8">
      <div class="demo-title">默认（居右）</div>
      <n-input-number v-model="value" :min="0" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">两侧</div>
      <n-input-number v-model="value" controls-position="between" :min="0" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">隐藏</div>
      <n-input-number v-model="value" :controls="false" :min="0" />
    </n-col>
  </n-row>
</template>
