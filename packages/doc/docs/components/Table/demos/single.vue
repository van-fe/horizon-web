<template>
  <p>
    current picked index: {{ checkedRow }}
  </p>

  <h-table-v3 :data="data" height="300px">
    <h-table-column-v3
      ref="selectionColumnDomRef"
      v-model:selected-keys="checkedRow"
      type="selection"
      align="center"
      width="40"
      column-key="id"
      :selectable="isSelectable"
    />
    <h-table-column-v3 title="Index" field="id" width="80" />
    <h-table-column-v3 title="Name" field="name" />
    <h-table-column-v3 title="Birthday" field="birthday" />
    <h-table-column-v3 title="Address" field="address" />
  </h-table-v3>

  <div class="my-4">
    <p>
      <h-button plain @click="() => setSelected(true)">toggle index = 4 ignore selectable</h-button>
      <h-button plain @click="() => setSelected()">toggle index = 4 consider selectable</h-button>
    </p>
    <p>
      <h-button plain @click="getSelected">get selected</h-button>
    </p>
    <p>
      <h-button plain @click="() => clearSelection(true)">clear selection ignore selectable</h-button>
      <h-button plain @click="() => clearSelection()">clear selection consider selectable</h-button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import { NTableColumnV3, NTableRowDataType, type TableColumnExposes } from '@aurora/horizon-web';
import { HorizonWebComponentInstance } from '@aurora/utils';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  address: string;
}

const selectionColumnDomRef = ref<HorizonWebComponentInstance<typeof NTableColumnV3, TableColumnExposes>>();
const checkedRow = ref();

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
  selectionColumnDomRef.value?.toggleRowSelection(4, undefined, ignoreSelectable);
}

function getSelected() {
  console.info(selectionColumnDomRef.value?.getSelectionRows());
}

function clearSelection(ignoreSelectable = false) {
  selectionColumnDomRef.value?.clearSelection(ignoreSelectable);
}
</script>
