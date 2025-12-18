<template>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-modal-cascader
        v-model="currentVal1"
        :options="options"
        :filterable="true"
        :filter-method="filterFn"
        :filter-max-result="3"
        :filter-result-sort="sortFn"
        :to-body="false"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-modal-cascader
        v-model="currentVal2"
        :options="options"
        :filterable="true"
        :filter-method="filterFn"
        :filter-max-result="3"
        :filter-result-sort="sortFn"
        multiple
        :to-body="false"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import type { NCascaderExtendOption } from '@nio-fe/lego';
import { ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);

const options = ref([]);
fetch(
  'https://static.nio.com/fx-static/lego/clhoirqpc0000088sgljrau3o/cascader-options.json',
).then(res => {
  res.json().then(value => {
    options.value = value;
  });
});

function sortFn(a: NCascaderExtendOption, b: NCascaderExtendOption) {
  return b.paths.at(-1).label.length - a.paths.at(-1).label.length;
}

function filterFn(
  inputValue: string,
  paths: { value: string | number; label: string; option: NCascaderExtendOption }[],
) {
  return paths.every(path => path.label.includes(inputValue));
}
</script>
