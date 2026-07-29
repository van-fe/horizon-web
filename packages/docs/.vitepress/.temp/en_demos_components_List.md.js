import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/List.md","filePath":"en/demos/components/List.md"}');
const _sfc_main = { name: "en/demos/components/List.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>List</h1><p class="description">Configure whether to display borders, whether to display in zebra pattern, whether to display dividers, etc. according to the props of the list. In addition, based on the list structure, you can use different element elements in different component slots</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Configure whether to display borders, whether to display in zebra pattern, whether to display dividers, etc. according to the props of the list. In addition, based on the list structure, you can use different element elements in different component slots</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="mb-4">
    <h-switch v-model="isZebra" label="是否斑马纹" class="switch" />
    <h-switch v-model="isBorder" label="是否显示边框" class="switch" />
    <h-switch v-model="isSplit" label="是否显示分界线" class="switch" />
    <h-button size="medium" type="primary" class="switch" @click="changeTitleSize">
      切换标题size
    </h-button>
  </div>

  <h-list
    :data="list"
    :max-height="400"
    :zebra="isZebra"
    :is-border="isBorder"
    :split="isSplit"
  >
    <template #item="{ item, index }">
      <h-list-item
        :key="index"
        :title="item.title"
        :describe="item.describe"
        :subtitle="item.subtitle"
        :title-size="titleSize"
      >
        <template #sider>
          <h-image
            src="https://source.demohome.com//MyNextEv/image/cutting/672C4D53B6559FFFF2A0523B21D36B35.jpg"
            object-fit="cover"
            :width="50"
            :height="50"
          />
        </template>
        <template #right>
          <section class="list-right">
            <section>
              <h-button size="medium" :plain="true" class="list-btn">撤销</h-button>
              <h-button size="medium" type="primary">提交</h-button>
            </section>
          </section>
        </template>
      </h-list-item>
    </template>
  </h-list>
</template>

<script lang="ts" setup>
import { HListItem } from '@aurora/horizon-web';
import { reactive, ref } from 'vue';
const list = reactive(
  Array(10)
    .fill('')
    .map((item, index) => {
      return {
        title: 'This is Title' + item,
        subtitle: 'Subhead' + item,
        describe: \`\${index}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat eget ipsum vel blandit. Nam sed enim orci. Vivamus non eros at ex varius luctus. Pellentesque blandit molestie leo, vel vulputate mi vehicula ac. Etiam dignissim arcu eget felis egestas cursus. Pellentesque tempus sollicitudin nulla at hendrerit.\`,
      };
    }),
);
const changeTitleSize = () => {
  titleSize.value = titleSize.value === 'medium' ? 'small' : 'medium';
};
const isZebra = ref(true);
const isBorder = ref(false);
const isSplit = ref(false);
const titleSize = ref<'medium' | 'small'>('medium');
<\/script>

<style scoped>
.list-right {
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}
.list-btn {
  margin-right: 12px;
}
.switch {
  margin-right: 12px;
}
</style>
`,
    path: "demos/components/List/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="demo2" tabindex="-1">Demo2 <a class="header-anchor" href="#demo2" aria-label="Permalink to &quot;Demo2&quot;">​</a></h2><p>Users can set the size of each list item according to the value of size. At the same time, the previous example shows the List component used together with the <code>item</code> slot. This example shows that users can directly use it together with the ListItem component. Users can choose according to the scenario</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script lang="ts" setup>
import { reactive, ref } from 'vue';

const list = reactive(
  Array(20)
    .fill('')
    .map((item, index) => {
      return {
        title: 'This is Title' + item,
        subtitle: 'subtitle',
        describe: \`\${index}: Aenean semper, dolor ac ultrices consequat, enim risus finibus lectus, sit amet egestas enim erat sed nunc. Duis consectetur commodo sapien, a tempus purus aliquam ut. Morbi id libero vel urna finibus auctor. Donec non lectus quis eros egestas hendrerit ac a nibh. Pellentesque sed tristique massa.\`,
      };
    }),
);
const size = ref('medium');
const titleBold = ref(true);
const isZebra = ref(false);
const isBorder = ref(true);
const isSplit = ref(true);
<\/script>

<template>
  <h-form label-position="left">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio label="medium">Medium</h-radio>
        <h-radio label="small">Small</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="title bold">
      <h-radio-group v-model="titleBold">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-list :max-height="300" :zebra="isZebra" :is-border="isBorder" :split="isSplit" :size="size">
    <h-list-item
      v-for="(item, index) in list"
      :key="index"
      :title-bold="titleBold"
      :title="item.title"
      :subtitle="item.subtitle"
      :describe="item.describe"
    />
  </h-list>
</template>

<style scoped>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
`,
    path: "demos/components/List/demo2.vue"
  }, null, _parent));
  _push(`<h2>List Api</h2><h3>List Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">data</td><td>列表数据，需要和 <code>item</code> 插槽同时使用，或者结合 <code>ListItem</code> 组件</td><td><code>any[]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">zebra</td><td>是否以斑马纹的形式显示</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-border`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "请改用 <code>props.border</code>" }, null, _parent));
  _push(`</td><td>是否带边框</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">border</td><td>是否带边框</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">split</td><td>是否显示分割线</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-height</td><td>列表的最大高度</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>列表Item的大小</td><td><code>&#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h2>ListItem Api</h2><h3>ListItem Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>列表项的标题</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title-size</td><td>列表项的标题大小</td><td><code>&#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">subtitle</td><td>列表项的副标题</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title-bold</td><td>标题是否加粗</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">describe</td><td>列表项的内容</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/List.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const List = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  List as default
};
