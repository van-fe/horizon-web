<template>
  <h-table :data="data" height="300px" :loading="isLoading" @sort-change="onSortChange">
    <h-table-column title="ID" field="id" width="80" sortable :sort-method="numberSort" />
    <h-table-column title="Name" field="name" sortable />
    <h-table-column title="Gender" field="gender" sortable />
    <h-table-column title="Birthday" field="birthday" sortable sort-separate :sort-method="dateSort" />
    <h-table-column title="Address" field="address" sortable :use-built-in-sort="false" @sort-change="onColumnSortChange" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import { dayjs, HTableColumnData, HTableSortOrderEnum } from '@aurora/horizon-web';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
}

const isLoading = ref(false);

const data = ref<TableData[]>(new Array(20).fill(0).map((_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
})));

function numberSort(order: HTableSortOrderEnum) {
  return (a: TableData, b: TableData) => order === HTableSortOrderEnum.ASC ? a.id - b.id : b.id - a.id;
}

function dateSort(order: HTableSortOrderEnum) {
  return (a: TableData, b: TableData) => {
    const diff = dayjs(a.birthday).valueOf() - dayjs(b.birthday).valueOf();

    return order === HTableSortOrderEnum.ASC ? diff : -diff;
  };
}

function onSortChange(states: Array<{ column: HTableColumnData; order: HTableSortOrderEnum }>) {
  console.info('Table sort change', states);

  // You can sort by your self
}

function onColumnSortChange(order: HTableSortOrderEnum | null) {
  console.info('Column(Address) sort change:', order);
  isLoading.value = true;

  setTimeout(() => {
    data.value = order === null ? data.value.sort(numberSort(HTableSortOrderEnum.ASC)) : data.value.sort((a, b) => order === HTableSortOrderEnum.ASC ? a.address.localeCompare(b.address) : b.address.localeCompare(a.address));
    isLoading.value = false;
  }, 2000);
}
</script>
