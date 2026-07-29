<template>
  <h-row>
    <h-col :span="6">
      <h-auto-complete :options="options" :fit-input-width="false" placeholder="You like..." clearable @search="onSearch">
        <template #default="item">
          <div class="item-wrap">
            <div class="title">{{ item.label }}</div>
            <div class="font-bold">{{ item.value }}</div>
          </div>
        </template>
      </h-auto-complete>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HAutoCompleteOptionProps } from '@aurora/horizon-web';
import { faker } from '@faker-js/faker';

const options = ref<Partial<HAutoCompleteOptionProps>[]>([]);

function onSearch(val: string) {
  options.value = [];

  if (val) {
    new Array(10).fill(0).forEach(() => {
      options.value.push({
        value: faker.helpers.fake(`${faker.animal.cat()} also likes ${val}`),
        label: faker.helpers.fake(`${faker.name.fullName()} likes ${val}`),
      });
    });
  }
}
</script>

<style scoped>
.item-wrap {
  display: flex;
  flex-direction: column;
}
</style>
