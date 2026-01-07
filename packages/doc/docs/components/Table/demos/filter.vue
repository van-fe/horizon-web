<template>
  <h-table-v3 :data="data" height="300px" :loading="isLoading">
    <h-table-column-v3 title="Seq" type="index" width="80" fixed />
    <h-table-column-v3 title="Name" field="name" :filterable="true" />
    <h-table-column-v3
      title="Register Date"
      field="registerDate"
      :filterable="true"
      filter-type="date-picker"
      tip="This column's data can be all formats that Dayjs can parse. If you have special format, you can set 'value-format' in 'filter-options'."
      :filter-options="{type: 'date-range', showNow: true}"
    />
    <h-table-column-v3
      title="Register Time"
      field="registerTime"
      :filterable="true"
      filter-type="time-picker"
      tip="If you want to use time-picker component, you should give this column's data with HH:mm or HH:mm:ss format string"
      :filter-options="{type: 'time', isRange: true, showNow: true, panelMinWidth: 250, fitInputWidth: 'fit-content'}"
    />
    <h-table-column-v3
      title="Country"
      field="country"
      :filterable="true"
      filter-type="select"
      show-overflow-tooltip
      width="200px"
      tip="Select filter will auto collect column's data to filter in multiple. If you have special options, you should give 'options' in 'filter-options'."
    />
    <h-table-column-v3 title="Address" field="address" :filterable="true" mih-width="400" :use-built-ih-filter="false" @filter-change="onFilterChange" />
  </h-table-v3>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import { dayjs } from '@aurora/horizon-web';

interface TableData {
  id: number;
  name: string;
  registerDate: string;
  registerTime: string;
  country: string;
  address: string;
}

const isLoading = ref(false);

const originData: TableData[] = new Array(100).fill(0).map((_, index) => ({
  id: index,
  name: faker.name.firstName(),
  registerDate: faker.date.recent(180).toDateString(),
  registerTime: dayjs(faker.date.recent()).format('HH:mm:ss'),
  country: faker.address.country(),
  address: faker.address.streetAddress(true),
}));

const data = ref<TableData[]>(originData);

function onFilterChange(str?: string) {
  isLoading.value = true;

  setTimeout(() => {
    data.value = str ? originData.filter((row) => row.address.includes(str)) : originData;
    isLoading.value = false;
  }, 2000);
}
</script>
