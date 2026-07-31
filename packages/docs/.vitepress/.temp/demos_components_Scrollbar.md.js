import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Scrollbar.md","filePath":"zh/demos/components/Scrollbar.md"}');
const _sfc_main = { name: "demos/components/Scrollbar.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Scrollbar</h1><p class="description">用于替换浏览器原生滚动条，统一不同系统的滚动条差异</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><p>通过设置 <code>height</code>，内容物高度超过此高度时，会显示滚动条</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-scrollbar height="400px">\n    <div v-for="item of 20" :key="item" class="item">\n      {{ item }}\n    </div>\n  </h-scrollbar>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.item {\n  height: 40px;\n  background: var(--h-bg-info-weak-default);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 10px;\n}\n</style>\n',
    path: "demos/components/Scrollbar/basic.vue"
  }, null, _parent));
  _push(`<h2 id="尺寸" tabindex="-1">尺寸 <a class="header-anchor" href="#尺寸" aria-label="Permalink to &quot;尺寸&quot;">​</a></h2><p>在页面、抽屉、弹窗、容器中，建议使用 <code>medium</code></p><p>在下拉弹层、编辑器中建议使用 <code>small</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row>\n    <h-col :span="18">\n      <div class="demo-title">容器中使用 <code>medium</code></div>\n      <h-scrollbar height="400px">\n        <div v-for="item of 20" :key="item" class="item">\n          {{ item }}\n        </div>\n      </h-scrollbar>\n    </h-col>\n    <h-col :span="6">\n      <div class="demo-title">弹窗中使用 <code>small</code></div>\n      <h-popover placement="bottom" :to-body="false">\n        <template #popper>\n          <h-pop-content>\n            <h-scrollbar size="small" height="400px">\n              <div v-for="item of 20" :key="item" class="item" style="width: 300px;">\n                {{ item }}\n              </div>\n            </h-scrollbar>\n          </h-pop-content>\n        </template>\n        <template #reference>\n          <h-button>Hover Me</h-button>\n        </template>\n      </h-popover>\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.item {\n  height: 40px;\n  background: var(--h-bg-info-weak-default);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 10px;\n}\n</style>\n',
    path: "demos/components/Scrollbar/size.vue"
  }, null, _parent));
  _push(`<h2 id="横向滚动" tabindex="-1">横向滚动 <a class="header-anchor" href="#横向滚动" aria-label="Permalink to &quot;横向滚动&quot;">​</a></h2><p>在宽度大于容器宽度时，会显示横向滚动条</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-scrollbar size="small" max-height="400px">\n    <div class="wrap">\n      <div v-for="item of 50" :key="item" class="item">\n        {{ item }}\n      </div>\n    </div>\n  </h-scrollbar>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.wrap {\n  display: flex;\n  flex-wrap: nowrap;\n  column-gap: 10px;\n}\n\n.item {\n  flex: 0 0 80px;\n  height: 40px;\n  background: var(--h-bg-warning-weak-default);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n</style>\n',
    path: "demos/components/Scrollbar/horizon.vue"
  }, null, _parent));
  _push(`<h2 id="最大高度" tabindex="-1">最大高度 <a class="header-anchor" href="#最大高度" aria-label="Permalink to &quot;最大高度&quot;">​</a></h2><p>通过设置 <code>max-height</code>，可以控制在小于设定的 <code>max-height</code> 时不显示滚动条</p>`);
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
  _push(`<h2 id="始终显示滚动条" tabindex="-1">始终显示滚动条 <a class="header-anchor" href="#始终显示滚动条" aria-label="Permalink to &quot;始终显示滚动条&quot;">​</a></h2><p>可以设置 <code>always = true</code>，控制显示条始终展示</p><p>但需要注意的是，如果本身滚动大小小于容器的大小，仍然不会显示滚动条</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-scrollbar height="400px" always>\n    <div v-for="item of 20" :key="item" class="item">\n      {{ item }}\n    </div>\n  </h-scrollbar>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.item {\n  height: 40px;\n  background: var(--h-bg-info-weak-default);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 10px;\n}\n</style>\n',
    path: "demos/components/Scrollbar/always.vue"
  }, null, _parent));
  _push(`<h2 id="手动设置滚动" tabindex="-1">手动设置滚动 <a class="header-anchor" href="#手动设置滚动" aria-label="Permalink to &quot;手动设置滚动&quot;">​</a></h2><p>通过对外暴露的 <code>setScrollTop</code> 和 <code>setScrollLeft</code> 方法，可以使用设置滚动条滚动</p>`);
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
  _push(`<h2 id="最小尺寸" tabindex="-1">最小尺寸 <a class="header-anchor" href="#最小尺寸" aria-label="Permalink to &quot;最小尺寸&quot;">​</a></h2><p>设置 <code>minSize</code> ，可以保证在滚动内容非常多时，滚动条依旧可以被容易点击到</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-scrollbar height="400px">\n    <div v-for="item of 1000" :key="item" class="item">\n      {{ item }}\n    </div>\n  </h-scrollbar>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style scoped>\n.item {\n  width: 120%;\n  height: 40px;\n  background: var(--h-bg-info-weak-default);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 10px;\n}\n</style>\n',
    path: "demos/components/Scrollbar/min-size.vue"
  }, null, _parent));
  _push(`<h2 id="scrollbar-api" class="no-underline h2"><a href="#scrollbar-api" class="!no-underline">Scrollbar Api</a></h2><h3 id="scrollbar-props" class="no-underline h3"><a href="#scrollbar-props" class="!no-underline">Scrollbar Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸<br><code>medium</code> 适用于页面、抽屉、弹窗、容器中<br><code>small</code> 适用于下拉弹层、编辑器中</td><td><code>&#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">否</td><td>&#39;medium&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">height</td><td>滚动条高度</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-height</td><td>滚动条最大高度</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">native</td><td>是否使用原生滚动条</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">wrap-style</td><td>包裹容器的自定义样式</td><td><code>CSSProperties</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">wrap-class</td><td>包裹容器的类名</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">view-style</td><td>视窗容器的自定义样式</td><td><code>CSSProperties</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">view-class</td><td>视窗容器的类名</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">no-resize</td><td>是否不响应父级容器的尺寸变化，以减少性能问题</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tag</td><td>视图的元素标签</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;div&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">always</td><td>是否总是显示滚动条</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">min-size</td><td>滚动条轨道的最小尺寸</td><td><code>number</code></td><td class="text-center">否</td><td>20</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>滚动条轨道层级</td><td><code>number | &#39;auto&#39; | &#39;inherit&#39; | &#39;initial&#39; | &#39;unset&#39; | <code>var(\${string})</code></code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">update-delay</td><td>更新延迟毫秒<br>容器有出现动画时需要设置，否则滚动条高度不正确</td><td><code>number</code></td><td class="text-center">否</td><td>400</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">horizontal-visible</td><td>水平滚动条是否可见</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">vertical-visible</td><td>垂直滚动条是否可见</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">track-begin-end-spacing</td><td>轨道首尾边距<br>对于垂直滚动条，是 上下 间距<br>对于水平滚动条，是 左右 间距<br>传入数字，即 上下左右 都是此值<br>传入数组，即按照 [[上，下]，[左，右]] 的顺序</td><td><code>number | [[number, number], [number, number]]</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prevent-scroll-by-track-begin-end-spacing</td><td>是否根据轨道首尾边距判断而禁止滚动</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">track-sticky</td><td>滚动条是否粘性定位</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr></tbody></table><h3 id="scrollbar-emits" class="no-underline h3"><a href="#scrollbar-emits" class="!no-underline">Scrollbar Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll</td><td rowspan="2">滚动时触发</td><td rowspan="2">( position: <code>{ scrollLeft: number; scrollTop: number }</code>, e: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">position</td><td><code>{ scrollLeft: number; scrollTop: number }</code></td><td>scrollLeft: 滚动距左; scrollTop 滚动距上</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>Event</code></td><td>滚动事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update</td><td rowspan="1">当滚动条重新计算时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-end</td><td rowspan="1">滚动结束时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">reach-top</td><td rowspan="1">在触顶时触发</td><td rowspan="1">( e: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>Event</code></td><td>滚动事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">reach-bottom</td><td rowspan="1">在触底时触发</td><td rowspan="1">( e: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>Event</code></td><td>滚动事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">reach-left</td><td rowspan="1">在触左时触发</td><td rowspan="1">( e: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>Event</code></td><td>滚动事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">reach-right</td><td rowspan="1">在触右时触发</td><td rowspan="1">( e: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>Event</code></td><td>滚动事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">mouse-enter</td><td rowspan="1">鼠标进入</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">mouse-leave</td><td rowspan="1">鼠标离开</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table><h3 id="scrollbar-exposes" class="no-underline h3"><a href="#scrollbar-exposes" class="!no-underline">Scrollbar Exposes</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">handleScroll</td><td rowspan="1">触发滚动事件</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollTo</td><td rowspan="2">滚动到具体的坐标</td><td rowspan="2">( positionOrToLeft: <code>ScrollToOptions | number</code>, toTop: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">positionOrToLeft</td><td><code>ScrollToOptions | number</code></td><td>left: 距左px, top：距顶px 或 距左px</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">toTop</td><td><code>number</code></td><td>距顶部(可选)</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setScrollTop</td><td rowspan="1">设置滚动距顶px</td><td rowspan="1">( top: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">top</td><td><code>number</code></td><td>距顶部px</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">setScrollLeft</td><td rowspan="1">设置滚动距左px</td><td rowspan="1">( left: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">left</td><td><code>number</code></td><td>距左px</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update</td><td rowspan="1">更新滚动条的状态</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">wrapRef</td><td rowspan="1">包裹容器的 <code>ref</code> 对象</td><td rowspan="1"><code>Ref&lt;HTMLElement | null&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewRef</td><td rowspan="1">容器视窗的 <code>ref</code> 对象</td><td rowspan="1"><code>Ref&lt;HTMLElement | null&gt;</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Scrollbar.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Scrollbar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Scrollbar as default
};
