import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Tabs.md","filePath":"zh/demos/components/Tabs.md"}');
const _sfc_main = { name: "demos/components/Tabs.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_code_block = resolveComponent("code-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Tabs</h1><p class="description">页签通常用来快速切换不同的选项</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2><p>选项卡的基本使用方法。默认为 <code>line</code> 类型，<code>medium</code> 尺寸</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';
import { $message, type HTabValue } from '@aurora/horizon-web';

const activeKey = ref('1');

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: \`Tab \${tab} is clicked\` });
};
<\/script>

<template>
  <div style="width: 280px;">

  <h-tabs v-model:active-key="activeKey" @change="onTabChanged">
    <h-tab key="1" label="1.t ratione aut ea. Voluptates praesentium u ratione aut ea. Voluptates praesentium " />
    <h-tab key="2" label="2.Consectetur aut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui pariatur." />
    <h-tab key="3" label="3.Consectetur aut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui pariatur." />
    <h-tab key="4" label="4.ut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui par" />
  </h-tabs>

  </div>
</template>
`,
    path: "demos/components/Tabs/basic.vue"
  }, null, _parent));
  _push(`<h2 id="状态" tabindex="-1">状态 <a class="header-anchor" href="#状态" aria-label="Permalink to &quot;状态&quot;">​</a></h2><p>处于禁用状态的选项卡项目表明该选项卡项目存在，但在当前情况下不可用。设置单个选项卡 <code>disabled</code>，当 <code>type=page</code> 不生效。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { $message, type HTabValue } from '@aurora/horizon-web';
import { ref } from 'vue';

const cardType = ref('line');

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: \`Tab \${tab} is clicked\` });
};
<\/script>

<template>
  <div class="mb-8 flex align-center">
    <span class="mr-4">类型</span>
    <h-radio-group v-model="cardType">
      <h-radio label="line">line(Default)</h-radio>
      <h-radio label="card">card</h-radio>
      <h-radio label="segment">segment</h-radio>
    </h-radio-group>
  </div>
  <h-tabs default-active-key="3" :type="cardType" @change="onTabChanged">
    <h-tab key="1" label="Tab 1" />
    <h-tab key="2" label="Tab 2" disabled />
    <h-tab key="3" label="Tab 3" />
  </h-tabs>
</template>
`,
    path: "demos/components/Tabs/disable.vue"
  }, null, _parent));
  _push(`<h2 id="尺寸类型" tabindex="-1">尺寸类型 <a class="header-anchor" href="#尺寸类型" aria-label="Permalink to &quot;尺寸类型&quot;">​</a></h2><p>定义<code>mini | small | medium | large</code>四个尺寸，应用在不同的场景下, 默认 <code>medium</code>。 定义<code>line | card | segment | page</code> 四个类型，默认 <code>line</code>。<span style="${ssrRenderStyle({ "color": "#FA541C", "font-weight": "bold" })}">特别说明当类型是 <code>page</code> 时候，不支持 <code>size</code> 属性。</span></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { $message, type HTabValue } from '@aurora/horizon-web';
import { ref } from 'vue';

const activeKey = ref(1);
const size = ref('medium');
const cardType = ref('line');
const showIcon = ref(true);
const underline = ref(true);
const customizeUnderline = ref(false);
const customizeSpace = ref(false);

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const icons = ['car', 'change_power', 'card_voucher'];

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: \`Tab \${tab} is clicked\` });
};
<\/script>

<template>
  <div class="mb-4 flex align-center">
    <span class="mr-4">类型</span>
    <h-radio-group v-model="cardType">
      <h-radio label="line">line(Default)</h-radio>
      <h-radio label="card">card</h-radio>
      <h-radio label="segment">segment</h-radio>
      <h-radio label="page">page(不支持尺寸调整)</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-4 flex align-center">
    <span class="mr-4">尺寸</span>
    <h-radio-group v-model="size" :disabled="cardType === 'page'">
      <h-radio label="mini">mini</h-radio>
      <h-radio label="small">small</h-radio>
      <h-radio label="medium">medium(Default)</h-radio>
      <h-radio label="large">large</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-8 flex align-center">
    <span class="mr-4">其他</span>
    <div class="flex align-center" style="column-gap: 10px">
      <h-checkbox v-model="showIcon" label="展示图标" />
      <h-checkbox
        v-model="underline"
        :disabled="cardType !== 'line'"
        label="展示分割线(only line)"
      />
      <h-checkbox
        v-model="customizeUnderline"
        :disabled="cardType !== 'line'"
        label="自定义分割线(only line)"
      />
      <h-checkbox
        v-model="customizeSpace"
        :disabled="cardType !== 'card'"
        label="移除首段间距(only card)"
      />
    </div>
  </div>

  <div
    style="height: 80px"
    :class="{ 'customize-underline': customizeUnderline, 'customize-space': customizeSpace }"
  >
    <h-tabs
      v-model:active-key="activeKey"
      :underline="underline"
      :type="cardType"
      :size="size"
      @change="onTabChanged"
    >
      <h-tab v-for="(tab, i) in tabs" :key="i" :icon="showIcon ? icons[i] : null" :label="tab" />
    </h-tabs>
  </div>
</template>

<style scoped>
.customize-underline {
  --h-tabs-height--underline--line: 4px;
}

.customize-space {
  --h-tabs-padding--nav-wrap--card: 0;
}
</style>
`,
    path: "demos/components/Tabs/size-and-type.vue"
  }, null, _parent));
  _push(`<h2 id="有图标选项卡" tabindex="-1">有图标选项卡 <a class="header-anchor" href="#有图标选项卡" aria-label="Permalink to &quot;有图标选项卡&quot;">​</a></h2><p>可以在选项卡标题前添加一个图标。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';
import { $message, type HTabValue } from '@aurora/horizon-web';

// const activeKey = ref(0);
const cardType = ref('line');
const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const icons = ['car', 'change_power', 'card_voucher'];

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: \`Tab \${tab} is clicked\` });
};
<\/script>

<template>
  <div class="mb-8 flex align-center">
    <span class="mr-4">类型</span>
    <h-radio-group v-model="cardType">
      <h-radio label="line">line(Default)</h-radio>
      <h-radio label="card">card</h-radio>
      <h-radio label="segment">segment</h-radio>
      <h-radio label="page">page(不支持尺寸调整)</h-radio>
    </h-radio-group>
  </div>

  <div style="height: 50px">
    <h-tabs :default-active-key="0" :type="cardType" @change="onTabChanged">
      <h-tab v-for="(tab, i) in tabs" :key="i" :icon="icons[i]" :label="tab" />
    </h-tabs>
  </div>
</template>
`,
    path: "demos/components/Tabs/icon.vue"
  }, null, _parent));
  _push(`<h2 id="滑动" tabindex="-1">滑动 <a class="header-anchor" href="#滑动" aria-label="Permalink to &quot;滑动&quot;">​</a></h2><p>在空间紧张的情况，可以左右滑动，容纳更多选项卡。示例是在 <code>600px</code> 宽度的元素内表现形式。可以通过 <code>focusable</code> 控制是否自动滑动到激活元素</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script lang="ts" setup>
import { ref } from 'vue';

const activeKey = ref(0);
const size = ref('medium');
const cardType = ref('line');
const focusable = ref(true);
const scrollable = ref(true);
const arrow = ref(true);
const tabs = ref<number[]>(
  Array(20)
    .fill(0)
    .map((_, i) => i),
);
<\/script>

<template>
  <div class="mb-4 flex align-center">
    <span class="mr-4">类型</span>
    <h-radio-group v-model="cardType">
      <h-radio label="line">line(Default)</h-radio>
      <h-radio label="card">card</h-radio>
      <h-radio label="segment">segment</h-radio>
      <h-radio label="page">page(不支持尺寸调整)</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-4 flex align-center">
    <span class="mr-4">尺寸</span>
    <h-radio-group v-model="size" :disabled="cardType === 'page'">
      <h-radio label="mini">mini</h-radio>
      <h-radio label="small">small</h-radio>
      <h-radio label="medium">medium(Default)</h-radio>
      <h-radio label="large">large</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-8 flex align-center">
    <span class="mr-4">其他</span>
    <div class="flex align-center" style="column-gap: 10px">
      <h-checkbox v-model="scrollable" label="标签可滑动" />
      <h-checkbox v-model="focusable" label="自动滑动到激活元素" />
      <h-checkbox v-model="arrow" label="超长页签使用箭头" />
    </div>
  </div>
  <div class="flex">
    <div class="box">
      <h-tabs
        v-model:activeKey="activeKey"
        :default-active-key="1"
        :type="cardType"
        :size="size"
        :arrow="arrow"
        :focusable="focusable"
        :scrollable="scrollable"
      >
        <h-tab v-for="key in tabs" :key="key" :label="\`Tab\${key}\`" />
      </h-tabs>
    </div>
  </div>
</template>

<style scoped>
.box {
  height: 80px;
  width: 600px;
}
</style>
`,
    path: "demos/components/Tabs/scroll.vue"
  }, null, _parent));
  _push(`<h2 id="关闭和增加" tabindex="-1">关闭和增加 <a class="header-anchor" href="#关闭和增加" aria-label="Permalink to &quot;关闭和增加&quot;">​</a></h2><p>通过设置 <code>h-tabs (editable)</code>、<code>h-tab (closable)</code> 属性可以开启动态增减选项卡。仅在 <code>line | card | page</code> 生效；关闭和新增的逻辑由业务实现。 <code>v2 = true</code>，删除如果是当前选项卡，则默认选中第一个选项卡</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { $message, type HTabValue } from '@aurora/horizon-web';
import { ref, reactive } from 'vue';

const randomUid = () => Math.random().toString(36).slice(2);

const activeKey = ref(randomUid());
const size = ref('medium');
const cardType = ref('line');
const items = ref([
  { label: 'Default Tab 1', uid: activeKey.value },
  { label: 'Default Tab 2', uid: randomUid() },
  { label: 'Default Tab 3', uid: randomUid() },
]);

const firstTab = reactive({ label: 'FirstTab', uid: randomUid(), show: true });

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
};

const onTabAdd = () => {
  $message({ type: 'success', message: 'Add tab' });

  const newTab = { label: \`New Tab \${items.value.length + 1}\`, uid: randomUid() };
  items.value = items.value.concat(newTab);
  activeKey.value = newTab.uid;
};

const onTabClose = (key: HTabValue) => {
  $message({ type: 'success', message: \`Close tab \${key}\` });

  items.value = items.value.filter(t => t.uid !== key);
};

<\/script>

<template>
  <div class="mb-4 flex align-center">
    <span class="mr-4">类型</span>
    <h-radio-group v-model="cardType">
      <h-radio label="line">line(Default)</h-radio>
      <h-radio label="card">card</h-radio>
      <h-radio label="page">page(不支持尺寸调整)</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-4 flex align-center">
    <span class="mr-4">尺寸</span>
    <h-radio-group v-model="size" :disabled="cardType === 'page'">
      <h-radio label="mini">mini</h-radio>
      <h-radio label="small">small</h-radio>
      <h-radio label="medium">medium(Default)</h-radio>
      <h-radio label="large">large</h-radio>
    </h-radio-group>
  </div>
  <h-tabs
    v-model:active-key="activeKey"
    v2
    editable
    :type="cardType"
    :size="size"
    @change="onTabChanged"
    @add="onTabAdd"
    @close="onTabClose"
  >
    <h-tab v-if="firstTab.show" :key="firstTab.uid" :label="firstTab.label" />
    <h-tab v-for="item in items" :key="item.uid" :label="item.label" closable />
  </h-tabs>
</template>
`,
    path: "demos/components/Tabs/editable.vue"
  }, null, _parent));
  _push(`<h2 id="右侧附加操作区域" tabindex="-1">右侧附加操作区域 <a class="header-anchor" href="#右侧附加操作区域" aria-label="Permalink to &quot;右侧附加操作区域&quot;">​</a></h2><p>可以在选项卡的右侧添加额外内容，例如按钮。<span style="${ssrRenderStyle({ "color": "#FA541C", "font-weight": "bold" })}">特别说明: <code>segment</code> 类型不支持右侧操作区域按钮</span></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { $message, type HTabValue } from '@aurora/horizon-web';
import { ref, watch } from 'vue';

const activeKey = ref('Tab 1');
const tabs = ref<string[]>(['Tab 1', 'Tab 2', 'Tab 3']);
const size = ref('medium');
const cardType = ref('line');
const all = ref(true);

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
};

const onClick = () => {
  $message({ type: 'success', message: \`Extra area clicked\` });
};

const onAddTabs = () => {
  tabs.value = tabs.value.concat(
    Array.from({ length: 10 }, (_, i) => \`Tab \${i + tabs.value.length + 4}\`),
  );
};

const onTabAdd = () => {
  $message({ type: 'success', message: 'Add tab' });

  const newTab = \`New Tab \${tabs.value.length + 1}\`;
  tabs.value = tabs.value.concat(newTab);
  activeKey.value = newTab;
};

const onTabClose = (key: HTabValue) => {
  $message({ type: 'success', message: \`Close tab \${key}\` });

  tabs.value = tabs.value.filter(t => t !== key);
};

const showAllAction = () => {
  if (all.value) onAddTabs();
  else tabs.value = tabs.value.slice(0, 3);
};

watch(() => all.value, showAllAction, { immediate: true });
<\/script>

<template>
  <div class="mb-4 flex align-center">
    <span class="mr-4">类型</span>
    <h-radio-group v-model="cardType">
      <h-radio label="line">line(Default)</h-radio>
      <h-radio label="card">card</h-radio>
      <h-radio label="page">page(不支持尺寸调整)</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-4 flex align-center">
    <span class="mr-4">尺寸</span>
    <h-radio-group v-model="size" :disabled="cardType === 'page'">
      <h-radio label="mini">mini</h-radio>
      <h-radio label="small">small</h-radio>
      <h-radio label="medium">medium(Default)</h-radio>
      <h-radio label="large">large</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-8 flex align-center">
    <span class="mr-4">其他</span>
    <div class="flex align-center" style="column-gap: 10px">
      <h-checkbox v-model="all" label="全部所有操作" />
    </div>
  </div>

  <div style="width: 80%">
    <h-tabs
      v-model:active-key="activeKey"
      editable
      v2
      :size="size"
      :type="cardType"
      @change="onTabChanged"
      @add="onTabAdd"
      @close="onTabClose"
    >
      <h-tab v-for="t in tabs" :key="t" :label="t" closable />
      <template #extra="{ size: sm }">
        <div>
          <h-space>
            <h-button :size="sm" @click="onClick">刷新</h-button>
            <h-button :size="sm" type="normal" @click="onClick">重置</h-button>
          </h-space>
        </div>
      </template>
    </h-tabs>
  </div>
</template>
`,
    path: "demos/components/Tabs/extra.vue"
  }, null, _parent));
  _push(`<h2 id="文字溢出" tabindex="-1">文字溢出 <a class="header-anchor" href="#文字溢出" aria-label="Permalink to &quot;文字溢出&quot;">​</a></h2><p>超出部分用 “ ... ” 展示，并在鼠标移入出现文字提示。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';
import { $message, type HTabValue } from '@aurora/horizon-web';

const activeKey = ref('1');

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: \`Tab \${tab} is clicked\` });
};
<\/script>

<template>
  <h-tabs v-model:active-key="activeKey" @change="onTabChanged">
    <h-tab key="1" label="Tab 1" />
    <h-tab key="2" label="Tab 2" />
    <h-tab key="3" label="Tab 3" />
    <h-tab key="4">
      <h-tooltip
        placement="bottom"
        trigger="hover"
        size="medium"
        content="Tab long titleTab long title"
      >
        <div>Tab long title...</div>
      </h-tooltip>
    </h-tab>
  </h-tabs>
</template>
`,
    path: "demos/components/Tabs/text-overflow.vue"
  }, null, _parent));
  _push(`<h2 id="可拖拽标签" tabindex="-1">可拖拽标签 <a class="header-anchor" href="#可拖拽标签" aria-label="Permalink to &quot;可拖拽标签&quot;">​</a></h2><p>如果需要对选项卡进行排序操作，可通过设置 <code>draggable</code> 启用。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { $message, type HTabValue } from '@aurora/horizon-web';
import { ref } from 'vue';

const activeKey = ref(1);
const cardType = ref('card');
const disabled = ref(false);
const tabs = ref(
  Array(5)
    .fill(0)
    .map((_, i) => ({ title: \`Tab \${i + 1}\`, key: i })),
);

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: \`Tab \${tab} is clicked\` });
};

const onSort = (current: number, target: number, sortedKeys: number[]) => {
  console.debug('sort', current, target, sortedKeys);
  tabs.value = sortedKeys.map(key => ({ title: \`Tab \${key + 1}\`, key }));
};
<\/script>

<template>
  <div class="mb-4 flex align-center">
    <span class="mr-4">类型</span>
    <h-radio-group v-model="cardType">
      <h-radio label="line">line(Default)</h-radio>
      <h-radio label="card">card</h-radio>
      <h-radio label="segment">segment</h-radio>
      <h-radio label="page">page(不支持尺寸调整)</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-8 flex align-center">
    <span class="mr-4">其他</span>
    <div class="flex align-center" style="column-gap: 10px">
      <h-checkbox v-model="disabled" label="设置第三项不可拖拽" />
    </div>
  </div>
  <h-tabs
    :default-active-key="activeKey"
    draggable
    :type="cardType"
    @change="onTabChanged"
    @sort="onSort"
  >
    <transition-group name="fade">
      <h-tab
        v-for="(tab, i) in tabs"
        :key="tab.key"
        :label="tab.title"
        :draggable="disabled ? !(i === 2) : true"
      />
    </transition-group>
  </h-tabs>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all var(--h-tabs-transition-time) var(--h-tabs-transition-fn);
}
</style>
`,
    path: "demos/components/Tabs/draggable.vue"
  }, null, _parent));
  _push(`<h2 id="结合-h-panel-使用" tabindex="-1">结合 <code>h-panel</code> 使用 <a class="header-anchor" href="#结合-h-panel-使用" aria-label="Permalink to &quot;结合 \`h-panel\` 使用&quot;">​</a></h2><p>使用面板组件，开发选项卡应用</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-tabs v-model:active-key="activeKey">
    <h-tab v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name" />
  </h-tabs>
  <h-panels v-model="activeKey" class="p-1 pt-2">
    <h-panel v-for="panel in tabs" :key="panel.name" :name="panel.name">
      {{ panel.content }}
    </h-panel>
  </h-panels>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeKey = ref('tab1');
const tabs = ref([
  {
    label: 'Tab1',
    name: 'tab1',
    content: 'Tab Content 1',
  },
  {
    label: 'Tab2',
    name: 'tab2',
    content: 'Tab Content 2',
  },
  {
    label: 'Tab3',
    name: 'tab3',
    content: 'Tab Content 3',
  },
]);
<\/script>
`,
    path: "demos/components/Tabs/with-panel.vue"
  }, null, _parent));
  _push(`<h2 id="切换前回调" tabindex="-1">切换前回调 <a class="header-anchor" href="#切换前回调" aria-label="Permalink to &quot;切换前回调&quot;">​</a></h2><p>你可以通过 <code>beforeChange</code> 来延迟或者阻止切换选项卡。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-tabs v-model:active-key="activeKey" v2 type="card" :before-change="beforeChange">
    <h-tab key="tab1" label="普通Tab" />
    <h-tab key="tab2" label="2s延迟">
      <template v-if="loading" #icon>
        <a-icon spin="ccw" name="loading" />
      </template>
    </h-tab>
    <h-tab key="tab3" label="不可访问" />
    <h-tab key="tab4" label="普通Tab 2" />
  </h-tabs>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const activeKey = ref('tab1');
const loading = ref(false);
const delay = () => new Promise(r => setTimeout(r, 2000));
const beforeChange = async (tabName: string | number) => {
  if (tabName === 'tab2') {
    loading.value = true;
    await delay();
    loading.value = false;
    return true;
  }
  if (tabName === 'tab3') {
    $message.warning('不可访问！');
    return false;
  }
  return true;
};
<\/script>
`,
    path: "demos/components/Tabs/before-change.vue"
  }, null, _parent));
  _push(`<h2 id="右键菜单" tabindex="-1">右键菜单 <a class="header-anchor" href="#右键菜单" aria-label="Permalink to &quot;右键菜单&quot;">​</a></h2><p>自定义 <code>slot</code> 方式来实现右键菜单</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';
import { $message, type HTabValue } from '@aurora/horizon-web';

const activeKey = ref();
const tabs = ref(['Operators']);

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: \`Tab \${tab} is clicked\` });
};

const onCommand = (key: string, cmd: string) => {
  if (cmd === 'add') {
    tabs.value = [...tabs.value, \`Random\${Math.random().toString(36).slice(2)}\`];
  } else {
    tabs.value = tabs.value.filter(tab => tab !== key);
  }
};
<\/script>

<template>
  <h-tabs v-model:active-key="activeKey" v2 @change="onTabChanged">
    <h-tab v-for="tab in tabs" :key="tab">
      <template #default>
        <h-dropdown trigger="context-menu" @command="onCommand(tab, $event)">
          <div>{{ tab }}</div>
          <h-dropdown-menu>
            <h-dropdown-item command="add">添加</h-dropdown-item>
            <h-dropdown-item command="rm" :disabled="tabs.length <= 1">删除</h-dropdown-item>
          </h-dropdown-menu>
        </h-dropdown>
      </template>
    </h-tab>
  </h-tabs>
</template>
`,
    path: "demos/components/Tabs/tab-menu.vue"
  }, null, _parent));
  _push(`<h2 id="文字类页签" tabindex="-1">文字类页签 <a class="header-anchor" href="#文字类页签" aria-label="Permalink to &quot;文字类页签&quot;">​</a></h2><p>通过自定义 <code>type=line</code> 的页签实现，这个时候设置 <code>indicator=false</code> 即可</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { $message, type HTabValue } from '@aurora/horizon-web';
import { ref } from 'vue';

const size = ref('small');
const tabs = Array(5)
  .fill(0)
  .map((_, index) => \`TAG \${index + 1}\`);

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: \`Tab \${tab} is clicked\` });
};
<\/script>

<template>
  <h-space class="box" block direction="vertical">
    <h-space>
      <span class="mr-4">尺寸</span>
      <h-radio-group v-model="size">
        <h-radio label="mini">mini(tag 不支持 mini)</h-radio>
        <h-radio label="small">small</h-radio>
        <h-radio label="medium">medium(Default)</h-radio>
        <h-radio label="large">large</h-radio>
      </h-radio-group>
    </h-space>
    <h-tabs :size="size" :underline="false" :indicator="false" @change="onTabChanged">
      <h-tab v-for="tab in tabs" :key="tab">
        <template #default="{ state }">
          <h-tag
            :size="size === 'mini' ? 'small' : size"
            :model-value="state"
            :clickable="false"
          >
            {{ tab }}
          </h-tag>
        </template>
      </h-tab>
    </h-tabs>
  </h-space>
</template>

<style scoped>
.box {
  --h-tabs-space--tab--line--mini: 4px;
  --h-tabs-space--tab--line--small: 4px;
  --h-tabs-space--tab--line--medium: 4px;
  --h-tabs-space--tab--line--large: 4px;
}
</style>
`,
    path: "demos/components/Tabs/tab-text.vue"
  }, null, _parent));
  _push(`<h2 id="v1-x-兼容性" tabindex="-1">v1.x 兼容性 <a class="header-anchor" href="#v1-x-兼容性" aria-label="Permalink to &quot;v1.x 兼容性&quot;">​</a></h2><p>为了业务更顺滑迁移，针对 v1.x 版本做了完整兼容，通过 v2 可以设置使用 v2.x 逻辑。影响逻辑点：<br> 1.<code>beforeChange</code> 逻辑，开启后 <code>beforeChange</code> 返回 <code>PromiseLike&lt;false&gt;</code>阻止tab切换 <br> 2.<code>emits.close</code> ，开启后如果删除是激活的tab，则默认选中第一个 3.<code>size</code>,开启后默认使用<code>small</code>尺寸</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';
import { $message, type HTabValue } from '@aurora/horizon-web';

const activeKey = ref('1');
const v2 = ref(false);

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: \`Tab \${tab} is clicked\` });
};

const beforeChange = (tabKey: string, update: () => void) => {
  if (tabKey === '2') {
    $message.warning({ message: '等待一下', duration: 2000 });
    setTimeout(() => {
      update();
    }, 2000);
    return;
  }
  update();
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const beforeChangeUsed = async (tabKey: string) => {
  if (tabKey === '2') {
    $message.warning({ message: '等待一下', duration: 2000 });
    await delay(2000);
  }
};

const onTabClose = (tabKey: string) => {
  console.debug('close tab key =', tabKey);
};
<\/script>

<template>
  <div class="mb-8 flex align-center">
    <span class="mr-4">其他</span>
    <div class="flex align-center" style="column-gap: 10px">
      <h-checkbox v-model="v2" label="v2" />
    </div>
  </div>
  <h-tabs
    v-if="v2"
    v-model:active-key="activeKey"
    editable
    v2
    :underline="false"
    :before-change="beforeChangeUsed"
    @change="onTabChanged"
    @close="onTabClose"
  >
    <h-tab name="1" label="Tab 1" />
    <h-tab name="2" label="延迟访问Tab 2" />
    <h-tab name="3" label="Tab 3" show-close />
    <h-tab key="4" label="Tab long title" />
  </h-tabs>
  <h-tabs
    v-else
    v-model="activeKey"
    show-add
    :show-underline="false"
    :before-change="beforeChange"
    @change="onTabChanged"
    @close="onTabClose"
  >
    <h-tab name="1" label="Tab 1" />
    <h-tab name="2" label="延迟访问Tab 2" />
    <h-tab name="3" label="Tab 3" show-close />
    <h-tab key="4" label="Tab long title" />
  </h-tabs>
</template>
`,
    path: "demos/components/Tabs/compatible.vue"
  }, null, _parent));
  _push(`<h2 id="design-token" tabindex="-1">Design Token <a class="header-anchor" href="#design-token" aria-label="Permalink to &quot;Design Token&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_code_block, { src: "./demos/design-token.scss" }, null, _parent));
  _push(`<h2 id="tabs-api" class="no-underline h2"><a href="#tabs-api" class="!no-underline">Tabs Api</a></h2><h3 id="tabs-props" class="no-underline h3"><a href="#tabs-props" class="!no-underline">Tabs Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>activeKey</code>" }, null, _parent));
  _push(`</td><td>绑定值，表示当前选中的是哪个选项卡</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active-key</td><td>当前选中的选项卡的 key，支持 <code>v-model:active-key</code></td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v2</td><td>启用 <code>v2.x.x</code> 版本逻辑</td><td><code>boolean</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default-active-key</td><td>默认选中的选项卡的key（非受控状态，为空时选中第一个选项卡页）</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>选项卡尺寸大小，当 <code>type=page</code>, 该选项无效</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | &#39;huge&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>选项卡可拖拽改变位置</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollable</td><td>当元素过多时候，选项卡可滑动</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">focusable</td><td>当元素选中时候，选项卡是否滑动到目标元素</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">arrow</td><td>当页签超长的时候，是否使用箭头</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>选项卡类型, <code>type=segment</code> 已过时，请使用 <code>HSegmented</code> 替代</td><td><code>&#39;line&#39; | &#39;card&#39; | Segment | &#39;page&#39;</code></td><td class="text-center">否</td><td>&#39;line&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-underline`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>underline</code>" }, null, _parent));
  _push(`</td><td>是否显示水平分割线, 当 <code>type=line</code> 生效，使用 <code>underline</code> 替代</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">underline</td><td>是否显示水平分割线, 当 <code>type=line</code> 生效</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">indicator</td><td>是否展示指示器，当 <code>type=line</code> 生效</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-add`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>editable</code>" }, null, _parent));
  _push(`</td><td>是否显示新增按钮，当 <code>type=segment</code> 不生效, 使用 <code>editable</code> 替代</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">editable</td><td>是否显示新增按钮，当 <code>type=segment</code> 不生效</td><td><code>boolean</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-change</td><td>切换前的回调函数<br>key: 待切换到的 tab 的 key<br>旧版本： change: 你需要手动调用 change() 来执行切换<br>v2: 当 <code>v2</code> 启用时候，beforeChange 返回 Promise&lt;false&gt;/false 来取消跳转</td><td><code>(key: HTabValue, change?: () =&gt; void) =&gt; PromiseLike&lt;boolean&gt;</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3 id="tabs-emits" class="no-underline h3"><a href="#tabs-emits" class="!no-underline">Tabs Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:active-key</td><td rowspan="1">更新选项卡 activeKey</td><td rowspan="1">( key: <code>HTabValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HTabValue</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">选项卡变化回调</td><td rowspan="1">( key: <code>HTabValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HTabValue</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">add</td><td rowspan="1">点击新增按钮的回调</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">点击关闭按钮的回调</td><td rowspan="1">( key: <code>HTabValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HTabValue</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "" }, null, _parent));
  _push(`</td><td rowspan="1">失焦时触发（请不要使用，请使用 change 替代完成和其他表单交互，下个版本移除）</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">sort</td><td rowspan="3">选项卡拖拽排序</td><td rowspan="3">( current: <code>number</code>, target: <code>number</code>, keys: <code>HTabValue[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">current</td><td><code>number</code></td><td>当前拖拽的索引</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td><code>number</code></td><td>目标索引</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">keys</td><td><code>HTabValue[]</code></td><td>排序后的 key 数组</td></tr></tbody></table><h2 id="tab-api" class="no-underline h2"><a href="#tab-api" class="!no-underline">Tab Api</a></h2><h3 id="tab-props" class="no-underline h3"><a href="#tab-props" class="!no-underline">Tab Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>key</code>" }, null, _parent));
  _push(`</td><td>选项卡的名称，需要唯一，请使用 <code>key</code> 替代</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>选项卡显示名称</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>图标名字，为空表示没有图标</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-size</td><td>图标大小</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用选项卡，当 <code>type=page</code> 不生效</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-close`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>closable</code>" }, null, _parent));
  _push(`</td><td>是否显示关闭按钮，当 <code>type=segment</code> 类型的选项卡不生效，请使用 <code>closable</code> 替代</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">closable</td><td>是否显示关闭按钮，当 <code>type=segment</code> 类型的选项卡不生效</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>是否可拖拽</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">min-width`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "请直接设置 <code>HTab.style</code> 来控制宽度d" }, null, _parent));
  _push(`</td><td>最小宽度，（请不要使用）</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-width`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "请直接设置 <code>HTab.style</code> 来控制宽度" }, null, _parent));
  _push(`</td><td>最大宽度，超出的文本会自动截断（请不要使用）</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3 id="tab-emits" class="no-underline h3"><a href="#tab-emits" class="!no-underline">Tab Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击页签触发点击事件</td><td rowspan="1">( key: <code>HTabValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HTabValue</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">点击页签上的关闭按钮</td><td rowspan="1">( key: <code>HTabValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HTabValue</code></td><td></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Tabs.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Tabs as default
};
