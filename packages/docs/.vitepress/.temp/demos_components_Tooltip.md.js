import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Tooltip.md","filePath":"zh/demos/components/Tooltip.md"}');
const _sfc_main = { name: "demos/components/Tooltip.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Tooltip</h1><p class="description">Tooltip 是浮动标签，主要用于简要说明界面元素的功能。</p><h2 id="显示位置" tabindex="-1">显示位置 <a class="header-anchor" href="#显示位置" aria-label="Permalink to &quot;显示位置&quot;">​</a></h2><p>通过设置 <code>placement</code> 来改变 <code>tooltip</code> 出现位置</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form class="block-tooltip-props">
    <h-form-item label="尺寸">
      <h-radio-group v-model="size">
        <h-radio label="medium">Medium</h-radio>
        <h-radio label="small">Small</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="主题">
      <h-radio-group v-model="theme">
        <h-radio label="dark">Dark</h-radio>
        <h-radio label="light">Light</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="延迟关闭">
      <h-input v-model="hideAfter"><template #suffix>ms</template></h-input>
    </h-form-item>
  </h-form>
  <div class="block-tooltip">
    <div class="item"></div>
    <div class="item">
      <h-tooltip
        placement="top-start"
        content="top-start"
        singleton
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>上左</h-button>
      </h-tooltip>
    </div>
    <div class="item">
      <h-tooltip placement="top" content="top" :size="size" :theme="theme" :hide-after="hideAfter">
        <h-button>上</h-button>
      </h-tooltip>
    </div>
    <div class="item">
      <h-tooltip
        placement="top-end"
        content="top-end"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>上右</h-button>
      </h-tooltip>
    </div>
    <div class="item"></div>
    <div class="item">
      <h-tooltip
        placement="left-start"
        content="left-start"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>左上</h-button>
      </h-tooltip>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-tooltip
        placement="right-start"
        content="right-start"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>右上</h-button>
      </h-tooltip>
    </div>
    <div class="item">
      <h-tooltip
        placement="left"
        content="left"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>左</h-button>
      </h-tooltip>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-tooltip
        placement="right"
        content="right"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>右</h-button>
      </h-tooltip>
    </div>
    <div class="item">
      <h-tooltip
        placement="left-end"
        content="left-end"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>左下</h-button>
      </h-tooltip>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-tooltip
        placement="right-end"
        content="right-end"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>右下</h-button>
      </h-tooltip>
    </div>
    <div class="item"></div>
    <div class="item">
      <h-tooltip
        placement="bottom-start"
        content="bottom-start"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>下左</h-button>
      </h-tooltip>
    </div>
    <div class="item">
      <h-tooltip
        placement="bottom"
        content="bottom"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>下</h-button>
      </h-tooltip>
    </div>
    <div class="item">
      <h-tooltip
        placement="bottom-end"
        content="bottom-end"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>下右</h-button>
      </h-tooltip>
    </div>
    <div class="item"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref('medium');
const theme = ref('dark');
const hideAfter = ref(200);
<\/script>

<style>
.block-tooltip-props {
  display: flex;
  margin-bottom: 20px;
}

.block-tooltip-props > * {
  margin-right: 50px;
}

.block-tooltip {
  width: 430px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 20px;
}

.block-tooltip .item {
  width: 120px;
}

.block-tooltip .item button {
  width: 100%;
}
</style>
`,
    path: "demos/components/Tooltip/placement.vue"
  }, null, _parent));
  _push(`<h2 id="宽度设置" tabindex="-1">宽度设置 <a class="header-anchor" href="#宽度设置" aria-label="Permalink to &quot;宽度设置&quot;">​</a></h2><p>最小宽度是 <code>64px</code> ，最大宽度是 <code>320px</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-block">
    <h-tooltip placement="top">
      <h-button>最小宽度</h-button>
      <template #content>min</template>
    </h-tooltip>
    <h-tooltip placement="top">
      <h-button>最大宽度中文</h-button>
      <template #content>
        你的关心，是独我一份的，还是他人都有的，若不是独我一份的，那这份关心不要也罢。
      </template>
    </h-tooltip>
    <h-tooltip placement="top">
      <h-button>最大宽度英文</h-button>
      <template #content>
        Lorem ipsum dolor sit amet, nullam tacimates scribentur id sea, mea libris docendi tacimates id. Pro laoreet oportere te, id pri quis vero omnesque. Vero utinam mandamus his ad, populo abhorreant duo ad. Mea nibh definitiones ei, an quo civibus commune cotidieque.
      </template>
    </h-tooltip>

    <h-tooltip overflow content="总感觉要做点什么，但真正做的时候却又显得有些迷茫，这事还真恼人">
      <div class="careless">
        总感觉要做点什么，但真正做的时候却又显得有些迷茫，这事还真恼人
      </div>
    </h-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let hoverMsg = ref('hover top');
    let clickMsg = ref('click left');
    let focusMsg = ref('focus right');
    let contextmenuMsg = ref('contextmenu top');
    return {
      hoverMsg,
      clickMsg,
      focusMsg,
      contextmenuMsg,
    };
  },
});
<\/script>

<style scoped>
.demo-block {
  display: flex;
  align-items: center;
}

.demo-block .h-popover__reference {
  margin-bottom: 20px;
  margin-left: 0;
  margin-right: 20px;
}

.careless {
  display: inline-block;
  margin-left: 20px;
  height: 32px;
  line-height: 32px;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
`,
    path: "demos/components/Tooltip/width.vue"
  }, null, _parent));
  _push(`<h2 id="是否允许移入后复制" tabindex="-1">是否允许移入后复制 <a class="header-anchor" href="#是否允许移入后复制" aria-label="Permalink to &quot;是否允许移入后复制&quot;">​</a></h2><p>设置 <code>enterable = true</code>，即可移入复制</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row>\n    <h-col>\n      <h-tooltip placement="top">\n        <h-button>不允许移入复制</h-button>\n        <template #content>只能看到这里的内容，但不能移入复制</template>\n      </h-tooltip>\n      <h-tooltip placement="top" :enterable="true">\n        <h-button>允许移入复制</h-button>\n        <template #content>可以复制这里的内容</template>\n      </h-tooltip>\n    </h-col>\n  </h-row>\n  <h-row>\n    <h-col>\n      <h-tooltip placement="top" :enterable="true" :click-to-copy="true">\n        <h-button>允许移入点击后复制</h-button>\n        <template #content>点击后这串文字将会出现在剪切板里</template>\n      </h-tooltip>\n      <h-tooltip placement="top" :enterable="true" :click-to-copy="true" copy-target="reference">\n        <h-button>允许移入点击后复制 <code>reference</code> 的文字</h-button>\n        <template #content>点击后复制的不是我，而是 reference 的文字</template>\n      </h-tooltip>\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts">\n<\/script>\n',
    path: "demos/components/Tooltip/enterable.vue"
  }, null, _parent));
  _push(`<h2 id="尺寸" tabindex="-1">尺寸 <a class="header-anchor" href="#尺寸" aria-label="Permalink to &quot;尺寸&quot;">​</a></h2><p><code>tooltip</code> 支持 <code>large</code> <code>medium</code> <code>small</code> 尺寸，也可以设置不要箭头</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="demo-block">\n    <h-tooltip placement="top" size="large">\n      <h-button>Large</h-button>\n      <template #content>Large</template>\n    </h-tooltip>\n    <h-tooltip placement="top">\n      <h-button>Medium(default)</h-button>\n      <template #content>Medium</template>\n    </h-tooltip>\n    <h-tooltip placement="top" size="small">\n      <h-button>Small</h-button>\n      <template #content>\n        Small\n      </template>\n    </h-tooltip>\n    <h-tooltip placement="top" size="small" :arrow="false" :distance="4">\n      <h-button>No arrow</h-button>\n      <template #content>\n        No arrow\n      </template>\n    </h-tooltip>\n  </div>\n</template>\n\n<script lang="ts">\n<\/script>\n\n<style scoped>\n.demo-block {\n  display: flex;\n  align-items: center;\n}\n\n.demo-block .h-popover__reference {\n  margin-bottom: 20px;\n  margin-left: 0;\n  margin-right: 20px;\n}\n</style>\n',
    path: "demos/components/Tooltip/size.vue"
  }, null, _parent));
  _push(`<h2 id="主题" tabindex="-1">主题 <a class="header-anchor" href="#主题" aria-label="Permalink to &quot;主题&quot;">​</a></h2><p><code>tooltip</code> 支持 <code>light</code> 主题</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="demo-block">\n    <h-tooltip placement="top">\n      <h-button>Theme(default)</h-button>\n      <template #content>Dark</template>\n    </h-tooltip>\n    <h-tooltip placement="top" theme="light">\n      <h-button>Light</h-button>\n      <template #content>Light</template>\n    </h-tooltip>\n  </div>\n</template>\n\n<script lang="ts"><\/script>\n\n<style scoped>\n.demo-block {\n  display: flex;\n  align-items: center;\n}\n\n.demo-block .h-popover__reference {\n  margin-bottom: 20px;\n  margin-left: 0;\n  margin-right: 20px;\n}\n</style>\n',
    path: "demos/components/Tooltip/theme.vue"
  }, null, _parent));
  _push(`<h2>Tooltip Api</h2><h3>Tooltip Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;large&#39; | &#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">否</td><td>&#39;medium&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>触发tooltip提示框的行为</td><td><code>&#39;hover&#39; | &#39;click&#39; | &#39;focus&#39; | &#39;contextmenu&#39; | &#39;manual&#39;</code></td><td class="text-center">否</td><td>&#39;hover&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>tooltip弹出方向</td><td><code>| &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right-start&#39;<br>      | &#39;left-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-end&#39;<br>      | &#39;right&#39;<br>      | &#39;left&#39;</code></td><td class="text-center">否</td><td>&#39;top&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">distance</td><td>tooltip距离目标元素偏移距离</td><td><code>number</code></td><td class="text-center">否</td><td>12</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-class</td><td>自定义tooltip类名</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td>是否显示 <code>tooltip</code>，只有在 <code>trigger</code> 为 <code>manual</code> 时生效</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">skidding</td><td>tooltip的位置偏移</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">arrow</td><td>是否显示tooltip的箭头</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用tooltip</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td>tooltip内容，权重较slot低</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>是否将tooltip挂载在body下</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">overflow</td><td>是否溢出才显示</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">singleton`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "过去实现只是 pre render，该属性不影响功能，将在未来移除" }, null, _parent));
  _push(`</td><td>独立实例</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">enterable</td><td>鼠标是否可以进入到 <code>tooltip</code> 中</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-after</td><td>延迟显示时间，单位毫秒</td><td><code>number</code></td><td class="text-center">否</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide-after</td><td>延迟关闭时间，单位毫秒</td><td><code>number</code></td><td class="text-center">否</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">flip</td><td>当原本的显示位置空间不够时，是否允许 <code>tooltip</code> 显示到对面的位置</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fallback-placements</td><td>与 <code>flip</code> 配合使用，如果对面与当前位置都不够，还希望能调整到其他位置时，可以设置该属性</td><td><code>Array&lt;&#39;top&#39; | &#39;bottom&#39; | &#39;right&#39; | &#39;left&#39; | &#39;auto&#39;&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">click-to-copy</td><td>是否点击 <code>tooltip</code> 后复制内容</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">copy-target</td><td>点击后复制的对象文字</td><td><code>&#39;content&#39; | &#39;reference&#39;</code></td><td class="text-center">否</td><td>&#39;content&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">copy-success-text</td><td>复制成功后的文字<br>默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">copy-fail-text</td><td>复制失败后的文字<br>默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">reference-hidden-observe</td><td>是否对触发器是否可见而监听<br>如果监听，则会在不可见时隐藏 <code>tooltip</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">teleport-to</td><td>挂载的位置，默认是 <code>body</code></td><td><code>TeleportProps[&#39;to&#39;]</code></td><td class="text-center">否</td><td>&#39;body&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-reference-hidden</td><td>是否在触发器不可见时隐藏<br>如果在判断错误时请置为 <code>false</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">theme`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "请使用 <code>dark</code> 代替。（<code>light</code> 主题已过时）" }, null, _parent));
  _push(`</td><td>主题</td><td><code>&#39;dark&#39; | &#39;light&#39;</code></td><td class="text-center">否</td><td>&#39;dark&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>CSS 层级</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">reference-scale</td><td>目标缩放比例</td><td><code>number | number[]</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prevent-overflow</td><td>是否阻止 <code>popper</code> 超出边界，即 <code>popper.js</code> 检查副轴遮挡<br>通常情况下，不会检查副轴的遮挡<br>但对于空间较小的情况下，需要设置为 true，防止被屏幕裁剪</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">strategy</td><td>定位方式</td><td><code>&#39;fixed&#39; | &#39;absolute&#39;</code></td><td class="text-center">否</td><td>&#39;fixed&#39;</td></tr></tbody></table><h3>Tooltip Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">show</td><td rowspan="1">显示时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide</td><td rowspan="1">隐藏时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3>Tooltip Exposes</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">updateTooltip</td><td rowspan="1">更新 <code>tooltip</code> 位置</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Tooltip.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Tooltip as default
};
