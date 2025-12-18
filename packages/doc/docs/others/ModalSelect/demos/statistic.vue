<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="size">
      <n-radio-group v-model="size">
        <n-radio label="small" />
        <n-radio label="medium" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="inputStyle">
      <n-radio-group v-model="inputStyle">
        <n-radio label="normal" />
        <n-radio label="emphasize" />
        <n-radio label="no-border" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="filterable">
      <n-switch v-model="filterable" status></n-switch>
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">默认国际化配置</div>
      <n-modal-select
        v-model="value"
        :multiple="true"
        :use-statistic="true"
        :to-body="false"
        :input-style="inputStyle"
        :clearable="true"
        :size="size"
        :filterable="filterable"
      >
        <n-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </n-modal-select>
    </n-col>
    <n-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">自定义为”城市标签“</div>
      <n-modal-select
        v-model="value2"
        :multiple="true"
        :use-statistic="true"
        statistic-text="城市标签"
        :to-body="false"
        :input-style="inputStyle"
        :clearable="true"
        :size="size"
        :filterable="filterable"
      >
        <n-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </n-modal-select>
    </n-col>
  </n-row>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SelectProps } from '@nio-fe/lego';

const size = ref('medium');
const inputStyle = ref<SelectProps['inputStyle']>('normal');
const filterable = ref(false);

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

<style scoped>
</style>
