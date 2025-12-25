<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import throttle from 'lodash/throttle';

interface ListType {
  value: string;
  label: string;
}

const value = ref(null);
const list = ref<ListType[]>([]);
const loading = ref(false);

function generateRandomOptions() {
  loading.value = true;

  setTimeout(() => {
    for (let i = 0; i < 20; i ++) {
      list.value.push({
        label: faker.name.fullName(),
        value: faker.phone.number(),
      });
    }

    loading.value = false;
  }, 1000);
}

const onOptionListReachBottom = throttle(() => {
  console.info('reach bottom');
  generateRandomOptions();
}, 500);

generateRandomOptions();
</script>

<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <n-modal-select v-model="value" :clearable="true" :to-body="false" :loading="loading" @optionListReachBottom="onOptionListReachBottom">
        <n-option v-for="item of list" :key="item.value" :label="item.label" :value="item.value" />
      </n-modal-select>
    </n-col>
  </n-row>
</template>

<style scoped>
</style>
