import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Transfer.md","filePath":"en/demos/components/Transfer.md"}');
const _sfc_main = { name: "en/demos/components/Transfer.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Transfer</h1><p class="description">[//]: # (## Table)</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-transfer v-model="dataModel" :filterable="false" :data="data" show-control style="width: 500px"></h-transfer>\n</template>\n\n<script lang="ts">\nimport { defineComponent, ref } from \'vue\';\nexport default defineComponent({\n  setup() {\n    const data = ref<any[]>([]);\n    for (let i = 1; i <= 5; i++) {\n      data.value.push({\n        key: i,\n        label: i == 3 ? `选项${i}被禁用了` : `选项名称 ${i}`,\n        disabled: i == 3,\n      });\n    }\n    const dataModel = ref([3]);\n    return {\n      data,\n      dataModel,\n    };\n  },\n});\n<\/script>\n',
    path: "demos/components/Transfer/basic.vue"
  }, null, _parent));
  _push(`<h2 id="category" tabindex="-1">Category <a class="header-anchor" href="#category" aria-label="Permalink to &quot;Category&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-transfer v-model="dataModel" :data="data" style="width: 500px"></h-transfer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const data = ref([
      {
        key: 0,
        label: '分类标题A',
        isGroup: true,
      },
      {
        key: 1,
        label: 'A-1',
      },
      {
        key: 2,
        label: 'A-2',
      },
      {
        key: 3,
        label: '分类标题B',
        isGroup: true,
      },
      {
        key: 4,
        label: 'B-1',
      },
      {
        key: 5,
        label: 'B-2',
      },
    ]);
    const dataModel = ref([1, 4]);
    return {
      data,
      dataModel,
    };
  },
});
<\/script>
`,
    path: "demos/components/Transfer/group.vue"
  }, null, _parent));
  _push(`<h2 id="single-selection" tabindex="-1">Single Selection <a class="header-anchor" href="#single-selection" aria-label="Permalink to &quot;Single Selection&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
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
        <div>{{ \`已选: \${dataModel.length} 人\` }}</div>
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
      avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
    {
      key: 11,
      name: 'Brooklyn Simmons 用户2',
      avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
    {
      key: 12,
      name: 'Crooklyn Simmons 用户3',
      avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
    {
      key: 13,
      name: 'Drooklyn Simmons 用户4',
      avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
    {
      key: 14,
      name: 'Erooklyn Simmons 用户5',
      avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
  ],
  colleague: [
    {
      key: 101,
      name: 'Arooklyn Simmons 王磊',
      avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
    {
      key: 1,
      name: 'Brooklyn Simmons 王磊2',
      avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
    {
      key: 2,
      name: 'Crooklyn Simmons 王磊3',
      avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
    {
      key: 3,
      name: 'Drooklyn Simmons 王磊4',
      avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      department:
        'Product Design & Development-Digital Development-Web Application Development Department',
    },
    {
      key: 4,
      name: 'Erooklyn Simmons 王磊5',
      avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
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
<\/script>
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
`,
    path: "demos/components/Transfer/radio.vue"
  }, null, _parent));
  _push(`<h2 id="select-people" tabindex="-1">Select People <a class="header-anchor" href="#select-people" aria-label="Permalink to &quot;Select People&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-transfer
    v-model="dataModel"
    :data="filterModel"
    :filterable="handleSearch"
    :props="{ label: 'name' }"
    :titles="['']"
    style="width: 600px"
  >
    <template #rightHeader>
      <div class="flex flex-1 align-center justify-space-between">
        <div>{{ \`已选: \${dataModel.length} 人\` }}</div>
        <h-button v-show="!!dataModel.length" size="medium" :text="true" @click="handleClear">
          清除
        </h-button>
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
  </h-transfer>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
const originData = [
  {
    key: 0,
    name: 'Arooklyn Simmons 王磊',
    avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
    department:
      'Product Design & Development-Digital Development-Web Application Development Department',
  },
  {
    key: 1,
    name: 'Brooklyn Simmons 王磊2',
    avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
    department:
      'Product Design & Development-Digital Development-Web Application Development Department',
  },
  {
    key: 2,
    name: 'Crooklyn Simmons 王磊3',
    avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
    department:
      'Product Design & Development-Digital Development-Web Application Development Department',
  },
  {
    key: 3,
    name: 'Drooklyn Simmons 王磊4',
    avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
    department:
      'Product Design & Development-Digital Development-Web Application Development Department',
  },
  {
    key: 4,
    name: 'Erooklyn Simmons 王磊5',
    avatar: 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
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
const indeterminate = computed(() => {
  return dataModel.value.length > 0 && dataModel.value.length < filterModel.value.length;
});
watchEffect(() => {
  checkedAll.value = dataModel.value.length === filterModel.value.length;
});
const handleCheckedAll = (isCheckedAll: any) => {
  if (isCheckedAll) {
    dataModel.value = filterModel.value.map(item => item.key);
  } else {
    dataModel.value = [];
  }
};
const handleClear = () => {
  dataModel.value = [];
};
<\/script>
<style>
.all-check {
  display: flex;
  padding: 0 19px;
  margin-top: 24px;
  margin-bottom: 8px;
}
</style>
`,
    path: "demos/components/Transfer/people.vue"
  }, null, _parent));
  _push(`<h2 id="select-organization-structure" tabindex="-1">Select Organization Structure <a class="header-anchor" href="#select-organization-structure" aria-label="Permalink to &quot;Select Organization Structure&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
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
      if (!peopleArr.length && !departArr.length) return \`0\`;

      return departArr.length && peopleArr.length
        ? \`\${peopleArr.length} 人、\${departArr.length} 组\`
        : peopleArr.length
        ? \`\${peopleArr.length} 人\`
        : \`\${departArr.length} 组\`;
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
<\/script>
`,
    path: "demos/components/Transfer/tree.vue"
  }, null, _parent));
  _push(`<h2 id="draggable" tabindex="-1">Draggable <a class="header-anchor" href="#draggable" aria-label="Permalink to &quot;Draggable&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-transfer v-model="dataModel" :data="data" draggable style="width: 500px"></h-transfer>\n</template>\n\n<script lang="ts">\nimport { defineComponent, ref } from \'vue\';\nexport default defineComponent({\n  setup() {\n    const data = ref([]);\n    for (let i = 1; i <= 5; i++) {\n      data.value.push({\n        key: i,\n        label: `选项名称 ${i}`,\n      });\n    }\n    const dataModel = ref([]);\n    return {\n      data,\n      dataModel,\n    };\n  },\n});\n<\/script>\n',
    path: "demos/components/Transfer/drag.vue"
  }, null, _parent));
  _push(`<h2>Transfer Api</h2><h3>Transfer Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">data</td><td>Transfer 的数据源</td><td><code>TransferDataProps[]</code></td><td class="text-center">Yes</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>绑定的key值</td><td><code>CheckboxUnionType[]</code></td><td class="text-center">No</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "" }, null, _parent));
  _push(`</td><td>Type</td><td><code>&#39;normal&#39; | &#39;work&#39; | &#39;table&#39;</code></td><td class="text-center">No</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">titles</td><td>自定义列表标题</td><td><code>string[]</code></td><td class="text-center">No</td><td>() =&gt; [&#39;全选&#39;, &#39;&#39;]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filterable</td><td>展示搜索框</td><td><code>boolean | ((value: string, item: TransferDataProps) =&gt; boolean)</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placeholder</td><td>搜索框占位符</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-method</td><td>自定义搜索方法</td><td><code>(inputValue: string, item: TransferDataProps) =&gt; boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">props</td><td>数据源的字段别名</td><td><code>Partial&lt;Record&lt;keyof TransferDataProps, keyof TransferDataProps | string&gt;&gt;</code></td><td class="text-center">No</td><td>() =&gt; {<br>      return {<br>        key: &#39;key&#39;,<br>        label: &#39;label&#39;,<br>        disabled: &#39;disabled&#39;,<br>        checked: &#39;checked&#39;,<br>        children: &#39;children&#39;,<br>        isGroup: &#39;isGroup&#39;,<br>      };<br>    }</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-txt</td><td>空数据文本</td><td><code>string[]</code></td><td class="text-center">No</td><td>[&#39;暂无数据&#39;, &#39;暂无数据&#39;]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">breadcrumb</td><td>面包屑默认标题</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;HIO&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target-order</td><td>右侧列表元素的排序策略: 若为 original，则保持与数据源相同的顺序； 若为 push，则新加入的元素排在最后； 若为 unshift，则新加入的元素排在最前</td><td><code>&#39;original&#39; | &#39;push&#39; | &#39;unshift&#39;</code></td><td class="text-center">No</td><td>&#39;push&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">field-map</td><td>options 字段映射，给定一个字段映射规则以达到在 option 中覆盖默认指定字段名称的目的</td><td><code>Partial&lt;Record&lt;keyof TransferDataProps, keyof TransferDataProps | string&gt;&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>是否可拖拽</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">on-drag-over</td><td>节点被拖拽至可释放目标上时的回调</td><td><code>(e: DragEvent, item: TransferDataProps) =&gt; void</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">on-drag-start</td><td>节点开始拖拽的回调</td><td><code>(e: DragEvent, item: TransferDataProps) =&gt; void</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">on-drag-end</td><td>节点结束拖拽的回调</td><td><code>(e: DragEvent, item: TransferDataProps) =&gt; void</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">on-drag-leave</td><td>节点离开可释放目标上时的回调</td><td><code>(e: DragEvent, item: TransferDataProps) =&gt; void</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">on-drop</td><td>节点在可释放目标上释放时的回调</td><td><code>(e: DragEvent, dropItem: TransferDataProps, dragItem: TransferDataProps) =&gt; void</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">work-input-fn`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>filterable</code>" }, null, _parent));
  _push(`</td><td>workType输入回调，具有过滤功能</td><td><code>(item: any, input: string) =&gt; boolean</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3>Transfer Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="3">选项在两栏之间转移时触发</td><td rowspan="3">( targetKeys: <code>CheckboxUnionType[]</code>, direction: <code>&#39;left&#39; | &#39;right&#39;</code>, moveKeys: <code>CheckboxUnionType[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">targetKeys</td><td><code>CheckboxUnionType[]</code></td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">direction</td><td><code>&#39;left&#39; | &#39;right&#39;</code></td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">moveKeys</td><td><code>CheckboxUnionType[]</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">left-check-change</td><td rowspan="1">left栏选中项发生变化时触发</td><td rowspan="1">( value: <code>CheckboxUnionType[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>CheckboxUnionType[]</code></td><td>选中key值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">right-check-change</td><td rowspan="1">right栏选中项发生变化时触发</td><td rowspan="1">( value: <code>CheckboxUnionType[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>CheckboxUnionType[]</code></td><td>选中key值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">search</td><td rowspan="1">搜索框内容时改变时触发</td><td rowspan="1">( value: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string</code></td><td>搜索框内容</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Transfer.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Transfer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Transfer as default
};
