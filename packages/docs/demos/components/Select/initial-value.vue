<template>
  <h-grid :gap="12">
    <h-grid-item :span="{ xs: 12, md: 8, lg: 6, xl: 6, xxl: 6 }">
      <div class="demo-title">默认值为 null</div>
      <div class="demo-description">
        modelValue: {{ Object.prototype.toString.call(value1) }} {{ value1 }}
      </div>
      <h-select v-model="value1" :initial-value="null" :clearable="true" :to-body="false">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-grid-item>
    <h-grid-item :span="{ xs: 12, md: 8, lg: 6, xl: 6, xxl: 6 }">
      <div class="demo-title">默认值为 []</div>
      <div class="demo-description">
        modelValue: {{ Object.prototype.toString.call(value2) }} {{ value2 }}
      </div>
      <h-select v-model="value2" :multiple="true" :initial-value="[]" :to-body="false" :clearable="true">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-grid-item>
  </h-grid>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const value2 = ref(undefined);

const selectOptions = [
  { value: '', label: '上海' },
  { value: 2, label: '北京' },
  { value: 3, label: '合肥' },
  { value: 4, label: '深圳' },
  { value: 5, label: '杭州' },
  { value: 6, label: '天津' },
  { value: 7, label: '西安' },
  { value: 8, label: '南京' },
  { value: 9, label: '哈尔滨' },
  { value: 10, label: '香港' },
];
</script>

<style scoped>
</style>
