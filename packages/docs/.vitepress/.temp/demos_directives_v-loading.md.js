import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/directives/v-loading.md","filePath":"zh/demos/directives/v-loading.md"}');
const _sfc_main = { name: "demos/directives/v-loading.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>v-loading</h1><p class="description">用于页面和区块的加载中状态,页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑</p><h2 id="指令说明" tabindex="-1">指令说明 <a class="header-anchor" href="#指令说明" aria-label="Permalink to &quot;指令说明&quot;">​</a></h2><p>在需要的时候展示加载动画，防止页面失去响应提高用户体验（例如在请求数据后生产的图表）。horizonweb组件库通过自定义指令的方式使用loading。 对于自定义指令 v-loading，传入一个对象，且这个对象的各个value值为响应式数据，如demo1/demo2中的示例所示。</p><h2 id="loading加载" tabindex="-1">loading加载 <a class="header-anchor" href="#loading加载" aria-label="Permalink to &quot;loading加载&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <section class="containers">
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'row',
        text: '加载中...',
        size: 'medium',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'row',
        text: '加载中...',
        size: 'medium',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'row',
        text: '加载中...',
        size: 'large',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'circle',
        textOrient: 'row',
        text: '加载中...',
        size: 'small',
        bgc: '#5FDDE330',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'circle',
        textOrient: 'row',
        text: '加载中...',
        size: 'medium',
        bgc: '#5FDDE330',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'circle',
        textOrient: 'row',
        text: '加载中...',
        size: 'large',
        bgc: '#5FDDE330',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'column',
        text: '加载中...',
        size: 'small',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'column',
        text: '加载中...',
        size: 'medium',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'column',
        text: '加载中...',
        size: 'large',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'circle',
        textOrient: 'column',
        text: '加载中...',
        size: 'small',
        bgc: '#5FDDE330',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'circle',
        textOrient: 'column',
        text: '加载中...',
        size: 'medium',
        bgc: '#5FDDE330',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'circle',
        textOrient: 'column',
        text: '加载中...',
        size: 'large',
        bgc: '#5FDDE330',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{ isShow, loadingType: 'dots', textOrient: 'column', size: 'large' }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{ isShow, loadingType: 'circle', textOrient: 'column', size: 'medium' }"
      class="loadingContainer"
    >
      测试
    </div>
  </section>
  <h-button size="large" type="primary" @click="show">显示</h-button>
  <h-button size="large" type="primary" @click="hide">隐藏</h-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const isShow = ref<any>(true);
const show = () => {
  isShow.value = true;
};
const hide = () => {
  isShow.value = false;
};
<\/script>

<style>
.containers {
  display: flex;
  flex-wrap: wrap;
}
.loadingContainer {
  height: 240px;
  width: 240px;
  margin-bottom: 20px;
}
</style>
`,
    path: "demos/directives/v-loading/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="与horizonweb其他组件同用" tabindex="-1">与horizonweb其他组件同用 <a class="header-anchor" href="#与horizonweb其他组件同用" aria-label="Permalink to &quot;与horizonweb其他组件同用&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="loading-container">
    <h-button size="large" type="primary" @click="show">显示</h-button>
    <h-button size="large" type="primary" @click="hide">隐藏</h-button>
    <h-button
      v-loading="{
        isShow: isFullscreenShow,
        loadingType: 'circle',
        textOrient: 'row',
        text: '加载中...',
        size: 'medium',
        bgc: '#FFF',
        fullscreen: isFullscreen,
      }"
      size="large"
      type="primary"
      value="checked border"
      label="checked border"
      @click="fullscreen"
    >
      全屏
    </h-button>
  </div>
  <h-checkbox
    v-model="checkbox"
    v-loading="{
      isShow,
      loadingType: 'circle',
      textOrient: 'row',
      text: '加载中...',
      size: 'medium',
      bgc: '#FFF',
    }"
    value="checked border"
    label="checked border"
    border
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checkbox = ref(['checked border']);
const isShow = ref<boolean>(true);
const isFullscreen = ref<boolean>(true);
const isFullscreenShow = ref<boolean>(false);
const show = () => {
  isShow.value = true;
};
const hide = () => {
  isShow.value = false;
};
const fullscreen = () => {
  isFullscreenShow.value = true;
  setTimeout(() => {
    isFullscreenShow.value = false;
  }, 2000);
};
<\/script>

<style scoped>
.loading-container {
  margin-bottom: 20px;
}
</style>
`,
    path: "demos/directives/v-loading/demo2.vue"
  }, null, _parent));
  _push(`<h2 id="动态配置" tabindex="-1">动态配置 <a class="header-anchor" href="#动态配置" aria-label="Permalink to &quot;动态配置&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div v-loading="loadingOptions" class="loadingContainer">
    {{ loadingOptions }}
  </div>
  <h-form :inline="true">
    <h-form-item label="是否显示">
      <h-radio-group v-model="loadingOptions.isShow" size="small">
        <h-radio :label="true" size="small">显示</h-radio>
        <h-radio :label="false" size="small">隐藏</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="样式">
      <h-radio-group v-model="loadingOptions.loadingType" size="small">
        <h-radio label="circle" size="small" />
        <h-radio label="dots" size="small" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="排列风格">
      <h-radio-group v-model="loadingOptions.textOrient" size="small">
        <h-radio label="column" size="small" />
        <h-radio label="row" size="small" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="大小">
      <h-radio-group v-model="loadingOptions.size" size="small">
        <h-radio label="large" size="small" />
        <h-radio label="medium" size="small" />
        <h-radio label="small" size="small" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="是否全屏">
      <h-radio-group v-model="loadingOptions.fullscreen" size="small">
        <h-radio :label="true" size="small" />
        <h-radio :label="false" size="small" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="loading文字">
      <h-input v-model="loadingOptions.text"></h-input>
    </h-form-item>
    <h-form-item label="背景色">
      <h-input v-model="loadingOptions.bgc"></h-input>
    </h-form-item>
  </h-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const loadingOptions = ref({
  isShow: true,
  loadingType: 'circle',
  textOrient: 'column',
  text: '加载中...',
  size: 'large',
  bgc: '#5fdde3',
  fullscreen: false,
});
<\/script>

<style>
.loadingContainer {
  height: 240px;
  width: 240px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
`,
    path: "demos/directives/v-loading/demo3.vue"
  }, null, _parent));
  _push(`<h2 id="延迟显示" tabindex="-1">延迟显示 <a class="header-anchor" href="#延迟显示" aria-label="Permalink to &quot;延迟显示&quot;">​</a></h2><p>当访问请求详情非常快的时候，如果直接使用 loading 会导致闪屏，所以可以通过设置 <code>delay</code> 来控制延迟显示时间</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="delay-demo">
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'row',
        text: '加载中...',
        size: 'medium',
        delay: 1000,
      }"
      class="loading-container"
    >
      延迟1000ms显示
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'row',
        text: '加载中...',
        size: 'medium',
      }"
      class="loading-container"
    >
      没有延迟
    </div>
    <h-button v-if="!isShow" @click="isShow = true">开始加载</h-button>
    <h-button v-if="!isShow" @click="delayShow">开始加载并在1000ms内结束</h-button>
    <h-button v-if="isShow" @click="isShow = false">结束加载</h-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isShow = ref(false);

function delayShow() {
  isShow.value = true;
  setTimeout(() => {
    isShow.value = false;
  }, 800);
}
<\/script>

<style scoped>
.h-button + .h-button {
  margin-left: 20px;
}

.loading-container {
  width: 150px;
  height: 150px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.loading-container + .loading-container {
  margin-left: 20px;
}
</style>
`,
    path: "demos/directives/v-loading/delay.vue"
  }, null, _parent));
  _push(`<h2 id="horizonweb与其他组件库共用时可能的情况" tabindex="-1">horizonweb与其他组件库共用时可能的情况 <a class="header-anchor" href="#horizonweb与其他组件库共用时可能的情况" aria-label="Permalink to &quot;horizonweb与其他组件库共用时可能的情况&quot;">​</a></h2><p>当项目中同时使用horizonweb与其它组件库时，其它组件库中存在v-loading同名的vue指令时，可能会造成horizonweb的v-loading指令失效，此时，horizonweb用户可以重新注册v-loading指令，如下</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { loading } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;@aurora/horizon-web&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">app.</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">directive</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;my-loading&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, loading);</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// 在组件中使用时</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">div</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> v-my-loading</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;{isShow,loadingType:&#39;circle&#39;,textOrient:&#39;column&#39;,size:&#39;medium&#39;,}&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> class</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;loadingContainer&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;测试&lt;/</span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">div</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="全局方法" tabindex="-1">全局方法 <a class="header-anchor" href="#全局方法" aria-label="Permalink to &quot;全局方法&quot;">​</a></h2><p>可以引入 <code>LoadingService</code>，使用函数形式调用 <code>Loading</code></p><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { LoadingService } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;@aurora/horizon-web&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">close</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> LoadingService</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(document.body, {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  fullscreen: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">true</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">});</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// 手动关闭 loading</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> closeLoading</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">() {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">  close</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">();</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="loading-api" class="no-underline h2"><a href="#loading-api" class="!no-underline">Loading Api</a></h2><h3 id="loading-options" class="no-underline h3"><a href="#loading-options" class="!no-underline">Loading Options</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>是否必填</th><th>默认值</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">isShow</td><td rowspan="1">是否显示 <code>loading</code> 动画</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">loadingType</td><td rowspan="1"><code>loading</code> 动画类型</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> &#39;circle&#39; | &#39;dots&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">textOrient</td><td rowspan="1">加载文案</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> &#39;column&#39; | &#39;row&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">text</td><td rowspan="1">加载文案的朝向</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td rowspan="1"><code>loading</code> 动画大小</td><td rowspan="1">否</td><td rowspan="1">&#39;medium&#39;</td><td rowspan="1"><code> &#39;large&#39; | &#39;medium&#39; | &#39;small&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">bgc</td><td rowspan="1"><code>loading</code> 动画背景颜色及透明度</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">fullscreen</td><td rowspan="1"><code>loading</code> 动画是否全屏</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">delay</td><td rowspan="1">延迟显示时间，单位ms<br>如果请求响应非常快，则推荐设置 <code>500-1000</code>，避免闪屏</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">zIndex</td><td rowspan="1">层级</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> number | string</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/directives/v-loading.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vLoading = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vLoading as default
};
