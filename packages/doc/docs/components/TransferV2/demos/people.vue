<template>
  <n-transfer-v-2
    v-model="dataModel"
    :data="filterModel"
    :filterable="handleSearch"
    :props="{ label: 'name' }"
    :titles="['']"
    style="width: 600px"
  >
    <template #rightHeader>
      <div class="flex flex-1 align-center justify-space-between">
        <div>{{ `已选: ${dataModel.length} 人` }}</div>
        <n-button v-show="!!dataModel.length" size="medium" :text="true" @click="handleClear">
          清除
        </n-button>
      </div>
    </template>
    <template #item="{ item }">
      <div class="flex align-center">
        <n-avatar size="small" :src="item.avatar" />
        <div class="ml-2 flex-1 flex flex-column overflow-hidden">
          <div style="text-overflow: ellipsis; overflow: hidden">{{ item.name }}</div>
          <div
            v-tooltip.overflow="item.department"
            style="text-overflow: ellipsis; overflow: hidden; color: #929398"
          >
            {{ item.department }}
          </div>
        </div>
      </div>
    </template>
  </n-transfer-v-2>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
const originData = [
  {
    key: 0,
    name: 'Arooklyn Simmons 王磊',
    avatar: 'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
    department:
      'Product Design & Development-Digital Development-Web Application Development Department',
  },
  {
    key: 1,
    name: 'Brooklyn Simmons 王磊2',
    avatar: 'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
    department:
      'Product Design & Development-Digital Development-Web Application Development Department',
  },
  {
    key: 2,
    name: 'Crooklyn Simmons 王磊3',
    avatar: 'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
    department:
      'Product Design & Development-Digital Development-Web Application Development Department',
  },
  {
    key: 3,
    name: 'Drooklyn Simmons 王磊4',
    avatar: 'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
    department:
      'Product Design & Development-Digital Development-Web Application Development Department',
  },
  {
    key: 4,
    name: 'Erooklyn Simmons 王磊5',
    avatar: 'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
    department:
      'Product Design & Development-Digital Development-Web Application Development Department',
  },
];
const data = ref(originData);
const dataModel = ref<number[]>([]);
const searchInput = ref('');

const checkedAll = ref(false);

const handleSearch = (value: string, item: any) => {
  return item.name.toLowerCase().includes(value.toLowerCase());
};
const filterModel = computed(() => {
  return data.value.filter(item => {
    return handleSearch(searchInput.value, item);
  });
});
watchEffect(() => {
  checkedAll.value = dataModel.value.length === filterModel.value.length;
});
const handleClear = () => {
  dataModel.value = [];
};
</script>
<style>
.all-check {
  display: flex;
  padding: 0 19px;
  margin-top: 24px;
  margin-bottom: 8px;
}
</style>
