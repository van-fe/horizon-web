import { resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Viewer.md","filePath":"en/demos/components/Viewer.md"}');
const _sfc_main = { name: "en/demos/components/Viewer.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_h_link = resolveComponent("h-link");
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
export default defineComponent({
  setup() {
    const imagesRef = ref<HViewerSource[]>([]);
    const generateImages = (count: number) => {
      const list = [] as HViewerSource[];
      const base = Math.floor(Math.random() * 60) + 10;
      for (let i = 0; i < count; i++) {
        list.push({
          type: 'image',
          thumbnail: \`https://picsum.photos/id/\${base + i}/80/80\`,
          cover: \`https://picsum.photos/id/\${base + i}/1366/768\`,
          title: \`Image: \${base + i}\`,
        });
      }
      return list;
    };
    const visibleRef = ref(false);
    const video1 = {
      type: 'video',
      cover: 'https://www.example.com/cdn-static/mydemo/nextjs/images/et5/top-hero-desktop.jpg',
      thumbnail: 'https://www.example.com/cdn-static/mydemo/nextjs/images/et5/top-hero-desktop.jpg',
      videoSources: [
        {
          src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/et5/et5-hero-video.mp4',
          type: 'video/mp4',
        },
      ],
      title: 'vimejs video',
    } as HViewerSource;
    const video2 = {
      type: 'video',
      cover: 'https://vjs.zencdn.net/v/oceans.png',
      thumbnail: 'https://vjs.zencdn.net/v/oceans.png',
      videoSources: [
        {
          src: 'https://vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4',
        },
      ],
      title: 'oceans video',
    } as HViewerSource;
    const showViewer = () => {
      imagesRef.value = generateImages(1);
      visibleRef.value = true;
    };
    const showViewer2 = () => {
      imagesRef.value = [video1];
      visibleRef.value = true;
    };
    const showViewer3 = () => {
      imagesRef.value = [video1, video2, ...generateImages(10)];
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
    source: '<template>\n  <h-button @click="showViewer">点我浏览精彩图集</h-button>\n  <h-viewer v-model="visibleRef" :sources="imagesRef" loop />\n</template>\n\n<script lang="ts">\nimport { defineComponent, ref } from \'vue\';\nimport type { HViewerSource } from \'@aurora/horizon-web\';\nexport default defineComponent({\n  setup() {\n    const imagesRef = ref<HViewerSource[]>([]);\n    const generateImages = (count: number) => {\n      const list = [] as HViewerSource[];\n      const base = Math.floor(Math.random() * 60) + 10;\n      for (let i = 0; i < count; i++) {\n        list.push({\n          type: \'image\',\n          thumbnail: `https://picsum.photos/id/${base + i}/80/80`,\n          cover: `https://picsum.photos/id/${base + i}/1366/768`,\n          title: `Image: ${base + i}`,\n        });\n      }\n      return list;\n    };\n    const visibleRef = ref(false);\n    const showViewer = () => {\n      imagesRef.value = generateImages(10);\n      visibleRef.value = true;\n    };\n    return {\n      visibleRef,\n      imagesRef,\n      showViewer,\n    };\n  },\n});\n<\/script>\n',
    path: "demos/components/Viewer/loop.vue"
  }, null, _parent));
  _push(`<h2 id="auto-hide-toolbar" tabindex="-1">Auto Hide Toolbar <a class="header-anchor" href="#auto-hide-toolbar" aria-label="Permalink to &quot;Auto Hide Toolbar&quot;">​</a></h2><p>By default, the toolbar will automatically hide after 3 seconds of no operation. You can disable this behavior.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-button @click="showViewer">点我浏览精彩图集</h-button>\n  <h-viewer v-model="visibleRef" :sources="imagesRef" :auto-hide-tools="false" />\n</template>\n\n<script lang="ts">\nimport { defineComponent, ref } from \'vue\';\nimport type { HViewerSource } from \'@aurora/horizon-web\';\nexport default defineComponent({\n  setup() {\n    const imagesRef = ref<HViewerSource[]>([]);\n    const generateImages = (count: number) => {\n      const list = [] as HViewerSource[];\n      const base = Math.floor(Math.random() * 60) + 10;\n      for (let i = 0; i < count; i++) {\n        list.push({\n          type: \'image\',\n          thumbnail: `https://picsum.photos/id/${base + i}/80/80`,\n          cover: `https://picsum.photos/id/${base + i}/1366/768`,\n          title: `Image: ${base + i}`,\n        });\n      }\n      return list;\n    };\n    const visibleRef = ref(false);\n    const showViewer = () => {\n      imagesRef.value = generateImages(10);\n      visibleRef.value = true;\n    };\n    return {\n      visibleRef,\n      imagesRef,\n      showViewer,\n    };\n  },\n});\n<\/script>\n',
    path: "demos/components/Viewer/autohide.vue"
  }, null, _parent));
  _push(`<h2 id="legend" tabindex="-1">Legend <a class="header-anchor" href="#legend" aria-label="Permalink to &quot;Legend&quot;">​</a></h2><p>Legend is a label on the image. You can configure multiple legends for an image. Legends with <code>handler</code> set are clickable.<br> Only images support legends, videos do not.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: "<template>\n  <h-button @click=\"showViewer\">点我浏览精彩图集</h-button>\n  <h-viewer v-model=\"visibleRef\" :sources=\"imagesRef\" />\n</template>\n\n<script lang=\"ts\">\nimport { defineComponent, ref } from 'vue';\nimport type { HViewerSource } from '@aurora/horizon-web';\nexport default defineComponent({\n  setup() {\n    const imagesRef = ref<HViewerSource[]>([]);\n    const generateImages = (count: number) => {\n      const list = [] as HViewerSource[];\n      const base = Math.floor(Math.random() * 60) + 10;\n      for (let i = 0; i < count; i++) {\n        list.push({\n          type: 'image',\n          thumbnail: `https://picsum.photos/id/${base + i}/80/80`,\n          cover: `https://picsum.photos/id/${base + i}/1366/768`,\n          title: `Image: ${base + i}`,\n        });\n      }\n      list[0].legends = [\n        {\n          x: 100,\n          y: 200,\n          label: 'Severe depression',\n        },\n        {\n          x: 300,\n          y: 100,\n          label: 'Paint off',\n          handler(url: string) {\n            console.info('Click legend', url);\n          },\n        },\n      ];\n      return list;\n    };\n    const visibleRef = ref(false);\n    const showViewer = () => {\n      imagesRef.value = generateImages(10);\n      visibleRef.value = true;\n    };\n    return {\n      visibleRef,\n      imagesRef,\n      showViewer,\n    };\n  },\n});\n<\/script>\n",
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
export default defineComponent({
  setup() {
    const imagesRef = ref<HViewerSource[]>([]);
    const generateImages = (count: number) => {
      const list = [] as HViewerSource[];
      const base = Math.floor(Math.random() * 60) + 10;
      for (let i = 0; i < count; i++) {
        list.push({
          type: 'image',
          thumbnail: \`https://picsum.photos/id/\${base + i}/80/80\`,
          cover: \`https://picsum.photos/id/\${base + i}/1366/768\`,
          title: \`Image: \${base + i}\`,
        });
      }
      return list;
    };
    const visibleRef = ref(false);
    const showViewer = () => {
      imagesRef.value = generateImages(10);
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
    source: '<template>\n  <img\n    v-for="item in imagesRef"\n    :key="item.cover"\n    :src="item.thumbnail"\n    :data-source="item.cover"\n    :alt="item.title"\n    class="mr-3"\n    @click="showViewer(item.cover)"\n  />\n  <h-viewer v-model="visibleRef" :sources="imagesRef" :init-index="initIndexRef" />\n</template>\n\n<script lang="ts">\nimport { defineComponent, ref } from \'vue\';\nimport type { HViewerSource } from \'@aurora/horizon-web\';\nexport default defineComponent({\n  setup() {\n    const imagesRef = ref<HViewerSource[]>([]);\n    const generateImages = (count: number) => {\n      const list = [] as HViewerSource[];\n      const base = Math.floor(Math.random() * 60) + 10;\n      for (let i = 0; i < count; i++) {\n        list.push({\n          type: \'image\',\n          thumbnail: `https://picsum.photos/id/${base + i}/80/80`,\n          cover: `https://picsum.photos/id/${base + i}/1366/768`,\n          title: `Image: ${base + i}`,\n        });\n      }\n      return list;\n    };\n    imagesRef.value = generateImages(10);\n\n    const visibleRef = ref(false);\n    const initIndexRef = ref(0);\n    const showViewer = (url: string) => {\n      const index = imagesRef.value.findIndex(img => img.cover === url);\n      initIndexRef.value = index >= 0 ? index : 0;\n      visibleRef.value = true;\n    };\n    return {\n      visibleRef,\n      imagesRef,\n      initIndexRef,\n      showViewer,\n    };\n  },\n});\n<\/script>\n\n<style scoped>\nimg {\n  cursor: zoom-in;\n}\n</style>\n',
    path: "demos/components/Viewer/imgclick.vue"
  }, null, _parent));
  _push(`<h2 id="keyboard-support" tabindex="-1">Keyboard Support <a class="header-anchor" href="#keyboard-support" aria-label="Permalink to &quot;Keyboard Support&quot;">​</a></h2><p><kbd>Esc</kbd> Close viewer<br><kbd>←</kbd> Previous image<br><kbd>→</kbd> Next image<br><kbd>↑</kbd> Zoom in image<br><kbd>↓</kbd> Zoom out image<br><kbd>Double Click Mouse</kbd> Toggle between original size and adaptive size<br><kbd>Mouse Wheel or Pinch</kbd> Zoom in or out image</p><h2>Viewer Api</h2><h3>Viewer Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>控制显示隐藏</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sources</td><td>资源列表</td><td><code>HViewerSource[]</code></td><td class="text-center">Yes</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">init-index</td><td>初始展示的图片序号</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loop</td><td>是否支持循环切换</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-hide-tools</td><td>3秒无操作后自动隐藏工具栏</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>CSS 层级</td><td><code>number</code></td><td class="text-center">No</td><td>1000</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tools</td><td>自定义工具栏的按钮。内置按钮包括：<br>thumbnail: 切换显示隐藏缩略图<br>previous: 切换上一张<br>next: 切换下一张<br>current: 当前/总数<br>zoomOut: 缩小<br>zoomIn: 放大<br>ratio: 实时比例<br>1:1: 切换自适应大小与实际大小<br>rotate: 旋转90°<br>legend: 切换显示隐藏图注，仅当存在图注时才会显示该按钮<br>download: 下载<br>split: 分割线<br>`);
  _push(ssrRenderComponent(_component_h_link, { href: "#nviewercustomtoolitem" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`CustomToolItem`);
      } else {
        return [
          createTextVNode("CustomToolItem")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`: 自定义按钮</td><td><code>(<br>        | &#39;thumbnail&#39;<br>        | &#39;previous&#39;<br>        | &#39;next&#39;<br>        | &#39;current&#39;<br>        | &#39;zoomOut&#39;<br>        | &#39;zoomIn&#39;<br>        | &#39;ratio&#39;<br>        | &#39;1:1&#39;<br>        | &#39;rotate&#39;<br>        | &#39;legend&#39;<br>        | &#39;download&#39;<br>        | &#39;split&#39;<br>        | HViewerCustomToolItem<br>      )[]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">download-fn</td><td>自定义下载函数，入参是当前图片或视频的地址</td><td><code>(src: string) =&gt; void</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide-on-click-modal</td><td>是否允许点击遮罩关闭预览</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3>Viewer Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody></tbody></table></div>`);
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
