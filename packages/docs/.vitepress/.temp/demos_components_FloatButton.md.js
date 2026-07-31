import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/FloatButton.md","filePath":"zh/demos/components/FloatButton.md"}');
const _sfc_main = { name: "demos/components/FloatButton.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>FloatButton</h1><p class="description">悬浮按钮大多会独立出现在界面之上，提升整体的导航，拓展页面的功能，使应用的操作更加便捷</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
    <h-float-button :visible="visible" icon="message" />
    <h-float-button :visible="visible" description="按钮" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);

<\/script>
`,
    path: "demos/components/FloatButton/basic.vue"
  }, null, _parent));
  _push(`<h2 id="类型" tabindex="-1">类型 <a class="header-anchor" href="#类型" aria-label="Permalink to &quot;类型&quot;">​</a></h2><p>使用 <code>type</code> 切换按钮类型，可以是 <code>normal</code> 和 <code>primary</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="80px" style="width: 400px">
    <h-form-item label="是否显示">
      <h-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
    </h-form-item>
    <h-form-item label="类型">
      <h-radio-group v-model="type">
        <h-radio label="normal"></h-radio>
        <h-radio label="primary"></h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-float-button :visible="visible" icon="filter" :type="type" />
  <h-float-button :visible="visible" description="按钮" :type="type" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
const type = ref('primary');

<\/script>

<style scoped>
</style>
`,
    path: "demos/components/FloatButton/type.vue"
  }, null, _parent));
  _push(`<h2 id="形状" tabindex="-1">形状 <a class="header-anchor" href="#形状" aria-label="Permalink to &quot;形状&quot;">​</a></h2><p>使用 <code>shape</code> 切换按钮形状，可以是 <code>circle</code> 和 <code>square</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="80px" style="width: 400px">
    <h-form-item label="是否显示">
      <h-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
    </h-form-item>
    <h-form-item label="类型">
      <h-radio-group v-model="type">
        <h-radio label="normal"></h-radio>
        <h-radio label="primary"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="形状">
      <h-radio-group v-model="shape">
        <h-radio label="circle"></h-radio>
        <h-radio label="square"></h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-float-button :visible="visible" :type="type" :shape="shape" icon="filter" />
  <h-float-button :visible="visible" :type="type" :shape="shape" description="消息" />
  <h-float-button :visible="visible" :type="type" :shape="shape" icon="message" description="消息" />
</template>

<script setup lang="ts">
import { ref } from 'vue';


const visible = ref(false);
const type = ref('normal');
const shape = ref('circle');
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/FloatButton/shape.vue"
  }, null, _parent));
  _push(`<h2 id="徽标" tabindex="-1">徽标 <a class="header-anchor" href="#徽标" aria-label="Permalink to &quot;徽标&quot;">​</a></h2><p>设置 <code>badge</code> 即可开启徽标</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="80px" style="width: 400px">
    <h-form-item label="是否显示">
      <h-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
    </h-form-item>
    <h-form-item label="类型">
      <h-radio-group v-model="type">
        <h-radio label="normal"></h-radio>
        <h-radio label="primary"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="形状">
      <h-radio-group v-model="shape">
        <h-radio label="circle"></h-radio>
        <h-radio label="square"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="徽标值">
      <h-input-number v-model="badgeContent" :min="0" />
    </h-form-item>
    <h-form-item label="徽标值上限">
      <h-input-number v-model="badgeContentMax" :min="1" />
    </h-form-item>
  </h-form>

  <h-float-button :visible="visible" :shape="shape" :type="type" icon="reply" :badge="{}" />
  <h-float-button :visible="visible" :shape="shape" :type="type" description="消息" :badge="{}" />
  <h-float-button :visible="visible" :shape="shape" :type="type" icon="reply" :badge="{type: 'num', content: badgeContent, numMax: badgeContentMax}" />
  <h-float-button :visible="visible" :shape="shape" :type="type" description="消息" :badge="{type: 'num', content: badgeContent, numMax: badgeContentMax}" />
  <h-float-button :visible="visible" :shape="shape" :type="type" icon="reply" description="消息" :badge="{type: 'num', content: badgeContent, numMax: badgeContentMax}" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

const shape = ref('circle');
const type = ref('normal');

const badgeContent = ref(9);
const badgeContentMax = ref(10);

<\/script>
`,
    path: "demos/components/FloatButton/badge.vue"
  }, null, _parent));
  _push(`<h2 id="可拖拽" tabindex="-1">可拖拽 <a class="header-anchor" href="#可拖拽" aria-label="Permalink to &quot;可拖拽&quot;">​</a></h2><p>设置 <code>draggable</code> ，可以手动拖拽位置，并自动吸附边框，但一旦拖拽，则不会再将其自动排列，而且可能会与已展示的悬浮按钮重叠，所以使用时请始终只展示一个</p><p>如果希望将拖拽过的悬浮按钮重新排列，需要切换一下 <code>visible</code> 的状态即可</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-form label-position="left" label-vertical-align="middle" label-width="150px" helper-placement="after-label" helper-theme="dark" style="width: 400px">
      <h-form-item label="是否显示">
        <h-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
      </h-form-item>
      <h-form-item label="是否可拖拽">
        <h-switch v-model="draggable" :status="true" status-on-text="开启" status-off-text="关闭" />
      </h-form-item>
      <h-form-item label="是否允许吸附在底部" helper="如果拖拽距离离底部较近的话，则将其吸附在底部">
        <h-switch v-model="adsorbBottom" :status="true" status-on-text="允许" status-off-text="禁止" />
      </h-form-item>
    </h-form>

    <h-float-button :visible="visible" :adsorb-bottom="adsorbBottom" :draggable="draggable" icon="assistant" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const draggable = ref(true);
const adsorbBottom = ref(false);
<\/script>
`,
    path: "demos/components/FloatButton/draggable.vue"
  }, null, _parent));
  _push(`<h2 id="按钮组" tabindex="-1">按钮组 <a class="header-anchor" href="#按钮组" aria-label="Permalink to &quot;按钮组&quot;">​</a></h2><p>使用 <code>h-float-button-group</code> 可以开启按钮组</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-form label-position="left" label-vertical-align="middle" label-width="150px" helper-placement="after-label" helper-theme="dark" style="width: 400px">
      <h-form-item label="是否显示">
        <h-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
      </h-form-item>
      <h-form-item label="类型">
        <h-radio-group v-model="type">
          <h-radio label="normal"></h-radio>
          <h-radio label="primary"></h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="形状">
        <h-radio-group v-model="shape">
          <h-radio label="circle"></h-radio>
          <h-radio label="square"></h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="是否开启折叠">
        <h-switch v-model="useCollapse" :status="true" status-on-text="开启" status-off-text="关闭" />
      </h-form-item>
      <h-form-item label="是否可拖拽">
        <h-switch v-model="draggable" :status="true" status-on-text="开启" status-off-text="关闭" />
      </h-form-item>
      <h-form-item label="是否允许吸附在底部" helper="如果拖拽距离离底部较近的话，则将其吸附在底部">
        <h-switch v-model="adsorbBottom" :status="true" status-on-text="允许" status-off-text="禁止" />
      </h-form-item>
      <h-form-item label="徽标值">
        <h-input-number v-model="badgeContent" :min="0" />
      </h-form-item>
      <h-form-item label="徽标值上限">
        <h-input-number v-model="badgeContentMax" :min="1" />
      </h-form-item>
    </h-form>

    <h-float-button-group
      :visible="visible"
      :type="type"
      :shape="shape"
      :use-collapse="useCollapse"
      :draggable="draggable"
      :adsorb-bottom="adsorbBottom"
      :badge="{type: 'num', content: badgeContent, numMax: badgeContentMax}"
      expand-tooltip="点击展开"
      fold-tooltip="点击折叠"
    >
      <h-float-button icon="like" tooltip="点赞"></h-float-button>
      <h-float-button icon="urgent_notice" tooltip="加电"></h-float-button>
      <h-float-button icon="star" tooltip="收藏"></h-float-button>
    </h-float-button-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
const type = ref('normal');
const shape = ref('circle');
const useCollapse = ref(true);
const draggable = ref(true);
const adsorbBottom = ref(false);
const badgeContent = ref(9);
const badgeContentMax = ref(10);
<\/script>
`,
    path: "demos/components/FloatButton/group.vue"
  }, null, _parent));
  _push(`<h2 id="floatbutton-api" class="no-underline h2"><a href="#floatbutton-api" class="!no-underline">FloatButton Api</a></h2><h3 id="floatbutton-props" class="no-underline h3"><a href="#floatbutton-props" class="!no-underline">FloatButton Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>自定义图标</td><td><code>iconPropType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description</td><td>描述文字，可以是 <code>VNode</code> 节点</td><td><code>string | VNode</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip</td><td>气泡卡片内容</td><td><code>string | Partial&lt;TooltipProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>类型</td><td><code>&#39;primary&#39; | &#39;normal&#39;</code></td><td class="text-center">否</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">shape</td><td>形状</td><td><code>&#39;circle&#39; | &#39;square&#39;</code></td><td class="text-center">否</td><td>&#39;circle&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">href</td><td>跳转链接</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td>跳转时的目标窗口<br>类同 <code>&lt;a /&gt;</code> 的 <code>target</code> 属性</td><td><code>&#39;_blank&#39; | &#39;_self&#39; | &#39;_parent&#39; | &#39;_top&#39;</code></td><td class="text-center">否</td><td>&#39;_self&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">badge</td><td>徽标配置<br><code>true</code>: <code>type=&quot;dot&quot;</code></td><td><code>boolean | Partial&lt;BadgeProps&gt;</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>是否可拖拽</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">adsorb-bottom</td><td>是否吸附在底部</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td>是否显示</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr></tbody></table><h3 id="floatbutton-emits" class="no-underline h3"><a href="#floatbutton-emits" class="!no-underline">FloatButton Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击事件</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">drag-start</td><td rowspan="1">拖拽开始</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">dragging</td><td rowspan="1">拖拽中</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">drag-end</td><td rowspan="1">拖拽结束</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2 id="floatbuttongroup-api" class="no-underline h2"><a href="#floatbuttongroup-api" class="!no-underline">FloatButtonGroup Api</a></h2><h3 id="floatbuttongroup-props" class="no-underline h3"><a href="#floatbuttongroup-props" class="!no-underline">FloatButtonGroup Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>类型，会覆盖内部 <code>float-button</code> 的 <code>type</code></td><td><code>&#39;primary&#39; | &#39;normal&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">shape</td><td>形状，会覆盖内部 <code>float-button</code> 的 <code>shape</code></td><td><code>&#39;circle&#39; | &#39;square&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-collapse</td><td>是否启用展开折叠功能</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>触发方式</td><td><code>&#39;click&#39; | &#39;hover&#39;</code></td><td class="text-center">否</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-icon</td><td>展开按钮</td><td><code>iconPropType</code></td><td class="text-center">否</td><td>() =&gt; IconMoreTwo</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fold-icon</td><td>折叠按钮</td><td><code>iconPropType</code></td><td class="text-center">否</td><td>() =&gt; IconClose</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-tooltip</td><td>展开按钮气泡卡片内容</td><td><code>string | Partial&lt;TooltipProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fold-tooltip</td><td>折叠按钮气泡卡片内容</td><td><code>string | Partial&lt;TooltipProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">badge</td><td>打开按钮的徽标配置</td><td><code>Partial&lt;BadgeProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>是否可拖拽</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">adsorb-bottom</td><td>是否吸附在底部</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td>是否显示</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr></tbody></table><h3 id="floatbuttongroup-emits" class="no-underline h3"><a href="#floatbuttongroup-emits" class="!no-underline">FloatButtonGroup Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand</td><td rowspan="1">展开</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">fold</td><td rowspan="1">收起</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">在点击折叠按钮时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/FloatButton.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FloatButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  FloatButton as default
};
