<template>
  <p>
    current picked indexes: {{ checkedRows }}
  </p>

  <n-table-v3 :data="data" height="300px">
    <n-table-column-v3
      ref="selectionColumnDomRef"
      v-model:selected-keys="checkedRows"
      type="selection"
      :multiple="true"
      align="center"
      width="40"
      column-key="id"
      :selectable="isSelectable"
    />
    <n-table-column-v3 title="Index" field="id" width="80" />
    <n-table-column-v3 title="Name" field="name" />
    <n-table-column-v3 title="Birthday" field="birthday" />
    <n-table-column-v3 title="Address" field="address" />
  </n-table-v3>

  <div class="my-4">
    <p>
      <n-button plain @click="() => setSelected(true)">toggle row ignore selectable</n-button>
      <n-button plain @click="() => setSelected()">toggle row consider selectable</n-button>
    </p>
    <p>
      <n-button plain @click="getSelected">get selected</n-button>
    </p>
    <p>
      <n-button plain @click="() => clearSelection(true)">clear selection ignore selectable</n-button>
      <n-button plain @click="() => clearSelection()">clear selection consider selectable</n-button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import { NTableColumnV3 } from '@aurora/horizon-web';
import type { NTableRowDataType, TableColumnExposes } from '@aurora/horizon-web';
import { LegoComponentInstance } from '@aurora/utils';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  address: string;
}

const selectionColumnDomRef = ref<LegoComponentInstance<typeof NTableColumnV3, TableColumnExposes>>();

const checkedRows = ref([]);

const data = ref<TableData[]>(new Array(20).fill(0).map((_, index) => ({
  id: index,
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: faker.address.streetAddress(true),
})));

function isSelectable(rowData: NTableRowDataType, rowIndex: number) {
  return ![3, 4].includes(rowIndex);
}

function setSelected(ignoreSelectable = false) {
  selectionColumnDomRef.value?.toggleRowSelection([4, 5], undefined, ignoreSelectable);
}

function getSelected() {
  console.log(selectionColumnDomRef.value?.getSelectionRows());
}

function clearSelection(ignoreSelectable = false) {
  selectionColumnDomRef.value?.clearSelection(ignoreSelectable);
}
</script>
