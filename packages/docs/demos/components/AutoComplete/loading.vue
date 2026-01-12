<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">默认样式</div>
      <h-auto-complete :options="options1" :loading="loading1" @search="(val: string) => onSearch(val, 1)" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">显示搜索文字</div>
      <h-auto-complete :options="options2" :loading="loading2" loading-text="搜索中" @search="(val: string) => onSearch(val, 2)" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { NAutoCompleteOptionProps } from '@aurora/horizon-web';

const options1 = ref<Partial<NAutoCompleteOptionProps>[]>([]);
const options2 = ref<Partial<NAutoCompleteOptionProps>[]>([]);

const loading1 = ref(false);
const loading2 = ref(false);

let timer: NodeJS.Timer | null = null;

function clearTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

function onSearch(val: string, index = 1) {
  if (val) {
    const target = index === 1 ? options1 : options2;
    const loading = index === 1 ? loading1 : loading2;
    loading.value = true;

    clearTimer();

    timer = setTimeout(() => {
      target.value = [];
      new Array(10).fill(0).forEach((_, index) => {
        const value = val.repeat(index + 1);
        target.value.push({
          label: value,
          value,
        });
      });

      loading.value = false;
    }, 2000);
  } else {
    target.value = [];
  }
}
</script>

<style scoped>
</style>
