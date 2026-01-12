<template>
  <div>
    <h3 class="m-4">搜索Address</h3>
    <h-transfer
      v-model="dataModel"
      :props="{ key: 'id', label: 'address' }"
      :data="sourceData"
      type="table"
      style="width: auto"
    >
      <template #leftHeader>
        <div>标题（{{ leftCheckedData.size }}/{{ sourceData.length }}）</div>
      </template>
      <template #leftBody="{ data }">
        <h-table
          ref="leftTableRef"
          height="100%"
          :data="data"
          border="inner"
          :checkbox-config="{ highlight: true, reserve: false }"
          @checkbox-change="(checkedObj: any) => handleCheckboxChange(checkedObj, 'left')"
          @checkbox-all="handleCheckboxAll(data, 'left')"
        >
          <h-table-column type="checkbox" width="60" align="center" header-align="center" />
          <h-table-column field="sex" title="Sex" />
          <h-table-column field="age" title="Age" />
          <h-table-column field="address" title="Address" show-overflow />
        </h-table>
      </template>
      <template #control>
        <h-button
          type="normal"
          :plain="true"
          :disabled="!rightCheckedData.size"
          icon="arrow_left"
          @click="transferToLeft"
        />
        <h-button
          type="normal"
          style="margin-left: 0"
          :disabled="!leftCheckedData.size"
          :plain="true"
          icon="arrow_right"
          @click="transferToRight"
        />
      </template>
      <template #rightHeader>
        <div>标题（{{ rightCheckedData.size }}/{{ dataModel.length }}）</div>
      </template>
      <template #rightBody="{ data }">
        <h-table
          ref="rightTableRef"
          :data="data"
          height="100%"
          border="inner"
          :checkbox-config="{ highlight: true, reserve: false }"
          @checkbox-all="handleCheckboxAll(data, 'right')"
          @checkbox-change="(checkedObj: any) => handleCheckboxChange(checkedObj, 'right')"
        >
          <h-table-column type="checkbox" width="60" align="center" header-align="center" />
          <h-table-column field="sex" title="Sex" />
          <h-table-column field="age" title="Age" />
          <h-table-column field="role" title="Role" />
          <h-table-column field="address" title="Address" show-overflow />
        </h-table>
      </template>
      <template #leftFooter>
        <h-pagination :total="sourceData.length" type="simplest" />
      </template>
    </h-transfer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const sourceData = ref([
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
  { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
  { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
  { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' },
]);
const dataModel = ref<unknown[]>([]);

const leftTableRef = ref();
const rightTableRef = ref();
const leftCheckedData = ref(new Set());
const rightCheckedData = ref(new Set());
const handleCheckboxChange = ({ row }, type) => {
  if (type === 'left') {
    leftCheckedData.value.has(row.id)
      ? leftCheckedData.value.delete(row.id)
      : leftCheckedData.value.add(row.id);
  } else {
    rightCheckedData.value.has(row.id)
      ? rightCheckedData.value.delete(row.id)
      : rightCheckedData.value.add(row.id);
  }
};
const handleCheckboxAll = (data, type) => {
  if (type === 'left') {
    leftCheckedData.value = new Set(data.map(item => item.id));
  } else {
    rightCheckedData.value = new Set(dataModel.value);
  }
};
const transferToLeft = () => {
  dataModel.value = dataModel.value.filter(id => !rightCheckedData.value.has(id));
  rightCheckedData.value.clear();
  rightTableRef.value?.clearCheckboxRow();
  rightTableRef.value?.clearCheckboxReserve();
};
const transferToRight = () => {
  dataModel.value = dataModel.value
    .filter(id => !leftCheckedData.value.has(id))
    .concat(Array.from(leftCheckedData.value));
  leftCheckedData.value.clear();
  leftTableRef.value?.clearCheckboxRow();
  leftTableRef.value?.clearCheckboxReserve();
};
</script>
