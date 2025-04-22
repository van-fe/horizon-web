<template>
  <n-form :inline="true" label-position="top">
    <n-form-item label="可选任意节点">
      <n-switch v-model="checkStrictly" status />
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-cascader
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
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-cascader
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
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import type { NCascaderExtendOption } from '@nio-fe/lego';
import { onMounted, ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([['component', 'basic', 'color']]);
const checkStrictly = ref(true);
const changeHandle = (value: boolean, option: NCascaderExtendOption) => {
  console.log(value, option);
};

const options = ref([]);

function onFocus() {
  console.log('focus');
}

function onBlur() {
  console.log('blur');
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
