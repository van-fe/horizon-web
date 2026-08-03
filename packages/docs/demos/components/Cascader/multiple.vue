<template>
  <h-grid :gap="12">
    <h-grid-item :span="{ xs: 24, sm: 12, md: 8, lg: 6 }">
      <div class="demo-title">普通多选</div>
      <h-cascader v-model="currentVal1" :options="options" :multiple="true" :to-body="false" />
    </h-grid-item>
    <h-grid-item :span="{ xs: 24, sm: 12, md: 8, lg: 6 }">
      <div class="demo-title">折叠多选</div>
      <h-cascader v-model="currentVal2" :options="options" :multiple="true" :collapse-tags="true" :to-body="false" />
    </h-grid-item>
    <h-grid-item :span="{ xs: 24, sm: 12, md: 8, lg: 6 }">
      <div class="demo-title">+N 显示其余已选项</div>
      <h-cascader v-model="currentVal3" :options="options" :multiple="true" :collapse-tags="true" :collapse-tags-tooltip="true" :to-body="false" />
    </h-grid-item>
    <h-grid-item :span="{ xs: 24, sm: 12, md: 8, lg: 6 }">
      <div class="demo-title">强制显示3个已选项，其余折叠</div>
      <h-cascader v-model="currentVal4" :options="options" :multiple="true" :collapse-tags="true" :collapse-tags-tooltip="true" :max-collapse-tags="3" :to-body="false" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentVal1 = ref<string[][]>([[ "guide", "navigation", "side nav"], [ "guide", "navigation", "top nav"], [ "guide", "disciplines", "consistency"], [ "guide", "disciplines", "feedback"]]);
const currentVal2 = ref<string[][]>([[ "guide", "navigation", "side nav"], [ "guide", "navigation", "top nav"], [ "guide", "disciplines", "consistency"], [ "guide", "disciplines", "feedback"]]);
const currentVal3 = ref<string[][]>([[ "guide", "navigation", "side nav"], [ "guide", "navigation", "top nav"], [ "guide", "disciplines", "consistency"], [ "guide", "disciplines", "feedback"]]);
const currentVal4 = ref<string[][]>([[ "guide", "navigation", "side nav"], [ "guide", "navigation", "top nav"], [ "guide", "disciplines", "consistency"], [ "guide", "disciplines", "feedback"]]);

const options = ref([]);

fetch(
  new URL('/cascader-options.json', import.meta.url).href,
).then(res => {
  res.json().then(value => {
    options.value = value;
  });
});
</script>
