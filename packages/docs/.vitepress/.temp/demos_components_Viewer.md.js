import { resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Viewer.md","filePath":"zh/demos/components/Viewer.md"}');
const _sfc_main = { name: "demos/components/Viewer.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_h_link = resolveComponent("h-link");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Viewer</h1><p class="description">图片视频查看器</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2><p>通过 <code>sources</code> 传入资源列表。</p>`);
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
  _push(`<h2 id="循环展示" tabindex="-1">循环展示 <a class="header-anchor" href="#循环展示" aria-label="Permalink to &quot;循环展示&quot;">​</a></h2><p>你可以传入 <code>loop</code> 启用循环切换功能。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-button @click="showViewer">点我浏览精彩图集</h-button>\n  <h-viewer v-model="visibleRef" :sources="imagesRef" loop />\n</template>\n\n<script lang="ts">\nimport { defineComponent, ref } from \'vue\';\nimport type { HViewerSource } from \'@aurora/horizon-web\';\nexport default defineComponent({\n  setup() {\n    const imagesRef = ref<HViewerSource[]>([]);\n    const generateImages = (count: number) => {\n      const list = [] as HViewerSource[];\n      const base = Math.floor(Math.random() * 60) + 10;\n      for (let i = 0; i < count; i++) {\n        list.push({\n          type: \'image\',\n          thumbnail: `https://picsum.photos/id/${base + i}/80/80`,\n          cover: `https://picsum.photos/id/${base + i}/1366/768`,\n          title: `Image: ${base + i}`,\n        });\n      }\n      return list;\n    };\n    const visibleRef = ref(false);\n    const showViewer = () => {\n      imagesRef.value = generateImages(10);\n      visibleRef.value = true;\n    };\n    return {\n      visibleRef,\n      imagesRef,\n      showViewer,\n    };\n  },\n});\n<\/script>\n',
    path: "demos/components/Viewer/loop.vue"
  }, null, _parent));
  _push(`<h2 id="自动隐藏工具栏" tabindex="-1">自动隐藏工具栏 <a class="header-anchor" href="#自动隐藏工具栏" aria-label="Permalink to &quot;自动隐藏工具栏&quot;">​</a></h2><p>默认情况下 3 秒无操作会自动隐藏工具栏，你可以禁用这一行为。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-button @click="showViewer">点我浏览精彩图集</h-button>\n  <h-viewer v-model="visibleRef" :sources="imagesRef" :auto-hide-tools="false" />\n</template>\n\n<script lang="ts">\nimport { defineComponent, ref } from \'vue\';\nimport type { HViewerSource } from \'@aurora/horizon-web\';\nexport default defineComponent({\n  setup() {\n    const imagesRef = ref<HViewerSource[]>([]);\n    const generateImages = (count: number) => {\n      const list = [] as HViewerSource[];\n      const base = Math.floor(Math.random() * 60) + 10;\n      for (let i = 0; i < count; i++) {\n        list.push({\n          type: \'image\',\n          thumbnail: `https://picsum.photos/id/${base + i}/80/80`,\n          cover: `https://picsum.photos/id/${base + i}/1366/768`,\n          title: `Image: ${base + i}`,\n        });\n      }\n      return list;\n    };\n    const visibleRef = ref(false);\n    const showViewer = () => {\n      imagesRef.value = generateImages(10);\n      visibleRef.value = true;\n    };\n    return {\n      visibleRef,\n      imagesRef,\n      showViewer,\n    };\n  },\n});\n<\/script>\n',
    path: "demos/components/Viewer/autohide.vue"
  }, null, _parent));
  _push(`<h2 id="图注" tabindex="-1">图注 <a class="header-anchor" href="#图注" aria-label="Permalink to &quot;图注&quot;">​</a></h2><p>图注是图片上的标签，你可以给一张图片配置多个图注，设置了 <code>handler</code> 的图注是可点击的。<br> 只有图片才支持图注，视频不支持。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: "<template>\n  <h-button @click=\"showViewer\">点我浏览精彩图集</h-button>\n  <h-viewer v-model=\"visibleRef\" :sources=\"imagesRef\" />\n</template>\n\n<script lang=\"ts\">\nimport { defineComponent, ref } from 'vue';\nimport type { HViewerSource } from '@aurora/horizon-web';\nexport default defineComponent({\n  setup() {\n    const imagesRef = ref<HViewerSource[]>([]);\n    const generateImages = (count: number) => {\n      const list = [] as HViewerSource[];\n      const base = Math.floor(Math.random() * 60) + 10;\n      for (let i = 0; i < count; i++) {\n        list.push({\n          type: 'image',\n          thumbnail: `https://picsum.photos/id/${base + i}/80/80`,\n          cover: `https://picsum.photos/id/${base + i}/1366/768`,\n          title: `Image: ${base + i}`,\n        });\n      }\n      list[0].legends = [\n        {\n          x: 100,\n          y: 200,\n          label: 'Severe depression',\n        },\n        {\n          x: 300,\n          y: 100,\n          label: 'Paint off',\n          handler(url: string) {\n            console.info('Click legend', url);\n          },\n        },\n      ];\n      return list;\n    };\n    const visibleRef = ref(false);\n    const showViewer = () => {\n      imagesRef.value = generateImages(10);\n      visibleRef.value = true;\n    };\n    return {\n      visibleRef,\n      imagesRef,\n      showViewer,\n    };\n  },\n});\n<\/script>\n",
    path: "demos/components/Viewer/legend.vue"
  }, null, _parent));
  _push(`<h2 id="自定义按钮" tabindex="-1">自定义按钮 <a class="header-anchor" href="#自定义按钮" aria-label="Permalink to &quot;自定义按钮&quot;">​</a></h2><p>你可以重新组合想要的内置按钮，或者添加完全自定义的按钮。</p>`);
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
  _push(`<h2 id="点击图片触发" tabindex="-1">点击图片触发 <a class="header-anchor" href="#点击图片触发" aria-label="Permalink to &quot;点击图片触发&quot;">​</a></h2><p>要想通过点击页面上已经存在的图片触发画廊，需要一点额外的工作。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <img\n    v-for="item in imagesRef"\n    :key="item.cover"\n    :src="item.thumbnail"\n    :data-source="item.cover"\n    :alt="item.title"\n    class="mr-3"\n    @click="showViewer(item.cover)"\n  />\n  <h-viewer v-model="visibleRef" :sources="imagesRef" :init-index="initIndexRef" />\n</template>\n\n<script lang="ts">\nimport { defineComponent, ref } from \'vue\';\nimport type { HViewerSource } from \'@aurora/horizon-web\';\nexport default defineComponent({\n  setup() {\n    const imagesRef = ref<HViewerSource[]>([]);\n    const generateImages = (count: number) => {\n      const list = [] as HViewerSource[];\n      const base = Math.floor(Math.random() * 60) + 10;\n      for (let i = 0; i < count; i++) {\n        list.push({\n          type: \'image\',\n          thumbnail: `https://picsum.photos/id/${base + i}/80/80`,\n          cover: `https://picsum.photos/id/${base + i}/1366/768`,\n          title: `Image: ${base + i}`,\n        });\n      }\n      return list;\n    };\n    imagesRef.value = generateImages(10);\n\n    const visibleRef = ref(false);\n    const initIndexRef = ref(0);\n    const showViewer = (url: string) => {\n      const index = imagesRef.value.findIndex(img => img.cover === url);\n      initIndexRef.value = index >= 0 ? index : 0;\n      visibleRef.value = true;\n    };\n    return {\n      visibleRef,\n      imagesRef,\n      initIndexRef,\n      showViewer,\n    };\n  },\n});\n<\/script>\n\n<style scoped>\nimg {\n  cursor: zoom-in;\n}\n</style>\n',
    path: "demos/components/Viewer/imgclick.vue"
  }, null, _parent));
  _push(`<h2 id="按键支持" tabindex="-1">按键支持 <a class="header-anchor" href="#按键支持" aria-label="Permalink to &quot;按键支持&quot;">​</a></h2><p><kbd>Esc</kbd> 关闭查看器<br><kbd>←</kbd> 上一张图片<br><kbd>→</kbd> 下一张图片<br><kbd>↑</kbd> 放大图片<br><kbd>↓</kbd> 缩小图片<br><kbd>鼠标双击</kbd> 在原始大小和自适应大小间切换<br><kbd>鼠标滚轮或双指捏合</kbd> 放大或缩小图片</p><h2>Viewer Api</h2><h3>Viewer Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>控制显示隐藏</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sources</td><td>资源列表</td><td><code>HViewerSource[]</code></td><td class="text-center">是</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">init-index</td><td>初始展示的图片序号</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">loop</td><td>是否支持循环切换</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-hide-tools</td><td>3秒无操作后自动隐藏工具栏</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>CSS 层级</td><td><code>number</code></td><td class="text-center">否</td><td>1000</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tools</td><td>自定义工具栏的按钮。内置按钮包括：<br>thumbnail: 切换显示隐藏缩略图<br>previous: 切换上一张<br>next: 切换下一张<br>current: 当前/总数<br>zoomOut: 缩小<br>zoomIn: 放大<br>ratio: 实时比例<br>1:1: 切换自适应大小与实际大小<br>rotate: 旋转90°<br>legend: 切换显示隐藏图注，仅当存在图注时才会显示该按钮<br>download: 下载<br>split: 分割线<br>`);
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
  _push(`: 自定义按钮</td><td><code>(<br>        | &#39;thumbnail&#39;<br>        | &#39;previous&#39;<br>        | &#39;next&#39;<br>        | &#39;current&#39;<br>        | &#39;zoomOut&#39;<br>        | &#39;zoomIn&#39;<br>        | &#39;ratio&#39;<br>        | &#39;1:1&#39;<br>        | &#39;rotate&#39;<br>        | &#39;legend&#39;<br>        | &#39;download&#39;<br>        | &#39;split&#39;<br>        | HViewerCustomToolItem<br>      )[]</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">download-fn</td><td>自定义下载函数，入参是当前图片或视频的地址</td><td><code>(src: string) =&gt; void</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide-on-click-modal</td><td>是否允许点击遮罩关闭预览</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3>Viewer Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Viewer.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Viewer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Viewer as default
};
