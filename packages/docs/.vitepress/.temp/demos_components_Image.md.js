import { resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Image.md","filePath":"zh/demos/components/Image.md"}');
const _sfc_main = { name: "demos/components/Image.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_h_link = resolveComponent("h-link");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Image</h1><p class="description">功能强大的图片组件，应该能满足你对图片的一切需求</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><p>通过 <code>src</code> 设置图片的路径，通过 <code>width</code> 和 <code>max-width</code> 设置图片的宽度和最大宽度。<br> 你可以不设置图片的高度，这样图片就可以保持原始宽高比了。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-image\n    src="https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"\n    width="500px"\n  />\n</template>\n',
    path: "demos/components/Image/basic.vue"
  }, null, _parent));
  _push(`<h2 id="设置高度" tabindex="-1">设置高度 <a class="header-anchor" href="#设置高度" aria-label="Permalink to &quot;设置高度&quot;">​</a></h2><p>你也可以通过 <code>height</code> 和 <code>max-height</code> 设置图片的高度和最大高度，这相当于自定义了图片宽高比。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-image\n    src="https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"\n    width="500px"\n    height="500px"\n  />\n</template>\n',
    path: "demos/components/Image/height.vue"
  }, null, _parent));
  _push(`<h2 id="设置宽高比" tabindex="-1">设置宽高比 <a class="header-anchor" href="#设置宽高比" aria-label="Permalink to &quot;设置宽高比&quot;">​</a></h2><p>有时候图片的宽度不是固定值，导致你无法很方便地设置高度，但你又希望能自定义图片的宽高比，此时 <code>aspect-ratio</code> 可以帮到你，详情请参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/aspect-ratio" target="_blank" rel="noreferrer">MDN</a>。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex">
    <div v-for="ratio in ratios" :key="ratio" class="mr-3" style="width: 20%">
            <p class="text-center">{{ ratio.replace('/', ':') }}</p>
      <h-image
        src="https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"
        width="100%"
        :aspect-ratio="ratio"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      ratios: ['1/1', '16/9'],
    };
  },
});
<\/script>
`,
    path: "demos/components/Image/aspect.vue"
  }, null, _parent));
  _push(`<h2 id="适应内容框" tabindex="-1">适应内容框 <a class="header-anchor" href="#适应内容框" aria-label="Permalink to &quot;适应内容框&quot;">​</a></h2><p>在图片的实际宽高比与原始宽高比不一致时，你可以通过 <code>object-fit</code> 属性控制图片如何适应内容框，详情请参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit" target="_blank" rel="noreferrer">MDN</a>。<br> 虚线是用来指示当前内容框的大小。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex flex-wrap">
    <div v-for="item in fits" :key="item">
      <p class="text-center">
        {{ item }}
        <span v-if="item === 'cover'">(default)</span>
      </p>
      <h-image
        src="https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"
        :object-fit="item"
        class="mr-2 img"
        :width="150"
        :height="150"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    };
  },
});
<\/script>

<style scoped>
.img {
  border: 2px dashed #aaa;
}
</style>
`,
    path: "demos/components/Image/fit.vue"
  }, null, _parent));
  _push(`<h2 id="设置标题" tabindex="-1">设置标题 <a class="header-anchor" href="#设置标题" aria-label="Permalink to &quot;设置标题&quot;">​</a></h2><p>设置 <code>show-tooltip</code> 为 <code>true</code>, 且 <code>title</code> 不为空，即会以 tooltip 的形式展示图片标题。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-image\n    src="https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"\n    width="300px"\n    show-tooltip\n    title="Demo ES7 FAR BEYOND"\n  />\n</template>\n',
    path: "demos/components/Image/title.vue"
  }, null, _parent));
  _push(`<h2 id="设置圆角" tabindex="-1">设置圆角 <a class="header-anchor" href="#设置圆角" aria-label="Permalink to &quot;设置圆角&quot;">​</a></h2><p>通过 <code>rounded</code> 来控制图片的圆角度数。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex">
    <h-image
      v-for="rounded in roundedList"
      :key="rounded"
      class="mr-3"
      src="https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"
      width="150px"
      height="150px"
      :rounded="rounded"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      roundedList: [0, 2, 4, '8px', '50%'],
    };
  },
});
<\/script>
`,
    path: "demos/components/Image/rounded.vue"
  }, null, _parent));
  _push(`<h2 id="占位图" tabindex="-1">占位图 <a class="header-anchor" href="#占位图" aria-label="Permalink to &quot;占位图&quot;">​</a></h2><p>默认情况下，图片加载过程中会显示自适应大小的占位图，你也可以通过插槽 <code>placeholder</code> 进行自定义。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-button class="mb-2" @click="generateImage">reload</h-button>
    <div class="flex">
      <h-image :src="imgSrc" class="mr-2" :width="70" :height="70" />
      <h-image :src="imgSrc" class="mr-2" :width="100" :height="100" />
      <h-image :src="imgSrc" class="mr-2" :width="150" :height="150" />
      <h-image :src="imgSrc" :width="150" :height="150">
        <template #placeholder>
          <div class="flex justify-center align-center" style="height: 100%">Loading...</div>
        </template>
      </h-image>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const imgSrc = ref('');
    const generateImage = () => {
      const base = Math.floor(Math.random() * 60) + 10;
      imgSrc.value = \`https://picsum.photos/id/\${base}/1366/768\`;
    };
    generateImage();
    return {
      imgSrc,
      generateImage,
    };
  },
});
<\/script>
`,
    path: "demos/components/Image/placeholder.vue"
  }, null, _parent));
  _push(`<h2 id="加载失败" tabindex="-1">加载失败 <a class="header-anchor" href="#加载失败" aria-label="Permalink to &quot;加载失败&quot;">​</a></h2><p>默认情况下，图片加载失败后会显示自适应大小的错误内容，你也可以通过插槽 <code>error</code> 进行自定义。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="flex">\n    <h-image src="https://not-found" class="mr-2" :width="70" :height="70" />\n    <h-image src="https://not-found" class="mr-2" :width="100" :height="100" />\n    <h-image src="https://not-found" class="mr-2" :width="150" :height="150" />\n    <h-image src="https://not-found" :width="150" :height="150">\n      <template #error>\n        <div class="flex justify-center align-center" style="height: 100%">Error</div>\n      </template>\n    </h-image>\n  </div>\n</template>\n',
    path: "demos/components/Image/error.vue"
  }, null, _parent));
  _push(`<h2 id="懒加载" tabindex="-1">懒加载 <a class="header-anchor" href="#懒加载" aria-label="Permalink to &quot;懒加载&quot;">​</a></h2><p>传入 <code>lazyload</code> 即可启用懒加载，仅当图片首次出现在可视区域时才加载图片。<br> 你可以打开开发者工具 - Network - 筛选 Img，然后回到页面顶部后刷新页面，观察图片是何时加载的。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div>\n    <h-image\n      src="https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"\n      lazyload\n      :width="500"\n    />\n  </div>\n</template>\n',
    path: "demos/components/Image/lazyload.vue"
  }, null, _parent));
  _push(`<h2 id="图片查看器" tabindex="-1">图片查看器 <a class="header-anchor" href="#图片查看器" aria-label="Permalink to &quot;图片查看器&quot;">​</a></h2><p>传入 <code>show-viewer</code> 即可启用图片查看器 <code>&lt;h-viewer /&gt;</code>。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-image\n    src="https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"\n    show-viewer\n    :width="500"\n  />\n</template>\n',
    path: "demos/components/Image/viewer.vue"
  }, null, _parent));
  _push(`<h2 id="操作项" tabindex="-1">操作项 <a class="header-anchor" href="#操作项" aria-label="Permalink to &quot;操作项&quot;">​</a></h2><p>有时你希望鼠标移上图片后显示一些操作项，你可以将 <code>show-actions</code> 设为 <code>true</code>，并通过 <code>actions-list</code> 传入一个操作列表。<br> 默认情况下，当图片宽度大于 <code>40px</code> 时，操作项会显示为按钮，否则会展示为一个下拉列表；当图片宽度大于 <code>80px</code> 时，操作项会位于右下角，否则会居中。你也可以通过 <code>actions-type</code> 和 <code>actions-position</code> 完全自定义类型和位置。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex">
    <h-image
      v-for="size in sizes"
      :key="size"
      src="https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"
      :show-actions="true"
      :actions-list="actions"
      class="mr-2"
      :width="size"
      :height="size"
      @load="imgLoad"
      @error="imgError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HImageAction } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const sizes = [150, 80, 40];
    const actions = ref<HImageAction[]>([]);
    const imgLoad = () => {
      actions.value = [
        {
          icon: 'scale_big',
          title: '放大',
          handler: (src: string) => {
            console.info('scale_big', src);
          },
        },
        {
          icon: 'download',
          title: '下载',
          handler: (src: string) => {
            console.info('download', src);
          },
        },
        {
          icon: 'rubbish',
          title: '删除',
          handler: (src: string) => {
            console.info('close', src);
          },
        },
      ];
    };
    const imgError = () => {
      actions.value = [
        {
          icon: 'refresh',
          title: '重新加载',
          handler: (src: string) => {
            console.info('refresh', src);
          },
        },
      ];
    };
    return {
      sizes,
      actions,
      imgLoad,
      imgError,
    };
  },
});
<\/script>
`,
    path: "demos/components/Image/actions.vue"
  }, null, _parent));
  _push(`<h2 id="内容插槽" tabindex="-1">内容插槽 <a class="header-anchor" href="#内容插槽" aria-label="Permalink to &quot;内容插槽&quot;">​</a></h2><p>如果你需要完全自定义图片上的内容，你可以使用默认插槽，它将始终展示在图片上层；我们还提供了 <code>hover</code> 插槽，仅当鼠标移上图片时才展示插槽。<br> 仅当图片已经加载成功后，内容插槽才会生效。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="flex">\n    <h-image\n      src="https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"\n      width="300px"\n      height="300px"\n      class="mr-2"\n    >\n      <div\n        class="absolute p-3"\n        style="\n          width: 100%;\n          bottom: 0;\n          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);\n        "\n      >\n        <div class="white text-body-1">Demo ES7</div>\n        <span class="white">FAR BEYOND</span>\n      </div>\n    </h-image>\n    <h-image\n      src="https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"\n      width="300px"\n      height="300px"\n    >\n      <template #hover>\n        <div\n          class="absolute p-3"\n          style="\n            width: 100%;\n            bottom: 0;\n            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);\n          "\n        >\n          <div class="white text-body-1">Demo ES7</div>\n          <span class="white">FAR BEYOND</span>\n        </div>\n      </template>\n    </h-image>\n  </div>\n</template>\n',
    path: "demos/components/Image/slot.vue"
  }, null, _parent));
  _push(`<h2 id="图片列表" tabindex="-1">图片列表 <a class="header-anchor" href="#图片列表" aria-label="Permalink to &quot;图片列表&quot;">​</a></h2><p>为了更方便的展示一系列图片，我们还提供了 <code>n-image-list</code> 组件，你可以控制每张图片的间距，以及最多展示的图片数量。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <div class="flex align-center mb-5">
      <span>间距：</span>
      <h-select v-model="margin">
        <h-option v-for="item in margins" :key="item" :label="item" :value="item"></h-option>
      </h-select>
      <span class="ml-4">最大数量：</span>
      <h-select v-model="limit">
        <h-option v-for="item in limits" :key="item" :label="item" :value="item"></h-option>
      </h-select>
    </div>
    <h-image-list :margin="margin" :limit="limit">
      <h-image
        v-for="img in imgs"
        :key="img.src"
        :src="img.src"
        width="120px"
        height="120px"
        rounded="8px"
        :show-viewer="true"
      />
    </h-image-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const margins = [2, 4, 8, 12];
    const limits = [1, 2, 3, 4, 5, 6];
    const margin = ref(8);
    const limit = ref(4);
    const imgs = ref([
      {
        src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg',
      },
      {
        src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/et5/top-hero-desktop.jpg',
      },
      {
        src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/et7/et7-hero-desktop.jpg',
      },
      {
        src: 'https://www.example.com/ecs/prod/s3fs-public/ec6/hero-background-mobile.jpg',
      },
      {
        src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/es8/intro/ES8-EU-SE.000.jpg',
      },
      {
        src: 'https://www.example.com/ecs/prod/s3fs-public/hero/es6-banner-2-pc.png',
      },
    ]);
    return {
      margins,
      limits,
      margin,
      limit,
      imgs,
    };
  },
});
<\/script>
`,
    path: "demos/components/Image/list.vue"
  }, null, _parent));
  _push(`<h2 id="自定义溢出" tabindex="-1">自定义溢出 <a class="header-anchor" href="#自定义溢出" aria-label="Permalink to &quot;自定义溢出&quot;">​</a></h2><p>你可以通过 <code>limit-text-size</code> 控制溢出文本的字号，还可以通过 <code>limit</code> 插槽完全自定义溢出的展示。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-image-list margin="8px" :limit="3" :limit-text-size="20">
      <h-image
        v-for="img in imgs"
        :key="img.src"
        :src="img.src"
        width="120px"
        height="120px"
        rounded="8px"
        :show-viewer="true"
      />
      <template #limit>
        <span class="font-bold">More {{ imgs.length - 3 }}</span>
      </template>
    </h-image-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const imgs = ref([
      {
        src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg',
      },
      {
        src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/et5/top-hero-desktop.jpg',
      },
      {
        src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/et7/et7-hero-desktop.jpg',
      },
      {
        src: 'https://www.example.com/ecs/prod/s3fs-public/ec6/hero-background-mobile.jpg',
      },
      {
        src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/es8/intro/ES8-EU-SE.000.jpg',
      },
      {
        src: 'https://www.example.com/ecs/prod/s3fs-public/hero/es6-banner-2-pc.png',
      },
    ]);
    const customLimitText = (total: number, limit: number) => {
      return \`More \${total - limit}...\`;
    };
    return {
      imgs,
      customLimitText,
    };
  },
});
<\/script>
`,
    path: "demos/components/Image/listCustom.vue"
  }, null, _parent));
  _push(`<h2>Image Api</h2><h3>Image Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">src</td><td>图片的文件路径</td><td><code>string</code></td><td class="text-center">是</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">alt</td><td>图片的备用文本描述，详见 `);
  _push(ssrRenderComponent(_component_h_link, { href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-alt" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`MDN`);
      } else {
        return [
          createTextVNode("MDN")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">width</td><td>图片宽度</td><td><code>string | number</code></td><td class="text-center">否</td><td>&#39;auto&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-width</td><td>图片最大宽度</td><td><code>string | number</code></td><td class="text-center">否</td><td>&#39;none&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">height</td><td>图片高度</td><td><code>string | number</code></td><td class="text-center">否</td><td>&#39;auto&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-height</td><td>图片最大高度</td><td><code>string | number</code></td><td class="text-center">否</td><td>&#39;none&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">aspect-ratio</td><td>图片宽高比，详见 `);
  _push(ssrRenderComponent(_component_h_link, { href: "https://developer.mozilla.org/zh-CN/docs/Web/CSS/aspect-ratio" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`MDN`);
      } else {
        return [
          createTextVNode("MDN")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;auto&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">object-fit</td><td>图片如何适应内容框，详见 `);
  _push(ssrRenderComponent(_component_h_link, { href: "https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`MDN`);
      } else {
        return [
          createTextVNode("MDN")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</td><td><code>&#39;fill&#39; | &#39;contain&#39; | &#39;cover&#39; | &#39;none&#39; | &#39;scale-down&#39;</code></td><td class="text-center">否</td><td>&#39;cover&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rounded</td><td>圆角度数</td><td><code>string | number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">animated</td><td>是否启用加载完成的过渡动画</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">lazyload</td><td>是否启用懒加载（仅当图片首次出现在可视区域时才加载图片）</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>图片标题</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-tooltip</td><td>是否以 tooltip 形式展示 <code>title</code> 字段</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-placeholder</td><td>是否显示默认的占位图</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-error</td><td>是否显示默认的加载失败</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-viewer</td><td>是否启用图片查看器</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">viewer-src</td><td>图片查看器展示的大图链接，不传则自动取 <code>src</code></td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-actions</td><td>鼠标移上图片后是否显示操作按钮</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">actions-list</td><td>操作按钮列表</td><td><code>HImageAction[]</code></td><td class="text-center">否</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">actions-position</td><td>操作按钮的位置<br>auto: 根据图片大小自动设置<br>center: 按钮居中<br>bottom-right: 按钮位于右下角</td><td><code>&#39;auto&#39; | &#39;center&#39; | &#39;bottom-right&#39;</code></td><td class="text-center">否</td><td>&#39;auto&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">actions-type</td><td>操作按钮的类型<br>auto: 根据图片大小自动设置<br>icon: 图标类型<br>dropdown: 下拉菜单类型</td><td><code>&#39;auto&#39; | &#39;icon&#39; | &#39;dropdown&#39;</code></td><td class="text-center">否</td><td>&#39;auto&#39;</td></tr></tbody></table><h3>Image Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">load</td><td rowspan="1">图片加载成功后的回调</td><td rowspan="1">( path: <code>string | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">path</td><td><code>string | undefined</code></td><td>图片路径</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">error</td><td rowspan="1">图片加载失败后的回调</td><td rowspan="1">( path: <code>string | undefined</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">path</td><td><code>string | undefined</code></td><td>图片路径</td></tr></tbody></table><h2>ImageList Api</h2><h3>ImageList Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">margin</td><td>图片之间的间距</td><td><code>string | number</code></td><td class="text-center">否</td><td>&#39;8px&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">limit</td><td>最多显示的图片数量，溢出的图片会默认显示 +{N}</td><td><code>number</code></td><td class="text-center">否</td><td>Infinity</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">limit-text-size</td><td>溢出文本的字体大小</td><td><code>string | number</code></td><td class="text-center">否</td><td>&#39;14px&#39;</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Image.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Image = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Image as default
};
