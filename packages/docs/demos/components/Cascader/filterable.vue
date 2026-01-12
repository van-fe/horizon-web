<template>
  <h-form :inline="true" label-position="top">
    <h-form-item label="可选任意节点">
      <h-switch v-model="checkStrictly" status />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-cascader
        v-model="currentVal1"
        :filterable="true"
        :check-strictly="checkStrictly"
        :options="options"
        :to-body="false"
        :clearable="true"
        @change="changeHandle"
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-cascader
        v-model="currentVal2"
        :filterable="true"
        :options="options"
        :check-strictly="checkStrictly"
        multiple
        clearable
        :to-body="false"
        :clearable="true"
        @change="changeHandle"
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        单选-下拉列表带筛选功能
        <h-tooltip content="内置 input">
          <a-icon name="question" />
        </h-tooltip>
      </div>
      <h-cascader
        v-model="currentVal3"
        :check-strictly="checkStrictly"
        :panel-filter-option="true"
        :use-build-in-panel-filter="true"
        :options="options"
        :to-body="false"
        @change="changeHandle"
        @focus="onFocus"
        @blur="onBlur"
      >
        <template #optionEmptyRender>
          <div class="empty-city">没有找到对应的城市信息</div>
        </template>
      </h-cascader>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选-下拉列表带筛选功能</div>
      <h-cascader
        v-model="currentVal4"
        :multiple="true"
        :check-strictly="checkStrictly"
        :panel-filter-option="true"
        :panel-filter-input-value="panelFilterInputValue2"
        :options="options"
        :to-body="false"
        @change="changeHandle"
        @focus="onFocus"
        @blur="onBlur"
      >
        <template #panelHeaderRender>
          <div class="panel-filter-box">
            <h-input v-model="panelFilterInputValue2" prefix-icon="search" placeholder="请搜索" />
          </div>
        </template>
        <template #optionEmptyRender>
          <div class="empty-city">没有找到对应的城市信息</div>
        </template>
      </h-cascader>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import type { HCascaderExtendOption } from '@aurora/horizon-web';
import { onMounted, ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([['component', 'basic', 'color']]);
const currentVal3 = ref<string[]>([]);
const currentVal4 = ref<string[][]>([]);
const checkStrictly = ref(true);
const panelFilterInputValue2 = ref('');
const changeHandle = (value: boolean, option: HCascaderExtendOption) => {
  console.info(value, option);
};

const options = ref([]);

function onFocus() {
  console.info('focus');
}

function onBlur() {
  console.info('blur');
}

onMounted(async()=>{
  options.value = await fetch(`https://static.nio.com/fx-static/51/fixed/cascader-tree-data.prod.json?t=${Date.now()}`).then(r => r.json());
});
</script>

<style scoped>
.panel-filter-box {
  padding: 12px;
  border-bottom: 1px solid var(--n-divider-default);
}
</style>
