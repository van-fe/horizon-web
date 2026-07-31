import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Empty.md","filePath":"zh/demos/components/Empty.md"}');
const _sfc_main = { name: "demos/components/Empty.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Empty</h1><p class="description">空状态时的占位提示，并提供多场景可供使用</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><p>默认的空占位效果。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: "<template>\n  <h-empty />\n</template>\n",
    path: "demos/components/Empty/basic.vue"
  }, null, _parent));
  _push(`<h2 id="描述文字" tabindex="-1">描述文字 <a class="header-anchor" href="#描述文字" aria-label="Permalink to &quot;描述文字&quot;">​</a></h2><p>带描述文字的空占位效果。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-empty description="No task for now, take a coffee break" />\n</template>\n',
    path: "demos/components/Empty/description.vue"
  }, null, _parent));
  _push(`<h2 id="尺寸" tabindex="-1">尺寸 <a class="header-anchor" href="#尺寸" aria-label="Permalink to &quot;尺寸&quot;">​</a></h2><p>设置空占位的尺寸，支持内置尺寸和数值尺寸。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-empty :size="emptySizeRef" description="No task for now, take a coffee break" />
  <h-radio-group v-model="sizeRef">
    <h-radio label="small" />
    <h-radio label="medium" />
    <h-radio label="large" />
    <h-radio label="number">
      <h-input-number v-model="sizeNumberRef" :step="10" />
    </h-radio>
  </h-radio-group>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const sizeRef = ref('medium');
const sizeNumberRef = ref(240);

const emptySizeRef = computed(() => {
  if (sizeRef.value === 'number') {
    return sizeNumberRef.value;
  }
  return sizeRef.value;
});
<\/script>
`,
    path: "demos/components/Empty/size.vue"
  }, null, _parent));
  _push(`<h2 id="内置图片" tabindex="-1">内置图片 <a class="header-anchor" href="#内置图片" aria-label="Permalink to &quot;内置图片&quot;">​</a></h2><p>设置和使用内置图片。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex flex-wrap">
    <div v-for="name in presentedImageNameList" :key="name">
      <h-empty :image="HEmpty.PRESENTED_IMAGES[name]" :description="name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { HEmpty } from '@aurora/horizon-web';

type PresentedImageName = keyof typeof HEmpty.PRESENTED_IMAGES;

const presentedImageNameList = ref<PresentedImageName[]>(
  Object.keys(HEmpty.PRESENTED_IMAGES) as PresentedImageName[],
);
<\/script>
`,
    path: "demos/components/Empty/image-presented.vue"
  }, null, _parent));
  _push(`<h2 id="外部图片" tabindex="-1">外部图片 <a class="header-anchor" href="#外部图片" aria-label="Permalink to &quot;外部图片&quot;">​</a></h2><p>设置和使用外部图片，建议使用 svg 图片，建议尺寸 160*160。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-empty\n    :size="120"\n    image="/demo-assets/empty-state.svg"\n  />\n</template>\n',
    path: "demos/components/Empty/image-external.vue"
  }, null, _parent));
  _push(`<h2 id="自定义图片" tabindex="-1">自定义图片 <a class="header-anchor" href="#自定义图片" aria-label="Permalink to &quot;自定义图片&quot;">​</a></h2><p>通过 slot 自定义图片。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-empty :size="120">\n    <template #image>\n      <div class="my-img">\n        <img\n          src="/demo-assets/empty-state.svg"\n          alt="img"\n        />\n      </div>\n    </template>\n  </h-empty>\n</template>\n\n<style lang="scss">\n.my-img {\n  width: 100%;\n  border-radius: 50%;\n  overflow: hidden;\n}\n</style>\n',
    path: "demos/components/Empty/image-slot.vue"
  }, null, _parent));
  _push(`<h2 id="自定义描述" tabindex="-1">自定义描述 <a class="header-anchor" href="#自定义描述" aria-label="Permalink to &quot;自定义描述&quot;">​</a></h2><p>通过 slot 自定义描述。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-empty>\n    <template #description>\n      <span>\n        No data found,\n        <a href="#">try refresh?</a>\n      </span>\n    </template>\n  </h-empty>\n</template>\n',
    path: "demos/components/Empty/description-slot.vue"
  }, null, _parent));
  _push(`<h2 id="自定义底部内容" tabindex="-1">自定义底部内容 <a class="header-anchor" href="#自定义底部内容" aria-label="Permalink to &quot;自定义底部内容&quot;">​</a></h2><p>用过 default slot 自定义底部内容。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n	<div class="flex justify-center">\n		<h-empty description="No data found.">\n			<h-button size="small">Refresh</h-button>\n		</h-empty>\n		<h-empty description="No data found.">\n			<h-button plain size="small">Back</h-button>\n			<h-button size="small">Refresh</h-button>\n		</h-empty>\n	</div>\n</template>\n',
    path: "demos/components/Empty/bottom-slot.vue"
  }, null, _parent));
  _push(`<h2 id="empty-api" class="no-underline h2"><a href="#empty-api" class="!no-underline">Empty Api</a></h2><h3 id="empty-props" class="no-underline h3"><a href="#empty-props" class="!no-underline">Empty Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">image</td><td>图片地址<br>可使用内置图片，列表见文档<br>可使用自定义图片，建议使用 svg，尺寸 160*160<br>还可使用插槽自定义</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸(图片宽度)<br>支持内置 small, medium, large 宽度和数值宽度。默认是 medium.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description</td><td>描述文字<br>可使用插槽自定义</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Empty.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Empty = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Empty as default
};
