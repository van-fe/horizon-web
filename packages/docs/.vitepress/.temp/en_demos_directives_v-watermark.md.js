import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/directives/v-watermark.md","filePath":"en/demos/directives/v-watermark.md"}');
const _sfc_main = { name: "en/demos/directives/v-watermark.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>v-watermark</h1><p class="description">Through the <code>content</code> attribute, you can set: single line text watermark content, the value is a string.</p><h2 id="single-line-text-watermark" tabindex="-1">Single Line Text Watermark <a class="header-anchor" href="#single-line-text-watermark" aria-label="Permalink to &quot;Single Line Text Watermark&quot;">​</a></h2><p>Through the <code>content</code> attribute, you can set: single line text watermark content, the value is a string.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div v-watermark="'watermark watermark'">
    <div style="height: 300px"></div>
  </div>
</template>
`,
    path: "demos/directives/v-watermark/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="multi-line-text-watermark" tabindex="-1">Multi-line Text Watermark <a class="header-anchor" href="#multi-line-text-watermark" aria-label="Permalink to &quot;Multi-line Text Watermark&quot;">​</a></h2><p>Through the <code>content</code> attribute, you can set: multi-line text watermark content, the value is a string array.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div v-watermark="['watermark watermark', '多行文本水印']">
    <div style="height: 300px"></div>
  </div>
</template>
`,
    path: "demos/directives/v-watermark/demo2.vue"
  }, null, _parent));
  _push(`<h2 id="image-watermark" tabindex="-1">Image Watermark <a class="header-anchor" href="#image-watermark" aria-label="Permalink to &quot;Image Watermark&quot;">​</a></h2><p>Through the <code>image</code> attribute, you can set: image watermark content. When the image fails to load, the value of the <code>content</code> attribute will be used as a fallback display.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div
    v-watermark="{
      image: '/demo-assets/watermark.svg',
      content: 'watermark watermark',
    }">
    <div style="height: 300px"></div>
  </div>
</template>
`,
    path: "demos/directives/v-watermark/demo3.vue"
  }, null, _parent));
  _push(`<h2 id="additional-usage-scenarios" tabindex="-1">Additional Usage Scenarios <a class="header-anchor" href="#additional-usage-scenarios" aria-label="Permalink to &quot;Additional Usage Scenarios&quot;">​</a></h2><p>You can listen to the component&#39;s <code>tampered</code> event to perform some additional operations.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="wrapper">
    <div v-watermark="watermarkOptions" class="content-box">
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
import { computed, ref, watch } from 'vue';

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

const tamperedHandle = () => {
  console.info("水印元素被“删除”或“篡改”啦！");
};

const watermarkOptions = computed(() => ({
  content: content.value,
  image: image.value,
  rotate: rotate.value,
  zIndex: zIndex.value,
  lineGap: lineGap.value,
  gap: [gapX.value, gapY.value],
  offset: [offsetX.value, offsetY.value],
  opacity: opacity.value,
  global: global.value,
  onTampered: tamperedHandle,
}));

watch(showImage, () => {
  image.value = showImage.value ? '/demo-assets/watermark.svg' : null;
});
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
    path: "demos/directives/v-watermark/demo4.vue"
  }, null, _parent));
  _push(`<h2 id="watermark-api" class="no-underline h2"><a href="#watermark-api" class="!no-underline">Watermark Api</a></h2><h3 id="watermark-options" class="no-underline h3"><a href="#watermark-options" class="!no-underline">Watermark Options</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>是否Required</th><th>Default</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">global</td><td rowspan="1">Configuration for global.</td><td rowspan="1">No</td><td rowspan="1">false</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">container</td><td rowspan="1">Configuration for container.</td><td rowspan="1">No</td><td rowspan="1">-</td><td rowspan="1"><code> Object as PropType&lt;HTMLElement&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td rowspan="1">Configuration for content.</td><td rowspan="1">No</td><td rowspan="1">&#39;watermark&#39;</td><td rowspan="1"><code> string | string[]</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">image</td><td rowspan="1">Configuration for image.</td><td rowspan="1">No</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">width</td><td rowspan="1">Configuration for width.</td><td rowspan="1">No</td><td rowspan="1">120</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">height</td><td rowspan="1">Configuration for height.</td><td rowspan="1">No</td><td rowspan="1">64</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">rotate</td><td rowspan="1">Configuration for rotate.</td><td rowspan="1">No</td><td rowspan="1">-15</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">zIndex</td><td rowspan="1">Configuration for z index.</td><td rowspan="1">No</td><td rowspan="1">99999</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">contentStyle</td><td rowspan="1">Configuration for content style.</td><td rowspan="1">No</td><td rowspan="1">() =&gt; ({<br>      fontStyle: &#39;normal&#39;,<br>      fontVariant: &#39;normal&#39;,<br>      fontWeight: &#39;normal&#39;,<br>      fontSize: 16,<br>      fontFamily: &#39;sans-serif&#39;,<br>      color: &#39;rgba(115, 117, 122, 1)&#39;,<br>    })</td><td rowspan="1"><code> Object as PropType&lt;WatermarkContentStyle&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">lineGap</td><td rowspan="1">Configuration for line gap.</td><td rowspan="1">No</td><td rowspan="1">5</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">gap</td><td rowspan="1">Configuration for gap.</td><td rowspan="1">No</td><td rowspan="1">() =&gt; [100, 60]</td><td rowspan="1"><code> Object as PropType&lt;[number, number]&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">offset</td><td rowspan="1">Configuration for offset.</td><td rowspan="1">No</td><td rowspan="1">() =&gt; [0, 0]</td><td rowspan="1"><code> Object as PropType&lt;[number, number]&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">opacity</td><td rowspan="1">Configuration for opacity.</td><td rowspan="1">No</td><td rowspan="1">0.1</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/directives/v-watermark.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vWatermark = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vWatermark as default
};
