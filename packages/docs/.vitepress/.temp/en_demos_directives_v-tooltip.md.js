import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/directives/v-tooltip.md","filePath":"en/demos/directives/v-tooltip.md"}');
const _sfc_main = { name: "en/demos/directives/v-tooltip.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>v-tooltip</h1><p class="description">Control display direction based on <code>top</code> <code>right</code> <code>bottom</code> <code>left</code> <code>top-start</code> <code>top-end</code> <code>bottom-start</code> <code>bottom-end</code> modifiers</p><h2 id="position" tabindex="-1">Position <a class="header-anchor" href="#position" aria-label="Permalink to &quot;Position&quot;">​</a></h2><p>Control display direction based on <code>top</code> <code>right</code> <code>bottom</code> <code>left</code> <code>top-start</code> <code>top-end</code> <code>bottom-start</code> <code>bottom-end</code> modifiers</p>`);
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
  _push(`<h2 id="state" tabindex="-1">State <a class="header-anchor" href="#state" aria-label="Permalink to &quot;State&quot;">​</a></h2><p>Control whether it can be triggered to display based on the <code>disabled</code> modifier, control whether it is displayed based on the <code>visible</code> modifier, and control trigger conditions based on <code>hover</code> <code>click</code> <code>focus</code> <code>manual</code> modifiers</p>`);
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
  _push(`<h2 id="style" tabindex="-1">Style <a class="header-anchor" href="#style" aria-label="Permalink to &quot;Style&quot;">​</a></h2><p>Since <code>2.7.0</code>, control display size based on <code>medium</code> <code>small</code> modifiers, control display theme based on <code>dark</code> <code>light</code> modifiers</p>`);
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
  _push(`<h2 id="configuration-method" tabindex="-1">Configuration Method <a class="header-anchor" href="#configuration-method" aria-label="Permalink to &quot;Configuration Method&quot;">​</a></h2><p>You can pass in an <code>object</code> to control <code>v-tooltip</code> display</p>`);
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
  _push(`<h2 id="modifiers" tabindex="-1">Modifiers <a class="header-anchor" href="#modifiers" aria-label="Permalink to &quot;Modifiers&quot;">​</a></h2><table class="md-table"><thead><tr><th>Modifier</th><th>Description</th></tr></thead><tbody><tr><td>top | right | bottom | left | left-top | right-top | left-bottom | right-bottom</td><td>Pop up tooltip above (right/below/left/top-left/top-right/bottom-left/bottom-right) the target element</td></tr><tr><td>hover | click | focus | manual</td><td>Mouse hover (click/focus/right-click) target element to trigger tooltip</td></tr><tr><td>disabled</td><td>Disable tooltip popup</td></tr><tr><td>visible</td><td>Display tooltip</td></tr><tr><td>overflow</td><td>Display tooltip when text overflows</td></tr><tr><td>medium | small</td><td>Size</td></tr><tr><td>dark | light</td><td>Theme</td></tr></tbody></table><h2 id="tooltip-api" class="no-underline h2"><a href="#tooltip-api" class="!no-underline">Tooltip Api</a></h2><h3 id="tooltip-options" class="no-underline h3"><a href="#tooltip-options" class="!no-underline">Tooltip Options</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>是否Required</th><th>Default</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td rowspan="1">Trigger tooltipmessage框的behavior</td><td rowspan="1">No</td><td rowspan="1">&#39;hover&#39;</td><td rowspan="1"><code> &#39;hover&#39; | &#39;click&#39; | &#39;focus&#39; | &#39;manual&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td rowspan="1">Tooltip弹出direction</td><td rowspan="1">No</td><td rowspan="1">&#39;top&#39;</td><td rowspan="1"><code> &#39;top-start&#39; | &#39;top-end&#39; | &#39;bottom-start&#39; | &#39;bottom-end&#39; | &#39;top&#39; | &#39;bottom&#39; | &#39;right-start&#39; | &#39;left-start&#39; | &#39;right-end&#39; | &#39;left-end&#39; | &#39;right&#39; | &#39;left&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">distance</td><td rowspan="1">Tooltipdistancetargetelementoffsetdistance</td><td rowspan="1">No</td><td rowspan="1">12</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">popperClass</td><td rowspan="1">Custom tooltipclass name</td><td rowspan="1">No</td><td rowspan="1">&#39;&#39;</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td rowspan="1">Whether Display tooltip, 只有在 trigger 为 manual 时effective</td><td rowspan="1">No</td><td rowspan="1">false</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">skidding</td><td rowspan="1">Tooltip的positionoffset</td><td rowspan="1">No</td><td rowspan="1">0</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">arrow</td><td rowspan="1">Whether Display tooltip的箭头</td><td rowspan="1">No</td><td rowspan="1">true</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td rowspan="1">Whether Disable tooltip</td><td rowspan="1">No</td><td rowspan="1">false</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td rowspan="1">Tooltipcontent, 权重较slot低</td><td rowspan="1">No</td><td rowspan="1">&#39;This is a Tooltip&#39;</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">overflow</td><td rowspan="1">Whether overflow才Display</td><td rowspan="1">No</td><td rowspan="1">false</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">style</td><td rowspan="1">Additional style</td><td rowspan="1">No</td><td rowspan="1">-</td><td rowspan="1"><code> Object as DirectiveOptionType&lt;Partial&lt;CSSStyleDeclaration&gt;&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">reference</td><td rowspan="1">Mountnode</td><td rowspan="1">No</td><td rowspan="1">-</td><td rowspan="1"><code> Object as DirectiveOptionType&lt;HTMLElement&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">size`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "此设置已无效" }, null, _parent));
  _push(`</td><td rowspan="1">Size</td><td rowspan="1">No</td><td rowspan="1">&#39;medium&#39;</td><td rowspan="1"><code> &#39;medium&#39; | &#39;small&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">theme`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>light</code> 已过时，请改成 <code>dark</code>" }, null, _parent));
  _push(`</td><td rowspan="1">Theme</td><td rowspan="1">No</td><td rowspan="1">&#39;dark&#39;</td><td rowspan="1"><code> &#39;dark&#39; | &#39;light&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">showAfter</td><td rowspan="1">Description</td><td rowspan="1">No</td><td rowspan="1">200</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">hideAfter</td><td rowspan="1">Description</td><td rowspan="1">No</td><td rowspan="1">0</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/directives/v-tooltip.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vTooltip = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vTooltip as default
};
