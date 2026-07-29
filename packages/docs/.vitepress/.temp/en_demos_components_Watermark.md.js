import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Watermark.md","filePath":"en/demos/components/Watermark.md"}');
const _sfc_main = { name: "en/demos/components/Watermark.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Watermark</h1><p class="description">Through the <code>content</code> attribute, you can set: single line text watermark content, the value is a string.</p><h2 id="single-line-text-watermark" tabindex="-1">Single Line Text Watermark <a class="header-anchor" href="#single-line-text-watermark" aria-label="Permalink to &quot;Single Line Text Watermark&quot;">​</a></h2><p>Through the <code>content</code> attribute, you can set: single line text watermark content, the value is a string.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-watermark content="watermark watermark">\n    <div style="height: 300px"></div>\n  </h-watermark>\n</template>\n',
    path: "demos/components/Watermark/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="multi-line-text-watermark" tabindex="-1">Multi-line Text Watermark <a class="header-anchor" href="#multi-line-text-watermark" aria-label="Permalink to &quot;Multi-line Text Watermark&quot;">​</a></h2><p>Through the <code>content</code> attribute, you can set: multi-line text watermark content, the value is a string array.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-watermark :content="['watermark watermark', '多行文本水印']">
    <div style="height: 300px"></div>
  </h-watermark>
</template>
`,
    path: "demos/components/Watermark/demo2.vue"
  }, null, _parent));
  _push(`<h2 id="image-watermark" tabindex="-1">Image Watermark <a class="header-anchor" href="#image-watermark" aria-label="Permalink to &quot;Image Watermark&quot;">​</a></h2><p>Through the <code>image</code> attribute, you can set: image watermark content. When the image fails to load, the value of the <code>content</code> attribute will be used as a fallback display.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-watermark image="https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg" content="watermark watermark">\n    <div style="height: 300px"></div>\n  </h-watermark>\n</template>\n',
    path: "demos/components/Watermark/demo3.vue"
  }, null, _parent));
  _push(`<h2 id="additional-usage-scenarios" tabindex="-1">Additional Usage Scenarios <a class="header-anchor" href="#additional-usage-scenarios" aria-label="Permalink to &quot;Additional Usage Scenarios&quot;">​</a></h2><p>You can listen to the component&#39;s <code>tampered</code> event to perform some additional operations.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="wrapper">
    <div class="content-box">
      <h-watermark
        :content="content"
        :image="image"
        :rotate="rotate"
        :z-index="zIndex"
        :line-gap="lineGap"
        :gap="[gapX, gapY]"
        :offset="[offsetX, offsetY]"
        :opacity="opacity"
        :global="global"
        @tampered="tamperedHandle"
      >
        <div style="height: 500px; overflow: auto;">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem rerum, dolores ex ipsa distinctio officiis necessitatibus ab deserunt aperiam veritatis quisquam nihil non praesentium quasi ad tempore est. Necessitatibus, id.
          Voluptatem incidunt fugiat fuga quasi iure nobis assumenda impedit nesciunt sequi facere illo ad, necessitatibus odit rerum itaque maxime. Quos molestias aut iste quas eveniet. Tempore culpa molestias beatae impedit.
          Tempore distinctio accusantium commodi illum ducimus rerum magnam totam sapiente obcaecati illo nostrum corrupti qui velit accusamus iste a et quos, quae cupiditate at deleniti eos! Minima qui debitis in.
          Necessitatibus officiis nulla iste incidunt unde iure, natus vel voluptatem voluptates minus commodi ad? Velit facere, dolorum rem explicabo voluptate ullam! Facere porro suscipit reprehenderit impedit maxime sed vero aliquid?
          Cumque, harum. Dignissimos, est quo aliquid placeat minus at quae fugiat deserunt, iure beatae quasi alias aspernatur explicabo, assumenda facere quibusdam veritatis unde dolorem facilis. Delectus officiis quae facilis aliquid?
          Minus expedita dolor omnis necessitatibus earum? Enim assumenda sequi dolorum consequuntur possimus nulla vero fuga asperiores voluptate laudantium, qui aliquam corporis aliquid, repellat eius eos nisi quam velit modi maxime.
          Vel minus, ab voluptas veritatis nobis libero ipsum eum ullam blanditiis architecto voluptatem. Eveniet accusantium nobis rerum a aspernatur! Odit nemo quidem tenetur, perspiciatis optio molestias! Modi, beatae. Veritatis, quos.
          Esse unde ipsam saepe magni, blanditiis qui obcaecati rem officiis earum repellat, et totam sit odio quo, doloribus harum eos vel voluptates excepturi a ducimus! Dolorem quis libero voluptate esse!
          Nihil nemo laudantium dolore voluptatem iste omnis maxime tenetur, nisi ut veniam doloremque exercitationem vero, qui, porro pariatur! Minus, fugiat ipsa explicabo praesentium tempora delectus aspernatur saepe dolor aliquam pariatur?
          Maxime cum facere saepe? Dolorem, ipsa, animi excepturi corporis sint velit incidunt placeat totam esse, quos dolores vel? Facilis at maiores ullam dolores voluptas eum temporibus rerum quam modi tempore.
          Nihil nemo laudantium dolore voluptatem iste omnis maxime tenetur, nisi ut veniam doloremque exercitationem vero, qui, porro pariatur! Minus, fugiat ipsa explicabo praesentium tempora delectus aspernatur saepe dolor aliquam pariatur?
          Maxime cum facere saepe? Dolorem, ipsa, animi excepturi corporis sint velit incidunt placeat totam esse, quos dolores vel? Facilis at maiores ullam dolores voluptas eum temporibus rerum quam modi tempore.
        </div>
      </h-watermark>
    </div>
    <div class="control-box">
      <strong>全局模式</strong>
      <div class="control-item">
        <h-switch v-model="global" />
      </div>
      <strong>文本内容</strong>
      <div class="control-item">
        <h-input v-model="content" />
      </div>
      <strong>是否显示图片内容</strong>
      <div class="control-item">
        <h-switch v-model="showImage" />
      </div>
      <template v-if="showImage">
        <strong>图片内容</strong>
        <div class="control-item">
          <h-input v-model="image" />
        </div>
      </template>
      <strong>旋转角度</strong>
      <div class="control-item">
        <h-input-number v-model="rotate" />
      </div>
      <strong>zIndex层级</strong>
      <div class="control-item">
        <h-input-number v-model="zIndex" />
      </div>
      <strong>多行文本垂直方向的间距</strong>
      <div class="control-item">
        <h-input-number v-model="lineGap" />
      </div>
      <strong>水平及垂直间距（gapX、gapY）</strong>
      <div class="control-item">
        <h-input-number v-model="gapX" />
        <h-input-number v-model="gapY" />
      </div>
      <strong>水平及垂直偏移量（offsetX、offsetY）</strong>
      <div class="control-item">
        <h-input-number v-model="offsetX" />
        <h-input-number v-model="offsetY" />
      </div>
      <strong>不透明度</strong>
      <div class="control-item">
        <h-input-number v-model="opacity" :min="0" :max="1" :step="0.1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const global = ref(false);
const content = ref('watermark watermark');
const image = ref<string | null>(null);
const showImage = ref(false);
const rotate = ref(-15);
const zIndex = ref(99999);
const lineGap = ref(5);
const gapX = ref(100);
const gapY = ref(60);
const offsetX = ref(0);
const offsetY = ref(0);
const opacity = ref(0.1);

watch(showImage, () => {
  image.value = showImage.value ? 'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg' : null;
});

const tamperedHandle = () => {
  console.info("水印元素被“删除”或“篡改”啦！");
};
<\/script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  min-height: 300px;
  margin: 10px;
}
.wrapper::after {
  content: '';
  display: block;
  clear: both;
}
.wrapper .content-box {
  float: left;
  margin-right: 30px;
  width: 60%;
  border: 1px solid #e8e8e8;
}
.wrapper .control-box {
  float: left;
  width: 30%;
}
.control-item {
  display: flex;
  margin-bottom: 5px;
  & > div:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
`,
    path: "demos/components/Watermark/demo4.vue"
  }, null, _parent));
  _push(`<h2>Watermark Api</h2><h3>Watermark Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">global</td><td>全局模式（全局模式下，水印内容为“fixed”定位，且会挂在到body标签下面；非全局模式下，水印内容为“absolute”定位）</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">container</td><td>挂载水印内容的外层容器（若有设置“container”，则水印将作为子元素挂载到“container”下面；否则，将作为兄弟节点挂载到“默认插槽”内容之后）<br>PS：使用“v-watermark”指令时，若处于非全局模式，”container“的值将固定为”绑定该指令的元素“</td><td><code>HTMLElement</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td>水印文本内容（单行文本水印内容，值为字符串；多行文本水印内容，值为字符串数组）</td><td><code>string | string[]</code></td><td class="text-center">No</td><td>&#39;watermark&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">image</td><td>水印图片内容（值为图片的URL地址，优先级比<code>content</code>高，支持base64格式，建议传入&quot;2 or 3&quot;倍图）</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">width</td><td>单个水印内容的宽度，单位为px</td><td><code>number</code></td><td class="text-center">No</td><td>120</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">height</td><td>单个水印内容的高度，单位为px</td><td><code>number</code></td><td class="text-center">No</td><td>64</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rotate</td><td>单个水印内容的旋转角度，单位为deg</td><td><code>number</code></td><td class="text-center">No</td><td>-15</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>水印整体的“z-index”层级</td><td><code>number</code></td><td class="text-center">No</td><td>99999</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">content-style</td><td>水印文本内容的样式</td><td><code>WatermarkContentStyle</code></td><td class="text-center">No</td><td>() =&gt; ({<br>      fontStyle: &#39;normal&#39;,<br>      fontVariant: &#39;normal&#39;,<br>      fontWeight: &#39;normal&#39;,<br>      fontSize: 16,<br>      fontFamily: &#39;sans-serif&#39;,<br>      color: &#39;rgba(115, 117, 122, 1)&#39;,<br>    })</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">line-gap</td><td>多行文本时，各行文本之间的间距，单位为px</td><td><code>number</code></td><td class="text-center">No</td><td>5</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">gap</td><td>各水印内容在水平(x)和垂直方向(y)的padding（[x, y]），单位为px</td><td><code>[number, number]</code></td><td class="text-center">No</td><td>() =&gt; [100, 60]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">offset</td><td>水印整体距离容器左上角的偏移量，单位为px</td><td><code>[number, number]</code></td><td class="text-center">No</td><td>() =&gt; [0, 0]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">opacity</td><td>水印整体的不透明度，取值范围：0 ～ 1</td><td><code>number</code></td><td class="text-center">No</td><td>0.1</td></tr></tbody></table><h3>Watermark Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">tampered</td><td rowspan="1">tampered事件（水印元素被“删除”或“篡改”时触发）</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Watermark.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Watermark = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Watermark as default
};
