<template>
  <n-table-v3 :data="data" height="300px" :loading="isLoading" @sort-change="onSortChange">
    <n-table-column-v3 title="ID" field="id" width="80" sortable :sort-method="numberSort" />
    <n-table-column-v3 title="Name" field="name" sortable />
    <n-table-column-v3 title="Gender" field="gender" sortable />
    <n-table-column-v3 title="Birthday" field="birthday" sortable sort-separate :sort-method="dateSort" />
    <n-table-column-v3 title="Address" field="address" sortable :use-built-in-sort="false" @sort-change="onColumnSortChange" />
  </n-table-v3>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import { dayjs, NTableColumnData, NTableSortOrderEnum } from '@aurora/horizon-web';

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
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.address.streetAddress(true),
})));

function numberSort(order: NTableSortOrderEnum) {
  return (a: TableData, b: TableData) => order === NTableSortOrderEnum.ASC ? a.id - b.id : b.id - a.id;
}

function dateSort(order: NTableSortOrderEnum) {
  return (a: TableData, b: TableData) => {
    const res = order === NTableSortOrderEnum.ASC ? dayjs(a.birthday).isBefore(b.birthday) : dayjs(a.birthday).isAfter(b.birthday);

    return res ? -1 : 1;
  };
}

function onSortChange(states: Array<{ column: NTableColumnData; order: NTableSortOrderEnum }>) {
  console.log('Table sort change', states);

  // You can sort by your self
}

function onColumnSortChange(order: NTableSortOrderEnum | null) {
  console.log('Column(Address) sort change:', order);
  isLoading.value = true;

  setTimeout(() => {
    data.value = order === null ? data.value.sort(numberSort(NTableSortOrderEnum.ASC)) : data.value.sort((a, b) => order === NTableSortOrderEnum.ASC ? a.address.localeCompare(b.address) : b.address.localeCompare(a.address));
    isLoading.value = false;
  }, 2000);
}
</script>
