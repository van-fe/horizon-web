import { resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/VideoPlayer.md","filePath":"en/demos/components/VideoPlayer.md"}');
const _sfc_main = { name: "en/demos/components/VideoPlayer.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_h_link = resolveComponent("h-link");
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>VideoPlayer</h1><p class="description">Video player component, encapsulates `);
  _push(ssrRenderComponent(_component_h_link, {
    href: "https://videojs.com/",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`videojs`);
      } else {
        return [
          createTextVNode("videojs")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`.</p><h2 id="component-instructions" tabindex="-1">Component Instructions <a class="header-anchor" href="#component-instructions" aria-label="Permalink to &quot;Component Instructions&quot;">​</a></h2><p>Video player component, encapsulates <a href="https://videojs.com/" target="_blank" rel="noreferrer">videojs</a>.</p><h2 id="basic-example" tabindex="-1">Basic Example <a class="header-anchor" href="#basic-example" aria-label="Permalink to &quot;Basic Example&quot;">​</a></h2><p>Pass video source through <code>sources</code>, and cover image through <code>poster</code>.</p>`);
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
  _push(`<h2 id="rotate-video" tabindex="-1">Rotate Video <a class="header-anchor" href="#rotate-video" aria-label="Permalink to &quot;Rotate Video&quot;">​</a></h2><p>Control video rotation through <code>rotate</code>, supporting four angles: <code>0</code>, <code>90</code>, <code>180</code>, <code>270</code>.</p>`);
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
  _push(`<h2 id="quality-selection" tabindex="-1">Quality Selection <a class="header-anchor" href="#quality-selection" aria-label="Permalink to &quot;Quality Selection&quot;">​</a></h2><p>If the passed video source is <a href="https://developer.apple.com/streaming/" target="_blank" rel="noreferrer">HTTP Live Streaming</a> (HLS) and contains multiple qualities, a quality selection list will be displayed.</p>`);
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
  _push(`<h2 id="player-control" tabindex="-1">Player Control <a class="header-anchor" href="#player-control" aria-label="Permalink to &quot;Player Control&quot;">​</a></h2><p>You can get the player instance <a href="https://docs.videojs.com/player" target="_blank" rel="noreferrer">player</a> through the callback parameter of the <code>ready</code> event.</p>`);
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
  _push(`<h2 id="error-prompt" tabindex="-1">Error Prompt <a class="header-anchor" href="#error-prompt" aria-label="Permalink to &quot;Error Prompt&quot;">​</a></h2>`);
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
  _push(`<h2>VideoPlayer Api</h2><h3>VideoPlayer Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sources</td><td>视频资源，是一个数组，如果传入了超过一个资源则会自动选择</td><td><code>Source[]</code></td><td class="text-center">Yes</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">poster</td><td>视频的封面图片地址，一旦开始播放，图片就会消失</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rotate</td><td>视频旋转角度</td><td><code>0 | 90 | 180 | 270</code></td><td class="text-center">No</td><td>0</td></tr></tbody></table><h3>VideoPlayer Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">ready</td><td rowspan="1">视频播放器加载完成时的回调</td><td rowspan="1">( playerInstance: <code>HTMLVideoElement</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">playerInstance</td><td><code>HTMLVideoElement</code></td><td>HTMLVideoElement 实例</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/VideoPlayer.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const VideoPlayer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  VideoPlayer as default
};
