<template>
  <p>
    current picked indexes: {{ checkedRows }}
  </p>

  <h-table :data="data" height="300px">
    <h-table-column
      ref="selectionColumnDomRef"
      v-model:selected-keys="checkedRows"
      type="selection"
      :multiple="true"
      align="center"
      width="40"
      column-key="id"
      :selectable="isSelectable"
    />
    <h-table-column title="Index" field="id" width="80" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
  </h-table>

  <div class="my-4">
    <p>
      <h-button plain @click="() => setSelected(true)">toggle row ignore selectable</h-button>
      <h-button plain @click="() => setSelected()">toggle row consider selectable</h-button>
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
import { HTableColumn } from '@aurora/horizon-web';
import type { HTableRowDataType, TableColumnExposes } from '@aurora/horizon-web';
import type { HorizonWebComponentInstance } from '@aurora/utils';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  address: string;
}

const selectionColumnDomRef = ref<HorizonWebComponentInstance<typeof HTableColumn, TableColumnExposes>>();

const checkedRows = ref([]);

const data = ref<TableData[]>(new Array(20).fill(0).map((_, index) => ({
  id: index,
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: faker.location.streetAddress(),
})));

function isSelectable(rowData: HTableRowDataType, rowIndex: number) {
  return ![3, 4].includes(rowIndex);
}

function setSelected(ignoreSelectable = false) {
  selectionColumnDomRef.value?.toggleRowSelection([4, 5], undefined, ignoreSelectable);
}

function getSelected() {
  console.info(selectionColumnDomRef.value?.getSelectionRows());
}

function clearSelection(ignoreSelectable = false) {
  selectionColumnDomRef.value?.clearSelection(ignoreSelectable);
}
</script>
