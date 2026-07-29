import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Guide.md","filePath":"zh/demos/components/Guide.md"}');
const _sfc_main = { name: "demos/components/Guide.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Guide</h1><p class="description">产品中的新手引导是可以让用户在短时间内快速了解产品的特色以及产品的使用方式，轻松上手去体验产品的功能，完成自己的目标。大部分的新手引导都会出现在用户首次打开产品时，让用户对产品功能或操作有个初步了解。</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-button ref="firstRef">First</h-button>
      <h-button class="guide-second">Second</h-button>
      <h-button ref="thirdRef">Third</h-button>
    </h-col>
    <h-divider />
    <h-col :span="24">
      <h-button @click="start">Start</h-button>
    </h-col>
  </h-row>

  <h-guide v-model="current" v-model:visible="visible" type="primary" @close="onClose" @finish="onFinish">
    <h-guide-item :target="firstRef" title="第一步" content="第一步就是第一步" />
    <h-guide-item target=".guide-second" title="第二步" content="第二步就是第二步" placement="top-start" image="https://static.example.com/fx-static/design-system/clgkp3u9z0002082h1dfr888x/indexbg.jpg?imageView2/2/w/300" />
    <h-guide-item :target="thirdRef" title="第三步" content="第三步就是第三步" placement="right-start" />
    <h-guide-item title="第四步" content="第四步全局居中了" />
  </h-guide>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { $message } from '@aurora/horizon-web';

const firstRef = shallowRef<HTMLElement | null>(null);
const thirdRef = shallowRef<HTMLElement | null>(null);

const current = ref(0);
const visible = ref(false);

function start() {
  current.value = 0;
  visible.value = true;
}

function onClose() {
  $message.warning('跳过了新手引导');
}

function onFinish() {
  $message.success('完成了新手引导');
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Guide/basic.vue"
  }, null, _parent));
  _push(`<h2 id="直接传参使用" tabindex="-1">直接传参使用 <a class="header-anchor" href="#直接传参使用" aria-label="Permalink to &quot;直接传参使用&quot;">​</a></h2><p>某些情况下，可以不需要使用 <code>n-guide-item</code> 组件构建步骤，可以直接传入数据构建</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-button ref="firstRef">First</h-button>
      <h-button class="guide-second-2">Second</h-button>
      <h-button ref="thirdRef">Third</h-button>
    </h-col>
    <h-divider />
    <h-col :span="24">
      <h-button @click="start">Start</h-button>
    </h-col>
  </h-row>

  <h-guide v-model:visible="visible" :item-list="itemList" @close="onClose" @finish="onFinish" />
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import type { GuideItemProps } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';

const firstRef = shallowRef<HTMLElement | null>(null);
const thirdRef = shallowRef<HTMLElement | null>(null);
const itemList = ref<GuideItemProps[]>([]);

const visible = ref(false);

function start() {
  visible.value = true;
}

function onClose() {
  $message.warning('跳过了新手引导');
}

function onFinish() {
  $message.success('完成了新手引导');
}

onMounted(() => {
  itemList.value = [
    {
      target: firstRef,
      title: '第一步',
      content: '第一步就是第一步',
    },
    {
      target: '.guide-second-2',
      title: '第二步',
      content: '第二步就是第二步',
      placement: 'top-start',
      image: 'https://static.example.com/fx-static/design-system/clgkp3u9z0002082h1dfr888x/indexbg.jpg?imageView2/2/w/300',
    },
    {
      target: thirdRef,
      title: "第三步",
      content: "第三步就是第三步",
      placement:"right-start",
    },
    {
      title:"第四步",
      content: "第四步全局居中了",
    },
  ];
});
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Guide/itemList.vue"
  }, null, _parent));
  _push(`<h2 id="蒙层" tabindex="-1">蒙层 <a class="header-anchor" href="#蒙层" aria-label="Permalink to &quot;蒙层&quot;">​</a></h2><p>可以设置 <code>mask = false</code> 关闭蒙层</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-button ref="firstRef">First</h-button>
      <h-button class="guide-second-mask">Second</h-button>
      <h-button ref="thirdRef">Third</h-button>
    </h-col>
    <h-divider />
    <h-col :span="24">
      <h-button @click="start">Start</h-button>
    </h-col>
  </h-row>

  <h-guide v-model:visible="visible" :mask="false" type="primary" @close="onClose" @finish="onFinish">
    <h-guide-item :target="firstRef" title="第一步" content="第一步就是第一步" />
    <h-guide-item target=".guide-second-mask" title="第二步" content="第二步就是第二步" placement="top-start" image="https://static.example.com/fx-static/design-system/clgkp3u9z0002082h1dfr888x/indexbg.jpg?imageView2/2/w/300" />
    <h-guide-item :target="thirdRef" title="第三步" content="第三步就是第三步" placement="right-start" />
    <h-guide-item title="第四步" content="第四步全局居中了" />
  </h-guide>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { $message } from '@aurora/horizon-web';

const firstRef = shallowRef<HTMLElement | null>(null);
const thirdRef = shallowRef<HTMLElement | null>(null);

const visible = ref(false);

function start() {
  visible.value = true;
}

function onClose() {
  $message.warning('跳过了新手引导');
}

function onFinish() {
  $message.success('完成了新手引导');
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Guide/mask.vue"
  }, null, _parent));
  _push(`<h2 id="完整示例" tabindex="-1">完整示例 <a class="header-anchor" href="#完整示例" aria-label="Permalink to &quot;完整示例&quot;">​</a></h2><p>在大多情况下，需要聚焦的元素是动态出现的，而且还会聚焦于前一个聚焦元素交互后出现的新元素</p><p>在此种情况下，就不能使用控制器切换前后步骤了</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-button @click="start">Start</h-button>
    </h-col>
  </h-row>

  <h-dialog v-model="dialogVisible" title="信息填写" @close="onCloseDialog" @opened="onOpened">
    <h-form>
      <h-form-item label="姓名">
        <h-input ref="inputRef" v-model="name" @keypress.enter="onInputBlur" />
      </h-form-item>
      <h-form-item label="年龄">
        <h-input-number ref="inputNumberRef" v-model="age" @keypress.enter="onInputAgeBlur" />
      </h-form-item>
    </h-form>
    <template #footer>
      <h-button @click="dialogVisible = false">取消</h-button>
      <h-button ref="confirmBtnRef" @click="onSubmit">确定</h-button>
    </template>
  </h-dialog>

  <h-guide ref="guideRef" v-model:visible="visible" :use-controls="false" @close="onClose" @finish="onFinish">
    <h-guide-item :target="inputRef" title="第一步" content="请填写姓名，至少2位字符；填写完成后按下回车" />
    <h-guide-item :target="inputNumberRef" title="第二步" content="请填写年龄，在10-60区间；填写完成后按下回车" placement="top-start" />
    <h-guide-item :target="confirmBtnRef" title="第三步" content="点击确定提交" placement="right-start"></h-guide-item>
  </h-guide>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { $alert, $message, HGuide } from '@aurora/horizon-web';

const guideRef = shallowRef<typeof HGuide | null>(null);
const inputRef = shallowRef<HTMLElement | null>(null);
const inputNumberRef = shallowRef<HTMLElement | null>(null);
const confirmBtnRef = shallowRef<HTMLElement | null>(null);

const visible = ref(false);
const dialogVisible = ref(false);

const name = ref('');
const age = ref(0);

function start() {
  dialogVisible.value = true;
}

function onInputBlur() {
  if (name.value.length >= 2) {
    guideRef.value?.next();
  }
}

function onInputAgeBlur() {
  if (age.value >= 10 && age.value <= 60) {
    guideRef.value?.next();
  }
}

function onClose() {
  $message.warning('跳过了新手引导');
}

function onFinish() {
  $message.success('完成了新手引导');
  dialogVisible.value = false;
}

function onOpened() {
  visible.value = true;
}

function onCloseDialog() {
  visible.value = false;
}

function onSubmit() {
  $alert('填写结束').then(() => {
    guideRef.value?.next();
  });
}
<\/script>

<style scoped>
</style>
`,
    path: "demos/components/Guide/whole.vue"
  }, null, _parent));
  _push(`<h2>Guide Api</h2><h3>Guide Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>当前步骤</td><td><code>number</code></td><td class="text-center">否</td><td>-1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td>是否显示</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>类型</td><td><code>&#39;default&#39; | &#39;primary&#39;</code></td><td class="text-center">否</td><td>&#39;default&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>卡片相对于目标元素的位置</td><td><code>| &#39;left&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;</code></td><td class="text-center">否</td><td>&#39;top&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">arrow</td><td>是否显示箭头</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">distance</td><td>在主方向上的偏移</td><td><code>number</code></td><td class="text-center">否</td><td>8</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">skidding</td><td>在辅助方向上的的偏移</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">flip</td><td>当原本的显示位置空间不够时，是否允许显示到对面的位置</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-controls</td><td>是否使用控制按钮</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask</td><td>是否启用蒙层</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-trigger-padding</td><td>蒙层聚焦内容留白的内边距</td><td><code>number</code></td><td class="text-center">否</td><td>8</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-class</td><td>蒙层的类</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-style</td><td>蒙层的样式</td><td><code>CSSProperties</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-into-view</td><td>是否在激活步骤时，自动滚动到元素所在位置</td><td><code>boolean | ScrollIntoViewOptions</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>层级</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">closable</td><td>是否显示关闭按钮</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">item-list</td><td>如果不通过 <code>guide-item</code> 创建，可以直接传入相应参数</td><td><code>Array&lt;ExtractPropTypes&lt;GuideItemProps&gt;&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">finish-text</td><td>完成按钮文本</td><td><code>string</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>是否可拖拽引导弹窗</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3>Guide Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:visible</td><td rowspan="1">当显隐变化时</td><td rowspan="1">( val: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">val</td><td><code>boolean</code></td><td>变更后的步骤</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">中止指引时的通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">finish</td><td rowspan="1">完成引导时的通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3>Guide Exposes</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">next</td><td rowspan="1">下一步</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">prev</td><td rowspan="1">上一步</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">关闭</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide</td><td rowspan="1">隐藏</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">show</td><td rowspan="1">显示</td><td rowspan="1">( startFromFirst: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">startFromFirst</td><td><code>boolean</code></td><td>是否从第一步开始，默认 <code>false</code></td></tr></tbody></table><h2>GuideItem Api</h2><h3>GuideItem Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">index</td><td>当前步骤的下标，如果不设置，则按照挂载顺序依次排序</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td>目标元素，如果为空或无法找到元素，则以全局居中位置显示</td><td><code>string | HTMLElement</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>标题</td><td><code>string | VNode</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">image</td><td>配图地址</td><td><code>string | VNode</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td>正文内容</td><td><code>string | VNode</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>类型</td><td><code>&#39;default&#39; | &#39;primary&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>卡片相对于目标元素的位置</td><td><code>| &#39;left&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">arrow</td><td>是否显示箭头</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">distance</td><td>在主方向上的偏移</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">skidding</td><td>在辅助方向上的的偏移</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">flip</td><td>当原本的显示位置空间不够时，是否允许显示到对面的位置</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-controls</td><td>是否使用控制按钮</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask</td><td>是否启用蒙层</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-trigger-padding</td><td>蒙层聚焦内容留白的内边距</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-class</td><td>蒙层的类</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mask-style</td><td>蒙层的样式</td><td><code>CSSProperties</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-into-view</td><td>是否在激活步骤时，自动滚动到元素所在位置</td><td><code>boolean | ScrollIntoViewOptions</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">closable</td><td>是否显示关闭按钮</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">finish-text</td><td>完成按钮文本</td><td><code>string</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">draggable</td><td>是否可拖拽引导弹窗</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3>GuideItem Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">中止当前指引时的通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">finish</td><td rowspan="1">完成当前引导时的通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3>GuideItem Exposes</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="1">关闭</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Guide.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Guide = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Guide as default
};
