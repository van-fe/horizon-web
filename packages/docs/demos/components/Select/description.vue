<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <div class="demo-title">描述文字在右侧</div>
      <h-select
        v-model="value1"
        :clearable="true"
        placeholder="请选择"
        :to-body="false"
      >
        <h-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :description="item.description"
        />
      </h-select>
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">描述文字在下方</div>
      <h-select
        v-model="value2"
        :clearable="true"
        placeholder="请选择"
        :to-body="false"
        description-position="bottom"
      >
        <h-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :description="item.description"
        />
      </h-select>
    </h-grid-item>
  </h-grid>
</template>

<script lang="ts" setup>
import { ExtractPropTypes, ref } from 'vue';
import { useOptionProps } from '@aurora/horizon-web';

const value1 = ref();
const value2 = ref();

const selectOptions: Partial<ExtractPropTypes<typeof useOptionProps>>[] = [
  { value: 1, label: '上海', description: 'Shanghai' },
  { value: 2, label: '北京', description: 'Beijing' },
  { value: 3, label: '合肥', description: 'Hefei' },
  { value: 4, label: '深圳', description: 'Shenzhen' },
  { value: 5, label: '杭州', description: 'Hangzhou' },
  { value: 6, label: '天津', description: 'Tianjin' },
  { value: 7, label: '西安', description: `Xi'an` },
  { value: 8, label: '南京', description: 'Nanjing' },
  { value: 9, label: '哈尔滨', description: 'Harbin' },
  { value: 10, label: '香港', description: 'HongKong' },
];
</script>

<style scoped>
</style>
