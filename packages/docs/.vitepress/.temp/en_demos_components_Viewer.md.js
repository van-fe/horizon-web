import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Viewer.md","filePath":"en/demos/components/Viewer.md"}');
const _sfc_main = { name: "en/demos/components/Viewer.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Viewer</h1><p class="description">Pass resource list through <code>sources</code>.</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Pass resource list through <code>sources</code>.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button class="mr-2" @click="showViewer">单张图片</h-button>
  <h-button class="mr-2" @click="showViewer2">单个视频</h-button>
  <h-button class="mr-2" @click="showViewer3">图片和视频集合</h-button>
  <h-viewer v-model="visibleRef" :sources="imagesRef" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HViewerSource } from '@aurora/horizon-web';
import { createDemoViewerSources } from '../../demo-assets';
export default defineComponent({
  setup() {
    const imagesRef = ref<HViewerSource[]>([]);
    const visibleRef = ref(false);
    const video1 = {
      type: 'video',
      cover: '/demo-assets/scene-summit.svg',
      thumbnail: '/demo-assets/scene-summit.svg',
      videoSources: [
        {
          src: '/aurora-background.mp4',
          type: 'video/mp4',
        },
      ],
      title: 'vimejs video',
    } as HViewerSource;
    const video2 = {
      type: 'video',
      cover: '/demo-assets/video-poster.svg',
      thumbnail: '/demo-assets/video-poster.svg',
      videoSources: [
        {
          src: '/aurora-background.mp4',
          type: 'video/mp4',
        },
      ],
      title: 'oceans video',
    } as HViewerSource;
    const showViewer = () => {
      imagesRef.value = createDemoViewerSources(1);
      visibleRef.value = true;
    };
    const showViewer2 = () => {
      imagesRef.value = [video1];
      visibleRef.value = true;
    };
    const showViewer3 = () => {
      imagesRef.value = [video1, video2, ...createDemoViewerSources(10)];
      visibleRef.value = true;
    };
    return {
      imagesRef,
      showViewer,
      showViewer2,
      showViewer3,
      visibleRef,
    };
  },
});
<\/script>
`,
    path: "demos/components/Viewer/basic.vue"
  }, null, _parent));
  _push(`<h2 id="loop-display" tabindex="-1">Loop Display <a class="header-anchor" href="#loop-display" aria-label="Permalink to &quot;Loop Display&quot;">​</a></h2><p>You can pass in <code>loop</code> to enable loop switching function.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button @click="showViewer">点我浏览精彩图集</h-button>
  <h-viewer v-model="visibleRef" :sources="imagesRef" loop />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HViewerSource } from '@aurora/horizon-web';
import { createDemoViewerSources } from '../../demo-assets';
export default defineComponent({
  setup() {
    const imagesRef = ref<HViewerSource[]>([]);
    const visibleRef = ref(false);
    const showViewer = () => {
      imagesRef.value = createDemoViewerSources(10);
      visibleRef.value = true;
    };
    return {
      visibleRef,
      imagesRef,
      showViewer,
    };
  },
});
<\/script>
`,
    path: "demos/components/Viewer/loop.vue"
  }, null, _parent));
  _push(`<h2 id="auto-hide-toolbar" tabindex="-1">Auto Hide Toolbar <a class="header-anchor" href="#auto-hide-toolbar" aria-label="Permalink to &quot;Auto Hide Toolbar&quot;">​</a></h2><p>By default, the toolbar will automatically hide after 3 seconds of no operation. You can disable this behavior.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button @click="showViewer">点我浏览精彩图集</h-button>
  <h-viewer v-model="visibleRef" :sources="imagesRef" :auto-hide-tools="false" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HViewerSource } from '@aurora/horizon-web';
import { createDemoViewerSources } from '../../demo-assets';
export default defineComponent({
  setup() {
    const imagesRef = ref<HViewerSource[]>([]);
    const visibleRef = ref(false);
    const showViewer = () => {
      imagesRef.value = createDemoViewerSources(10);
      visibleRef.value = true;
    };
    return {
      visibleRef,
      imagesRef,
      showViewer,
    };
  },
});
<\/script>
`,
    path: "demos/components/Viewer/autohide.vue"
  }, null, _parent));
  _push(`<h2 id="legend" tabindex="-1">Legend <a class="header-anchor" href="#legend" aria-label="Permalink to &quot;Legend&quot;">​</a></h2><p>Legend is a label on the image. You can configure multiple legends for an image. Legends with <code>handler</code> set are clickable.<br> Only images support legends, videos do not.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button @click="showViewer">点我浏览精彩图集</h-button>
  <h-viewer v-model="visibleRef" :sources="imagesRef" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HViewerSource } from '@aurora/horizon-web';
import { createDemoViewerSources } from '../../demo-assets';
export default defineComponent({
  setup() {
    const imagesRef = ref<HViewerSource[]>([]);
    const generateImages = (count: number) => {
      const list = createDemoViewerSources(count);
      list[0].legends = [
        {
          x: 100,
          y: 200,
          label: 'Severe depression',
        },
        {
          x: 300,
          y: 100,
          label: 'Paint off',
          handler(url: string) {
            console.info('Click legend', url);
          },
        },
      ];
      return list;
    };
    const visibleRef = ref(false);
    const showViewer = () => {
      imagesRef.value = generateImages(10);
      visibleRef.value = true;
    };
    return {
      visibleRef,
      imagesRef,
      showViewer,
    };
  },
});
<\/script>
`,
    path: "demos/components/Viewer/legend.vue"
  }, null, _parent));
  _push(`<h2 id="custom-buttons" tabindex="-1">Custom Buttons <a class="header-anchor" href="#custom-buttons" aria-label="Permalink to &quot;Custom Buttons&quot;">​</a></h2><p>You can recombine the built-in buttons you want, or add completely custom buttons.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button @click="showViewer">查看自定义按钮的示例</h-button>
  <h-viewer v-model="visibleRef" :sources="imagesRef" :tools="tools" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HViewerSource, HViewerCustomToolItem } from '@aurora/horizon-web';
import { createDemoViewerSources } from '../../demo-assets';
export default defineComponent({
  setup() {
    const imagesRef = ref<HViewerSource[]>([]);
    const visibleRef = ref(false);
    const showViewer = () => {
      imagesRef.value = createDemoViewerSources(10);
      visibleRef.value = true;
    };
    const tools = [
      'previous',
      'next',
      'split',
      'zoomOut',
      'ratio',
      'zoomIn',
      '1:1',
      'split',
      {
        iconName: 'tips',
        iconSize: '24',
        iconColor: 'white',
        title: 'More info',
        handler(url: string) {
          console.info('Click info button', url);
        },
      } as HViewerCustomToolItem,
    ];
    return {
      visibleRef,
      imagesRef,
      showViewer,
      tools,
    };
  },
});
<\/script>
`,
    path: "demos/components/Viewer/tools.vue"
  }, null, _parent));
  _push(`<h2 id="click-image-to-trigger" tabindex="-1">Click Image to Trigger <a class="header-anchor" href="#click-image-to-trigger" aria-label="Permalink to &quot;Click Image to Trigger&quot;">​</a></h2><p>To trigger the gallery by clicking an image that already exists on the page, a little extra work is needed.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <img
    v-for="item in imagesRef"
    :key="item.cover"
    :src="item.thumbnail"
    :data-source="item.cover"
    :alt="item.title"
    class="mr-3"
    @click="showViewer(item.cover)"
  />
  <h-viewer v-model="visibleRef" :sources="imagesRef" :init-index="initIndexRef" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HViewerSource } from '@aurora/horizon-web';
import { createDemoViewerSources } from '../../demo-assets';
export default defineComponent({
  setup() {
    const imagesRef = ref<HViewerSource[]>([]);
    imagesRef.value = createDemoViewerSources(10);

    const visibleRef = ref(false);
    const initIndexRef = ref(0);
    const showViewer = (url: string) => {
      const index = imagesRef.value.findIndex(img => img.cover === url);
      initIndexRef.value = index >= 0 ? index : 0;
      visibleRef.value = true;
    };
    return {
      visibleRef,
      imagesRef,
      initIndexRef,
      showViewer,
    };
  },
});
<\/script>

<style scoped>
img {
  cursor: zoom-in;
}
</style>
`,
    path: "demos/components/Viewer/imgclick.vue"
  }, null, _parent));
  _push(`<h2 id="keyboard-support" tabindex="-1">Keyboard Support <a class="header-anchor" href="#keyboard-support" aria-label="Permalink to &quot;Keyboard Support&quot;">​</a></h2><p><kbd>Esc</kbd> Close viewer<br><kbd>←</kbd> Previous image<br><kbd>→</kbd> Next image<br><kbd>↑</kbd> Zoom in image<br><kbd>↓</kbd> Zoom out image<br><kbd>Double Click Mouse</kbd> Toggle between original size and adaptive size<br><kbd>Mouse Wheel or Pinch</kbd> Zoom in or out image</p><h2 id="viewer-api" class="no-underline h2"><a href="#viewer-api" class="!no-underline">Viewer Api</a></h2><h3 id="viewer-props" class="no-underline h3"><a href="#viewer-props" class="!no-underline">Viewer Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>Configuration for model value.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sources</td><td>Configuration for sources.</td><td><code>HViewerSource[]</code></td><td class="text-center">Yes</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">init-index</td><td>Configuration for init index.</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loop</td><td>Configuration for loop.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-hide-tools</td><td>Configuration for auto hide tools.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>Configuration for z index.</td><td><code>number</code></td><td class="text-center">No</td><td>1000</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tools</td><td>Configuration for tools.</td><td><code>(<br>        | &#39;thumbnail&#39;<br>        | &#39;previous&#39;<br>        | &#39;next&#39;<br>        | &#39;current&#39;<br>        | &#39;zoomOut&#39;<br>        | &#39;zoomIn&#39;<br>        | &#39;ratio&#39;<br>        | &#39;1:1&#39;<br>        | &#39;rotate&#39;<br>        | &#39;legend&#39;<br>        | &#39;download&#39;<br>        | &#39;split&#39;<br>        | HViewerCustomToolItem<br>      )[]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">download-fn</td><td>Configuration for download fn.</td><td><code>(src: string) =&gt; void</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide-on-click-modal</td><td>Configuration for hide on click modal.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="viewer-emits" class="no-underline h3"><a href="#viewer-emits" class="!no-underline">Viewer Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Viewer.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Viewer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Viewer as default
};
