<template>
  <n-button @click="visible = true">Open Drawer</n-button>
  <n-drawer v-model:visible="visible" title="Title" placement="right" @ok="onOk" @cancel="onCancel">
    <n-select
      v-model="value1"
      show-search
      clearable
      allow-create
      multiple
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
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';
import jsonp from 'fetch-jsonp';
import qs from 'qs';

const visible = ref(false);
const isLoading = ref(false);
// const value1 = ref();
const value1 = ref(['1', '2', '3']);
let timeout: any = null;
let currentValue: string = '';

const options = ref<{value: string; text: string}[]>([]);

const searchHandle = (value: string) => {
  console.log('search: ', value);
  if (value) {
    fetch(value, (data: any) => (options.value = data));
  } else {
    options.value = [];
  }
};

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
              value: r[0],
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

const onOk = () => {
  console.log('ok button clicked!');
  $message({ type: 'success', message: 'ok button clicked' });
};
const onCancel = () => {
  console.log('cancel button clicked!');
  $message({ type: 'warning', message: 'cancel button clicked!' });
};

function onFocus() {
  console.trace('focus');
}

function onBlur() {
  console.trace('blur');
}
</script>
