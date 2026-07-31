import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Link.md","filePath":"zh/demos/components/Link.md"}');
const _sfc_main = { name: "demos/components/Link.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Link</h1><p class="description">文字超链接</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><p>基础的文字链接用法</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="demo-wrapper">\n    <h-link>Default</h-link>\n    <h-link :loading="true">Loading text will replace me</h-link>\n  </div>\n</template>\n\n<style scoped>\n.demo-wrapper {\n  display: flex;\n  align-items: center;\n}\n</style>\n',
    path: "demos/components/Link/base.vue"
  }, null, _parent));
  _push(`<h2 id="不同尺寸" tabindex="-1">不同尺寸 <a class="header-anchor" href="#不同尺寸" aria-label="Permalink to &quot;不同尺寸&quot;">​</a></h2><p>通过设置 <code>size</code> 来控制尺寸</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div>\n    <h-row>\n      <h-col>\n        <h-link size="small">Small</h-link>\n        <h-link size="medium">Medium</h-link>\n        <h-link size="large">Large</h-link>\n      </h-col>\n    </h-row>\n    <h-row>\n      <h-col>\n        <h-link size="small" :loading="true">Small</h-link>\n        <h-link size="medium" :loading="true">Medium</h-link>\n        <h-link size="large" :loading="true">Large</h-link>\n      </h-col>\n    </h-row>\n  </div>\n</template>\n\n<script lang="ts">\nexport default {\n  data() {\n    return {\n      loading: false,\n    };\n  },\n};\n<\/script>\n',
    path: "demos/components/Link/size.vue"
  }, null, _parent));
  _push(`<h2 id="不同类型" tabindex="-1">不同类型 <a class="header-anchor" href="#不同类型" aria-label="Permalink to &quot;不同类型&quot;">​</a></h2><p>使用 <code>type</code> 来设置 <code>link</code> 的不同状态</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="demo-wrapper">\n    <h-link>Positive</h-link>\n    <h-link type="neutral">Neutral</h-link>\n    <h-link type="negative">Negative</h-link>\n  </div>\n</template>\n\n<style scoped>\n.demo-wrapper {\n  display: flex;\n  align-items: center;\n}\n</style>\n',
    path: "demos/components/Link/type.vue"
  }, null, _parent));
  _push(`<h2 id="不同状态" tabindex="-1">不同状态 <a class="header-anchor" href="#不同状态" aria-label="Permalink to &quot;不同状态&quot;">​</a></h2><p>文字链接不同状态</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-link :href="randomHref">Will Visit</h-link>
  <h-link :href="currentHref">Already Visited</h-link>
  <h-link disabled>Disabled</h-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  computed: {
    currentHref() {
      return window.location.href;
    },
    randomHref() {
      return '?' + Math.round(Math.random() * 1000000);
    },
  },
});
<\/script>
`,
    path: "demos/components/Link/status.vue"
  }, null, _parent));
  _push(`<h2 id="跳转方式" tabindex="-1">跳转方式 <a class="header-anchor" href="#跳转方式" aria-label="Permalink to &quot;跳转方式&quot;">​</a></h2><p>文字链接跳转方式，与 <code>a</code> 标签的 <code>target</code> 相同</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { computed } from 'vue';

const randomHref = computed(() => '?' + Math.round(Math.random() * 1000000));
<\/script>

<template>
  <h-link :href="randomHref">Jump to Home in this page</h-link>
  <h-link :href="randomHref" target="_blank">Jump to Home in new window</h-link>
</template>
`,
    path: "demos/components/Link/jump-reaction.vue"
  }, null, _parent));
  _push(`<h2 id="下划线" tabindex="-1">下划线 <a class="header-anchor" href="#下划线" aria-label="Permalink to &quot;下划线&quot;">​</a></h2><p>文字链接下划线</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-link>with underline</h-link>\n  <h-link :underline="false">without underline</h-link>\n  <h-link underline="always">Always Show</h-link>\n</template>\n',
    path: "demos/components/Link/underline.vue"
  }, null, _parent));
  _push(`<h2 id="icon" tabindex="-1">ICON <a class="header-anchor" href="#icon" aria-label="Permalink to &quot;ICON&quot;">​</a></h2><p>可以设置 <code>icon</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-link :href="randomHref" :underline="false" icon="share" icon-suffix="2xs">
    Open New Link
  </h-link>
  <h-link :href="currentHref" :underline="false" icon="share" icon-suffix="2xs">
    Open Visited Link
  </h-link>
  <h-link :href="randomHref" :underline="false" icon="share" icon-suffix="2xs" disabled>
    Disable Open Link
  </h-link>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    currentHref() {
      return window.location.href;
    },
    randomHref() {
      return '?' + Math.round(Math.random() * 1000000);
    },
  },
});
<\/script>
`,
    path: "demos/components/Link/icon.vue"
  }, null, _parent));
  _push(`<h2 id="注释" tabindex="-1">注释 <a class="header-anchor" href="#注释" aria-label="Permalink to &quot;注释&quot;">​</a></h2><p>有注释效果的链接。文字链接不提供弹框，请使用 <code>h-popover</code> 包裹</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-popover>\n    <template #popper>\n      <h-pop-content>Something need to popper...</h-pop-content>\n    </template>\n    <template #reference>\n      <h-link attribute type="text">Has Attribute</h-link>\n    </template>\n  </h-popover>\n</template>\n',
    path: "demos/components/Link/attribute.vue"
  }, null, _parent));
  _push(`<h2 id="锚点" tabindex="-1">锚点 <a class="header-anchor" href="#锚点" aria-label="Permalink to &quot;锚点&quot;">​</a></h2><p>带有锚点，也可以设置 <code>anchor-offset</code> 滚动至距顶 px</p><p>因为本文档的内容放在了 <code>h-main</code> 中，所以需要设置 <code>scroll-target</code></p><p>需要注意的是:</p><ul><li>如果同时传入了 <code>anchor</code> 、 <code>to</code> 或 <code>href</code>，会忽略 <code>to</code> 与 <code>href</code></li><li>必须使用 history 的路由形式，hash 路由形式会影响锚点的使用</li></ul>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <p>\n    <h-link anchor="anchor" type="text" :underline="false" scroll-target=".VPDoc">Anchor</h-link>\n  </p>\n  <p>\n    <h-link\n      anchor="anchor2"\n      :anchor-offset="200"\n      type="text"\n      :underline="false"\n      scroll-target=".VPDoc"\n    >\n      Anchor2 Set Offset 200\n    </h-link>\n  </p>\n</template>\n',
    path: "demos/components/Link/anchor.vue"
  }, null, _parent));
  _push(`<h2 id="配合-vue-router-使用" tabindex="-1">配合 <code>vue-router</code> 使用 <a class="header-anchor" href="#配合-vue-router-使用" aria-label="Permalink to &quot;配合 \`vue-router\` 使用&quot;">​</a></h2><p>可以通过 <code>to</code> <code>replace</code> 参数配合 <code>vue-router</code></p><blockquote><p><em>需要注意，<code>to</code> 判断优先级高于 <code>href</code></em></p></blockquote>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-link to="/">Go to other route</h-link>\n  <h-link to="/" replace>Go to other route and replace</h-link>\n</template>\n',
    path: "demos/components/Link/vue-router.vue"
  }, null, _parent));
  _push(`<h2 id="前后缀" tabindex="-1">前后缀 <a class="header-anchor" href="#前后缀" aria-label="Permalink to &quot;前后缀&quot;">​</a></h2><p>有前后缀的链接，可以使用 <code>icon</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <p>
    <h-link>
      <template #suffix>...</template>
      And So on
    </h-link>
  </p>
  <p>
    <h-link icon="el-icon-edit" :underline="false">
      {{ new Date().toLocaleString() }}
      <template #prefix><a-icon name="time" suffix="2xs" /></template>
    </h-link>
  </p>
</template>

<script>
import { defineComponent } from 'vue';
import { AIcon } from '@aurora/icon';

export default defineComponent({
  components: {
    AIcon,
  },
});
<\/script>
`,
    path: "demos/components/Link/prefix-suffix.vue"
  }, null, _parent));
  _push(`<h2 id="link-api" class="no-underline h2"><a href="#link-api" class="!no-underline">Link Api</a></h2><h3 id="link-props" class="no-underline h3"><a href="#link-props" class="!no-underline">Link Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>类型<br><code>default / text</code> 将被废弃</td><td><code>&#39;default&#39; | &#39;text&#39; | &#39;positive&#39; | &#39;neutral&#39; | &#39;negative&#39;</code></td><td class="text-center">否</td><td>&#39;positive&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">underline</td><td>是否启用下划线</td><td><code>boolean | &#39;always&#39;</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">href</td><td>原生href属性</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td>原生target属性</td><td><code>&#39;_blank&#39; | &#39;_self&#39; | &#39;_parent&#39; | &#39;_top&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">attribute</td><td>是否有注释</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">anchor</td><td>锚点，会对当前 link 增加<code>id</code>为此值</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">anchor-position</td><td>锚点位置</td><td><code>&#39;right&#39; | &#39;left&#39;</code></td><td class="text-center">否</td><td>&#39;right&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">anchor-offset</td><td>锚点距顶部偏移px</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>字体，即 <code>a-icon</code> 的 <code>name</code> 属性，或直接传入 icon 对象</td><td><code>iconPropType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon-size</td><td><code>a-icon</code> 的 <code>size</code> 属性</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to</td><td>路由跳转对象，同 <code>vue-router</code> 的 <code>to</code></td><td><code>RouteLocationRaw</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">replace</td><td>在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-target</td><td>滑动的外包容器，默认为 <code>body</code><br>设置的如果是 <code>string</code> 类型，会传入 <code>document.querySelector</code> 获取元素</td><td><code>string | Element</code></td><td class="text-center">否</td><td>&#39;body&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>大小</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loading</td><td>是否正在加载，内容文字会被国际化替换<br>需要注意的是，加载中的 <code>link</code> 会忽视 <code>click</code> 事件</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3 id="link-emits" class="no-underline h3"><a href="#link-emits" class="!no-underline">Link Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击链接后的事件</td><td rowspan="1">( event: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">event</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Link.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Link = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Link as default
};
