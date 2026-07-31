import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Progress.md","filePath":"en/demos/components/Progress.md"}');
const _sfc_main = { name: "en/demos/components/Progress.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Progress</h1><p class="description">Circle progress bar with size xs does not support text and icon display</p><h2 id="line-progress-bar" tabindex="-1">Line Progress Bar <a class="header-anchor" href="#line-progress-bar" aria-label="Permalink to &quot;Line Progress Bar&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-progress">
    <h-progress :percentage="50" />
    <h-progress :percentage="100" :format="format" />
    <h-progress :percentage="100" status="success" />
    <h-progress :percentage="100" status="warning" />
    <h-progress :percentage="50" status="exception" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const format = (percentage: number) => (percentage === 100 ? 'Full' : \`\${percentage}%\`);
    return {
      format,
    };
  },
});
<\/script>

<style>
.demo-progress .h-progress-line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
`,
    path: "demos/components/Progress/line.vue"
  }, null, _parent));
  _push(`<h2 id="different-sizes" tabindex="-1">Different Sizes <a class="header-anchor" href="#different-sizes" aria-label="Permalink to &quot;Different Sizes&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-progress">
    <h-progress :percentage="100" size="xs" />
    <h-progress :percentage="100" :format="format" size="s" />
    <h-progress :percentage="50" />
    <h-progress :percentage="100" size="l" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const format = (percentage: number) => (percentage === 100 ? 'Full' : \`\${percentage}%\`);
    return {
      format,
    };
  },
});
<\/script>

<style>
.demo-progress .h-progress-container {
  margin-bottom: 15px;
  width: 350px;
}
</style>
`,
    path: "demos/components/Progress/size.vue"
  }, null, _parent));
  _push(`<h2 id="custom-color" tabindex="-1">Custom Color <a class="header-anchor" href="#custom-color" aria-label="Permalink to &quot;Custom Color&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-progress">
    <h-progress :percentage="percentage" :color="customColor" />
    <h-progress :percentage="percentage" :color="customColorMethod" />
    <h-progress :percentage="percentage" :color="customColors" />
    <h-progress :percentage="percentage" :color="customColors" />
    <div>
      <h-button class="mr-2" @click="decrease">decrease</h-button>
      <h-button @click="increase">add</h-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const percentage = ref(20);
const customColor = ref('#409eff');

const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
];

const customColorMethod = (percentage: number) => {
  if (percentage < 30) {
    return '#909399';
  }
  if (percentage < 70) {
    return '#e6a23c';
  }
  return '#67c23a';
};
const increase = () => {
  percentage.value += 10;
  if (percentage.value > 100) {
    percentage.value = 100;
  }
};
const decrease = () => {
  percentage.value -= 10;
  if (percentage.value < 0) {
    percentage.value = 0;
  }
};
<\/script>

<style scoped>
.demo-progress .h-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
`,
    path: "demos/components/Progress/colors.vue"
  }, null, _parent));
  _push(`<h2 id="circle-progress-bar" tabindex="-1">Circle Progress Bar <a class="header-anchor" href="#circle-progress-bar" aria-label="Permalink to &quot;Circle Progress Bar&quot;">​</a></h2><p>Circle progress bar with size xs does not support text and icon display</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="demo-progress">\n    <h-progress type="circle" :percentage="60" size="xs" />\n    <h-progress type="circle" :percentage="25" size="s" />\n    <h-progress type="circle" :percentage="60" size="m" />\n    <h-progress type="circle" :percentage="70" size="l" />\n    <h-progress type="circle" :percentage="85" size="s" status="success" />\n    <h-progress type="circle" :percentage="70" size="m" status="exception" />\n    <h-progress type="circle" :percentage="70" size="l" status="warning" />\n  </div>\n</template>\n<style scoped>\n.demo-progress {\n    display: flex;\n    align-items: center;\n}\n.demo-progress .h-progress--line {\n    margin-bottom: 15px;\n    width: 350px;\n}\n\n.demo-progress .h-progress-circle {\n    margin-right: 15px;\n}\n</style>\n',
    path: "demos/components/Progress/circle.vue"
  }, null, _parent));
  _push(`<h2 id="circle-custom-color" tabindex="-1">Circle Custom Color <a class="header-anchor" href="#circle-custom-color" aria-label="Permalink to &quot;Circle Custom Color&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-progress">
    <h-progress type="circle" :percentage="percentage" :color="customColor" />
    <h-progress type="circle" :percentage="percentage" :color="customColorMethod" />
    <h-progress type="circle" :percentage="percentage" :color="customColors" />
    <h-progress type="circle" :percentage="percentage" :color="customColors" />
    <div>
      <h-button class="mr-2" @click="decrease">decrease</h-button>
      <h-button @click="increase">add</h-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const percentage = ref(20);
const customColor = ref('#409eff');

const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
];

const customColorMethod = (percentage: number) => {
  if (percentage < 30) {
    return '#909399';
  }
  if (percentage < 70) {
    return '#e6a23c';
  }
  return '#67c23a';
};
const increase = () => {
  percentage.value += 10;
  if (percentage.value > 100) {
    percentage.value = 100;
  }
};
const decrease = () => {
  percentage.value -= 10;
  if (percentage.value < 0) {
    percentage.value = 0;
  }
};
<\/script>

<style scoped>
.demo-progress {
  display: flex;
  align-items: center;
}
.demo-progress .h-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.demo-progress .h-progress-circle {
  margin-right: 15px;
}
</style>
`,
    path: "demos/components/Progress/circleColor.vue"
  }, null, _parent));
  _push(`<h2 id="custom-text-content-and-position" tabindex="-1">Custom Text Content and Position <a class="header-anchor" href="#custom-text-content-and-position" aria-label="Permalink to &quot;Custom Text Content and Position&quot;">​</a></h2><p>Custom text content and position only support line progress bar</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="demo-progress">\n    <h-progress type="circle" :percentage="30" content="内容" />\n    <h-progress :percentage="100" content="content" />\n    <h-progress :percentage="100" content="content" placement="right-top" />\n    <h-progress :percentage="80" content="content" placement="right-bottom" />\n    <h-progress :percentage="30" placement="follow" />\n    <h-progress :percentage="0" content="content" placement="follow" />\n  </div>\n</template>\n\n<style>\n.demo-progress .h-progress-line {\n  margin-bottom: 35px;\n  width: 350px;\n}\n</style>\n',
    path: "demos/components/Progress/contentText.vue"
  }, null, _parent));
  _push(`<h2 id="progress-api" class="no-underline h2"><a href="#progress-api" class="!no-underline">Progress Api</a></h2><h3 id="progress-props" class="no-underline h3"><a href="#progress-props" class="!no-underline">Progress Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>Configuration for type.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;line&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">percentage</td><td>Configuration for percentage.</td><td><code>number</code></td><td class="text-center">Yes</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td>Configuration for status.</td><td><code>&#39;success&#39; | &#39;exception&#39; | &#39;error&#39; | &#39;warning&#39;</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">duration</td><td>Configuration for duration.</td><td><code>number</code></td><td class="text-center">No</td><td>3</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;mini&#39; | &#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format</td><td>Configuration for format.</td><td><code>(percentage: number) =&gt; string</code></td><td class="text-center">No</td><td>(percentage: number): string =&gt; <code>\${percentage}%</code></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td>Configuration for content.</td><td><code>string | number | boolean</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>Configuration for placement.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">text-bold</td><td>Configuration for text bold.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-text</td><td>Configuration for show text.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">color</td><td>Configuration for color.</td><td><code>string | Color[] | ProgressFn</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Progress.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Progress = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Progress as default
};
