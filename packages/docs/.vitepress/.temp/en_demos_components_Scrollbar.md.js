import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Scrollbar.md","filePath":"en/demos/components/Scrollbar.md"}');
const _sfc_main = { name: "en/demos/components/Scrollbar.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Scrollbar</h1><p class="description">By setting <code>height</code>, when the content height exceeds this height, a scrollbar will be displayed</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>By setting <code>height</code>, when the content height exceeds this height, a scrollbar will be displayed</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-scrollbar height="400px">\n    <div v-for="item of 20" :key="item" class="item">\n      {{ item }}\n    </div>\n  </h-scrollbar>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.item {\n  height: 40px;\n  background: var(--h-bg-info-weak-default);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 10px;\n}\n</style>\n',
    path: "demos/components/Scrollbar/basic.vue"
  }, null, _parent));
  _push(`<h2 id="size" tabindex="-1">Size <a class="header-anchor" href="#size" aria-label="Permalink to &quot;Size&quot;">​</a></h2><p>In pages, drawers, popups, and containers, it is recommended to use <code>medium</code></p><p>In dropdown popups and editors, it is recommended to use <code>small</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row>\n    <h-col :span="18">\n      <div class="demo-title">容器中使用 <code>medium</code></div>\n      <h-scrollbar height="400px">\n        <div v-for="item of 20" :key="item" class="item">\n          {{ item }}\n        </div>\n      </h-scrollbar>\n    </h-col>\n    <h-col :span="6">\n      <div class="demo-title">弹窗中使用 <code>small</code></div>\n      <h-popover placement="bottom" :to-body="false">\n        <template #popper>\n          <h-pop-content>\n            <h-scrollbar size="small" height="400px">\n              <div v-for="item of 20" :key="item" class="item" style="width: 300px;">\n                {{ item }}\n              </div>\n            </h-scrollbar>\n          </h-pop-content>\n        </template>\n        <template #reference>\n          <h-button>Hover Me</h-button>\n        </template>\n      </h-popover>\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.item {\n  height: 40px;\n  background: var(--h-bg-info-weak-default);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 10px;\n}\n</style>\n',
    path: "demos/components/Scrollbar/size.vue"
  }, null, _parent));
  _push(`<h2 id="horizontal-scroll" tabindex="-1">Horizontal Scroll <a class="header-anchor" href="#horizontal-scroll" aria-label="Permalink to &quot;Horizontal Scroll&quot;">​</a></h2><p>When the width is greater than the container width, a horizontal scrollbar will be displayed</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-scrollbar size="small" max-height="400px">\n    <div class="wrap">\n      <div v-for="item of 50" :key="item" class="item">\n        {{ item }}\n      </div>\n    </div>\n  </h-scrollbar>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.wrap {\n  display: flex;\n  flex-wrap: nowrap;\n  column-gap: 10px;\n}\n\n.item {\n  flex: 0 0 80px;\n  height: 40px;\n  background: var(--h-bg-warning-weak-default);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n</style>\n',
    path: "demos/components/Scrollbar/horizon.vue"
  }, null, _parent));
  _push(`<h2 id="maximum-height" tabindex="-1">Maximum Height <a class="header-anchor" href="#maximum-height" aria-label="Permalink to &quot;Maximum Height&quot;">​</a></h2><p>By setting <code>max-height</code>, you can control not to display the scrollbar when it is less than the set <code>max-height</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-button @click="add">增加条目</h-button>
    <h-button :disabled="items.length <= 3" @click="del">减少条目</h-button>
    <h-scrollbar max-height="400px" class="mt-4">
      <div class="wrap">
        <div v-for="item of items" :key="item" class="item">
          {{ item }}
        </div>
      </div>
    </h-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([1, 2, 3]);

function add() {
  items.value.push(items.value.length + 1);
}

function del() {
  items.value.pop();
}
<\/script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.item {
  height: 40px;
  background: var(--h-bg-info-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
}

.h-button + .h-button {
  margin-left: 10px;
}
</style>
`,
    path: "demos/components/Scrollbar/max-height.vue"
  }, null, _parent));
  _push(`<h2 id="always-display-scrollbar" tabindex="-1">Always Display Scrollbar <a class="header-anchor" href="#always-display-scrollbar" aria-label="Permalink to &quot;Always Display Scrollbar&quot;">​</a></h2><p>You can set <code>always = true</code> to control the scrollbar to always be displayed</p><p>But note that if the scroll size itself is smaller than the container size, the scrollbar will still not be displayed</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-scrollbar height="400px" always>\n    <div v-for="item of 20" :key="item" class="item">\n      {{ item }}\n    </div>\n  </h-scrollbar>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.item {\n  height: 40px;\n  background: var(--h-bg-info-weak-default);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 10px;\n}\n</style>\n',
    path: "demos/components/Scrollbar/always.vue"
  }, null, _parent));
  _push(`<h2 id="manual-scroll-setting" tabindex="-1">Manual Scroll Setting <a class="header-anchor" href="#manual-scroll-setting" aria-label="Permalink to &quot;Manual Scroll Setting&quot;">​</a></h2><p>Through the exposed <code>setScrollTop</code> and <code>setScrollLeft</code> methods, you can set the scrollbar scrolling</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-scrollbar ref="scrollbar" height="400px" @scroll="onScroll">
      <div v-for="item of 20" :key="item" class="item">
        {{ item }}
      </div>
    </h-scrollbar>
    <div class="slider mt-2">
      <h-slider v-model="value" :min="0" :max="scrollHeight" :tooltip-enable="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { HScrollbar } from '@aurora/horizon-web';

const scrollbar = ref<typeof HScrollbar | null>(null);
const scrollHeight = ref(0);
const value = ref(0);

watch(value, val => {
  scrollbar.value?.setScrollTop(val);
});

function onScroll({scrollTop}: {scrollTop: number, scrollLeft: number}) {
  value.value = scrollTop;
}

onMounted(() => {
  scrollHeight.value = scrollbar.value?.wrapRef.scrollHeight - scrollbar.value?.wrapRef.offsetHeight;
});
<\/script>

<style scoped>
.item {
  height: 40px;
  background: var(--h-bg-info-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.slider {
  width: 90%;
  margin: 0 auto;
}
</style>
`,
    path: "demos/components/Scrollbar/manual.vue"
  }, null, _parent));
  _push(`<h2 id="minimum-size" tabindex="-1">Minimum Size <a class="header-anchor" href="#minimum-size" aria-label="Permalink to &quot;Minimum Size&quot;">​</a></h2><p>Set <code>minSize</code> to ensure that when there is a lot of scroll content, the scrollbar can still be easily clicked</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-scrollbar height="400px">\n    <div v-for="item of 1000" :key="item" class="item">\n      {{ item }}\n    </div>\n  </h-scrollbar>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.item {\n  width: 120%;\n  height: 40px;\n  background: var(--h-bg-info-weak-default);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 10px;\n}\n</style>\n',
    path: "demos/components/Scrollbar/min-size.vue"
  }, null, _parent));
  _push(`<h2 id="scrollbar-api" class="no-underline h2"><a href="#scrollbar-api" class="!no-underline">Scrollbar Api</a></h2><h3 id="scrollbar-props" class="no-underline h3"><a href="#scrollbar-props" class="!no-underline">Scrollbar Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">No</td><td>&#39;medium&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">height</td><td>Configuration for height.</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-height</td><td>Configuration for max height.</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">native</td><td>Configuration for native.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">wrap-style</td><td>Configuration for wrap style.</td><td><code>CSSProperties</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">wrap-class</td><td>Configuration for wrap class.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">view-style</td><td>Configuration for view style.</td><td><code>CSSProperties</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">view-class</td><td>Configuration for view class.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">no-resize</td><td>Configuration for no resize.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tag</td><td>Configuration for tag.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;div&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">always</td><td>Configuration for always.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">min-size</td><td>Configuration for min size.</td><td><code>number</code></td><td class="text-center">No</td><td>20</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>Configuration for z index.</td><td><code>number | &#39;auto&#39; | &#39;inherit&#39; | &#39;initial&#39; | &#39;unset&#39; | <code>var(\${string})</code></code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">update-delay</td><td>Configuration for update delay.</td><td><code>number</code></td><td class="text-center">No</td><td>400</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">horizontal-visible</td><td>Configuration for horizontal visible.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">vertical-visible</td><td>Configuration for vertical visible.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">track-begin-end-spacing</td><td>Configuration for track begin end spacing.</td><td><code>number | [[number, number], [number, number]]</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prevent-scroll-by-track-begin-end-spacing</td><td>Configuration for prevent scroll by track begin end spacing.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">track-sticky</td><td>Configuration for track sticky.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr></tbody></table><h3 id="scrollbar-emits" class="no-underline h3"><a href="#scrollbar-emits" class="!no-underline">Scrollbar Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll</td><td rowspan="2">Emitted when scroll changes.</td><td rowspan="2">( position: <code>{ scrollLeft: number; scrollTop: number }</code>, e: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">position</td><td><code>{ scrollLeft: number; scrollTop: number }</code></td><td>The position value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>Event</code></td><td>The e value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update</td><td rowspan="1">Emitted when update changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-end</td><td rowspan="1">Emitted when scroll end changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">reach-top</td><td rowspan="1">Emitted when reach top changes.</td><td rowspan="1">( e: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>Event</code></td><td>The e value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">reach-bottom</td><td rowspan="1">Emitted when reach bottom changes.</td><td rowspan="1">( e: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>Event</code></td><td>The e value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">reach-left</td><td rowspan="1">Emitted when reach left changes.</td><td rowspan="1">( e: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>Event</code></td><td>The e value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">reach-right</td><td rowspan="1">Emitted when reach right changes.</td><td rowspan="1">( e: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>Event</code></td><td>The e value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">mouse-enter</td><td rowspan="1">Emitted when mouse enter changes.</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>The e value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">mouse-leave</td><td rowspan="1">Emitted when mouse leave changes.</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>The e value.</td></tr></tbody></table><h3 id="scrollbar-exposes" class="no-underline h3"><a href="#scrollbar-exposes" class="!no-underline">Scrollbar Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">handleScroll</td><td rowspan="1">Controls handle scroll.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollTo</td><td rowspan="2">Controls scroll to.</td><td rowspan="2">( positionOrToLeft: <code>ScrollToOptions | number</code>, toTop: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">positionOrToLeft</td><td><code>ScrollToOptions | number</code></td><td>The position or to left value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">toTop</td><td><code>number</code></td><td>The to top value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setScrollTop</td><td rowspan="1">Controls set scroll top.</td><td rowspan="1">( top: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">top</td><td><code>number</code></td><td>The top value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setScrollLeft</td><td rowspan="1">Controls set scroll left.</td><td rowspan="1">( left: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">left</td><td><code>number</code></td><td>The left value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update</td><td rowspan="1">Controls update.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">wrapRef</td><td rowspan="1">Controls wrap ref.</td><td rowspan="1"><code>Ref&lt;HTMLElement | null&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewRef</td><td rowspan="1">Controls view ref.</td><td rowspan="1"><code>Ref&lt;HTMLElement | null&gt;</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Scrollbar.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Scrollbar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Scrollbar as default
};
