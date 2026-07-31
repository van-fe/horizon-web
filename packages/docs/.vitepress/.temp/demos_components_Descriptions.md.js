import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Descriptions.md","filePath":"zh/demos/components/Descriptions.md"}');
const _sfc_main = { name: "demos/components/Descriptions.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Descriptions</h1><p class="description">成组展示多个只读字段，一般用于详情页的信息展示</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2><p>简单地成组展示多个只读字段，一般用于详情页的信息(如用户详情,车辆详情)</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="container">\n    <h-descriptions title="User Info">\n      <h-description-item label="Name:" value="bingkun Zhou"></h-description-item>\n      <h-description-item label="Telephone:" value="0924-250492" />\n      <h-description-item label="Residence:" value="Norway" />\n      <h-description-item label="City:" value="Oslo" />\n      <h-description-item label="Address:" value="Leg.Kiropraktor Iréne Johnson" />\n    </h-descriptions>\n  </div>\n</template>\n\n<style scoped>\n.container {\n  width: 876px;\n}\n\n.container .h-descriptions__item {\n  width: 264px;\n}\n\n.container .h-descriptions__item:last-child {\n  width: auto;\n}\n</style>\n',
    path: "demos/components/Descriptions/basic.vue"
  }, null, _parent));
  _push(`<h2 id="单列样式" tabindex="-1">单列样式 <a class="header-anchor" href="#单列样式" aria-label="Permalink to &quot;单列样式&quot;">​</a></h2><p>单列的描述列表样式,三种不同尺寸</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="container">\n    <div>\n      small\n      <h-descriptions title="User Info" type="vertical" size="small">\n        <h-description-item label="Name" value="bingkun Zhou"></h-description-item>\n        <h-description-item label="Telephone" value="0924-250492" />\n        <h-description-item label="Residence" value="Norway" />\n        <h-description-item label="City" value="Oslo" />\n        <h-description-item label="Address" value="Leg.Kiropraktor Iréne Johnson" />\n      </h-descriptions>\n    </div>\n    <div>\n      medium\n      <h-descriptions title="User Info" type="vertical">\n        <h-description-item label="Name" value="bingkun Zhou"></h-description-item>\n        <h-description-item label="Telephone" value="0924-250492" />\n        <h-description-item label="Residence" value="Norway" />\n        <h-description-item label="City" value="Oslo" />\n        <h-description-item label="Address" value="Leg.Kiropraktor Iréne Johnson" />\n      </h-descriptions>\n    </div>\n    <div>\n      large\n      <h-descriptions title="User Info" type="vertical" size="large">\n        <h-description-item label="Name" value="bingkun Zhou"></h-description-item>\n        <h-description-item label="Telephone" value="0924-250492" />\n        <h-description-item label="Residence" value="Norway" />\n        <h-description-item label="City" value="Oslo" />\n        <h-description-item label="Address" value="Leg.Kiropraktor Iréne Johnson" />\n      </h-descriptions>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n.h-descriptions {\n  padding: 32px 24px 16px;\n}\n.container {\n  display: flex;\n}\n</style>\n',
    path: "demos/components/Descriptions/single.vue"
  }, null, _parent));
  _push(`<h2 id="垂直样式" tabindex="-1">垂直样式 <a class="header-anchor" href="#垂直样式" aria-label="Permalink to &quot;垂直样式&quot;">​</a></h2><p>字段统一居左对齐,垂直列表</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="container">\n    <div>\n      <h-descriptions title="User Info" type="vertical" label-position="top" :column="3">\n        <h-description-item label="Name" value="bingkun Zhou"></h-description-item>\n        <h-description-item label="Telephone" value="0924-250492" />\n        <h-description-item label="Residence" value="Norway" />\n        <h-description-item label="City" value="Oslo" />\n        <h-description-item label="Address" value="Leg.Kiropraktor Iréne Johnson" />\n      </h-descriptions>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n.container {\n  display: flex;\n  flex-direction: column;\n}\n</style>\n',
    path: "demos/components/Descriptions/vertical.vue"
  }, null, _parent));
  _push(`<h2 id="带边框展示" tabindex="-1">带边框展示 <a class="header-anchor" href="#带边框展示" aria-label="Permalink to &quot;带边框展示&quot;">​</a></h2><p>带边框和背景颜色的列表</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="container">\n    <div>\n      <h-descriptions title="User Info" type="vertical" border :column="3">\n        <h-description-item label="Name" value="bingkun Zhou"></h-description-item>\n        <h-description-item label="Telephone" value="0924-250492" />\n        <h-description-item label="Residence" value="Norway" />\n        <h-description-item label="City" value="Oslo" />\n        <h-description-item label="Address" value="Leg.Kiropraktor Iréne Johnson" :span-col="2" />\n      </h-descriptions>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n.container {\n  display: flex;\n  flex-direction: column;\n}\n</style>\n',
    path: "demos/components/Descriptions/border.vue"
  }, null, _parent));
  _push(`<h2 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="container">
    <div style="display: flex; align-items: center">
      <h-checkbox-button v-model="checked" @change="setTitle">Set Title</h-checkbox-button>
      <h-checkbox-button v-model="border">Border</h-checkbox-button>
      <div>Type：</div>
      <h-radio-group v-model="type">
        <h-radio-button v-for="(label, index) in typeOptions" :key="index" :label="label" />
      </h-radio-group>
      <div>Size：</div>
      <h-radio-group v-model="size">
        <h-radio-button v-for="(label, index) in sizeOptions" :key="index" :label="label" />
      </h-radio-group>
      <div>LabelPosition：</div>
      <h-radio-group v-model="LabelPosition">
        <h-radio-button v-for="(label, index) in ['left', 'top']" :key="index" :label="label" />
      </h-radio-group>
      <div>Column：</div>
      <h-radio-group v-model="column">
        <h-radio-button v-for="(label, index) in [1, 2]" :key="index" :label="label" />
      </h-radio-group>
    </div>
    <h-descriptions
      :title="title"
      :border="border"
      :type="type"
      :size="size"
      :label-position="LabelPosition"
      :column="column"
    >
      <h-description-item
        v-for="(item, index) in data"
        :key="index"
        :label="item.label"
        :value="item.value"
        :span-col="index === data.length - 1 ? column : 1"
      />
    </h-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const data = ref([
      { label: 'Name', value: 'bingkun Zhou' },
      { label: 'Telephone', value: '0924-250492' },
      { label: 'Residence', value: 'Norway' },
      { label: 'City', value: 'Oslo' },
      { label: 'Address', value: 'Leg.Kiropraktor Iréne Johnson' },
    ]);
    const border = ref(false);
    const type = ref('vertical');
    const size = ref('medium');
    const typeOptions = ref(['horizontal', 'vertical']);
    const sizeOptions = ref(['small', 'medium', 'large']);
    const title = ref('');
    const LabelPosition = ref('left');
    const checked = ref(false);
    const column = ref(1);
    const setTitle = (val: boolean) => {
      title.value = val ? 'User Info' : '';
    };
    return {
      data,
      border,
      type,
      size,
      typeOptions,
      sizeOptions,
      title,
      setTitle,
      checked,
      LabelPosition,
      column,
    };
  },
});
<\/script>

<style scoped>
.h-descriptions {
  padding: 32px 24px 16px;
}

.container .h-checkbox-button,
.container .h-radio-group {
  margin-right: 20px;
}
</style>
`,
    path: "demos/components/Descriptions/props.vue"
  }, null, _parent));
  _push(`<h2 id="descriptions-api" class="no-underline h2"><a href="#descriptions-api" class="!no-underline">Descriptions Api</a></h2><h3 id="descriptions-props" class="no-underline h3"><a href="#descriptions-props" class="!no-underline">Descriptions Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>标题</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">border</td><td>开启边框<br>对于vertical类型有效</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>设置间距,要于单列类型配合使用</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>类型</td><td><code>&#39;horizontal&#39; | &#39;vertical&#39;</code></td><td class="text-center">否</td><td>&#39;horizontal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">column</td><td>列数<br>需要配合type=&quot;vertical&quot;食用</td><td><code>number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label-position</td><td>标签位置</td><td><code>&#39;top&#39; | &#39;left&#39;</code></td><td class="text-center">否</td><td>&#39;left&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">xs</td><td>&lt;456px 列数<br>需要配合type=&quot;vertical&quot;食用</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sm</td><td>≥456px 列数<br>需要配合type=&quot;vertical&quot;食用</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">md</td><td>≥760px 列数<br>需要配合type=&quot;vertical&quot;食用</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">lg</td><td>≥1176px 列数<br>需要配合type=&quot;vertical&quot;食用</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">xl</td><td>≥1656px 列数<br>需要配合type=&quot;vertical&quot;食用</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label-class</td><td>label的类名，请添加全局类名（不使用scoped）</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value-class</td><td>value的类名，请添加全局类名（不使用scoped）</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h2 id="descriptionitem-api" class="no-underline h2"><a href="#descriptionitem-api" class="!no-underline">DescriptionItem Api</a></h2><h3 id="descriptionitem-props" class="no-underline h3"><a href="#descriptionitem-props" class="!no-underline">DescriptionItem Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label</td><td>标签名</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td>标签值</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;--&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">span-col</td><td>跨列数</td><td><code>number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">span-row</td><td>跨行数</td><td><code>number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">xs</td><td>&lt;456px 跨列数</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sm</td><td>≥456px 跨列数</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">md</td><td>≥760px 跨列数</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">lg</td><td>≥1176px 跨列数</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">xl</td><td>≥1656px 跨列数</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Descriptions.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Descriptions = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Descriptions as default
};
