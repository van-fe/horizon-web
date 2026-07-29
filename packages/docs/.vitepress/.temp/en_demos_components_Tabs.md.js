import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Tabs.md","filePath":"en/demos/components/Tabs.md"}');
const _sfc_main = { name: "en/demos/components/Tabs.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_code_block = resolveComponent("code-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Tabs</h1><p class="description">Basic usage of tabs. Default is <code>line</code> type, <code>medium</code> size</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Basic usage of tabs. Default is <code>line</code> type, <code>medium</code> size</p>`);
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
  _push(`<h2 id="status" tabindex="-1">Status <a class="header-anchor" href="#status" aria-label="Permalink to &quot;Status&quot;">​</a></h2><p>Tab items in disabled state indicate that the tab item exists but is not available in the current situation. Set a single tab <code>disabled</code>, when <code>type=page</code> it does not take effect.</p>`);
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
  _push(`<h2 id="size-type" tabindex="-1">Size Type <a class="header-anchor" href="#size-type" aria-label="Permalink to &quot;Size Type&quot;">​</a></h2><p>Define four sizes <code>mini | small | medium | large</code>, applied in different scenarios, default <code>medium</code>. Define four types <code>line | card | segment | page</code>, default <code>line</code>. <span style="${ssrRenderStyle({ "color": "#FA541C", "font-weight": "bold" })}">Special note: When the type is <code>page</code>, the <code>size</code> attribute is not supported.</span></p>`);
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
  --n-tabs-height--underline--line: 4px;
}

.customize-space {
  --n-tabs-padding--nav-wrap--card: 0;
}
</style>
`,
    path: "demos/components/Tabs/size-and-type.vue"
  }, null, _parent));
  _push(`<h2 id="tabs-with-icons" tabindex="-1">Tabs with Icons <a class="header-anchor" href="#tabs-with-icons" aria-label="Permalink to &quot;Tabs with Icons&quot;">​</a></h2><p>You can add an icon before the tab title.</p>`);
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
  _push(`<h2 id="scroll" tabindex="-1">Scroll <a class="header-anchor" href="#scroll" aria-label="Permalink to &quot;Scroll&quot;">​</a></h2><p>In tight spaces, you can scroll left and right to accommodate more tabs. The example shows the performance within an element with a width of <code>600px</code>. You can control whether to automatically scroll to the active element through <code>focusable</code></p>`);
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
  _push(`<h2 id="close-and-add" tabindex="-1">Close and Add <a class="header-anchor" href="#close-and-add" aria-label="Permalink to &quot;Close and Add&quot;">​</a></h2><p>By setting <code>n-tabs (editable)</code>, <code>n-tab (closable)</code> attributes, you can enable dynamic addition and deletion of tabs. Only effective in <code>line | card | page</code>; the logic of closing and adding is implemented by the business. <code>v2 = true</code>, if the deleted tab is the current tab, the first tab is selected by default</p>`);
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
  _push(`<h2 id="right-additional-operation-area" tabindex="-1">Right Additional Operation Area <a class="header-anchor" href="#right-additional-operation-area" aria-label="Permalink to &quot;Right Additional Operation Area&quot;">​</a></h2><p>You can add additional content, such as buttons, to the right of the tabs. <span style="${ssrRenderStyle({ "color": "#FA541C", "font-weight": "bold" })}">Special note: <code>segment</code> type does not support right operation area buttons</span></p>`);
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
  _push(`<h2 id="text-overflow" tabindex="-1">Text Overflow <a class="header-anchor" href="#text-overflow" aria-label="Permalink to &quot;Text Overflow&quot;">​</a></h2><p>The overflow part is displayed with &quot; ... &quot; and a text prompt appears when the mouse moves in.</p>`);
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
  _push(`<h2 id="draggable-tabs" tabindex="-1">Draggable Tabs <a class="header-anchor" href="#draggable-tabs" aria-label="Permalink to &quot;Draggable Tabs&quot;">​</a></h2><p>If you need to sort tabs, you can enable it by setting <code>draggable</code>.</p>`);
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
  _push(`<h2 id="use-with-n-panel" tabindex="-1">Use with <code>n-panel</code> <a class="header-anchor" href="#use-with-n-panel" aria-label="Permalink to &quot;Use with \`n-panel\`&quot;">​</a></h2><p>Use panel component to develop tab applications</p>`);
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
  _push(`<h2 id="before-change-callback" tabindex="-1">Before Change Callback <a class="header-anchor" href="#before-change-callback" aria-label="Permalink to &quot;Before Change Callback&quot;">​</a></h2><p>You can delay or prevent tab switching through <code>beforeChange</code>.</p>`);
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
  _push(`<h2 id="right-click-menu" tabindex="-1">Right-click Menu <a class="header-anchor" href="#right-click-menu" aria-label="Permalink to &quot;Right-click Menu&quot;">​</a></h2><p>Custom <code>slot</code> method to implement right-click menu</p>`);
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
  _push(`<h2 id="text-tabs" tabindex="-1">Text Tabs <a class="header-anchor" href="#text-tabs" aria-label="Permalink to &quot;Text Tabs&quot;">​</a></h2><p>Implemented by customizing <code>type=line</code> tabs. At this time, set <code>indicator=false</code></p>`);
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
  --n-tabs-space--tab--line--mini: 4px;
  --n-tabs-space--tab--line--small: 4px;
  --n-tabs-space--tab--line--medium: 4px;
  --n-tabs-space--tab--line--large: 4px;
}
</style>
`,
    path: "demos/components/Tabs/tab-text.vue"
  }, null, _parent));
  _push(`<h2 id="v1-x-compatibility" tabindex="-1">v1.x Compatibility <a class="header-anchor" href="#v1-x-compatibility" aria-label="Permalink to &quot;v1.x Compatibility&quot;">​</a></h2><p>For smoother business migration, complete compatibility has been made for v1.x version. You can set to use v2.x logic through v2. Affected logic points: <br> 1.<code>beforeChange</code> logic, after enabling, <code>beforeChange</code> returns <code>PromiseLike&lt;false&gt;</code> to prevent tab switching <br> 2.<code>emits.close</code>, after enabling, if the deleted tab is the active tab, the first tab is selected by default 3.<code>size</code>, after enabling, <code>small</code> size is used by default</p>`);
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
  _push(`<h2>Tabs Api</h2><h3>Tabs Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>activeKey</code>" }, null, _parent));
  _push(`</td><td>绑定值，表示当前选中的是哪个选项卡</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active-key</td><td>当前选中的选项卡的 key，支持 <code>v-model:active-key</code></td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v2</td><td>启用 <code>v2.x.x</code> 版本逻辑</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default-active-key</td><td>默认选中的选项卡的key（非受控状态，为空时选中第一个选项卡页）</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>选项卡尺寸大小，当 <code>type=page</code>, 该选项无效</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | &#39;huge&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>选项卡可拖拽改变位置</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollable</td><td>当元素过多时候，选项卡可滑动</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">focusable</td><td>当元素选中时候，选项卡是否滑动到目标元素</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">arrow</td><td>当页签超长的时候，是否使用箭头</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>选项卡Type, <code>type=segment</code> 已过时，请使用 <code>HSegmented</code> 替代</td><td><code>&#39;line&#39; | &#39;card&#39; | Segment | &#39;page&#39;</code></td><td class="text-center">No</td><td>&#39;line&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-underline`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>underline</code>" }, null, _parent));
  _push(`</td><td>是否显示水平分割线, 当 <code>type=line</code> 生效，使用 <code>underline</code> 替代</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">underline</td><td>是否显示水平分割线, 当 <code>type=line</code> 生效</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">indicator</td><td>是否展示指示器，当 <code>type=line</code> 生效</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-add`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>editable</code>" }, null, _parent));
  _push(`</td><td>是否显示新增按钮，当 <code>type=segment</code> 不生效, 使用 <code>editable</code> 替代</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">editable</td><td>是否显示新增按钮，当 <code>type=segment</code> 不生效</td><td><code>boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-change</td><td>切换前的回调函数<br>key: 待切换到的 tab 的 key<br>旧版本： change: 你需要手动调用 change() 来执行切换<br>v2: 当 <code>v2</code> 启用时候，beforeChange 返回 Promise&lt;false&gt;/false 来取消跳转</td><td><code>(key: HTabValue, change?: () =&gt; void) =&gt; PromiseLike&lt;boolean&gt;</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3>Tabs Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:active-key</td><td rowspan="1">更新选项卡 activeKey</td><td rowspan="1">( key: <code>HTabValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HTabValue</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">选项卡变化回调</td><td rowspan="1">( key: <code>HTabValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HTabValue</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">add</td><td rowspan="1">点击新增按钮的回调</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">点击关闭按钮的回调</td><td rowspan="1">( key: <code>HTabValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HTabValue</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "" }, null, _parent));
  _push(`</td><td rowspan="1">失焦时触发（请不要使用，请使用 change 替代完成和其他表单交互，下个版本移除）</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">sort</td><td rowspan="3">选项卡拖拽排序</td><td rowspan="3">( current: <code>number</code>, target: <code>number</code>, keys: <code>HTabValue[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">current</td><td><code>number</code></td><td>当前拖拽的索引</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td><code>number</code></td><td>目标索引</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">keys</td><td><code>HTabValue[]</code></td><td>排序后的 key 数组</td></tr></tbody></table><h2>Tab Api</h2><h3>Tab Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>key</code>" }, null, _parent));
  _push(`</td><td>选项卡的名称，需要唯一，请使用 <code>key</code> 替代</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>选项卡显示名称</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>图标名字，为空表示没有图标</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-size</td><td>图标大小</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用选项卡，当 <code>type=page</code> 不生效</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-close`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>closable</code>" }, null, _parent));
  _push(`</td><td>是否显示关闭按钮，当 <code>type=segment</code> Type的选项卡不生效，请使用 <code>closable</code> 替代</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">closable</td><td>是否显示关闭按钮，当 <code>type=segment</code> Type的选项卡不生效</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>是否可拖拽</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">min-width`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "请直接设置 <code>HTab.style</code> 来控制宽度d" }, null, _parent));
  _push(`</td><td>最小宽度，（请不要使用）</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-width`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "请直接设置 <code>HTab.style</code> 来控制宽度" }, null, _parent));
  _push(`</td><td>最大宽度，超出的文本会自动截断（请不要使用）</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3>Tab Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击页签触发点击事件</td><td rowspan="1">( key: <code>HTabValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HTabValue</code></td><td></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">点击页签上的关闭按钮</td><td rowspan="1">( key: <code>HTabValue</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key</td><td><code>HTabValue</code></td><td></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Tabs.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Tabs as default
};
