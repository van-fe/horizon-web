import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Badge.md","filePath":"zh/demos/components/Badge.md"}');
const _sfc_main = { name: "demos/components/Badge.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Badge</h1><p class="description">元素上的状态或数字标记</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><p>默认标记就是一个小红点。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-badge style="margin-right: 20px">\n    <div style="background: gray; width: 50px; height: 50px"></div>\n  </h-badge>\n  <h-badge bottom>\n    <div style="background: gray; width: 50px; height: 50px"></div>\n  </h-badge>\n</template>\n',
    path: "demos/components/Badge/basic.vue"
  }, null, _parent));
  _push(`<h2 id="数字" tabindex="-1">数字 <a class="header-anchor" href="#数字" aria-label="Permalink to &quot;数字&quot;">​</a></h2><p>你还可以展示一个数字类型的标记，并限定最大值。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="num"
    :content="item"
    :num-max="99"
    style="margin-right: 20px"
  >
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      listRef: ref([0, 8, 15, 10000]),
    };
  },
});
<\/script>
`,
    path: "demos/components/Badge/num.vue"
  }, null, _parent));
  _push(`<h2 id="颜色" tabindex="-1">颜色 <a class="header-anchor" href="#颜色" aria-label="Permalink to &quot;颜色&quot;">​</a></h2><p>你可以自定义标记的颜色。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-badge color="#7F1FBF" class="mr-5">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <h-badge bottom :color="colors.info" class="mr-5">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <h-badge type="num" :content="3" :color="colors.orange[4]">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { colors } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    return {
      colors,
    };
  },
});
<\/script>
`,
    path: "demos/components/Badge/color.vue"
  }, null, _parent));
  _push(`<h2 id="图标" tabindex="-1">图标 <a class="header-anchor" href="#图标" aria-label="Permalink to &quot;图标&quot;">​</a></h2><p>支持将一个图标作为标记内容。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="icon"
    :content="item.name"
    :icon-size="item.size"
    icon-color="#24A7B2"
    align="inner"
    bottom
    style="margin-right: 20px"
  >
    <div
      :style="{ width: item.containerWidth + 'px', height: item.containerWidth + 'px' }"
      style="background: gray; border-radius: 50%"
    ></div>
  </h-badge>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      listRef: ref([
        {
          containerWidth: 32,
          name: 'owner_os',
          size: 12,
        },
        {
          containerWidth: 56,
          name: 'owner_os',
          size: 16,
        },
        {
          containerWidth: 80,
          name: 'owner_os',
          size: 20,
        },
      ]),
    };
  },
});
<\/script>
`,
    path: "demos/components/Badge/icon.vue"
  }, null, _parent));
  _push(`<h2 id="显示隐藏" tabindex="-1">显示隐藏 <a class="header-anchor" href="#显示隐藏" aria-label="Permalink to &quot;显示隐藏&quot;">​</a></h2><p>默认情况下标记总是显示，即使是数字类型且值为 <code>0</code> 的情况，你可以通过 <code>hidden</code> 属性完全控制标记的显示状态。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="mb-4">
    <h-switch v-model="isHidden" label="hidden" label-position="right" />
  </div>
  <h-badge :hidden="isHidden" class="mr-5">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <h-badge :hidden="isHidden" type="num" :content="0" class="mr-5">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <h-badge :hidden="isHidden" type="num" :content="99" class="mr-5">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <h-badge
    :hidden="isHidden"
    type="icon"
    content="owner_os"
    :icon-size="12"
    icon-color="#24A7B2"
    align="inner"
    bottom
    class="mr-5"
  >
    <div style="background: gray; border-radius: 50%; width: 50px; height: 50px"></div>
  </h-badge>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isHidden = ref(false);
    return {
      isHidden,
    };
  },
});
<\/script>
`,
    path: "demos/components/Badge/hidden.vue"
  }, null, _parent));
  _push(`<h2 id="对齐方式" tabindex="-1">对齐方式 <a class="header-anchor" href="#对齐方式" aria-label="Permalink to &quot;对齐方式&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <p class="my-4">center-point，按中心点对齐</p>
  <h-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="num"
    :content="item"
    :num-max="99"
    style="margin-right: 20px"
  >
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <p class="my-4">inner，内部对齐</p>
  <h-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="num"
    align="inner"
    :content="item"
    :num-max="99"
    style="margin-right: 20px"
  >
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <p class="my-4">outer，外部对齐</p>
  <h-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="num"
    align="outer"
    :content="item"
    :num-max="99"
    style="margin-right: 20px"
  >
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <p class="my-4">fix-left，固定左边边距，长度向右延伸</p>
  <h-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="num"
    align="fix-left"
    :content="item"
    :num-max="99"
    style="margin-right: 20px"
  >
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <p class="my-4">自定义偏移量</p>
  <h-badge
    v-for="(item, index) in listRef"
    :key="index"
    type="num"
    align="fix-left"
    :offset="{ top: '-2px', right: '-2px' }"
    :content="item"
    :num-max="99"
    style="margin-right: 20px"
  >
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      listRef: ref([0, 8, 15, 10000]),
    };
  },
});
<\/script>

<style>
.my-4 {
  margin: 16px 0;
}
</style>
`,
    path: "demos/components/Badge/align.vue"
  }, null, _parent));
  _push(`<h2 id="badge-api" class="no-underline h2"><a href="#badge-api" class="!no-underline">Badge Api</a></h2><h3 id="badge-props" class="no-underline h3"><a href="#badge-props" class="!no-underline">Badge Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>类型<br>dot: 圆点<br>num: 数字<br>icon: 图标</td><td><code>&#39;dot&#39; | &#39;num&#39; | &#39;icon&#39;</code></td><td class="text-center">否</td><td>&#39;dot&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td>内容<br>当 type 是 num 时，表示数字<br>当 type 是 icon 时，表示图标名称</td><td><code>string | number</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hidden</td><td>是否隐藏</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">num-max</td><td>最大的数字，当大于该值时显示 \${numMax}+</td><td><code>number</code></td><td class="text-center">否</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">color</td><td>标记的颜色，仅对 type 为 dot 和 num 生效</td><td><code>string</code></td><td class="text-center">否</td><td>cssVariable(&#39;bg-error-default&#39;)</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-size</td><td>图标大小</td><td><code>number</code></td><td class="text-center">否</td><td>16</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-color</td><td>图标颜色</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">bottom</td><td>是否显示在右下角</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">align</td><td>位置</td><td><code>&#39;center-point&#39; | &#39;inner&#39; | &#39;outer&#39; | &#39;fix-left&#39;</code></td><td class="text-center">否</td><td>&#39;center-point&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">offset</td><td>偏移量</td><td><code>Offset</code></td><td class="text-center">否</td><td>null</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Badge.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Badge = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Badge as default
};
