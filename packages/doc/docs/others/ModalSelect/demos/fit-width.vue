<template>
  <n-row :gutter="10">
    <n-col :span="4">
      <div class="demo-title">
        单选
      </div>
      <n-modal-select
        v-model="value1"
        clearable
        placeholder="请选择"
        :fit-input-width="false"
        :to-body="false"
        @change="changeHandle"
      >
        <n-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </n-modal-select>
    </n-col>
    <n-col :span="4">
      <div class="demo-title">
        多选
      </div>
      <n-modal-select
        v-model="values1"
        multiple
        clearable
        placeholder="请选择"
        :fit-input-width="false"
        :collapse="true"
        :to-body="false"
        collapse-tags-fill-up
        @change="changeHandle"
      >
        <n-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :max-lines="2"
        />
      </n-modal-select>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(null);
const values1 = ref([]);

const selectOptions = [
  { value: 1, label: '一个名字特别长的文字，需要超过 select 本身宽度' },
  { value: 2, label: '北京' },
  { value: 3, label: '合肥' },
];

const changeHandle = () => {
  console.log(value1.value);
};
</script>
