<template>
  <h-form :inline="true" label-position="top">
    <h-form-item label="可选任意节点">
      <h-switch v-model="checkStrictly" status />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-modal-cascader
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
      <h-modal-cascader
        v-model="currentVal2"
        :filterable="true"
        :options="options"
        :check-strictly="checkStrictly"
        multiple
        :to-body="false"
        :clearable="true"
        @change="changeHandle"
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import type { HCascaderExtendOption } from '@aurora/horizon-web';
import { onMounted, ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([['component', 'basic', 'color']]);
const checkStrictly = ref(true);
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
  border-bottom: 1px solid var(--h-divider-default);
}
</style>
