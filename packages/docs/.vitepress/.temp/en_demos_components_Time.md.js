import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Time.md","filePath":"en/demos/components/Time.md"}');
const _sfc_main = { name: "en/demos/components/Time.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Time</h1><p class="description">可以用来做倒计时</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  默认倒计时10秒
  <span v-show="finished" class="ml-2">----计时完成！</span>
  <h-time @finished="finished = true" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const finished = ref(false);

    return {
      finished,
    };
  },
});
<\/script>
`,
    path: "demos/components/Time/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="attribute-control" tabindex="-1">Attribute Control <a class="header-anchor" href="#attribute-control" aria-label="Permalink to &quot;Attribute Control&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex">
    <div class="mr-4">
      正向计时
      <span v-show="finished" class="ml-2">----计时完成！</span>
      <h-time :forward="true" @finished="finished = true" />
    </div>
    <div class="mr-4">
      到期时间:30秒后
      <h-time :end-time="Date.now() + 30000" :time="Date.now() + 90000" />
    </div>
    <div >
      持续时长、10s更新一次
      <h-time :end-time="+new Date('2023-02-27 16:27:30')" :time="currentTime" calculative />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const finished = ref(false);
    const currentTime = ref(Date.now());
    window.setInterval(() => {
      currentTime.value = Date.now();
    }, 10000);
    return {
      finished,
      currentTime,
    };
  },
});
<\/script>
`,
    path: "demos/components/Time/props.vue"
  }, null, _parent));
  _push(`<h2 id="custom-content" tabindex="-1">Custom Content <a class="header-anchor" href="#custom-content" aria-label="Permalink to &quot;Custom Content&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: "<template>\n  <div class=\"flex\">\n    <div class=\"mr-4\">\n      格式化\n      <h-time>\n        <template #default=\"timeObj\">\n          {{ `00${timeObj.hh ?? '00'}`.slice(-2) }}-{{ `00${timeObj.mm ?? '00'}`.slice(-2) }}-{{\n            `00${timeObj.ss ?? '00'}`.slice(-2)\n          }}\n        </template>\n      </h-time>\n    </div>\n    <div>\n      {{ new Date(new Date().setDate(new Date().getDate() + 2)) }}\n      <h-time :end-time=\"new Date().setDate(new Date().getDate() + 2)\">\n        <template #default=\"timeObj\">\n          {{ `${timeObj.dd ?? '0'}天` }}{{ `00${timeObj.hh ?? '00'}`.slice(-2) }}小时{{\n            `00${timeObj.mm ?? '00'}`.slice(-2)\n          }}分{{ `00${timeObj.ss ?? '00'}`.slice(-2) }}秒\n        </template>\n      </h-time>\n    </div>\n  </div>\n</template>\n",
    path: "demos/components/Time/slot.vue"
  }, null, _parent));
  _push(`<h2>Time Api</h2><h3>Time Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">time</td><td>时间（秒/毫秒级时间戳）</td><td><code>date | number | string</code></td><td class="text-center">No</td><td>10</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">end-time</td><td>到期时间（秒/毫秒级时间戳）</td><td><code>date | number | string</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">forward</td><td>是否正向计时</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">calculative</td><td>是否计算time和endTime的差值</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3>Time Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">finished</td><td rowspan="1">计时结束后的事件</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Time.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Time = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Time as default
};
