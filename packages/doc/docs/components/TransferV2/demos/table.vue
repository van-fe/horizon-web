<template>
  <div>
    <h3 class="m-4">搜索Address</h3>
    <n-transfer
      v-model="dataModel"
      :props="{ key: 'id', label: 'address' }"
      :data="sourceData"
      style="width: auto"
    >
      <template #leftHeader>
        <div>标题（{{ leftCheckedData?.length || 0 }}/{{ sourceData.length }}）</div>
      </template>
      <template #leftBody="{ data: leftData }">
        <n-table-v3
          ref="leftTableRef"
          :data="leftData"
          height="100%"
          :row-multi-select-with-click="true"
        >
          <n-table-column-v3 v-model:selected-keys="leftCheckedData" type="selection" multiple width="60" column-key="key" />
          <n-table-column-v3 title="Sex" field="sex" />
          <n-table-column-v3 title="Age" field="age" />
          <n-table-column-v3 title="Address" field="address" :show-overflow-tooltip="true" />
        </n-table-v3>
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
        <div>标题（{{ rightCheckedData?.length || 0 }}/{{ dataModel.length }}）</div>
      </template>
      <template #rightBody="{ data: rightData }">
        <n-table-v3
          ref="rightTableRef"
          :data="rightData"
          height="100%"
          :row-multi-select-with-click="true"
        >
          <n-table-column-v3 v-model:selected-keys="rightCheckedData" type="selection" multiple width="60" column-key="key" />
          <n-table-column-v3 title="Sex" field="sex" />
          <n-table-column-v3 title="Age" field="age" />
          <n-table-column-v3 title="Role" field="role" />
          <n-table-column-v3 title="Address" field="address" :show-overflow-tooltip="true" />
        </n-table-v3>
      </template>
      <template #leftFooter>
        <n-pagination :total="sourceData.length" type="simplest" />
      </template>
    </n-transfer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

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
const leftCheckedData = ref([]);
const rightCheckedData = ref([]);

const transferToLeft = () => {
  dataModel.value = dataModel.value.filter(id => !rightCheckedData.value.includes(id));
  rightCheckedData.value = [];
};
const transferToRight = () => {
  dataModel.value = dataModel.value
    .filter(id => !leftCheckedData.value.includes(id))
    .concat(Array.from(leftCheckedData.value));
  leftCheckedData.value = [];
};
</script>
