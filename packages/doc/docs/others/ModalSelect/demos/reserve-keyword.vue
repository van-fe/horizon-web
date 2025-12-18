<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">
        保留关键字（默认）
      </div>
      <n-modal-select v-model="values1" :filterable="true" :multiple="true" :to-body="false">
        <n-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
      </n-modal-select>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">
        不保留关键字
      </div>
      <n-modal-select v-model="values2" :filterable="true" :multiple="true" :reserve-keyword="false" :to-body="false">
        <n-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
      </n-modal-select>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">
        仅在反选时保留，正选不保留
        <n-tooltip>
          <template #content>
            考虑了过滤时反选的操作便捷性
          </template>
          <n-icon name="help" />
        </n-tooltip>
      </div>
      <n-modal-select v-model="values3" :filterable="true" :multiple="true" reserve-keyword="reserve-deselect" :to-body="false">
        <n-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
      </n-modal-select>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">
        不保留关键字，但过滤内容特殊处理
        <n-tooltip content="用户手动清空输入文字或失焦输入框后，才会改变过滤内容">
          <n-icon name="help" />
        </n-tooltip>
      </div>
      <n-modal-select v-model="values4" :filterable="true" :multiple="true" reserve-keyword="reserve-special" :to-body="false">
        <n-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
      </n-modal-select>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { useOptionProps } from '@nio-fe/lego';
import { NIcon } from '@nio-fe/icon';

const values1 = ref([]);
const values2 = ref([]);
const values3 = ref([]);
const values4 = ref([]);

const selectOptions: ExtractPropTypes<ExtractPropTypes<typeof useOptionProps>>[] = [
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
