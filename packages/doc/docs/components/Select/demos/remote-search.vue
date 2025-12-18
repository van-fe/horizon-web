<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-select
        v-model="value1"
        show-search
        clearable
        :to-body="false"
        :loading="isLoading"
        loading-text="加载中"
        @search="searchHandle"
        @focus="onFocus"
        @blur="onBlur"
      >
        <n-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.text"
        />
      </n-select>
    </n-col>

    <n-col :span="6">
      <div class="demo-title">单选-无选项也显示面板</div>
      <n-select
        v-model="value2"
        show-search
        clearable
        :to-body="false"
        :loading="isLoading"
        loading-text="加载中"
        :hide-panel-when-show-search-and-empty-list="false"
        @search="searchHandle"
        @focus="onFocus"
        @blur="onBlur"
      >
        <n-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.text"
        />
      </n-select>
    </n-col>

    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-select
        v-model="values1"
        :to-body="false"
        multiple
        show-search
        clearable
        collapse-tags-fill-up
        collapse-tags-tooltip
        collapse-tags
        :loading="isLoading"
        @search="searchHandle"
        @focus="onFocus"
        @blur="onBlur"
      >
        <n-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.text"
        />
      </n-select>
    </n-col>

    <n-col :span="6">
      <div class="demo-title">多选-无选项也显示面板</div>
      <n-select
        v-model="values2"
        :to-body="false"
        multiple
        show-search
        clearable
        collapse-tags-fill-up
        collapse-tags-tooltip
        collapse-tags
        :hide-panel-when-show-search-and-empty-list="false"
        :loading="isLoading"
        @search="searchHandle"
        @focus="onFocus"
        @blur="onBlur"
      >
        <n-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.text"
        />
      </n-select>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import jsonp from 'fetch-jsonp';
import qs from 'qs';

let timeout: any = null;
let currentValue: string = '';

const isLoading = ref(false);

function fetch(value: string, callback: Function) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = qs.stringify({
      code: 'utf-8',
      q: value,
    });

    isLoading.value = true;

    jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then(response => response.json())
      .then(d => {
        if (currentValue === value) {
          const { result } = d;
          const data: any[] = [];
          result.forEach((r: any) => {
            data.push({
              value: r[1],
              text: r[0],
            });
          });
          callback(data);
        }
      }).finally(() => {
      isLoading.value = false;
    });
  }

  timeout = setTimeout(fake, 300);
}

const value1 = ref('NIO Phone');
const value2 = ref();
const values1 = ref(['nio phone', 'nio phone 手机']);
const values2 = ref([]);

const options = ref<{value: string; text: string}[]>([]);

const searchHandle = (value: string) => {
  console.log('search: ', value);
  if (value) {
    fetch(value, (data: any) => (options.value = data));
  } else {
    options.value = [];
  }
};

function onFocus() {
  console.log('focus');
}

function onBlur() {
  console.log('blur');
}
</script>

<style scoped>
</style>
