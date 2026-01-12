<template>
  <h-row>
    <h-col :span="6">
      <h-auto-complete :options="options" :fit-input-width="false" placeholder="You like..." @search="onSearch">
        <template #default="item">
          <div class="item-wrap">
            <div class="title">{{ item.label }}</div>
            <div class="title"><h-tag :clickable="false">{{ item.description }}</h-tag></div>
          </div>
        </template>
      </h-auto-complete>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { NAutoCompleteOptionProps } from '@aurora/horizon-web';
import { faker } from '@faker-js/faker';

const options = ref<Partial<NAutoCompleteOptionProps>[]>([]);

function onSearch(val: string) {
  options.value = [];

  if (val) {
    new Array(10).fill(0).forEach(() => {
      options.value.push({
        label: faker.helpers.fake(`${faker.name.fullName()} likes ${val}`),
        description: faker.animal.dog(),
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
