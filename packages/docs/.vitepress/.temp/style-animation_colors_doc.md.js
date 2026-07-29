import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"style-animation/colors/doc.md","filePath":"zh/style-animation/colors/doc.md"}');
const _sfc_main = { name: "style-animation/colors/doc.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="colors" tabindex="-1">Colors <a class="header-anchor" href="#colors" aria-label="Permalink to &quot;Colors&quot;">​</a></h2><p>这里提供了符合 Horizon-web 设计规范的颜色</p><h2 id="全部颜色" tabindex="-1">全部颜色 <a class="header-anchor" href="#全部颜色" aria-label="Permalink to &quot;全部颜色&quot;">​</a></h2><p>请注意，请不要直接在项目中使用以下变量，请使用 <code>Tokens</code> 中标明的变量</p><p>此处仅是用来展示 Horizon-Web 的色盘</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex flex-wrap" style="max-width: 780px;">
    <template v-for="(lists, typeName) in colors">
      <template v-if="Array.isArray(lists)">
        <div :key="typeName" class="pr-4 pb-4" style="width: 33.333%">
          <div class="text-lg mb-2">{{typeName}}</div>
          <div
            v-for="(color, index) in lists"
            :key="color"
            class="flex justify-space-between p-3 text-center mb-1 rounded"
            :style="{
              backgroundColor: color,
              color: textColor(color)
          }">
            <div>
              {{\`\${typeName}-\${index + 1}\`}}
            </div>
            <span>{{color.toUpperCase()}}</span>
          </div>
        </div>
      </template>
    </template>
    <div class="pr-4 pb-4" style="width: 33.333%">
      <div class="text-lg mb-2">others</div>
      <div class="flex justify-space-between p-3 text-center mb-1 rounded" style="background-color: #000; color: #fff;">
        <div>
          black
        </div>
        <span>#000000</span>
      </div>
      <div class="flex justify-space-between p-3 text-center mb-1 rounded" style="background-color: #fff;">
        <div>
          white
        </div>
        <span>#FFFFFF</span>
      </div>
      <div class="flex justify-space-between p-3 text-center mb-1 rounded" style="background-color: transparent;">
        <div>
          transparent
        </div>
        <span>transparent</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { colors } from '@aurora/horizon-web';
import { tinyColor } from '@aurora/colors';

export default defineComponent({
  setup() {
    return {
      colors,
      isDark: (color: string) => tinyColor(color).isDark(),
      textColor(color: string) {
        return tinyColor(color).isDark() ? '#FFF' : '#000';
      },
    };
  },
});
<\/script>
`,
    path: "zh/style-animation/colors/demos/index--no-code.vue"
  }, null, _parent));
  _push(`<h2 id="css-工具类" tabindex="-1">CSS 工具类 <a class="header-anchor" href="#css-工具类" aria-label="Permalink to &quot;CSS 工具类&quot;">​</a></h2><p>上面的主题色和全部色值的名称即是一个 CSS 类，表示元素的颜色，加上 <code>bg-</code> 前缀的类名表示元素的背景颜色，例如：<code>error</code> 表示颜色为危险色，<code>blue-3</code> 表示颜色为 <code>#94DAFF</code>，<code>bg-brand-6</code> 表示背景颜色为 <code>#178CA6</code>。</p><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="gray-9 bg-lake-blue-1 text-lg p-3">\n    <span class="rose-red-6 font-bold">Horizon Web UI</span> is a new <span class="success">UI library</span> with components, directives, CSS utilities and so on, which <span class="white bg-warning px-1">support both</span> Vue3 and Vue2.\n  </div>\n</template>\n',
    path: "zh/style-animation/colors/demos/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="javascript-中使用" tabindex="-1">JavaScript 中使用 <a class="header-anchor" href="#javascript-中使用" aria-label="Permalink to &quot;JavaScript 中使用&quot;">​</a></h2><p><code>horizon-web</code> 模块导出了一个叫做 <code>colors</code> 的对象，对于上述主题色以及位于 others 中的颜色，你可以直接通过如 <code>colors.primary</code> 拿到色值；对于包含 1~10 层次的颜色如 <code>brand</code>，<code>colors.brand</code> 会返回一个数组，你可以通过 0~9 下标获取到色值。</p><h2 id="demo-1" tabindex="-1">Demo <a class="header-anchor" href="#demo-1" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { colors } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;@aurora/horizon-web&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">colors.gray; </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// [&#39;#FFFFFF&#39;, &#39;#F4F5F7&#39;, &#39;#E9EAEC&#39;, &#39;#DFE1E5&#39;, &#39;#CED0D6&#39;, &#39;#929398&#39;, &#39;#6C6E73&#39;, &#39;#54565A&#39;, &#39;#242629&#39;, &#39;#000000&#39;]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">colors.white; </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// #FFFFFF</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">colors.red[</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">5</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">]; </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// #E83030</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="色彩生成工具" tabindex="-1">色彩生成工具 <a class="header-anchor" href="#色彩生成工具" aria-label="Permalink to &quot;色彩生成工具&quot;">​</a></h2><p>使用 <code>@aurora/colors</code> 提供的 <code>generator</code> 方法 可以传递一个颜色，然后生成相关色带</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import { ref } from 'vue';
import generator, { tinyColor } from '@aurora/colors';

const inputColor = ref('#1890ff');
const color = ref<string[]>([]);

function setColor() {
  color.value = generator(inputColor.value).colors;
}

function textColor(color: string) {
  return tinyColor(color).isDark() ? '#FFF' : '#000';
}

setColor();
<\/script>

<template>
  <h-row>
    <h-col :span="6">
      <h-color-picker v-model="inputColor" editable />
    </h-col>
    <h-col :span="6">
      <h-button size="medium" @click="setColor">生成</h-button>
    </h-col>
    <h-col :span="24">
      <div class="color-palettes">
        <div
          v-for="(item, index) of color"
          :key="index"
          class="color-item"
          :style="{ background: item, color: textColor(item) }"
        >
          {{ item.toUpperCase() }}
        </div>
      </div>
    </h-col>
  </h-row>
</template>

<style scoped>
.color-palettes {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}

.color-item {
  height: 80px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
`,
    path: "zh/style-animation/colors/demos/generator.vue"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/style-animation/colors/doc.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doc = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  doc as default
};
