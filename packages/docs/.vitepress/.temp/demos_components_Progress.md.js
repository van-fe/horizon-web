import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Progress.md","filePath":"zh/demos/components/Progress.md"}');
const _sfc_main = { name: "demos/components/Progress.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Progress</h1><p class="description">给予用户当前系统执行中任务运行状态的反馈，多用于需要用户等待的场景，有效减轻用户在等待中产生的焦虑感</p><h2 id="直线进度条" tabindex="-1">直线进度条 <a class="header-anchor" href="#直线进度条" aria-label="Permalink to &quot;直线进度条&quot;">​</a></h2>`);
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
  _push(`<h2 id="不同尺寸" tabindex="-1">不同尺寸 <a class="header-anchor" href="#不同尺寸" aria-label="Permalink to &quot;不同尺寸&quot;">​</a></h2>`);
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
  _push(`<h2 id="自定义颜色" tabindex="-1">自定义颜色 <a class="header-anchor" href="#自定义颜色" aria-label="Permalink to &quot;自定义颜色&quot;">​</a></h2>`);
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
  _push(`<h2 id="环形进度条" tabindex="-1">环形进度条 <a class="header-anchor" href="#环形进度条" aria-label="Permalink to &quot;环形进度条&quot;">​</a></h2><p>size为xs环形进度条，不支持文本和icon显示</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="demo-progress">\n    <h-progress type="circle" :percentage="60" size="xs" />\n    <h-progress type="circle" :percentage="25" size="s" />\n    <h-progress type="circle" :percentage="60" size="m" />\n    <h-progress type="circle" :percentage="70" size="l" />\n    <h-progress type="circle" :percentage="85" size="s" status="success" />\n    <h-progress type="circle" :percentage="70" size="m" status="exception" />\n    <h-progress type="circle" :percentage="70" size="l" status="warning" />\n  </div>\n</template>\n<style scoped>\n.demo-progress {\n    display: flex;\n    align-items: center;\n}\n.demo-progress .h-progress--line {\n    margin-bottom: 15px;\n    width: 350px;\n}\n\n.demo-progress .h-progress-circle {\n    margin-right: 15px;\n}\n</style>\n',
    path: "demos/components/Progress/circle.vue"
  }, null, _parent));
  _push(`<h2 id="环形自定义颜色" tabindex="-1">环形自定义颜色 <a class="header-anchor" href="#环形自定义颜色" aria-label="Permalink to &quot;环形自定义颜色&quot;">​</a></h2>`);
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
  _push(`<h2 id="自定义文本内容和位置" tabindex="-1">自定义文本内容和位置 <a class="header-anchor" href="#自定义文本内容和位置" aria-label="Permalink to &quot;自定义文本内容和位置&quot;">​</a></h2><p>自定义文本内容和位置只支持直线进度条</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="demo-progress">\n    <h-progress type="circle" :percentage="30" content="内容" />\n    <h-progress :percentage="100" content="content" />\n    <h-progress :percentage="100" content="content" placement="right-top" />\n    <h-progress :percentage="80" content="content" placement="right-bottom" />\n    <h-progress :percentage="30" placement="follow" />\n    <h-progress :percentage="0" content="content" placement="follow" />\n  </div>\n</template>\n\n<style>\n.demo-progress .h-progress-line {\n  margin-bottom: 35px;\n  width: 350px;\n}\n</style>\n',
    path: "demos/components/Progress/contentText.vue"
  }, null, _parent));
  _push(`<h2>Progress Api</h2><h3>Progress Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>进度条类型</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;line&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">percentage</td><td>百分比</td><td><code>number</code></td><td class="text-center">是</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td>进度条当前状态</td><td><code>&#39;success&#39; | &#39;exception&#39; | &#39;error&#39; | &#39;warning&#39;</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">duration</td><td>控制动画进度条速度</td><td><code>number</code></td><td class="text-center">否</td><td>3</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>进度条的大小，四个类型可选</td><td><code>&#39;mini&#39; | &#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format</td><td>指定进度条文字内容</td><td><code>(percentage: number) =&gt; string</code></td><td class="text-center">否</td><td>(percentage: number): string =&gt; <code>\${percentage}%</code></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td>自定义文本内容</td><td><code>string | number | boolean</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>自定义文本的显示位置，type为line时可用</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">text-bold</td><td>文本内容是否加粗</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-text</td><td>是否显示进度条文字内容</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">color</td><td>进度条背景色 进度条背景色 （会覆盖 status 状态颜色）</td><td><code>string | Color[] | ProgressFn</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Progress.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Progress = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Progress as default
};
