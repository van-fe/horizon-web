import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/directives/v-tooltip.md","filePath":"zh/demos/directives/v-tooltip.md"}');
const _sfc_main = { name: "demos/directives/v-tooltip.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>v-tooltip</h1><p class="description"><code>v-tooltip</code> 是 <code>tooltip</code> 组件的指令使用方式</p><h2 id="位置" tabindex="-1">位置 <a class="header-anchor" href="#位置" aria-label="Permalink to &quot;位置&quot;">​</a></h2><p>依据 <code>top</code> <code>right</code> <code>bottom</code> <code>left</code> <code>top-start</code> <code>top-end</code> <code>bottom-start</code> <code>bottom-end</code> 修饰符控制显示方向</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-block">
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.top-start="'top-start'">top-start</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.top="'top'">top</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.top-end.child="'top-end'">top-end</h-button>
    </div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.left-start="'left-start'">left-start</h-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.right-start="'right-start'">right-start</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.left="'left'">left</h-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.right="'right'">right</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.left-end="'left-end'">left-end</h-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.right-end="'right-end'">right-end</h-button>
    </div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.bottom-start="'bottom-start'">bottom-start</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.bottom="'bottom'">bottom</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.bottom-end="'bottom-start'">bottom-start</h-button>
    </div>
    <div class="item"></div>
  </div>
</template>

<script setup lang="ts">
<\/script>

<style scoped>
.demo-block {
  width: 430px;
  display: grid;
  grid-template: repeat(5, 1fr) / repeat(5, 1fr);
  grid-gap: 20px;
}

.demo-block .item {
  width: 120px;
}

.demo-block .item button {
  width: 100%;
}
</style>
`,
    path: "demos/directives/v-tooltip/placement.vue"
  }, null, _parent));
  _push(`<h2 id="状态" tabindex="-1">状态 <a class="header-anchor" href="#状态" aria-label="Permalink to &quot;状态&quot;">​</a></h2><p>依据 <code>disabled</code> 修饰符控制能否触发显示，依据 <code>visible</code> 修饰符控制是否显示，根据 <code>hover</code> <code>click</code> <code>focus</code> <code>manual</code> 修饰符控制触发条件</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="block">
    <h-button v-tooltip="hoverMsg">hover top</h-button>
    <h-button v-tooltip.click.left="clickMsg">click left</h-button>
    <h-button v-tooltip.right.focus="focusMsg">focus right</h-button>
    <h-button v-tooltip.manual="contextmenuMsg">manual top</h-button>
    <h-button v-tooltip.disabled>disabled</h-button>
    <h-button v-tooltip.visible="'visible'">visible</h-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let hoverMsg = ref('hover top');
    let clickMsg = ref('click left');
    let focusMsg = ref('focus right');
    let contextmenuMsg = ref('contextmenu top');
    return {
      hoverMsg,
      clickMsg,
      focusMsg,
      contextmenuMsg,
    };
  },
});
<\/script>

<style scoped>
.block {
  display: flex;
}

.block .h-button {
  margin-left: 20px;
}
</style>
`,
    path: "demos/directives/v-tooltip/trigger.vue"
  }, null, _parent));
  _push(`<h2 id="样式" tabindex="-1">样式 <a class="header-anchor" href="#样式" aria-label="Permalink to &quot;样式&quot;">​</a></h2><p>自 <code>2.7.0</code> 开始， 依据 <code>medium</code> <code>small</code> 修饰符控制显示尺寸，依据 <code>dark</code> <code>light</code> 修饰符控制显示主题</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="block">
    <h-button v-tooltip.small="'Small'">Small</h-button>
    <h-button v-tooltip.light="'Light'">Light</h-button>
    <h-button v-tooltip.small.light="'Small + Light'">Small + Light</h-button>
  </div>
</template>

<script lang="ts"><\/script>

<style scoped>
.block {
  display: flex;
}

.block .h-button {
  margin-left: 20px;
}
</style>
`,
    path: "demos/directives/v-tooltip/style.vue"
  }, null, _parent));
  _push(`<h2 id="配置方式" tabindex="-1">配置方式 <a class="header-anchor" href="#配置方式" aria-label="Permalink to &quot;配置方式&quot;">​</a></h2><p>可以传入 <code>object</code> 来控制 <code>v-tooltip</code> 显示</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="block">
    <h-button v-tooltip="tooltipMsgOptions">options message Tooltip</h-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const tooltipMsgOptions = ref({
      content: 'options message Tooltip',
    });
    return {
      tooltipMsgOptions,
    };
  },
});
<\/script>
`,
    path: "demos/directives/v-tooltip/options.vue"
  }, null, _parent));
  _push(`<h2 id="modifiers" tabindex="-1">Modifiers <a class="header-anchor" href="#modifiers" aria-label="Permalink to &quot;Modifiers&quot;">​</a></h2><table class="md-table"><thead><tr><th>修饰符</th><th>说明</th></tr></thead><tbody><tr><td>top | right | bottom | left | left-top | right-top | left-bottom | right-bottom</td><td>在目标元素上(右/下/左/左上/右上/左下/右下)方弹出 tooltip</td></tr><tr><td>hover | click | focus | manual</td><td>鼠标悬浮(点击/受焦/右键)目标元素触发 tooltip</td></tr><tr><td>disabled</td><td>禁止 tooltip 弹出</td></tr><tr><td>visible</td><td>显示 tooltip</td></tr><tr><td>overflow</td><td>文字溢出显示 tooltip</td></tr><tr><td>medium | small</td><td>尺寸</td></tr><tr><td>dark | light</td><td>主题</td></tr></tbody></table><h2 id="tooltip-api" class="no-underline h2"><a href="#tooltip-api" class="!no-underline">Tooltip Api</a></h2><h3 id="tooltip-options" class="no-underline h3"><a href="#tooltip-options" class="!no-underline">Tooltip Options</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>是否必填</th><th>默认值</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td rowspan="1">触发tooltip提示框的行为</td><td rowspan="1">否</td><td rowspan="1">&#39;hover&#39;</td><td rowspan="1"><code> &#39;hover&#39; | &#39;click&#39; | &#39;focus&#39; | &#39;manual&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td rowspan="1">tooltip弹出方向</td><td rowspan="1">否</td><td rowspan="1">&#39;top&#39;</td><td rowspan="1"><code> &#39;top-start&#39; | &#39;top-end&#39; | &#39;bottom-start&#39; | &#39;bottom-end&#39; | &#39;top&#39; | &#39;bottom&#39; | &#39;right-start&#39; | &#39;left-start&#39; | &#39;right-end&#39; | &#39;left-end&#39; | &#39;right&#39; | &#39;left&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">distance</td><td rowspan="1">tooltip距离目标元素偏移距离</td><td rowspan="1">否</td><td rowspan="1">12</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">popperClass</td><td rowspan="1">自定义tooltip类名</td><td rowspan="1">否</td><td rowspan="1">&#39;&#39;</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td rowspan="1">是否显示 <code>tooltip</code>，只有在 <code>trigger</code> 为 <code>manual</code> 时生效</td><td rowspan="1">否</td><td rowspan="1">false</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">skidding</td><td rowspan="1">tooltip的位置偏移</td><td rowspan="1">否</td><td rowspan="1">0</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">arrow</td><td rowspan="1">是否显示tooltip的箭头</td><td rowspan="1">否</td><td rowspan="1">true</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td rowspan="1">是否禁用tooltip</td><td rowspan="1">否</td><td rowspan="1">false</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td rowspan="1">tooltip内容，权重较slot低</td><td rowspan="1">否</td><td rowspan="1">&#39;This is a Tooltip&#39;</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">overflow</td><td rowspan="1">是否溢出才显示</td><td rowspan="1">否</td><td rowspan="1">false</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">style</td><td rowspan="1">附带样式</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> Object as DirectiveOptionType&lt;Partial&lt;CSSStyleDeclaration&gt;&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">reference</td><td rowspan="1">挂载节点</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> Object as DirectiveOptionType&lt;HTMLElement&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">size`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "此设置已无效" }, null, _parent));
  _push(`</td><td rowspan="1">尺寸</td><td rowspan="1">否</td><td rowspan="1">&#39;medium&#39;</td><td rowspan="1"><code> &#39;medium&#39; | &#39;small&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">theme`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>light</code> 已过时，请改成 <code>dark</code>" }, null, _parent));
  _push(`</td><td rowspan="1">主题</td><td rowspan="1">否</td><td rowspan="1">&#39;dark&#39;</td><td rowspan="1"><code> &#39;dark&#39; | &#39;light&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">showAfter</td><td rowspan="1">在鼠标悬浮后多少毫秒展示</td><td rowspan="1">否</td><td rowspan="1">200</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">hideAfter</td><td rowspan="1">在鼠标离开后多少毫秒消失</td><td rowspan="1">否</td><td rowspan="1">0</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/directives/v-tooltip.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vTooltip = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vTooltip as default
};
