<template>
  <n-row>
    <n-col :span="6">
      <n-auto-complete :options="options" :fit-input-width="false" placeholder="You like..." @search="onSearch">
        <template #default="item">
          <div class="item-wrap">
            <div class="title">{{ item.label }}</div>
            <div class="title"><n-tag :clickable="false">{{ item.description }}</n-tag></div>
          </div>
        </template>
      </n-auto-complete>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { NAutoCompleteOptionProps } from '@nio-fe/lego';
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
