<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio value="small" />
        <h-radio value="medium" />
        <h-radio value="large" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="inputStyle">
      <h-radio-group v-model="inputStyle">
        <h-radio value="normal" />
        <h-radio value="emphasize" />
        <h-radio value="no-border" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-grid :gap="12">
    <h-grid-item :span="{ xs: 12, md: 8, lg: 6, xl: 6, xxl: 6 }">
      <div class="demo-title">默认国际化配置</div>
      <h-select
        v-model="value"
        :multiple="true"
        :use-statistic="true"
        :to-body="false"
        :input-style="inputStyle"
        :clearable="true"
        :size="size"
      >
        <h-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </h-select>
    </h-grid-item>
    <h-grid-item :span="{ xs: 12, md: 8, lg: 6, xl: 6, xxl: 6 }">
      <div class="demo-title">自定义为”城市标签“</div>
      <h-select
        v-model="value2"
        :multiple="true"
        :use-statistic="true"
        statistic-text="城市标签"
        :to-body="false"
        :input-style="inputStyle"
        :clearable="true"
        :size="size"
      >
        <h-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </h-select>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref('medium');
const inputStyle = ref('normal');

const value = ref<string[]>([]);
const value2 = ref<string[]>([]);

const selectOptions = [
  { value: 1, label: '上海' },
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

<style scoped></style>
