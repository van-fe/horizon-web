<template>
  <h-grid :gap="10">
    <h-grid-item :span="4">
      <div class="demo-title">单选</div>
      <h-select
        v-model="value1"
        clearable
        placeholder="请选择"
        :fit-input-width="false"
        :to-body="false"
        @change="changeHandle"
      >
        <h-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </h-select>
    </h-grid-item>
    <h-grid-item :span="4">
      <div class="demo-title">多选</div>
      <h-select
        v-model="values1"
        multiple
        clearable
        placeholder="请选择"
        :fit-input-width="false"
        :collapse-tags="true"
        :to-body="false"
        collapse-tags-fill-up
        @change="changeHandle"
      >
        <h-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :max-lines="2"
        />
      </h-select>
    </h-grid-item>
  </h-grid>
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
  console.info(value1.value);
};
</script>
