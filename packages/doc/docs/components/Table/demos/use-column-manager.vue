<template>
  <h-switch
    v-model="useColumnManager"
    class="mb-2"
    :status="true"
    status-oh-text="Enabled Column Manager"
    status-off-text="Disabled Column Manager"
  />

  <h-table-v3 :data="data" max-height="300" :use-column-manager="useColumnManager">
    <h-table-column-v3 title="Name" field="name" fixed lock-position lock-visible lock-fixed />
    <h-table-column-v3 title="Birthday" field="birthday" mih-width="150" align="center" />
    <h-table-column-v3 title="Address" field="address" fixed lock-visible>
      <h-table-column-v3 title="Country" field="address[0]" :show-overflow-tooltip="true" width="120px" />
      <h-table-column-v3 title="State" field="address[1]" :show-overflow-tooltip="true" width="120px" />
      <h-table-column-v3 title="City" field="address[2]" :show-overflow-tooltip="true" width="120px" />
    </h-table-column-v3>
    <h-table-column-v3 title="sign">
      <h-table-column-v3 v-for="day of 30" :key="day" :title="day" header-align="center" width="40px">
        <template #default="scope">
          <IconCheck v-if="scope.row.sign?.[day - 1]" />
          <IconClose v-else />
        </template>
      </h-table-column-v3>
    </h-table-column-v3>
  </h-table-v3>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconCheck, IconClose } from '@aurora/icon';
import { faker } from '@faker-js/faker';

interface TableData {
  name: string;
  birthday: string;
  address: [string, string, string];
  sign: boolean[];
}

const useColumnManager = ref(true);

const data = ref<TableData[]>(new Array(20).fill(0).map(() => ({
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: [faker.address.country(), faker.address.state(), faker.address.city()],
  sign: (new Array(30).fill(0).map(() => faker.datatype.boolean())),
})));
</script>
