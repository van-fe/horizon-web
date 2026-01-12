<template>
  <h-transfer
    v-model="dataModel"
    :data="data"
    :titles="['']"
    :props="{ label: 'name' }"
    style="width: 600px"
  >
    <template #leftFilter>
      <div class="transfer-radio__filter">
        <h-input v-model="searchInput"></h-input>
        <h-tabs v-model:active-key="tabActiveKey" class="transfer-radio__tab" size="small">
          <h-tab key="colleague" label="同事联系人" />
          <h-tab key="user" label="用户联系人" />
        </h-tabs>
      </div>
    </template>
    <template #leftBody="{ data }">
      <div class="transfer-radio__left">
        <div v-for="item in data" :key="item.key" class="transfer-radio__item">
          <h-radio
            v-model="radioModelValue"
            :value="item.key"
            :disabled="item.disabled"
            @change="changeSelect"
          >
            <div class="flex align-center">
              <h-avatar size="small" :src="item.avatar" />
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
          </h-radio>
        </div>
      </div>
    </template>
    <template #item="{ item }">
      <div class="flex align-center">
        <h-avatar size="small" :src="item.avatar" />
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
    <template #rightHeader>
      <div class="flex flex-1 align-center justify-space-between">
        <div>{{ `已选: ${dataModel.length} 人` }}</div>
        <h-button
          v-show="!!dataModel.length"
          size="medium"
          :link="true"
          :active="true"
          @click="() => (dataModel = [])"
        >
          清除
        </h-button>
      </div>
    </template>
  </h-transfer>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue';
const dataMap = reactive({
  user: [
    {
      key: 10,
      name: 'Arooklyn Simmons 用户',
      avatar: 'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
    {
      key: 11,
      name: 'Brooklyn Simmons 用户2',
      avatar: 'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
    {
      key: 12,
      name: 'Crooklyn Simmons 用户3',
      avatar: 'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
    {
      key: 13,
      name: 'Drooklyn Simmons 用户4',
      avatar: 'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
    {
      key: 14,
      name: 'Erooklyn Simmons 用户5',
      avatar: 'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
  ],
  colleague: [
    {
      key: 101,
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
  ],
});
const data = ref([]);
const searchInput = ref();
const tabActiveKey = ref('colleague');
watchEffect(() => {
  data.value = dataMap[tabActiveKey.value].filter(
    item => !searchInput.value || item.name.includes(searchInput.value),
  );
});

const dataModel = ref([]);
const radioModelValue = ref(3);
watchEffect(() => {
  radioModelValue.value = dataModel.value[0];
});
const changeSelect = v => {
  dataModel.value = [v];
};
</script>
<style lang="scss" scoped>
.transfer-radio {
  &__filter {
    padding: 16px 20px 0;
  }
  &__tab {
    padding-top: 16px;
  }
  &__left {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__item {
    padding: 8px 20px;
    box-sizing: border-box;
    &:first-child {
      padding-top: 0;
    }
    :deep(.h-radio) {
      width: 100%;
      overflow: hidden;
    }
    :deep(.h-radio__label) {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
