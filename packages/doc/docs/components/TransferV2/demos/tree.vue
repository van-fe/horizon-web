<template>
  <div>
    <h3 class="m-4">组织架构</h3>
    <n-transfer-v-2
      v-model="dataModel"
      :titles="['']"
      :data="data"
      filterable
      :filter-method="handleSearch"
      draggable
      style="width: 600px"
    >
      <template #item="{ item }">
        <div class="flex align-center overflow-hidden">
          <n-avatar size="small" :src="item.avatar" />
          <div class="ml-2 flex-1 flex flex-column overflow-hidden">
            <div style="text-overflow: ellipsis; overflow: hidden">{{ item.label }}</div>
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
    <h3 class="m-4">操作控件</h3>
    <n-transfer-v-2 v-model="dataModel" :data="data" draggable style="width: 600px">
      <template #item="{ item, type }">
        <div v-if="type === 'left'" class="flex align-center overflow-hidden">
          <n-avatar size="small" :src="item.avatar" />
          <div class="ml-2 flex-1 flex flex-column overflow-hidden">
            <div style="text-overflow: ellipsis; overflow: hidden">{{ item.label }}</div>
            <div
              v-tooltip.overflow="item.department"
              style="text-overflow: ellipsis; overflow: hidden; color: #929398"
            >
              {{ item.department }}
            </div>
          </div>
        </div>
        <div v-if="type === 'right'" class="flex align-center overflow-hidden">
          <n-avatar size="small" :src="item.avatar" />
          <div class="ml-2 flex-1 flex flex-column overflow-hidden">
            <div style="text-overflow: ellipsis; overflow: hidden">{{ item.label }}</div>
            <div
              v-tooltip.overflow="item.department"
              style="text-overflow: ellipsis; overflow: hidden; color: #929398"
            >
              {{ item.department }}
            </div>
          </div>
          <n-button type="normal" icon="exclusive_group" text></n-button>
        </div>
      </template>
    </n-transfer-v-2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { TransferDataProps } from '@aurora/horizon-web';

const originData = [
  {
    key: 0,
    label: '某某集团',
    avatar: 'https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
    children: [
      {
        key: '0-1',
        label: '某某公司',
        avatar: 'https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
        children: [
          {
            key: '0-1-1',
            label: 'Brooklyn Simmons 王磊',
            avatar:
              'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
            department:
              'Product Design & Development-Digital Development-Web Application Development Department',
          },
          {
            key: 1,
            label: '产品事业部',
            avatar:
              'https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
            department:
              'Product Design & Development-Digital Development-Web Application Development Department',
            children: [
              {
                key: '1-1',
                label: '产品事业部1-1',
                avatar:
                  'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                department:
                  'Product Design & Development-Digital Development-Web Application Development Department',
                children: [
                  {
                    key: '1-2',
                    label: '产品事业部1-2',
                    avatar:
                      'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                    department:
                      'Product Design & Development-Digital Development-Web Application Development Department',
                    children: [
                      {
                        key: '1-3',
                        label: '产品事业部1-3',
                        avatar:
                          'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                        department:
                          'Product Design & Development-Digital Development-Web Application Development Department',
                        children: [
                          {
                            key: '1-4',
                            label: '产品事业部1-4',
                            avatar:
                              'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                            department:
                              'Product Design & Development-Digital Development-Web Application Development Department',
                            children: [
                              {
                                key: '1-5',
                                label: '产品事业部1-5',
                                avatar:
                                  'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                                department:
                                  'Product Design & Development-Digital Development-Web Application Development Department',
                                children: [
                                  {
                                    key: '1-6',
                                    label: '产品事业部1-6',
                                    avatar:
                                      'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                                    department:
                                      'Product Design & Development-Digital Development-Web Application Development Department',
                                    children: [
                                      {
                                        key: '1-7',
                                        label: '产品事业部1-7',
                                        avatar:
                                          'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                                        department:
                                          'Product Design & Development-Digital Development-Web Application Development Department',
                                        children: [
                                          {
                                            key: '1-8',
                                            label: '产品事业部1-8',
                                            avatar:
                                              'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                                            department:
                                              'Product Design & Development-Digital Development-Web Application Development Department',
                                            children: [],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            key: 2,
            label: 'UED设计部',
            avatar:
              'https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
            department:
              'Product Design & Development-Digital Development-Web Application Development Department',
            children: [
              {
                key: '2-1',
                label: 'Brooklyn Simmons 王磊2-1',
                avatar:
                  'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                department:
                  'Product Design & Development-Digital Development-Web Application Development Department',
              },
            ],
          },
          {
            key: 3,
            label: '研发部门',
            avatar:
              'https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
            department:
              'Product Design & Development-Digital Development-Web Application Development Department',
            children: [
              {
                key: '3-1',
                label: 'Brooklyn Simmons 王磊3-1',
                avatar:
                  'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                department:
                  'Product Design & Development-Digital Development-Web Application Development Department',
              },
            ],
          },
          {
            key: 222222,
            label: '研发部门1',
            avatar:
              'https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
            department:
              'Product Design & Development-Digital Development-Web Application Development Department',
            children: [],
          },
          {
            key: 3111,
            label: '研发部门222',
            avatar:
              'https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
            department:
              'Product Design & Development-Digital Development-Web Application Development Department',
            children: [],
          },
        ],
      },
    ],
  },
];
export default defineComponent({
  components: {},
  setup() {
    const data = ref(originData);
    const dataModel = ref([]);
    const searchInput = ref('');
    const handleSearch = (key: string, item: TransferDataProps) => {
      if (key === '') return true;
      if (item.label.includes(key)) return true;
      return false;
    };
    return {
      data,
      dataModel,
      searchInput,
      handleSearch,
    };
  },
});
</script>
