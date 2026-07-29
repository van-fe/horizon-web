import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/AutoComplete.md","filePath":"en/demos/components/AutoComplete.md"}');
const _sfc_main = { name: "en/demos/components/AutoComplete.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>AutoComplete</h1><p class="description">Note that if you want to display alternative options directly after clicking, you need to provide data to <code>options</code> before input</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Note that if you want to display alternative options directly after clicking, you need to provide data to <code>options</code> before input</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form :inline="true" label-position="top">
    <h-form-item label="尺寸">
      <h-select v-model="sizeValue" :to-body="false">
        <h-option value="large" label="large" />
        <h-option value="medium" label="medium" />
        <h-option value="small" label="small" />
      </h-select>
    </h-form-item>
    <h-form-item label="样式">
      <h-select v-model="inputStyle" :to-body="false">
        <h-option value="normal" label="normal" />
        <h-option value="emphasize" label="emphasize" />
        <h-option value="no-border" label="no-border" />
      </h-select>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <h-auto-complete :options="options" :size="sizeValue" :input-style="inputStyle" @search="onSearch" @select="onSelect" @update:model-value="onUpdate" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import type { HAutoCompleteOptionProps } from '@aurora/horizon-web';
import { useAutoCompleteProps } from '@aurora/horizon-web';

const sizeValue = ref<Required<ExtractPropTypes<typeof useAutoCompleteProps>['size']>>('medium');
const inputStyle = ref<Required<ExtractPropTypes<typeof useAutoCompleteProps>['inputStyle']>>('normal');

const options = ref<Partial<HAutoCompleteOptionProps>[]>([]);

function onSearch(val: string) {
  options.value = [];

  if (val) {
    new Array(10).fill(0).forEach((_, index) => {
      const value = val.repeat(index + 1);
      options.value.push({
        label: value,
        value,
      });
    });
  }
}

function onSelect(val: string) {
  console.info('select: ', val);
}

function onUpdate(val: string) {
  console.info('update: ', val);
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/AutoComplete/basic.vue"
  }, null, _parent));
  _push(`<h2 id="display-description" tabindex="-1">Display Description <a class="header-anchor" href="#display-description" aria-label="Permalink to &quot;Display Description&quot;">​</a></h2><p><code>options</code> accepts <code>description</code> option</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="position">
      <h-radio-group v-model="position">
        <h-radio label="right" />
        <h-radio label="bottom" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <h-auto-complete :options="options" :description-position="position" @search="onSearch" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HAutoCompleteOptionProps } from '@aurora/horizon-web';

const options = ref<Partial<HAutoCompleteOptionProps>[]>([]);

const position = ref('right');

function onSearch(val: string) {
  options.value = [];

  if (val) {
    new Array(10).fill(0).forEach((_, index) => {
      const value = val.repeat(index + 1);
      options.value.push({
        label: value,
        description: \`第 \${index + 1} 个选项\`,
        value,
      });
    });
  }
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/AutoComplete/description.vue"
  }, null, _parent));
  _push(`<h2 id="loading-state" tabindex="-1">Loading State <a class="header-anchor" href="#loading-state" aria-label="Permalink to &quot;Loading State&quot;">​</a></h2><p>You can set the value of <code>loading</code> to wait for remote loading</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">默认样式</div>
      <h-auto-complete :options="options1" :loading="loading1" @search="(val: string) => onSearch(val, 1)" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">显示搜索文字</div>
      <h-auto-complete :options="options2" :loading="loading2" loading-text="搜索中" @search="(val: string) => onSearch(val, 2)" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HAutoCompleteOptionProps } from '@aurora/horizon-web';

const options1 = ref<Partial<HAutoCompleteOptionProps>[]>([]);
const options2 = ref<Partial<HAutoCompleteOptionProps>[]>([]);

const loading1 = ref(false);
const loading2 = ref(false);

let timer: NodeJS.Timer | null = null;

function clearTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

function onSearch(val: string, index = 1) {
  if (val) {
    const target = index === 1 ? options1 : options2;
    const loading = index === 1 ? loading1 : loading2;
    loading.value = true;

    clearTimer();

    timer = setTimeout(() => {
      target.value = [];
      new Array(10).fill(0).forEach((_, index) => {
        const value = val.repeat(index + 1);
        target.value.push({
          label: value,
          value,
        });
      });

      loading.value = false;
    }, 2000);
  } else {
    target.value = [];
  }
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/AutoComplete/loading.vue"
  }, null, _parent));
  _push(`<h2 id="custom-slot-display" tabindex="-1">Custom Slot Display <a class="header-anchor" href="#custom-slot-display" aria-label="Permalink to &quot;Custom Slot Display&quot;">​</a></h2><p>You can use the <code>default</code> slot to display custom content</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-auto-complete :options="options" :fit-input-width="false" placeholder="You like..." @search="onSearch">
        <template #default="item">
          <div class="item-wrap">
            <div class="title">{{ item.label }}</div>
            <div class="title"><h-tag :clickable="false">{{ item.description }}</h-tag></div>
          </div>
        </template>
      </h-auto-complete>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HAutoCompleteOptionProps } from '@aurora/horizon-web';
import { faker } from '@faker-js/faker';

const options = ref<Partial<HAutoCompleteOptionProps>[]>([]);

function onSearch(val: string) {
  options.value = [];

  if (val) {
    new Array(10).fill(0).forEach(() => {
      options.value.push({
        label: faker.helpers.fake(\`\${faker.name.fullName()} likes \${val}\`),
        description: faker.animal.dog(),
      });
    });
  }
}
<\/script>

<style scoped>
.item-wrap {
  display: flex;
  flex-direction: column;
}
</style>
`,
    path: "demos/components/AutoComplete/custom-render.vue"
  }, null, _parent));
  _push(`<h2 id="value-priority" tabindex="-1">Value Priority <a class="header-anchor" href="#value-priority" aria-label="Permalink to &quot;Value Priority&quot;">​</a></h2><p>If there is a <code>value</code> field in the passed <code>option</code>, the value of <code>value</code> will be used first</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row>\n    <h-col :span="6">\n      <h-auto-complete :options="options" :fit-input-width="false" placeholder="You like..." clearable @search="onSearch">\n        <template #default="item">\n          <div class="item-wrap">\n            <div class="title">{{ item.label }}</div>\n            <div class="font-bold">{{ item.value }}</div>\n          </div>\n        </template>\n      </h-auto-complete>\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts">\nimport { ref } from \'vue\';\nimport type { HAutoCompleteOptionProps } from \'@aurora/horizon-web\';\nimport { faker } from \'@faker-js/faker\';\n\nconst options = ref<Partial<HAutoCompleteOptionProps>[]>([]);\n\nfunction onSearch(val: string) {\n  options.value = [];\n\n  if (val) {\n    new Array(10).fill(0).forEach(() => {\n      options.value.push({\n        value: faker.helpers.fake(`${faker.animal.cat()} also likes ${val}`),\n        label: faker.helpers.fake(`${faker.name.fullName()} likes ${val}`),\n      });\n    });\n  }\n}\n<\/script>\n\n<style scoped>\n.item-wrap {\n  display: flex;\n  flex-direction: column;\n}\n</style>\n',
    path: "demos/components/AutoComplete/value-label.vue"
  }, null, _parent));
  _push(`<h2>AutoComplete Api</h2><h3>AutoComplete Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>value 值</td><td><code>string | undefined | null</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>是否可清空输入框</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>触发方式</td><td><code>&#39;hover&#39; | &#39;click&#39;</code></td><td class="text-center">No</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>放置位置</td><td><code>| &#39;auto&#39;<br>      | &#39;auto-start&#39;<br>      | &#39;auto-end&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;<br>      | &#39;left&#39;</code></td><td class="text-center">No</td><td>&#39;bottom-start&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>是否发送到 body 节点</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-style</td><td>选择器输入框样式<br><code>normal</code>: 基础样式<br><code>emphasize</code>: 面性样式<br><code>no-border</code>: 无边框样式</td><td><code>PickerInputStyleType</code></td><td class="text-center">No</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placeholder</td><td>占位符，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-text</td><td>空时显示文字，默认使用国际化配置</td><td><code>string | VNode</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">destroy-on-hide</td><td>在隐藏后是否销毁面板</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popover-options</td><td>给 popover 的额外参数</td><td><code>Partial&lt;PopoverProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-input-width</td><td>下拉框宽度是否与输入框相同</td><td><code>boolean | &#39;fit-content&#39;</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-show-delay</td><td>鼠标悬浮后多久显示 <code>popper</code><br>仅在 <code>trigger = hover</code> 时有效</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-hide-delay</td><td>鼠标移出后后多久隐藏 <code>popper</code><br>仅在 <code>trigger = hover</code> 时有效</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-icon</td><td>自定义下拉按钮<br>可以传入 <code>a-icon</code> 的 <code>name</code>，也可以直接是 <code>svg</code><br>如果传入 <code>false</code>，即不展示图标</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-style</td><td>自定义样式</td><td><code>StyleValue</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-class</td><td>自定义 class</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-panel-style</td><td>自定义面板样式</td><td><code>CSSProperties</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">external-panel-class</td><td>自定义面板 class</td><td><code>string</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide-panel-when-empty-list</td><td>是否在无选项时，默认隐藏面板</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading</td><td>面板是否处于加载中</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading-text</td><td>加载时自定义文案，默认为空</td><td><code>string | VNode</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-option-order-to-top</td><td>是否将已选择的选项置顶<br>只有在重新打开面板时才会排序</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-status</td><td>输入框的状态</td><td><code>PickerInputStatusType</code></td><td class="text-center">No</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-list-max-height</td><td>选项列表最大高度</td><td><code>string | number</code></td><td class="text-center">No</td><td>296</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description-position</td><td><code>n-option</code> 中 <code>description</code> 的位置</td><td><code>&#39;right&#39; | &#39;bottom&#39;</code></td><td class="text-center">No</td><td>&#39;right&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-emit-frequency</td><td>输入触发事件的频率<br>请谨慎设置，防止触发过快或过慢导致非预期的问题</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">search-icon</td><td>搜索 <code>icon</code><br>如果不需要搜索 <code>icon</code>，则设置为 <code>false</code></td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-show-after</td><td>所有有 <code>tooltip</code> 的地方，在悬浮后延迟多少毫秒显示 <code>tooltip</code></td><td><code>number</code></td><td class="text-center">No</td><td>100</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-hide-after</td><td>所有有 <code>tooltip</code> 的地方，在显示后延迟多少毫秒移除 <code>tooltip</code></td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">options</td><td>展示的选项</td><td><code>HAutoCompleteOption[]</code></td><td class="text-center">No</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-panel-by-children</td><td>是否在开启虚拟滚动时，允许 <code>option</code> 撑开面板</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3>AutoComplete Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-visible-change</td><td rowspan="1">下拉面板显隐切换时通知</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>是否显示</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">聚焦时通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">search</td><td rowspan="1">输入文字时触发</td><td rowspan="1">( inputValue: <code>string | null | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputValue</td><td><code>string | null | undefined</code></td><td>输入的文字</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-list-reach-bottom</td><td rowspan="1">在 <code>option</code> 列表滚动到底部时触发，可以做动态载入选项的回调</td><td rowspan="1">( evt: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>Event</code></td><td>滚动事件或者键盘事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">清空时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">选中选项更改时触发</td><td rowspan="1">( value: <code>string | null | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | null | undefined</code></td><td>选项值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">select</td><td rowspan="1">选中选项时触发</td><td rowspan="1">( value: <code>string | null | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string | null | undefined</code></td><td>选项值</td></tr></tbody></table><h3>AutoComplete Exposes</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">changePanelVisible</td><td rowspan="1">控制面板是否展示</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/AutoComplete.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AutoComplete = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  AutoComplete as default
};
