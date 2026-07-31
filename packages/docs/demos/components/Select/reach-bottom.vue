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
        label: faker.person.fullName(),
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
  <h-grid :gap="10">
    <h-grid-item :span="6">
      <h-select v-model="value" :clearable="true" :to-body="false" :loading="loading" @optionListReachBottom="onOptionListReachBottom">
        <h-option v-for="item of list" :key="item.value" :label="item.label" :value="item.value" />
      </h-select>
    </h-grid-item>
  </h-grid>
</template>

<style scoped>
</style>
