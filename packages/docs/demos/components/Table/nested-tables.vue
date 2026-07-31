<template>
  <h-table ref="tableDomRef" :data="data" height="500">
    <h-table-column title="ID" field="id" type="expand" fixed>
      <template #expand="scope">
        <h-table
          :data="scope.row.orders"
          border
          header-sticky
          :header-sticky-offset="92"
          :header-sticky-container="tableDomRef?.getScrollWrap()"
        >
          <h-table-column title="No" field="no" />
          <h-table-column title="Name" field="name" />
          <h-table-column title="Price" field="price" />
        </h-table>
      </template>
    </h-table-column>
    <h-table-column title="Name" field="name" width="100px" show-overflow-tooltip />
    <h-table-column title="Gender" field="gender" width="100px" />
    <h-table-column title="Birthday" field="birthday" min-width="200px" />
    <h-table-column title="Address" field="address" min-width="500px" />
  </h-table>
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
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
  orders: new Array(faker.helpers.arrayElement([10, 15, 20, 25])).fill(0).map(() => ({
    no: faker.finance.bic(),
    name: faker.word.noun(),
    price: faker.finance.amount(),
  })),
})));
</script>
