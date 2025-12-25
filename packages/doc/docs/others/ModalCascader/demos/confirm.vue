<template>
  <div>
    <n-row :gutter="10">
      <n-col :span="6">
        <div class="demo-title">
          单选
        </div>
        <n-modal-cascader
            v-model="currentVal1"
            placeholder="which component?"
            :clearable="true"
            :to-body="false"
            :options="options"
            :confirm="true"
            @confirm="onConfirm"
            @cancel="onCancel"
            @change="onChange"
        />
      </n-col>
      <n-col :span="6">
        <div class="demo-title">
          多选
        </div>
        <n-modal-cascader
            v-model="currentVal2"
            :clearable="true"
            :options="options"
            :multiple="true"
            :confirm="true"
            :to-body="false"
            @confirm="onConfirm"
            @cancel="onCancel"
            @change="onChange"
        />
      </n-col>
    </n-row>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue';
import type { HCascaderExtendOption, HCascaderModelValueType } from '@aurora/horizon-web';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);

const options = ref([]);
fetch(
  'https://static.nio.com/fx-static/horizon-web/clhoirqpc0000088sgljrau3o/cascader-options.json',
).then(res => {
  res.json().then(value => {
    options.value = value;
  });
});

const onConfirm = (value: any) => {
  console.info('confirm: ', value);
};

const onCancel = (value: any) => {
  console.info('cancel: ', value);
};

const onChange = (value: HCascaderModelValueType, option: HCascaderExtendOption) => {
  console.info('change: ', value, option);
};
</script>
