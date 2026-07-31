import { resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Table.md","filePath":"zh/demos/components/Table.md"}');
const _sfc_main = { name: "demos/components/Table.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_h_alert = resolveComponent("h-alert");
  const _component_code_block = resolveComponent("code-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Table</h1><p class="description">用行与列的形式，展示结构化数据展示的组件；常和按钮、搜索、筛选、分页等其他界面组件一起协同</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2><p>与传统 <code>vue</code> 表格组件一致，给 <code>h-table</code> 传入 <code>data</code> 即表格数据；给 <code>h-table-column</code> 传入 <code>title</code> 作为标题，<code>field</code> 作为表格数据中每行摘取的数据</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data">
    <h-table-column title="Name" field="name" />
    <h-table-column title="Age" field="age" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TableData {
  name: string;
  age: number;
  address: string;
}

const data = ref<TableData[]>([
  {name: 'Jon', age: 32, address: 'Shanghai'},
  {name: 'Jacob', age: 16, address: 'Shenzhen'},
  {name: 'Wang', age: 22, address: 'Hangzhou'},
  {name: 'Alice', age: 26, address: 'Beijing'},
]);
<\/script>
`,
    path: "demos/components/Table/basic.vue"
  }, null, _parent));
  _push(`<h2 id="尺寸" tabindex="-1">尺寸 <a class="header-anchor" href="#尺寸" aria-label="Permalink to &quot;尺寸&quot;">​</a></h2><p>组件支持 <code>mini</code> <code>small</code> <code>medium</code> <code>large</code> 四个尺寸</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio label="mini"></h-radio>
        <h-radio label="small"></h-radio>
        <h-radio label="medium"></h-radio>
        <h-radio label="large"></h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-table :data="data" :size="size">
    <h-table-column title="Name" field="name" />
    <h-table-column title="Age" field="age" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TableData {
  name: string;
  age: number;
  address: string;
}

const size = ref('medium');

const data = ref<TableData[]>([
  {name: 'Jon', age: 32, address: 'Shanghai'},
  {name: 'Jacob', age: 16, address: 'Shenzhen'},
  {name: 'Wang', age: 22, address: 'Hangzhou'},
  {name: 'Alice', age: 26, address: 'Beijing'},
]);
<\/script>
`,
    path: "demos/components/Table/size.vue"
  }, null, _parent));
  _push(`<h2 id="边框" tabindex="-1">边框 <a class="header-anchor" href="#边框" aria-label="Permalink to &quot;边框&quot;">​</a></h2><p>设置 <code>:border=&quot;true&quot;</code> 开启全边框，缩减空间后仍能区分不同的元素，有较强的信息对比性</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" :border="true">
    <h-table-column title="Name" field="name" />
    <h-table-column title="Age" field="age" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TableData {
  name: string;
  age: number;
  address: string;
}

const data = ref<TableData[]>([
  {name: 'Jon', age: 32, address: 'Shanghai'},
  {name: 'Jacob', age: 16, address: 'Shenzhen'},
  {name: 'Wang', age: 22, address: 'Hangzhou'},
  {name: 'Alice', age: 26, address: 'Beijing'},
]);
<\/script>
`,
    path: "demos/components/Table/border.vue"
  }, null, _parent));
  _push(`<h2 id="斑马纹" tabindex="-1">斑马纹 <a class="header-anchor" href="#斑马纹" aria-label="Permalink to &quot;斑马纹&quot;">​</a></h2><p>设置 <code>:stripe=&quot;true&quot;</code> 开启斑马纹，以用来引导用户的视线，避免在阅读时出现错行、迷失的情况</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" :stripe="true">
    <h-table-column title="Name" field="name" />
    <h-table-column title="Age" field="age" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TableData {
  name: string;
  age: number;
  address: string;
}

const data = ref<TableData[]>([
  {name: 'Jon', age: 32, address: 'Shanghai'},
  {name: 'Jacob', age: 16, address: 'Shenzhen'},
  {name: 'Wang', age: 22, address: 'Hangzhou'},
  {name: 'Alice', age: 26, address: 'Beijing'},
]);
<\/script>
`,
    path: "demos/components/Table/stripe.vue"
  }, null, _parent));
  _push(`<h2 id="状态表格" tabindex="-1">状态表格 <a class="header-anchor" href="#状态表格" aria-label="Permalink to &quot;状态表格&quot;">​</a></h2><p>设置 <code>row-class-name</code>，可以将设定行给予自定义高亮颜色</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" :row-class-name="rowClassNameSet">
    <h-table-column title="Name" field="name" />
    <h-table-column title="Age" field="age" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TableData {
  name: string;
  age: number;
  address: string;
}

const data = ref<TableData[]>([
  {name: 'Jon', age: 32, address: 'Shanghai'},
  {name: 'Wang', age: 22, address: 'Hangzhou'},
  {name: 'Jacob', age: 16, address: 'Shenzhen'},
  {name: 'Alice', age: 26, address: 'Beijing'},
]);

function rowClassNameSet(row: TableData) {
  if (row.age >= 25) {
    return 'bg-weak-success';
  }
  
  if (row.age < 18) {
    return 'bg-weak-error';
  }
}
<\/script>

<style>
.bg-weak-success {
  background: var(--h-bg-success-weak-activated);
}

.bg-weak-error {
  background: var(--h-bg-error-weak-activated);
}
</style>`,
    path: "demos/components/Table/row-class-name.vue"
  }, null, _parent));
  _push(`<h2 id="溢出显示提示" tabindex="-1">溢出显示提示 <a class="header-anchor" href="#溢出显示提示" aria-label="Permalink to &quot;溢出显示提示&quot;">​</a></h2><p>如果内容太长会将内容换行。但希望不换行并保持一行显示，除了设定宽度，也可以设置 <code>show-overflow-tooltip</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data">
    <h-table-column title="Name" field="name" />
    <h-table-column title="Birthday" field="birthday" width="100px" />
    <h-table-column title="Address" field="address" :show-overflow-tooltip="true" width="100px" />
    <h-table-column title="Message" field="message" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  name: string;
  birthday: string;
  address: string;
  message: string;
}

const data = ref<TableData[]>(new Array(5).fill(0).map(_ => ({
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: faker.location.streetAddress(),
  message: faker.hacker.phrase(),
})));
<\/script>
`,
    path: "demos/components/Table/show-overflow-tooltip.vue"
  }, null, _parent));
  _push(`<h2 id="固定表头" tabindex="-1">固定表头 <a class="header-anchor" href="#固定表头" aria-label="Permalink to &quot;固定表头&quot;">​</a></h2><p>如果表格条目过多，可以设置 <code>height | maxHeight</code> 来控制表格高度，从而使表头固定</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" height="300px">
    <h-table-column title="Name" field="name" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
    <h-table-column title="Message" field="message" show-overflow-tooltip max-width="300" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  name: string;
  birthday: string;
  address: string;
  message: string;
}

const data = ref<TableData[]>(new Array(20).fill(0).map(_ => ({
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: faker.location.streetAddress(),
  message: faker.hacker.phrase(),
})));
<\/script>
`,
    path: "demos/components/Table/height.vue"
  }, null, _parent));
  _push(`<h2 id="表头吸顶" tabindex="-1">表头吸顶 <a class="header-anchor" href="#表头吸顶" aria-label="Permalink to &quot;表头吸顶&quot;">​</a></h2><p>可以配置 <code>header-sticky</code> 开启表头吸顶，与普通模式下不同的是，此配置可以使表头在自定义的滚动容器内吸顶展示</p><p>滚动容器默认是父级容器，如果不是父级，则可以配置 <code>header-sticky-container</code> 来指定容器</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" height="300px" header-sticky header-sticky-container=".VPDoc">
    <h-table-column title="Name" field="name" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
    <h-table-column title="Message" field="message" show-overflow-tooltip max-width="300" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  name: string;
  birthday: string;
  address: string;
  message: string;
}

const data = ref<TableData[]>(new Array(20).fill(0).map(_ => ({
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: faker.location.streetAddress(),
  message: faker.hacker.phrase(),
})));
<\/script>
`,
    path: "demos/components/Table/header-sticky.vue"
  }, null, _parent));
  _push(`<h2 id="固定列" tabindex="-1">固定列 <a class="header-anchor" href="#固定列" aria-label="Permalink to &quot;固定列&quot;">​</a></h2><p>为 <code>h-table-column</code> 设置 <code>fixed</code> 即可</p><p>可选参数是 <code>true</code> <code>&#39;left&#39;</code> <code>&#39;right&#39;</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" header-sticky header-sticky-container=".VPDoc">
    <h-table-column title="Seq" type="index" :fixed="true" />
    <h-table-column title="Name" field="name" fixed />
    <h-table-column title="Birthday" field="birthday" min-width="200px" />
    <h-table-column title="Address" field="address" min-width="500px" />
    <h-table-column title="Message" field="message" show-overflow-tooltip width="800px" />
    <h-table-column title="Operations" fixed="right" min-width="120px" align="center" header-align="center">
      <template #default="scope">
        <h-button link size="small" @click="view(scope.row)">View</h-button>
        <h-button link size="small" @click="edit(scope.row)">Edit</h-button>
      </template>
    </h-table-column>
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  name: string;
  birthday: string;
  address: string;
  message: string;
}

const data = ref<TableData[]>(new Array(5).fill(0).map(_ => ({
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: faker.location.streetAddress(),
  message: faker.hacker.phrase(),
})));

function view(data: TableData) {
  console.info('view:', data.name);
}

function edit(data: TableData) {
  console.info('edit:', data.name);
}
<\/script>
`,
    path: "demos/components/Table/fixed.vue"
  }, null, _parent));
  _push(`<h2 id="拖拽列宽" tabindex="-1">拖拽列宽 <a class="header-anchor" href="#拖拽列宽" aria-label="Permalink to &quot;拖拽列宽&quot;">​</a></h2><p>为需要调整宽度的列设置 <code>resizable</code>，拖动表头右侧分隔线即可修改列宽</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-switch
    v-model="showHeaderDivider"
    class="mb-2"
    status
    status-on-text="Shown Header Divider"
    status-off-text="Hidden Header Divider"
  />

  <h-table :data="data" :show-header-divider="showHeaderDivider">
    <h-table-column title="Seq" type="index" :fixed="true" :resizable="false" />
    <h-table-column title="Name" field="name" fixed resizable />
    <h-table-column title="Birthday" field="birthday" width="200px" resizable show-overflow-tooltip />
    <h-table-column title="Address" field="address" min-width="500px" resizable />
    <h-table-column title="Message" field="message" show-overflow-tooltip width="800px" />
    <h-table-column title="Operations" fixed="right" min-width="120px" align="center" header-align="center" resizable>
      <template #default="scope">
        <h-button link size="small" @click="view(scope.row)">View</h-button>
        <h-button link size="small" @click="edit(scope.row)">Edit</h-button>
      </template>
    </h-table-column>
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  name: string;
  birthday: string;
  address: string;
  message: string;
}

const showHeaderDivider = ref(true);

const data = ref<TableData[]>(new Array(5).fill(0).map(_ => ({
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: faker.location.streetAddress(),
  message: faker.hacker.phrase(),
})));

function view(data: TableData) {
  console.info('view:', data.name);
}

function edit(data: TableData) {
  console.info('edit:', data.name);
}
<\/script>
`,
    path: "demos/components/Table/resizable.vue"
  }, null, _parent));
  _push(`<h2 id="拖拽排序" tabindex="-1">拖拽排序 <a class="header-anchor" href="#拖拽排序" aria-label="Permalink to &quot;拖拽排序&quot;">​</a></h2><p>为列设置 <code>draggable</code> 可以拖动表头调整同级列顺序；添加 <code>type=&quot;drag&quot;</code> 的列则可以拖动手柄调整同级行顺序</p><p>行拖拽通过 <code>v-model:data</code> 回写数据。树形表格只允许节点在同一个父节点下排序</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table v-model:data="data" row-key="id">
    <h-table-column type="drag" width="44" />
    <h-table-column title="ID" field="id" width="80" draggable />
    <h-table-column title="Name" field="name" draggable />
    <h-table-column title="Role" field="role" draggable />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  { id: 1, name: 'Alice', role: 'Designer' },
  { id: 2, name: 'Bob', role: 'Engineer' },
  { id: 3, name: 'Carol', role: 'Product manager' },
]);
<\/script>
`,
    path: "demos/components/Table/draggable.vue"
  }, null, _parent));
  _push(`<h2 id="流体高度" tabindex="-1">流体高度 <a class="header-anchor" href="#流体高度" aria-label="Permalink to &quot;流体高度&quot;">​</a></h2><p>当数据量是动态变化时，可以设置 <code>max-height</code>，当表格高度超出 <code>max-height</code> 后，会显示滚动条</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button class="mb-2" @click="insertData()">Increase Data</h-button>
  <h-table :data="data" :max-height="300">
    <h-table-column title="Seq" type="index" :fixed="true" />
    <h-table-column title="Name" field="name" fixed />
    <h-table-column title="Birthday" field="birthday" min-width="200px" />
    <h-table-column title="Address" field="address" min-width="500px" />
    <h-table-column title="Message" field="message" show-overflow-tooltip width="800px" />
    <h-table-column title="Operations" fixed="right" min-width="120px" align="center" header-align="center">
      <template #default="scope">
        <h-button link size="small" @click="view(scope.row)">View</h-button>
        <h-button link size="small" @click="edit(scope.row)">Edit</h-button>
      </template>
    </h-table-column>
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  name: string;
  birthday: string;
  address: string;
  message: string;
}


const data = ref<TableData[]>([]);

function insertData(amount = 1) {
  data.value.push(...(new Array(amount).fill(0).map(_ => ({
    name: faker.person.fullName(),
    birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
    address: faker.location.streetAddress(),
    message: faker.hacker.phrase(),
  }))));
}

insertData(2);

function view(data: TableData) {
  console.info('view:', data.name);
}

function edit(data: TableData) {
  console.info('edit:', data.name);
}
<\/script>
`,
    path: "demos/components/Table/max-height.vue"
  }, null, _parent));
  _push(`<h2 id="多级表头" tabindex="-1">多级表头 <a class="header-anchor" href="#多级表头" aria-label="Permalink to &quot;多级表头&quot;">​</a></h2><p>在 <code>h-table-column</code> 组件中套入 <code>h-table-column</code>，即可将子项纳入父级，实现多级表头</p><p>使用多级表头时，自动启用全边框样式，且无法更改</p><p>另外，子项的 <code>fixed</code> 的值会直接使用父级的 <code>fixed</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" max-height="300">
    <h-table-column title="Name" field="name" fixed />
    <h-table-column title="Birthday" field="birthday" min-width="150" align="center" />
    <h-table-column title="Address" field="address" fixed>
      <h-table-column title="Country" field="address[0]" :show-overflow-tooltip="true" width="120px" />
      <h-table-column title="State" field="address[1]" :show-overflow-tooltip="true" width="120px" />
      <h-table-column title="City" field="address[2]" :show-overflow-tooltip="true" width="120px" />
    </h-table-column>
    <h-table-column title="sign">
      <h-table-column v-for="day of 30" :key="day" :title="day" header-align="center" width="40px">
        <template #default="scope">
          <IconCheck v-if="scope.row.sign?.[day - 1]" />
          <IconClose v-else />
        </template>
      </h-table-column>
    </h-table-column>
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconCheck, IconClose } from '@aurora/icon';
import { faker } from '@faker-js/faker';

interface TableData {
  name: string;
  birthday: string;
  address: [string, string, string];
  sign: boolean[];
}

const data = ref<TableData[]>(new Array(20).fill(0).map(() => ({
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: [faker.location.country(), faker.location.state(), faker.location.city()],
  sign: (new Array(30).fill(0).map(() => faker.datatype.boolean())),
})));
<\/script>
`,
    path: "demos/components/Table/multiple-header.vue"
  }, null, _parent));
  _push(`<h2 id="列管理" tabindex="-1">列管理 <a class="header-anchor" href="#列管理" aria-label="Permalink to &quot;列管理&quot;">​</a></h2><p>开启 <code>use-column-manager</code>，可以开启列管理</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-switch
    v-model="useColumnManager"
    class="mb-2"
    :status="true"
    status-on-text="Enabled Column Manager"
    status-off-text="Disabled Column Manager"
  />

  <h-table :data="data" max-height="300" :use-column-manager="useColumnManager">
    <h-table-column title="Name" field="name" fixed lock-position lock-visible lock-fixed />
    <h-table-column title="Birthday" field="birthday" min-width="150" align="center" />
    <h-table-column title="Address" field="address" fixed lock-visible>
      <h-table-column title="Country" field="address[0]" :show-overflow-tooltip="true" width="120px" />
      <h-table-column title="State" field="address[1]" :show-overflow-tooltip="true" width="120px" />
      <h-table-column title="City" field="address[2]" :show-overflow-tooltip="true" width="120px" />
    </h-table-column>
    <h-table-column title="sign">
      <h-table-column v-for="day of 30" :key="day" :title="day" header-align="center" width="40px">
        <template #default="scope">
          <IconCheck v-if="scope.row.sign?.[day - 1]" />
          <IconClose v-else />
        </template>
      </h-table-column>
    </h-table-column>
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconCheck, IconClose } from '@aurora/icon';
import { faker } from '@faker-js/faker';

interface TableData {
  name: string;
  birthday: string;
  address: [string, string, string];
  sign: boolean[];
}

const useColumnManager = ref(true);

const data = ref<TableData[]>(new Array(20).fill(0).map(() => ({
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: [faker.location.country(), faker.location.state(), faker.location.city()],
  sign: (new Array(30).fill(0).map(() => faker.datatype.boolean())),
})));
<\/script>
`,
    path: "demos/components/Table/use-column-manager.vue"
  }, null, _parent));
  _push(`<h2 id="单选" tabindex="-1">单选 <a class="header-anchor" href="#单选" aria-label="Permalink to &quot;单选&quot;">​</a></h2><p>为 <code>h-table-column</code> 设置 <code>type = &quot;selection&quot;</code> 即可开启单选列</p><p>为了方便设置和理解，请将每一列理解为一个独立的表单元素</p><p>如果不做双向绑定，则在点击选择器时将不会有选中效果</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <p>current picked index: {{ checkedRow }}</p>
  <p>
    indexes 3 and 4 are disabled by
    <code>selectable</code>
  </p>

  <h-table :data="data" height="300px">
    <h-table-column
      ref="selectionColumnDomRef"
      v-model:selected-keys="checkedRow"
      type="selection"
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
      <h-button plain @click="() => setSelected(true)">toggle index = 4 ignore selectable</h-button>
      <h-button plain @click="() => setSelected()">toggle index = 4 consider selectable</h-button>
    </p>
    <p>
      <h-button plain @click="getSelected">get selected</h-button>
    </p>
    <p>
      <h-button plain @click="() => clearSelection(true)">
        clear selection ignore selectable
      </h-button>
      <h-button plain @click="() => clearSelection()">clear selection consider selectable</h-button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import { HTableColumn, type TableColumnExposes } from '@aurora/horizon-web';
import type { HorizonWebComponentInstance } from '@aurora/utils';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  address: string;
  selectable: boolean;
}

const selectionColumnDomRef =
  ref<HorizonWebComponentInstance<typeof HTableColumn, TableColumnExposes>>();
const checkedRow = ref();

const data = ref<TableData[]>(
  new Array(20).fill(0).map((_, index) => ({
    id: index,
    name: faker.person.fullName(),
    birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
    address: faker.location.streetAddress(),
    selectable: ![3, 4].includes(index),
  })),
);

function isSelectable(rowData: TableData) {
  return rowData.selectable;
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
<\/script>
`,
    path: "demos/components/Table/single.vue"
  }, null, _parent));
  _push(`<h2 id="多选" tabindex="-1">多选 <a class="header-anchor" href="#多选" aria-label="Permalink to &quot;多选&quot;">​</a></h2><p>为 <code>h-table-column</code> 设置 <code>type = &quot;selection&quot;</code> <code>multiple = true</code> 即可开启多选列</p><p>为了方便设置和理解，请将每一列理解为一个独立的表单元素</p><p>如果不做双向绑定，则在点击选择器时将不会有选中效果</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
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
<\/script>
`,
    path: "demos/components/Table/multiple.vue"
  }, null, _parent));
  _push(`<h2 id="列提示" tabindex="-1">列提示 <a class="header-anchor" href="#列提示" aria-label="Permalink to &quot;列提示&quot;">​</a></h2><p>如果需要对列提示，则给予 <code>h-table-column</code> 设置 <code>tip</code> 即可</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data">
    <h-table-column title="Name" field="name" tip="Without family name" />
    <h-table-column title="Age" field="age" tip="The people's age" />
    <h-table-column title="Location" field="location" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TableData {
  name: string;
  age: number;
  location: string;
}

const data = ref<TableData[]>([
  {name: 'Jon', age: 32, location: 'Shanghai'},
  {name: 'Jacob', age: 16, location: 'Shenzhen'},
  {name: 'Guang', age: 22, location: 'Hangzhou'},
  {name: 'Alice', age: 26, location: 'Beijing'},
]);
<\/script>
`,
    path: "demos/components/Table/tip.vue"
  }, null, _parent));
  _push(`<h2 id="排序" tabindex="-1">排序 <a class="header-anchor" href="#排序" aria-label="Permalink to &quot;排序&quot;">​</a></h2><p>对需要排序的列设置 <code>sortable</code> 即可开启排序</p><p><code>table</code> 内置了排序功能，使用默认的 <code>Array.prototype.sort</code> 排序方式</p><p>如果排序有特殊需求（例如数字、日期），则可以传入 <code>sort-method</code> 自定义前端排序能力</p><p>如果希望多列同时排序，则按下 <code>ctrl/command</code> 的同时点击排序图标</p><p>你也可以设置使用接口排序，既可以对 <code>table</code> 监听 <code>sort-change</code>，可以对 <code>column</code> 监听 <code>sort-change</code>，回调后更改 <code>data</code> 的顺序即可</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" height="300px" :loading="isLoading" @sort-change="onSortChange">
    <h-table-column title="ID" field="id" width="80" sortable :sort-method="numberSort" />
    <h-table-column title="Name" field="name" sortable />
    <h-table-column title="Gender" field="gender" sortable />
    <h-table-column title="Birthday" field="birthday" sortable sort-separate :sort-method="dateSort" />
    <h-table-column title="Address" field="address" sortable :use-built-in-sort="false" @sort-change="onColumnSortChange" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import { dayjs, HTableColumnData, HTableSortOrderEnum } from '@aurora/horizon-web';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
}

const isLoading = ref(false);

const data = ref<TableData[]>(new Array(20).fill(0).map((_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
})));

function numberSort(order: HTableSortOrderEnum) {
  return (a: TableData, b: TableData) => order === HTableSortOrderEnum.ASC ? a.id - b.id : b.id - a.id;
}

function dateSort(order: HTableSortOrderEnum) {
  return (a: TableData, b: TableData) => {
    const diff = dayjs(a.birthday).valueOf() - dayjs(b.birthday).valueOf();

    return order === HTableSortOrderEnum.ASC ? diff : -diff;
  };
}

function onSortChange(states: Array<{ column: HTableColumnData; order: HTableSortOrderEnum }>) {
  console.info('Table sort change', states);

  // You can sort by your self
}

function onColumnSortChange(order: HTableSortOrderEnum | null) {
  console.info('Column(Address) sort change:', order);
  isLoading.value = true;

  setTimeout(() => {
    data.value = order === null ? data.value.sort(numberSort(HTableSortOrderEnum.ASC)) : data.value.sort((a, b) => order === HTableSortOrderEnum.ASC ? a.address.localeCompare(b.address) : b.address.localeCompare(a.address));
    isLoading.value = false;
  }, 2000);
}
<\/script>
`,
    path: "demos/components/Table/sort.vue"
  }, null, _parent));
  _push(`<h2 id="过滤" tabindex="-1">过滤 <a class="header-anchor" href="#过滤" aria-label="Permalink to &quot;过滤&quot;">​</a></h2><p>过滤有两种形式：</p><ol><li>提供可选项，以 <code>select</code> <code>date-picker</code> 等选择器组件的形式进行过滤</li><li>直接进行搜索，以 <code>input</code> 或 <code>input-number</code> 输入类组件形式搜索</li></ol><br><p>如果希望由接口过滤，则传入 <code>:use-built-in-filter=&quot;false&quot;</code>，并对 <code>column</code> 监听 <code>filter-change</code> 事件</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" height="300px" :loading="isLoading">
    <h-table-column title="Seq" type="index" width="80" fixed />
    <h-table-column title="Name" field="name" :filterable="true" />
    <h-table-column
      title="Register Date"
      field="registerDate"
      :filterable="true"
      filter-type="date-picker"
      tip="This column's data can be all formats that Dayjs can parse. If you have special format, you can set 'value-format' in 'filter-options'."
      :filter-options="{type: 'date-range', showNow: true}"
    />
    <h-table-column
      title="Register Time"
      field="registerTime"
      :filterable="true"
      filter-type="time-picker"
      tip="If you want to use time-picker component, you should give this column's data with HH:mm or HH:mm:ss format string"
      :filter-options="{type: 'time', isRange: true, showNow: true, panelMinWidth: 250, fitInputWidth: 'fit-content'}"
    />
    <h-table-column
      title="Country"
      field="country"
      :filterable="true"
      filter-type="select"
      show-overflow-tooltip
      width="200px"
      tip="Select filter will auto collect column's data to filter in multiple. If you have special options, you should give 'options' in 'filter-options'."
    />
    <h-table-column title="Address" field="address" :filterable="true" min-width="400" :use-built-in-filter="false" @filter-change="onFilterChange" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import { dayjs } from '@aurora/horizon-web';

interface TableData {
  id: number;
  name: string;
  registerDate: string;
  registerTime: string;
  country: string;
  address: string;
}

const isLoading = ref(false);

const originData: TableData[] = new Array(100).fill(0).map((_, index) => ({
  id: index,
  name: faker.person.fullName(),
  registerDate: faker.date.recent(180).toDateString(),
  registerTime: dayjs(faker.date.recent()).format('HH:mm:ss'),
  country: faker.location.country(),
  address: faker.location.streetAddress(),
}));

const data = ref<TableData[]>(originData);

function onFilterChange(str?: string) {
  isLoading.value = true;

  setTimeout(() => {
    data.value = str ? originData.filter((row) => row.address.includes(str)) : originData;
    isLoading.value = false;
  }, 2000);
}
<\/script>
`,
    path: "demos/components/Table/filter.vue"
  }, null, _parent));
  _push(`<h2 id="自定义列模板" tabindex="-1">自定义列模板 <a class="header-anchor" href="#自定义列模板" aria-label="Permalink to &quot;自定义列模板&quot;">​</a></h2><p>可以通过 <code>column</code> 默认插槽自定义列内容</p><p>可以在 <a href="#类型定义">类型定义</a> 查看 <code>HTableCellScopeSlots</code> 类型</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" height="300">
    <h-table-column title="ID" field="id" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender">
      <template #default="scope">
        <h-tag :type="scope.row.gender === 'male' ? 'info' : 'error'" plain>{{ scope.row.gender }}</h-tag>
      </template>
    </h-table-column>
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
    <h-table-column title="Action">
      <template #default="scope">
        <h-button type="normal" size="small" @click="view(scope)">View</h-button>
        <h-button type="normal" size="small" @click="edit(scope)">Edit</h-button>
      </template>
    </h-table-column>
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message, HTableCellScopeSlots } from '@aurora/horizon-web';
import { faker } from '@faker-js/faker';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
}

const data = ref<TableData[]>(new Array(20).fill(0).map((_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
})));

function view(data: HTableCellScopeSlots) {
  $message(\`view \${data.row.name}\`);
  console.info('view: ', data);
}

function edit(data: HTableCellScopeSlots) {
  $message(\`edit \${data.row.name}\`);
  console.info('edit: ', data);
}
<\/script>
`,
    path: "demos/components/Table/column-default-slot.vue"
  }, null, _parent));
  _push(`<h2 id="自定义表头" tabindex="-1">自定义表头 <a class="header-anchor" href="#自定义表头" aria-label="Permalink to &quot;自定义表头&quot;">​</a></h2><p>可以通过 <code>column.header</code> 插槽自定义表头</p><p>可以在 <a href="#类型定义">类型定义</a> 查看 <code>HTableHeaderCellScopeSlots</code> 类型</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" height="300">
    <h-table-column title="ID" field="id" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender" field="gender" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address">
      <template #header>
        <h-input v-model="searchedAddress" placeholder="Please search" />
      </template>
    </h-table-column>
  </h-table>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { faker } from '@faker-js/faker';

const searchedAddress = ref();

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
}

const originData: TableData[] = new Array(20).fill(0).map((_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
}));

const data = ref<TableData[]>(originData);

watch(searchedAddress, val => {
  data.value = val ? originData.filter(row => row.address.includes(val)) : originData;
});
<\/script>
`,
    path: "demos/components/Table/column-header-slot.vue"
  }, null, _parent));
  _push(`<h2 id="空状态" tabindex="-1">空状态 <a class="header-anchor" href="#空状态" aria-label="Permalink to &quot;空状态&quot;">​</a></h2><p>数据为空时的展示形式，如果希望自定义文字，可以配置 <code>empty-text</code></p><p>另外提供了 <code>empty</code> 插槽可做更多定制化能力</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" height="300">
    <h-table-column title="ID" field="id" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender" field="gender" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([]);
<\/script>
`,
    path: "demos/components/Table/empty.vue"
  }, null, _parent));
  _push(`<h2 id="加载中" tabindex="-1">加载中 <a class="header-anchor" href="#加载中" aria-label="Permalink to &quot;加载中&quot;">​</a></h2><p>可以配置 <code>loading</code> 使表格处于加载中状态</p><p>加载中使用 <code>v-loading</code> 处理，因此默认文字是国际化形式，可以通过 <code>loading-text</code> 配置自定义加载中文案</p><p>另外如果对于加载中有特别的配置，可以传入 <code>v-loading</code> 可接收的对象数据自定义其表现</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-switch v-model="loading" status status-on-text="loading" status-off-text="default" />
  <h-table :data="data" height="300" :loading="loading" loading-text="Please wait...">
    <h-table-column title="ID" field="id" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender" field="gender" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(true);
const data = ref([]);
<\/script>
`,
    path: "demos/components/Table/loading.vue"
  }, null, _parent));
  _push(`<h2 id="展开行" tabindex="-1">展开行 <a class="header-anchor" href="#展开行" aria-label="Permalink to &quot;展开行&quot;">​</a></h2><p>如果存在子表，或不希望表头承载过多次要信息，则可以使用展开行功能</p>`);
  _push(ssrRenderComponent(_component_h_alert, {
    type: "warning",
    style: { "margin": "20px 0" },
    closable: false,
    "show-icon": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`请注意，如果存在多个 <code${_scopeId}>type=&quot;expand&quot;</code>，只会取第一个的 <code${_scopeId}>expand</code> 插槽渲染`);
      } else {
        return [
          createTextVNode("请注意，如果存在多个 "),
          createVNode("code", null, 'type="expand"'),
          createTextVNode("，只会取第一个的 "),
          createVNode("code", null, "expand"),
          createTextVNode(" 插槽渲染")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" height="300">
    <h-table-column title="ID" field="id" type="expand">
      <template #expand="scope">
        {{ scope.row.desc }}
      </template>
    </h-table-column>
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender">
      <template #default="scope">
        <h-tag :type="scope.row.gender === 'male' ? 'info' : 'error'" plain>{{ scope.row.gender }}</h-tag>
      </template>
    </h-table-column>
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
  desc: string;
}

const data = ref<TableData[]>(new Array(20).fill(0).map((_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
  desc: faker.hacker.phrase(),
})));
<\/script>
`,
    path: "demos/components/Table/expand.vue"
  }, null, _parent));
  _push(`<h2 id="嵌套表格" tabindex="-1">嵌套表格 <a class="header-anchor" href="#嵌套表格" aria-label="Permalink to &quot;嵌套表格&quot;">​</a></h2><p>在展开行的基础上，可以实现嵌套表格，用于将一些次要信息但是数组形式的数据展示的需求</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table ref="tableDomRef" :data="data" height="500">
    <h-table-column title="ID" field="id" type="expand" fixed>
      <template #expand="scope">
        <h-table
          :data="scope.row.orders"
          border
          header-sticky
          :header-sticky-offset="92"
          :header-sticky-container="tableDomRef?.getScrollWrap()"
        >
          <h-table-column title="No" field="no" />
          <h-table-column title="Name" field="name" />
          <h-table-column title="Price" field="price" />
        </h-table>
      </template>
    </h-table-column>
    <h-table-column title="Name" field="name" width="100px" show-overflow-tooltip />
    <h-table-column title="Gender" field="gender" width="100px" />
    <h-table-column title="Birthday" field="birthday" min-width="200px" />
    <h-table-column title="Address" field="address" min-width="500px" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
  orders: {
    no: string;
    name: string;
    price: string;
  }[];
}

const tableDomRef = ref();

const data = ref<TableData[]>(new Array(20).fill(0).map((_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
  orders: new Array(faker.helpers.arrayElement([10, 15, 20, 25])).fill(0).map(() => ({
    no: faker.finance.bic(),
    name: faker.word.noun(),
    price: faker.finance.amount(),
  })),
})));
<\/script>
`,
    path: "demos/components/Table/nested-tables.vue"
  }, null, _parent));
  _push(`<h2 id="树形表格" tabindex="-1">树形表格 <a class="header-anchor" href="#树形表格" aria-label="Permalink to &quot;树形表格&quot;">​</a></h2><p>对于树结构，需要先配置 <code>prop.row-key</code> 确定每行的唯一值，然后通过配置 <code>children</code> 字段数据将子数据放入</p><p>如果有懒加载情况，需要对这行数据配置 <code>isLeaf: false</code>，并配置 <code>prop.dynamic-load</code> 方法</p><p>对于 <code>children</code> <code>isLeaf</code> 字段需要自定义的，可以通过 <code>prop.field-map</code> 修改</p><p>另外，树形表格会自动根据 <code>prop.row-key</code> 判断在哪一列上设置为展开列，如果 <code>prop.row-key</code> 不在给定的列中，则会自动给第一列设置为展开列</p><p>此外，也可以设置 <code>prop.tree-expand-field</code> 自定义展开列</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" height="500" row-key="uuid" :dynamic-load="dynamicLoad" @update:data="onUpdate">
    <h-table-column title="Seq" type="index" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender" field="gender" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import type { HTableTransformedRowDataType } from '@aurora/horizon-web';

interface TableData {
  uuid: string;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
  children: TableData[];
  isLeaf: boolean | undefined;
}

const createData = (amount: number, childAmount: number, level = 0): TableData[] => new Array(amount).fill(0).map(() => ({
  uuid: faker.string.uuid(),
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
  children: childAmount > 0 && level < 4 ? createData(childAmount, childAmount - 2, level + 1) : [],
  isLeaf: childAmount <= 0 ? (level >= 4 ? true : faker.datatype.boolean()) : undefined,
}));

const data = ref<TableData[]>(createData(20, 6));

function dynamicLoad(rowData: HTableTransformedRowDataType) {
  console.info(rowData);

  return new Promise<TableData[]>(resolve => {
    setTimeout(() => {
      resolve(createData(2, 0));
    }, 2000);
  });
}

function onUpdate(data: any) {
  console.info(data);
}
<\/script>
`,
    path: "demos/components/Table/tree.vue"
  }, null, _parent));
  _push(`<h2 id="树形表格及单选" tabindex="-1">树形表格及单选 <a class="header-anchor" href="#树形表格及单选" aria-label="Permalink to &quot;树形表格及单选&quot;">​</a></h2><p>树结构的单选，可以通过给 <code>column</code> 配置 <code>type = &quot;selection&quot;</code> 启用</p><p>可以配置 <code>check-strictly</code> 用于勾选时忽略父子级关系</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <p>
    <h-switch v-model="checkStrictly" status status-on-text="check strictly" status-off-text="not check strictly" />
  </p>
  <p>
    Checked row's id: {{ checkedRow }}
  </p>

  <h-table :data="data" height="500" row-key="id">
    <h-table-column
      v-model:selected-keys="checkedRow"
      title="ID"
      field="id"
      type="selection"
      column-key="id"
      :check-strictly="checkStrictly"
    />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender" field="gender" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
  children: TableData[];
}

let id = 1;

const checkStrictly = ref(false);
const checkedRow = ref();

const createData = (amount: number, childAmount: number): TableData[] => new Array(amount).fill(0).map(() => ({
  id: id++,
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
  children: childAmount > 0 ? createData(childAmount, childAmount - 2) : [],
}));

const data = ref<TableData[]>(createData(20, 6));
<\/script>
`,
    path: "demos/components/Table/tree-single-selection.vue"
  }, null, _parent));
  _push(`<h2 id="树形表格及多选" tabindex="-1">树形表格及多选 <a class="header-anchor" href="#树形表格及多选" aria-label="Permalink to &quot;树形表格及多选&quot;">​</a></h2><p>树结构的多选，可以通过给 <code>column</code> 配置 <code>type = &quot;selection&quot;</code> 和 <code>multiple = true</code> 启用</p><p>可以配置 <code>check-strictly</code> 用于勾选时忽略父子级关系</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-switch v-model="checkStrictly" status status-on-text="check strictly" status-off-text="not check strictly" class="mb-4" />

  <h-table :data="data" height="500" row-key="id">
    <h-table-column
      v-model:selected-keys="checkedRows"
      title="ID"
      field="id"
      type="selection"
      column-key="id"
      :multiple="true"
      :check-strictly="checkStrictly"
    />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender" field="gender" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
  children: TableData[];
}

let id = 1;

const checkStrictly = ref(false);
const checkedRows = ref();

const createData = (amount: number, childAmount: number): TableData[] => new Array(amount).fill(0).map(() => ({
  id: id++,
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
  children: childAmount > 0 ? createData(childAmount, childAmount - 2) : [],
}));

const data = ref<TableData[]>(createData(20, 6));
<\/script>
`,
    path: "demos/components/Table/tree-multiple-selection.vue"
  }, null, _parent));
  _push(`<h2 id="表尾合计" tabindex="-1">表尾合计 <a class="header-anchor" href="#表尾合计" aria-label="Permalink to &quot;表尾合计&quot;">​</a></h2><p>如果对于一些数值需要做统计，则可以开启 <code>show-summary</code> 控制是否显示表尾统计</p><p>如果需要多行合计，则设置 <code>summary-row-amount</code> 为你想要的行数，然后 <code>summary-method</code> 返回一个二维数组即可（参照第二个表格）</p>`);
  _push(ssrRenderComponent(_component_h_alert, {
    type: "info",
    style: { "margin": "20px 0" },
    closable: false,
    "show-icon": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<code${_scopeId}>summary-method</code> 始终需要返回一个二维数组`);
      } else {
        return [
          createVNode("code", null, "summary-method"),
          createTextVNode(" 始终需要返回一个二维数组")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" max-height="500" row-key="id" border="full" :show-summary="true">
    <h-table-column title="ID" field="id" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Price 1" field="prices[0]" align="right" footer-align="right" header-align="right" />
    <h-table-column title="Price 2" field="prices[1]" align="right" footer-align="right" header-align="right" />
    <h-table-column title="Price 3" field="prices[2]" align="right" footer-align="right" header-align="right" />
  </h-table>
  <h-table
    :data="data"
    max-height="500"
    row-key="id"
    border="full"
    :show-summary="true"
    :summary-row-amount="2"
    :summary-method="summaryMethod"
    class="mt-3"
    table-layout="fixed"
  >
    <h-table-column title="ID" field="id" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Price 1" field="prices[0]" align="right" footer-align="right" header-align="right" />
    <h-table-column title="Price 2" field="prices[1]" align="right" footer-align="right" header-align="right" />
    <h-table-column title="Price 3" field="prices[2]" align="right" footer-align="right" header-align="right" />
  </h-table>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import type { VNode } from 'vue';
import { faker } from '@faker-js/faker';
import { HTableSummaryMethodType } from '@aurora/horizon-web';
import { Decimal } from 'decimal.js';
import get from 'lodash/get';

interface TableData {
  id: number;
  name: string;
  prices: [string, string, string];
  children: TableData[];
}

let id = 1;

const createData = (amount: number, childAmount: number): TableData[] => new Array(amount).fill(0).map(() => ({
  id: id++,
  name: faker.hacker.noun(),
  prices: [faker.finance.amount(), faker.finance.amount(), faker.finance.amount()],
  children: childAmount > 0 ? createData(childAmount, childAmount - 2) : [],
}));

const data = ref<TableData[]>(createData(20, 6));

const summaryMethod: HTableSummaryMethodType = ({columns, data, flattenData}) => {
  const average: Array<string | VNode> = [];
  const summary: Array<string | VNode> = [];

  columns.forEach((column, index) => {
    if (index === 0) {
      average.push(h('div', {style: 'font-weight: bolder; color: orange'} , 'Average'));
      summary.push(h('div', {style: 'font-weight: bolder; color: skyblue'} , 'Summary'));
    } else {
      let sum = new Decimal(0);
      let avg = new Decimal(0);
      for (const row of flattenData) {
        const value = get(row, column.props.field);

        if (Number.isNaN(Number(value))) {
          average.push('N/A');
          summary.push('N/A');
          return;
        } else {
          avg = avg.add(value);
          sum = sum.add(value);
        }
      }

      average.push(avg.div(flattenData.length).toFixed(2));
      summary.push(sum.toFixed(2));
    }
  });

  return [average, summary];
};
<\/script>
`,
    path: "demos/components/Table/summary.vue"
  }, null, _parent));
  _push(`<h2 id="合并行、列" tabindex="-1">合并行、列 <a class="header-anchor" href="#合并行、列" aria-label="Permalink to &quot;合并行、列&quot;">​</a></h2><p>合并列和行可以传入 <code>span-method</code>，允许返回 <code>[number, number]</code> <code>{ rowSpan?: number; colSpan?: number }</code> <code>void(默认，不合并)</code></p><p>当 <code>rowSpan</code> 或 <code>colSpan</code> 为 <code>0</code> 时，单元格会被隐藏</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" :span-method="arraySpanMethod" row-key="id" :height="400" border>
    <h-table-column title="Part No." field="partNo" width="120" />
    <h-table-column title="Parent SV Number" field="parentSVNumber" />
    <h-table-column title="Status">
      <template #default="scope">
        <h-tag :type="scope.row.status === 'released' ? 'success' : 'info'" :clickable="false">
          {{ scope.row.status }}
        </h-tag>
      </template>
    </h-table-column>
  </h-table>

  <h-table :data="data" :span-method="objectSpanMethod" row-key="id" :max-height="400" class="mt-3" border>
    <h-table-column title="Part No." field="partNo" width="120" />
    <h-table-column title="Parent SV Number" field="parentSVNumber" />
    <h-table-column title="Status">
      <template #default="scope">
        <h-tag :type="scope.row.status === 'released' ? 'success' : 'info'" :clickable="false">
          {{ scope.row.status }}
        </h-tag>
      </template>
    </h-table-column>
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import { type HTableSpanMethodType } from '@aurora/horizon-web';

interface TableData {
  id: string;
  partNo: string;
  parentSVNumber: string;
  status: string;
}

let count = 2;
let partNo = '';
function createPartNo() {
  if (count === 2) {
    count = 0;
    partNo = \`P\${faker.helpers.rangeToNumber({min: 1000000, max: 9999999})}\`;
  } else {
    count++;
  }

  return partNo;
}

const data = ref<TableData[]>((new Array(20)).fill(0).map(() => ({
  id: faker.string.uuid(),
  partNo: createPartNo(),
  parentSVNumber: \`P\${faker.helpers.rangeToNumber({min: 1000000, max: 9999999})}\`,
  status: faker.helpers.arrayElement(['released', 'working']),
})));

const arraySpanMethod: HTableSpanMethodType = (scope) => {
  if (scope.columnIndex === 0) {
    if (scope.rowIndex % 3 === 0) {
      return [Math.min(3, data.value.length - scope.rowIndex), 1];
    } else {
      return [0, 0];
    }
  }
};

const objectSpanMethod: HTableSpanMethodType = (scope) => {
  if (scope.rowIndex % 2 === 0) {
    if (scope.columnIndex === 0) {
      return { rowSpan: 1, colSpan: 2 };
    } else if (scope.columnIndex === 1) {
      return { rowSpan: 0, colSpan: 0 };
    }
  }
};
<\/script>
`,
    path: "demos/components/Table/span-method.vue"
  }, null, _parent));
  _push(`<h2 id="自定义索引" tabindex="-1">自定义索引 <a class="header-anchor" href="#自定义索引" aria-label="Permalink to &quot;自定义索引&quot;">​</a></h2><p>在设置列的 <code>type=&quot;index&quot;</code> 后，如果对于索引有特殊设定，可以给 <code>index</code> 传入具体数值，或者传入一个函数用来计算</p><p><code>index</code> 的类型是 <code>number | ((index: number, row: HTableTransformedRowDataType) =&gt; number)</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-table :data="data" height="500" row-key="uuid">
    <h-table-column title="Seq" type="index" :index="(index) => index * 2" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender" field="gender" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  uuid: string;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
}

const data = ref<TableData[]>(new Array(20).fill(0).map(() => ({
  uuid: faker.string.uuid(),
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
})));
<\/script>
`,
    path: "demos/components/Table/index.vue"
  }, null, _parent));
  _push(`<h2 id="表格布局" tabindex="-1">表格布局 <a class="header-anchor" href="#表格布局" aria-label="Permalink to &quot;表格布局&quot;">​</a></h2><p>可以配置 <code>fixed</code> <code>auto</code>，默认 <code>fixed</code></p><p>参考 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout" target="_blank" rel="noreferrer">table-layout</a></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-radio-group v-model="tableLayout" class="mb-4">
    <h-radio-button label="auto" />
    <h-radio-button label="fixed" />
  </h-radio-group>

  <h-table :data="data" :table-layout="tableLayout" cell-class-name="custom-cell">
    <h-table-column title="ID" field="id" width="80" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender" field="gender" />
    <h-table-column title="Birthday" field="birthday" width="120" />
    <h-table-column title="Message" field="message" width="120" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TableProps } from '@aurora/horizon-web';
import { faker } from '@faker-js/faker';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
  message: string;
}

const tableLayout = ref<TableProps['tableLayout']>('fixed');

const data = ref<TableData[]>(new Array(10).fill(0).map((_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
  message: faker.hacker.phrase(),
})));
<\/script>

<style>
td.custom-cell {
  .h-table__cell-inner {
    white-space: nowrap;
  }
}
</style>`,
    path: "demos/components/Table/table-layout.vue"
  }, null, _parent));
  _push(`<h2 id="类型定义" tabindex="-1">类型定义 <a class="header-anchor" href="#类型定义" aria-label="Permalink to &quot;类型定义&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_code_block, { src: "../../../../horizon-web/src/components/Table/src/utils/types.ts" }, null, _parent));
  _push(`<h2 id="table-api" class="no-underline h2"><a href="#table-api" class="!no-underline">Table Api</a></h2><h3 id="table-props" class="no-underline h3"><a href="#table-props" class="!no-underline">Table Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">row-key</td><td>行数据的 <code>key</code>，用来优化数据展示</td><td><code>HTableRowKeyType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">data</td><td>表格数据</td><td><code>HTableRowDataType[]</code></td><td class="text-center">否</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">height</td><td>表格高度，默认根据表格数据自适应。 会使用 <code>@aurora/utils.sizeUnitTransform</code> 转化尺寸</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">min-height</td><td>表格最小高度。 会使用 <code>@aurora/utils.sizeUnitTransform</code> 转化尺寸</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-height</td><td>表格最大高度。 会使用 <code>@aurora/utils.sizeUnitTransform</code> 转化尺寸</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">stripe</td><td>是否启用斑马纹</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">border</td><td>是否显示边框<br><code>true</code>: 显示边框，并全部显示<br><code>&#39;full&#39;</code>: 与 <code>true</code> 一致<br><code>&#39;default&#39;</code>: 默认，只显示横向边框<br><code>&#39;outer&#39;</code>: 只显示外边框<br><code>false</code>: 不显示边框</td><td><code>boolean | &#39;default&#39; | &#39;full&#39; | &#39;outer&#39;</code></td><td class="text-center">否</td><td>&#39;default&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hoverable</td><td>是否在鼠标悬浮行时出现背景色</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>sizeProp</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-header</td><td>是否展示表头</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header-sticky</td><td>表头是否根据滚动容器吸顶</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header-sticky-container</td><td>吸顶表头滚动容器</td><td><code>string | HTMLElement</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header-sticky-offset</td><td>吸顶表头的偏移距离（top）</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-header-divider</td><td>是否显示表头的列分割线</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">highlight-selected</td><td>是否高亮已选中行</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">row-class-name</td><td>每行的 <code>class</code></td><td><code>string | ((row: HTableTransformedRowDataType, index: number) =&gt; string)</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">row-style</td><td>每行的 <code>style</code></td><td><code>StyleValue | ((row: HTableTransformedRowDataType, index: number) =&gt; StyleValue)</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cell-class-name</td><td>每个单元格的 <code>class</code></td><td><code>| string<br>      | ((<br>          row: HTableTransformedRowDataType,<br>          column: HTableColumnData,<br>          rowIndex: number,<br>          columnIndex: number,<br>        ) =&gt; string)</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cell-style</td><td>每个单元格的 <code>style</code></td><td><code>| StyleValue<br>      | ((<br>          row: HTableTransformedRowDataType,<br>          column: HTableColumnData,<br>          rowIndex: number,<br>          columnIndex: number,<br>        ) =&gt; StyleValue)</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header-row-class-name</td><td>每个表头行的 <code>class</code></td><td><code>string | ((columns: HTableColumnData[], rowIndex: number) =&gt; string)</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header-row-style</td><td>每个表头行的 <code>style</code></td><td><code>StyleValue | ((columns: HTableColumnData[], rowIndex: number) =&gt; StyleValue)</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header-cell-class-name</td><td>每个表头单元格的 <code>class</code></td><td><code>string | ((column: HTableColumnData, columnIndex: number) =&gt; string)</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header-cell-style</td><td>每个表头单元格的 <code>style</code></td><td><code>StyleValue | ((column: HTableColumnData, columnIndex: number) =&gt; StyleValue)</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">footer-row-class-name</td><td>每个表尾行的 <code>class</code></td><td><code>string | ((columns: HTableColumnData[], rowIndex: number) =&gt; string)</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">footer-row-style</td><td>每个表尾行的 <code>style</code></td><td><code>StyleValue | ((columns: HTableColumnData[], rowIndex: number) =&gt; StyleValue)</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">footer-cell-class-name</td><td>每个表尾单元格的 <code>class</code></td><td><code>string | ((column: HTableColumnData, columnIndex: number, rowIndex: number) =&gt; string)</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">footer-cell-style</td><td>每个表尾单元格的 <code>style</code></td><td><code>StyleValue | ((column: HTableColumnData, columnIndex: number, rowIndex: number) =&gt; StyleValue)</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-text</td><td>空数据时显示的文字<br>也提供 <code>slots.empty</code> 插槽自定义</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default-expand-all</td><td>对于树形表格，是否默认全部展开<br>只有在初始化时会展开，后续 <code>data</code> 变动将不会再处理，需要使用 <code>setAllCollapseStatus</code> 方法展开</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-row-keys</td><td>当前展开的节点<br>需要设置 <code>row-key</code> 才可以使用<br>可以使用 <code>v-model:expandRowKeys</code> 做双向绑定</td><td><code>Array&lt;HTableRowKeyType&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-row-sticky</td><td>是否对展开行做粘性定位处理</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default-sort</td><td>默认的排序方式</td><td><code>HTableSortType[]</code></td><td class="text-center">否</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-theme</td><td><code>tooltip</code> 的默认主题</td><td><code>TooltipProps[&#39;theme&#39;]</code></td><td class="text-center">否</td><td>&#39;dark&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-options</td><td><code>tooltip</code> 的额外选项</td><td><code>Partial&lt;TooltipProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-summary</td><td>是否显示表尾统计</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">summary-row-amount</td><td>表尾统计行行数</td><td><code>number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">summary-texts</td><td>表尾统计行第一个单元格的文字数组，按照从上到下的顺序渲染<br>默认使用国际化文字<br>可以被 <code>column.slots.footer</code> 覆盖</td><td><code>string[]</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">summary-method</td><td>总结显示的计算方法</td><td><code>HTableSummaryMethodType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">span-method</td><td>合并行或列的计算方法</td><td><code>HTableSpanMethodType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">indent</td><td>展示树形结构时，缩进距离</td><td><code>number</code></td><td class="text-center">否</td><td>24</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dynamic-load</td><td>动态加载树结构子数据的方法<br>如果树结构中 <code>children</code> 或设置了 <code>isLeaf</code> = false，则会调用此方法获取子数据</td><td><code>HTableDynamicLoadMethodType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">field-map</td><td>树形表格的字段对应关系</td><td><code>Partial&lt;Record&lt;keyof HTableTreeRowDataType, string&gt;&gt;</code></td><td class="text-center">否</td><td>() =&gt; ({<br>      children: &#39;children&#39;,<br>      isLeaf: &#39;isLeaf&#39;,<br>    })</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tree-expand-field</td><td>树形表格指定展开列<br>如果不传入，则默认使用 <code>row-key</code> 所在列<br>如果没有设置 <code>row-key</code> 的列，则使用第一个列</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollbar-always-on</td><td>是否始终显示滚动条</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading</td><td>是否处于加载状态<br>也可以传入 <code>object</code> 用来自定义 <code>loading</code> 配置</td><td><code>boolean | LoadingOptions</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading-text</td><td>加载中的提示文字</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">table-layout</td><td>设置表格单元、行和列的布局方式</td><td><code>&#39;fixed&#39; | &#39;auto&#39;</code></td><td class="text-center">否</td><td>&#39;fixed&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-column-manager</td><td>是否启用列管理器</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header-content-sticky</td><td>表头标题内容是否粘性定位</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr></tbody></table><h3 id="table-emits" class="no-underline h3"><a href="#table-emits" class="!no-underline">Table Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:data</td><td rowspan="1">当数据发生变化时触发</td><td rowspan="1">( data: <code>T[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">data</td><td><code>T[]</code></td><td>表格数据</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:expand-row-keys</td><td rowspan="1">当展开行变化时触发</td><td rowspan="1">( expanded: <code>T[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expanded</td><td><code>T[]</code></td><td>已展开的行</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">select</td><td rowspan="1">选择时触发此事件</td><td rowspan="1">( row: <code>T</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">row</td><td><code>T</code></td><td>当前行</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">deselect</td><td rowspan="1">反选时触发此事件</td><td rowspan="1">( row: <code>T</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">row</td><td><code>T</code></td><td>当前行</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">select-all</td><td rowspan="1">在点击全选时触发<br>只有在 <code>multiple = true</code> 时有效</td><td rowspan="1">( selected: <code>T[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected</td><td><code>T[]</code></td><td>已选中的行</td></tr><tr><td rowspan="4" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cell-mouse-enter</td><td rowspan="4">鼠标进入单元格时触发</td><td rowspan="4">( row: <code>any</code>, column: <code>HTableColumnData</code>, cell: <code>HTMLElement</code>, evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">row</td><td><code>any</code></td><td>当前行</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">column</td><td><code>HTableColumnData</code></td><td>当前列</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cell</td><td><code>HTMLElement</code></td><td>当前单元格对象</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="4" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cell-mouse-leave</td><td rowspan="4">鼠标离开单元格时触发</td><td rowspan="4">( row: <code>any</code>, column: <code>HTableColumnData</code>, cell: <code>HTMLElement</code>, evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">row</td><td><code>any</code></td><td>当前行</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">column</td><td><code>HTableColumnData</code></td><td>当前列</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cell</td><td><code>HTMLElement</code></td><td>当前单元格对象</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="4" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cell-click</td><td rowspan="4">点击单元格时触发</td><td rowspan="4">( row: <code>any</code>, column: <code>HTableColumnData</code>, cell: <code>HTMLElement</code>, evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">row</td><td><code>any</code></td><td>当前行</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">column</td><td><code>HTableColumnData</code></td><td>当前列</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cell</td><td><code>HTMLElement</code></td><td>当前单元格对象</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="4" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cell-dblclick</td><td rowspan="4">双击单元格时触发</td><td rowspan="4">( row: <code>any</code>, column: <code>HTableColumnData</code>, cell: <code>HTMLElement</code>, evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">row</td><td><code>any</code></td><td>当前行</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">column</td><td><code>HTableColumnData</code></td><td>当前列</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cell</td><td><code>HTMLElement</code></td><td>当前单元格对象</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="4" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cell-contextmenu</td><td rowspan="4">右键单元格时触发</td><td rowspan="4">( row: <code>any</code>, column: <code>HTableColumnData</code>, cell: <code>HTMLElement</code>, evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">row</td><td><code>any</code></td><td>当前行</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">column</td><td><code>HTableColumnData</code></td><td>当前列</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cell</td><td><code>HTMLElement</code></td><td>当前单元格对象</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">row-click</td><td rowspan="2">行点击时触发</td><td rowspan="2">( row: <code>any</code>, evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">row</td><td><code>any</code></td><td>当前行</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">row-dblclick</td><td rowspan="2">行双击时触发</td><td rowspan="2">( row: <code>any</code>, evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">row</td><td><code>any</code></td><td>当前行</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">row-contextmenu</td><td rowspan="2">行右键时触发</td><td rowspan="2">( row: <code>any</code>, evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">row</td><td><code>any</code></td><td>当前行</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">sort-change</td><td rowspan="1">当排序发生改变时触发</td><td rowspan="1">( status: <code>Array&lt;{ column: HTableColumnData; order: HTableSortOrderEnum }&gt;</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td><code>Array&lt;{ column: HTableColumnData; order: HTableSortOrderEnum }&gt;</code></td><td>状态，以数组形式给予 <br> column: 当前列; <br> order 当前排序状态</td></tr><tr><td rowspan="4" style="${ssrRenderStyle({ "word-break": "keep-all" })}">header-dragend</td><td rowspan="4">当拖动表头结束时，且宽度发生了改变时触发</td><td rowspan="4">( newWidth: <code>number</code>, oldWidth: <code>number</code>, column: <code>any</code>, event: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">newWidth</td><td><code>number</code></td><td>新的宽度</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">oldWidth</td><td><code>number</code></td><td>原本宽度</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">column</td><td><code>any</code></td><td>当前列</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">event</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-top</td><td rowspan="1">滚动到顶部时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-bottom</td><td rowspan="1">滚动到底部时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3 id="table-exposes" class="no-underline h3"><a href="#table-exposes" class="!no-underline">Table Exposes</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">reloadData</td><td rowspan="1">在某些情况下，如果数据没有做到动态监听，则可以调用此方法重载数据</td><td rowspan="1">( data: <code>HTableTransformedRowDataType[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">data</td><td><code>HTableTransformedRowDataType[]</code></td><td>如果不传值，则使用 <code>prop.data</code> 的值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">refreshLayout</td><td rowspan="1">在一些未能正确响应表格布局，且需要对表格的布局刷新，可以调用此方法</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getScrollWrap</td><td rowspan="1">获取表格内部的滚动容器</td><td rowspan="1">( ) =&gt; <code>HTMLElement | null | undefined</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2 id="tablecolumn-api" class="no-underline h2"><a href="#tablecolumn-api" class="!no-underline">TableColumn Api</a></h2><h3 id="tablecolumn-props" class="no-underline h3"><a href="#tablecolumn-props" class="!no-underline">TableColumn Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>字段类型<br><code>&#39;default&#39;</code>: 默认展示数据中的 <code>field</code> 字段内容<br><code>&#39;selection&#39;</code>: 单选或多选框，会根据 <code>multiple</code> 自动判断渲染组件<br><code>&#39;index&#39;</code>: 序号，从 1 开始记<br><code>&#39;expand&#39;</code>: 只展示展开图标，用于嵌套表格展示<br><code>&#39;drag&#39;</code>: 拖拽排序</td><td><code>&#39;default&#39; | &#39;selection&#39; | &#39;index&#39; | &#39;expand&#39; | &#39;drag&#39;</code></td><td class="text-center">否</td><td>&#39;default&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">index</td><td>如果设置了 <code>type=index</code>，则可以通过此字段自行指定序号</td><td><code>number | ((index: number, row: HTableTransformedRowDataType) =&gt; number)</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>展示在 <code>header</code> 的文字</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">field</td><td>展示的字段<br>可以使用 <code>lodash.get</code> 接受的数据形式展示，但请注意层级越深，性能影响越大</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">column-key</td><td>当前列的唯一 <code>key</code>，在启用一些效果时需要</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">order</td><td>排序，如果不指定，则按照挂载顺序排列</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">width</td><td>宽度</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">min-width</td><td>最小宽度</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fixed</td><td>是否固定列<br><code>true</code>：同 <code>left</code><br><code>&#39;left&#39;</code>: 固定在左侧<br><code>&#39;right&#39;</code>: 固定在右侧<br><code>&#39;hover&#39;</code>: 在悬浮时显示在右侧，需要注意只有一个列可以设置这个值</td><td><code>boolean | &#39;left&#39; | &#39;right&#39; | &#39;hover&#39;</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">lock-position</td><td>是否锁定位置</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">lock-fixed</td><td>是否锁定固定效果</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td>是否显示</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">lock-visible</td><td>是否锁定显示状态</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">resizable</td><td>是否允许拖动列宽调整大小</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>是否允许拖动列排序</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sortable</td><td>是否允许排序<br><code>&#39;custom&#39;</code>: 自行处理排序，一般用于后端排序，需要监听 <code>table.sort-change</code> 事件自行处理</td><td><code>boolean | &#39;custom&#39;</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sort-by</td><td>排序方式</td><td><code>&lt;T&gt;(a: T, b: T) =&gt; number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sort-separate</td><td>是否将排序按钮热区分割<br><code>true</code>: 将会生成上下两个热区<br><code>false</code>: 只有一个热区按钮，相应顺序由 <code>sort-orders</code> 控制</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sort-orders</td><td>当 <code>sort-separate = false</code> 时，点击排序按钮的轮训顺序</td><td><code>Array&lt;HTableSortOrderEnum | null&gt;</code></td><td class="text-center">否</td><td>() =&gt; [HTableSortOrderEnum.ASC, HTableSortOrderEnum.DESC, null]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sort-disabled</td><td>是否禁用排序</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sort-method</td><td>排序方法<br>仅限同步处理，如果使用异步或服务端排序见 <code>useBuiltInSort</code> 说明</td><td><code>(<br>        sortOrder: HTableSortOrderEnum,<br>      ) =&gt; (a: HTableTransformedRowDataType, b: HTableTransformedRowDataType) =&gt; number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-built-in-sort</td><td>是否使用内置的排序方法<br>如果希望使用远程排序，则传入 <code>false</code>，并监听 <code>table.sort-change</code> 事件</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">formatter</td><td>格式化方法</td><td><code>(row: any, column: any, cellValue: any, index: number) =&gt; VNode | string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-overflow-tooltip</td><td>是否在内容溢出时显示 <code>tooltip</code><br>相当于启用 <code>tooltip</code> 的 <code>overflow</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-options</td><td><code>tooltip</code> 的额外选项</td><td><code>Partial&lt;TooltipProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-header-overflow-tooltip</td><td>是否在头部内容溢出时显示 <code>tooltip</code><br>相当于启用 <code>tooltip</code> 的 <code>overflow</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header-tooltip-options</td><td>头部 <code>tooltip</code> 的额外选项</td><td><code>Partial&lt;TooltipProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header-content-sticky</td><td>表头标题内容是否粘性定位</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-footer-overflow-tooltip</td><td>是否在尾部内容溢出时显示 <code>tooltip</code><br>相当于启用 <code>tooltip</code> 的 <code>overflow</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">footer-tooltip-options</td><td>尾部 <code>tooltip</code> 的额外选项</td><td><code>Partial&lt;TooltipProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">align</td><td>文本排列方式</td><td><code>&#39;left&#39; | &#39;right&#39; | &#39;center&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header-align</td><td>表头文本排列方式<br>如果不设置，会使用 <code>align</code> 的值</td><td><code>&#39;left&#39; | &#39;right&#39; | &#39;center&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">footer-align</td><td>表尾文本排列方式<br>如果不设置，会使用 <code>align</code> 的值</td><td><code>&#39;left&#39; | &#39;right&#39; | &#39;center&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">class-name</td><td>列的 <code>class</code></td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">header-class-name</td><td>表头的 <code>class</code></td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">footer-class-name</td><td>表尾的 <code>class</code></td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selectable</td><td>仅当 <code>type = &#39;selection&#39;</code> 时有效<br>通过传入的方法返回 <code>boolean</code> 告知当前行是否可以选中<br>会覆盖 <code>table.selectable</code></td><td><code>((row: any, index: number) =&gt; boolean) | boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-keys</td><td>已勾选的行数据，可以使用 <code>v-model:selectedKeys</code> 双向绑定</td><td><code>string | number | Array&lt;string | number&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple</td><td>仅当 <code>type = &#39;selection&#39;</code> 时有效<br>是否允许多选</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">multiple-limit</td><td>仅当 <code>type = &#39;selection&#39;</code> 时有效<br>多选上限</td><td><code>number</code></td><td class="text-center">否</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-check-all</td><td>是否显示全选</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">select-on-indeterminate</td><td>在多选时且当半选时，可以控制点击表头的多选框时的行为。<br><code>true</code>: 选中所有行<br><code>false</code>: 取消选中所有行</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">select-on-click-row</td><td>在点击整行时，是否允许选中<br>如果希望不与自定义渲染的单元格的点击事件冲突，请设置类似于 <code>@click.stop</code> 的事件阻止冒泡</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">reserve-selection</td><td>仅当 <code>type = &#39;selection&#39;</code> 并设置 <code>table.row-key</code> 和 <code>table-column.column-key</code> 时有效<br>是否在 <code>data</code> 更新时，仍保留当前列、行的选中态<br>开启此项可以支持跨页多选</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">exclusion-fields</td><td>同行互斥的字段列表<br>在同一行存在多个 <code>selection</code> 时可用<br>选中当前列时，会取消该行中 <code>field</code> 命中列表的其他选择列</td><td><code>Array&lt;string&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">check-strictly</td><td>对于树形结构，父子级关系是否关联</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tip</td><td>提示信息</td><td><code>string | VNode</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filterable</td><td>是否启用过滤</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-type</td><td>过滤类型</td><td><code>| &#39;input&#39;<br>      | &#39;input-number&#39;<br>      | &#39;select&#39;<br>      | &#39;cascader&#39;<br>      | &#39;tree-select&#39;<br>      | &#39;date-picker&#39;<br>      | &#39;time-picker&#39;</code></td><td class="text-center">否</td><td>&#39;input&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-options</td><td>过滤器额外选项</td><td><code>Partial&lt;<br>        | InputProps<br>        | InputNumberProps<br>        | SelectProps<br>        | CascaderProps<br>        | TreeSelectProps<br>        | DatePickerProps<br>        | TimePickerProps<br>      &gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-disabled</td><td>是否禁用过滤</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-popover-placement</td><td>过滤弹出框的定位，同 <code>popover.placement</code></td><td><code>PopoverProps[&#39;placement&#39;]</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-popover-class-name</td><td>过滤弹出框的类名</td><td><code>any</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-popover-style</td><td>过滤弹出框的样式</td><td><code>StyleValue</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-method</td><td>自定义过滤方法</td><td><code>(value: any, row: any, column: any) =&gt; boolean</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-built-in-filter</td><td>是否使用内置过滤功能<br>如果希望使用后端过滤，则可以传入 <code>false</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr></tbody></table><h3 id="tablecolumn-emits" class="no-underline h3"><a href="#tablecolumn-emits" class="!no-underline">TableColumn Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:selected-keys</td><td rowspan="1">当选中变化时触发</td><td rowspan="1">( selected: <code>T[] | T | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected</td><td><code>T[] | T | undefined</code></td><td>已选择的行，如果 <code>multiple = true</code> 则是数组，反之是对象或 <code>undefined</code></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">filter-change</td><td rowspan="1">当过滤发生改变时触发</td><td rowspan="1">( value: <code>any</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>any</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">sort-change</td><td rowspan="1">当排序发生改变时触发</td><td rowspan="1">( order: <code>HTableSortOrderEnum | null</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">order</td><td><code>HTableSortOrderEnum | null</code></td><td>排序结果，为 null 时即取消排序</td></tr></tbody></table><h3 id="tablecolumn-exposes" class="no-underline h3"><a href="#tablecolumn-exposes" class="!no-underline">TableColumn Exposes</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearSelection</td><td rowspan="1">清空已选项</td><td rowspan="1">( ignoreSelectable: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">ignoreSelectable</td><td><code>boolean</code></td><td>是否忽略 <code>selectable</code>，默认为 <code>false</code></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getSelectionRows</td><td rowspan="1">获取已选择的行</td><td rowspan="1">( ) =&gt; <code>HTableTransformedRowDataType[]</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>HTableTransformedRowDataType</code></td><td>-</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">toggleRowSelection</td><td rowspan="3">当且仅当 <code>type = selection</code> 并设置了 <code>row-key</code> 时有效</td><td rowspan="3">( rowKey: <code>HTableRowKeyType | HTableRowKeyType[]</code>, selected: <code>boolean</code>, ignoreSelectable: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rowKey</td><td><code>HTableRowKeyType | HTableRowKeyType[]</code></td><td>需要切换选中的行的 <code>row-key</code></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected</td><td><code>boolean</code></td><td>不传时自动切换选择状态；传入即按照值切换状态</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">ignoreSelectable</td><td><code>boolean</code></td><td>是否忽略 <code>selectable</code></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Table.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Table = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Table as default
};
