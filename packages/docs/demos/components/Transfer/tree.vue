<template>
  <div>
    <h3 class="m-4">组织架构</h3>
    <h-transfer
      v-model="dataModel"
      :titles="['']"
      :data="data"
      filterable
      draggable
      type="work"
      style="width: 600px"
    >
      <template #item="{ item, type }">
        <div class="flex align-center overflow-hidden">
          <h-avatar size="small" :src="item.avatar" />
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
    </h-transfer>
    <h3 class="m-4">操作控件</h3>
    <h-transfer v-model="dataModel" :data="data" draggable type="work" style="width: 600px">
      <template #item="{ item, type }">
        <div v-if="type === 'left'" class="flex align-center overflow-hidden">
          <h-avatar size="small" :src="item.avatar" />
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
          <h-avatar size="small" :src="item.avatar" />
          <div class="ml-2 flex-1 flex flex-column overflow-hidden">
            <div style="text-overflow: ellipsis; overflow: hidden">{{ item.label }}</div>
            <div
              v-tooltip.overflow="item.department"
              style="text-overflow: ellipsis; overflow: hidden; color: #929398"
            >
              {{ item.department }}
            </div>
          </div>
          <h-button type="normal" icon="exclusive_group" text></h-button>
        </div>
      </template>
    </h-transfer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { IconLogo } from '@aurora/icon';
const originData = [
  {
    key: 0,
    label: '某某集团',
    avatar: 'https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
    children: [
      {
        key: '0-1',
        label: '某某公司',
        avatar: 'https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
        children: [
          {
            key: '0-1-1',
            label: 'Brooklyn Simmons 王磊',
            avatar:
              'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
            department:
              'Product Design & Development-Digital Development-Web Application Development Department',
          },
          {
            key: 1,
            label: '产品事业部',
            avatar:
              'https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
            department:
              'Product Design & Development-Digital Development-Web Application Development Department',
            children: [
              {
                key: '1-1',
                label: '产品事业部1-1',
                avatar:
                  'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                department:
                  'Product Design & Development-Digital Development-Web Application Development Department',
                children: [
                  {
                    key: '1-2',
                    label: '产品事业部1-2',
                    avatar:
                      'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                    department:
                      'Product Design & Development-Digital Development-Web Application Development Department',
                    children: [
                      {
                        key: '1-3',
                        label: '产品事业部1-3',
                        avatar:
                          'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                        department:
                          'Product Design & Development-Digital Development-Web Application Development Department',
                        children: [
                          {
                            key: '1-4',
                            label: '产品事业部1-4',
                            avatar:
                              'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                            department:
                              'Product Design & Development-Digital Development-Web Application Development Department',
                            children: [
                              {
                                key: '1-5',
                                label: '产品事业部1-5',
                                avatar:
                                  'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                                department:
                                  'Product Design & Development-Digital Development-Web Application Development Department',
                                children: [
                                  {
                                    key: '1-6',
                                    label: '产品事业部1-6',
                                    avatar:
                                      'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                                    department:
                                      'Product Design & Development-Digital Development-Web Application Development Department',
                                    children: [
                                      {
                                        key: '1-7',
                                        label: '产品事业部1-7',
                                        avatar:
                                          'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                                        department:
                                          'Product Design & Development-Digital Development-Web Application Development Department',
                                        children: [
                                          {
                                            key: '1-8',
                                            label: '产品事业部1-8',
                                            avatar:
                                              'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
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
              'https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
            department:
              'Product Design & Development-Digital Development-Web Application Development Department',
            children: [
              {
                key: '2-1',
                label: 'Brooklyn Simmons 王磊2-1',
                avatar:
                  'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                department:
                  'Product Design & Development-Digital Development-Web Application Development Department',
              },
            ],
          },
          {
            key: 3,
            label: '研发部门',
            avatar:
              'https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
            department:
              'Product Design & Development-Digital Development-Web Application Development Department',
            children: [
              {
                key: '3-1',
                label: 'Brooklyn Simmons 王磊3-1',
                avatar:
                  'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
                department:
                  'Product Design & Development-Digital Development-Web Application Development Department',
              },
            ],
          },
          {
            key: 222222,
            label: '研发部门1',
            avatar:
              'https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
            department:
              'Product Design & Development-Digital Development-Web Application Development Department',
            children: [],
          },
          {
            key: 3111,
            label: '研发部门222',
            avatar:
              'https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
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
  components: { IconLogo },
  setup() {
    const data = ref(originData);
    const dataModel = ref([]);
    const searchInput = ref('');
    const handleFlatTree = (treeArr: Array<any> | undefined, children = 'children') => {
      if (treeArr === undefined) return [];
      let result: Array<any> = [];
      for (const item of treeArr) {
        if (item[children]) {
          result = result.concat(handleFlatTree(item[children], children));
        }
        result.push(item);
      }
      return result;
    };
    const handleSearch = (e: KeyboardEvent) => {
      data.value = handleFlatTree(originData).filter(item => {
        return item.label.toLowerCase().includes(e?.target?.value);
      });
    };
    const checkedDataTxt = computed(() => {
      const peopleArr = handleFlatTree(originData).filter(
        item => dataModel.value.includes(item.key) && !item.children,
      );
      const departArr = handleFlatTree(originData).filter(
        item => dataModel.value.includes(item.key) && item.children,
      );
      if (!peopleArr.length && !departArr.length) return `0`;

      return departArr.length && peopleArr.length
        ? `${peopleArr.length} 人、${departArr.length} 组`
        : peopleArr.length
        ? `${peopleArr.length} 人`
        : `${departArr.length} 组`;
    });
    const handleClear = () => {
      dataModel.value = [];
    };
    return {
      data,
      dataModel,
      searchInput,
      handleSearch,
      handleClear,
      checkedDataTxt,
    };
  },
});
</script>
