<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">
        默认过滤规则
        <n-tooltip>
          <template #content>
            默认的规则为 `label.toLowerCase().includes(value)`，label 是传入的 option 上的 label/description 属性值，value 是输入的内容，默认规则是忽略大小写进行字符串匹配的
          </template>
          <a-icon name="help" />
        </n-tooltip>
      </div>
      <n-modal-select v-model="values1" :filterable="true" :multiple="true" :to-body="false" :fit-content-input-min-width="1">
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
        自定义过滤器
        <n-tooltip>
          <template #content>
            这个示例展示的是自定义过滤方法，过滤方法中是大小写敏感的字符串匹配
          </template>
          <a-icon name="help" />
        </n-tooltip>
      </div>
      <n-modal-select v-model="value2" :filter-option="filterOption" :clearable="true" placeholder="请选择" :to-body="false" @input="onInput">
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
        单选-下拉列表带筛选功能
      </div>
      <n-modal-select
        v-model="value4"
        panel-filter-option
        use-build-in-panel-filter
        :to-body="false"
      >
        <n-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
        <template #empty>
          <div class="empty-city">没有找到对应的城市信息</div>
        </template>
      </n-modal-select>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">
        多选-下拉列表带筛选功能
      </div>
      <n-modal-select
        v-model="values2"
        panel-filter-option
        multiple
        :panel-filter-input-value="panelFilterInputValue2"
        :to-body="false"
        @dropdownVisibleChange="dropdownVisibleChange"
      >
        <n-option
          v-for="item of selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :description="item.description"
        />
        <template #panelHeaderRender>
          <div class="panel-filter-box">
            <n-input
              v-model="panelFilterInputValue2"
              placeholder="Please input search keywords"
            >
              <template #prefix>
                <IconSearch size="16" color="#BBBDC7" />
              </template>
            </n-input>
          </div>
        </template>
        <template #optionEmptyRender>
          <div class="empty-city">没有找到对应的城市信息</div>
        </template>
      </n-modal-select>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { useOptionProps } from '@aurora/horizon-web';
import { IconSearch } from '@aurora/icon';

const values1 = ref([1, 2]);
const value2 = ref();
const value4 = ref();
const values2 = ref([]);

const panelFilterInputValue2 = ref('');

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

const filterOption = (input: string, props: ExtractPropTypes<typeof useOptionProps>) => {
  return props.label?.toString().includes(input) || props.description?.toString().includes(input) || false;
};

const dropdownVisibleChange = (visible: boolean) => {
  if (!visible) {
    panelFilterInputValue2.value = '';
  }
};

function onInput(val: string) {
  console.info('input: ', val);
}
</script>

<style scoped>
.empty-city {
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: slategrey;
}

.panel-filter-box {
  margin-bottom: 12px;
}

.panel-filter-box :deep(.n-icon_search) {
  font-size: 12px !important;
}
</style>
