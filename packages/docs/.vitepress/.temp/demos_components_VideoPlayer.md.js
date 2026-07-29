import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/VideoPlayer.md","filePath":"zh/demos/components/VideoPlayer.md"}');
const _sfc_main = { name: "demos/components/VideoPlayer.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>VideoPlayer</h1><p class="description">视频播放器组件</p><h2 id="基础示例" tabindex="-1">基础示例 <a class="header-anchor" href="#基础示例" aria-label="Permalink to &quot;基础示例&quot;">​</a></h2><p>通过 <code>sources</code> 传入视频源，<code>poster</code> 传入封面图。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-video-player
    :sources="[
      {
        src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/et5/et5-hero-video.mp4',
        type: 'video/mp4',
      },
    ]"
  />
</template>
`,
    path: "demos/components/VideoPlayer/basic.vue"
  }, null, _parent));
  _push(`<h2 id="旋转视频" tabindex="-1">旋转视频 <a class="header-anchor" href="#旋转视频" aria-label="Permalink to &quot;旋转视频&quot;">​</a></h2><p>通过 <code>rotate</code> 控制视频的旋转，支持 <code>0</code>, <code>90</code>, <code>180</code>, <code>270</code> 四个角度。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-button class="mb-3" @click="doRotate">Rotate</h-button>
    <h-video-player
      :sources="[
        {
          src: 'https://media.vimejs.com/720p.mp4',
          type: 'video/mp4',
        },
      ]"
      poster="https://media.vimejs.com/poster.png"
      :rotate="degree"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const degree = ref(0);
    const doRotate = () => {
      switch (degree.value) {
        case 0:
          degree.value = 90;
          return;
        case 90:
          degree.value = 180;
          return;
        case 180:
          degree.value = 270;
          return;
        case 270:
          degree.value = 0;
          return;
      }
    };
    return {
      degree,
      doRotate,
    };
  },
});
<\/script>
`,
    path: "demos/components/VideoPlayer/rotate.vue"
  }, null, _parent));
  _push(`<h2 id="清晰度选择" tabindex="-1">清晰度选择 <a class="header-anchor" href="#清晰度选择" aria-label="Permalink to &quot;清晰度选择&quot;">​</a></h2><p>如果传入的视频源是 <a href="https://developer.apple.com/streaming/" target="_blank" rel="noreferrer">HTTP Live Streaming</a> (HLS) 且包含多个清晰度，则会展示清晰度选择列表。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-video-player
    :sources="[
      {
        src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      },
    ]"
  />
</template>
`,
    path: "demos/components/VideoPlayer/quality.vue"
  }, null, _parent));
  _push(`<h2 id="播放器控制" tabindex="-1">播放器控制 <a class="header-anchor" href="#播放器控制" aria-label="Permalink to &quot;播放器控制&quot;">​</a></h2><p>你可以通过 <code>ready</code> 事件的回调参数获取到播放器实例 <a href="https://docs.videojs.com/player" target="_blank" rel="noreferrer">player</a>。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-video-player
    :sources="[
      {
        src: 'https://media.vimejs.com/720p.mp4',
        type: 'video/mp4',
      },
    ]"
    poster="https://media.vimejs.com/poster.png"
    @ready="ready"
  />
  <h-button class="mt-3 mr-2" @click="play">播放</h-button>
  <h-button @click="pause">暂停</h-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const player = ref();
    return {
      ready: (playerInstance: any) => {
        player.value = playerInstance;
      },
      play: () => {
        player.value.play();
      },
      pause: () => {
        player.value.pause();
      },
    };
  },
});
<\/script>
`,
    path: "demos/components/VideoPlayer/action.vue"
  }, null, _parent));
  _push(`<h2 id="错误提示" tabindex="-1">错误提示 <a class="header-anchor" href="#错误提示" aria-label="Permalink to &quot;错误提示&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-video-player
    :sources="[
      {
        src: 'https://www.example.com/not-found.mp4',
        type: 'video/mp4',
      },
    ]"
    poster="https://www.example.com/cdn-static/mydemo/nextjs/images/et5/top-hero-desktop.jpg"
  />
</template>
`,
    path: "demos/components/VideoPlayer/error.vue"
  }, null, _parent));
  _push(`<h2>VideoPlayer Api</h2><h3>VideoPlayer Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sources</td><td>视频资源，是一个数组，如果传入了超过一个资源则会自动选择</td><td><code>Source[]</code></td><td class="text-center">是</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">poster</td><td>视频的封面图片地址，一旦开始播放，图片就会消失</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rotate</td><td>视频旋转角度</td><td><code>0 | 90 | 180 | 270</code></td><td class="text-center">否</td><td>0</td></tr></tbody></table><h3>VideoPlayer Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">ready</td><td rowspan="1">视频播放器加载完成时的回调</td><td rowspan="1">( playerInstance: <code>HTMLVideoElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">playerInstance</td><td><code>HTMLVideoElement</code></td><td>HTMLVideoElement 实例</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/VideoPlayer.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const VideoPlayer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  VideoPlayer as default
};
