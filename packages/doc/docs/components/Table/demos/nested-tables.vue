<template>
  <n-table-v3 ref="tableDomRef" :data="data" height="500">
    <n-table-column-v3 title="ID" field="id" type="expand" fixed>
      <template #expand="scope">
        <n-table-v3
          :data="scope.row.orders"
          border
          header-sticky
          :header-sticky-offset="92"
          :header-sticky-container="tableDomRef?.getScrollWrap()"
        >
          <n-table-column-v3 title="No" field="no" />
          <n-table-column-v3 title="Name" field="name" />
          <n-table-column-v3 title="Price" field="price" />
        </n-table-v3>
      </template>
    </n-table-column-v3>
    <n-table-column-v3 title="Name" field="name" width="100px" />
    <n-table-column-v3 title="Gender" field="gender" width="100px" />
    <n-table-column-v3 title="Birthday" field="birthday" min-width="200px" />
    <n-table-column-v3 title="Address" field="address" min-width="500px" />
  </n-table-v3>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
  orders: {
    no: string;
    name: string;
    price: string;
  }[];
}

const tableDomRef = ref();

const data = ref<TableData[]>(new Array(20).fill(0).map((_, index) => ({
  id: index + 1,
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.address.streetAddress(true),
  orders: new Array(faker.helpers.arrayElement([10, 15, 20, 25])).fill(0).map(() => ({
    no: faker.finance.bic(),
    name: faker.word.noun(),
    price: faker.finance.amount(),
  })),
})));
</script>
