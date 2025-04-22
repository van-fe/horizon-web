<template>
  <div>
    <h3 class="m-4">搜索Address</h3>
    <n-transfer-v-2
      v-model="dataModel"
      :props="{ key: 'id', label: 'address' }"
      :data="sourceData"
      style="width: auto"
    >
      <template #leftHeader>
        <div>标题（{{ leftCheckedData?.size || 0 }}/{{ sourceData.length }}）</div>
      </template>
      <template #leftBody="{ data: leftData }">
        <n-table-v2
          ref="leftTableRef"
          :row-data="leftData"
          :column-defs="leftColumnDefs"
          dom-layout="autoHeight"
          :default-col-def="defaultColDef"
          row-selection="multiple"
          :row-multi-select-with-click="true"
          @grid-ready="onLeftGridReady"
          @selection-changed="onLeftSelectionChange"
        />
      </template>
      <template #control>
        <n-button type="normal" :plain="true" icon="arrow_left" @click="transferToLeft" />
        <n-button
          type="normal"
          style="margin-left: 0"
          :plain="true"
          icon="arrow_right"
          @click="transferToRight"
        />
      </template>
      <template #rightHeader>
        <div>标题（{{ rightCheckedData?.size || 0 }}/{{ dataModel.length }}）</div>
      </template>
      <template #rightBody="{ data: rightData }">
        <n-table-v2
          ref="rightTableRef"
          dom-layout="autoHeight"
          :default-col-def="defaultColDef"
          :row-data="rightData"
          :column-defs="rightColumnDefs"
          row-selection="multiple"
          :row-multi-select-with-click="true"
          @grid-ready="onRightGridReady"
          @selection-changed="onRightSelectionChange"
        />
      </template>
      <template #leftFooter>
        <n-pagination :total="sourceData.length" type="simplest" />
      </template>
    </n-transfer-v-2>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, ComputedRef } from 'vue';
import type {
  NColDef,
  GridApi,
  GridReadyEvent,
  SelectionChangedEvent,
} from '@nio-fe/lego-table-v2';

const sourceData = ref([
  { id: 10001, key: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, key: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, key: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, key: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10005, key: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
  { id: 10006, key: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
  { id: 10007, key: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
  { id: 10008, key: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' },
]);
const dataModel = ref([]);

const leftTableRef = ref();
const rightTableRef = ref();
const leftCheckedData = ref(new Set());
const rightCheckedData = ref(new Set());

const defaultColDef = reactive({
  resizable: true,
  suppressSizeToFit: true,
  filter: false,
  sortable: false,
  suppressMenu: true,
});
const leftGridApi = ref<GridApi>();
const rightGridApi = ref<GridApi>();
const leftColumnDefs: ComputedRef<NColDef[]> = computed(() => [
  { checkboxSelection: true, cellRenderer: 'checkboxRenderer' },
  { field: 'sex' },
  { field: 'age' },
  { field: 'address', showOverflow: true },
]);
const rightColumnDefs: ComputedRef<NColDef[]> = computed(() => [
  { checkboxSelection: true },
  { field: 'sex' },
  { field: 'age' },
  { field: 'role' },
  { field: 'address', showOverflow: true },
]);

const onLeftGridReady = (params: GridReadyEvent) => {
  leftGridApi.value = params.api;
};
const onRightGridReady = (params: GridReadyEvent) => {
  rightGridApi.value = params.api;
};

const onLeftSelectionChange = (event: SelectionChangedEvent) => {
  console.log('SelectionChangedEvent', event);
  const selectedRows = leftGridApi.value?.getSelectedRows();
  if (!selectedRows) return;
  handleCheckboxChange(selectedRows, 'left');
};

const onRightSelectionChange = (event: SelectionChangedEvent) => {
  console.log('SelectionChangedEvent', event);
  const selectedRows = rightGridApi.value?.getSelectedRows();
  if (!selectedRows) return;
  handleCheckboxChange(selectedRows, 'right');
};

const handleCheckboxChange = (rows, type) => {
  if (type === 'left') {
    leftCheckedData.value = new Set(rows.map(row => row.id));
  } else {
    rightCheckedData.value = new Set(rows.map(row => row.id));
  }
};

const transferToLeft = () => {
  dataModel.value = dataModel.value.filter(id => !rightCheckedData.value.has(id));
  rightCheckedData.value.clear();
};
const transferToRight = () => {
  dataModel.value = dataModel.value
    .filter(id => !leftCheckedData.value.has(id))
    .concat(Array.from(leftCheckedData.value));
  leftCheckedData.value.clear();
};
</script>
