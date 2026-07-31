import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Collapse.md","filePath":"en/demos/components/Collapse.md"}');
const _sfc_main = { name: "en/demos/components/Collapse.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Collapse</h1><p class="description">1. Collapse panels can make information processing and discovery more effective. Group and hide complex areas to keep the page clean.</p><h2 id="when-to-use" tabindex="-1">When to Use <a class="header-anchor" href="#when-to-use" aria-label="Permalink to &quot;When to Use&quot;">​</a></h2><ol><li>Collapse panels can make information processing and discovery more effective. Group and hide complex areas to keep the page clean.</li><li>If users are likely to read all content, do not use collapse panels as they add the burden of additional clicks; instead, use a full scrolling page with normal headings.</li></ol><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>By default, multiple panels can be expanded at the same time, and you can set which one to expand by default.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex justify-space-between">
    <h-collapse :active-key="activeKey" style="width: 500px" @change="handleExpand">
      <h-collapse-item title="This is a panel header." name="1">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
        <div>sunt nostrud amet.Amet minim mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="Why can i not submit a higher price?" name="2">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="How are you？" name="3">How are you？</h-collapse-item>
      <h-collapse-item title="What are Promotion Products?" name="4">
        What are Promotion Products?
      </h-collapse-item>
    </h-collapse>
    <h-collapse :active-key="activeKey" filled style="width: 500px">
      <h-collapse-item title="This is a panel header." name="1">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
        <div>sunt nostrud amet.Amet minim mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="Why can i not submit a higher price?" name="2">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="How are you？" name="3">How are you？</h-collapse-item>
      <h-collapse-item title="What are Promotion Products?" name="4">
        What are Promotion Products?
      </h-collapse-item>
    </h-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const activeKey = ref(['1', '2']);
    const handleExpand = activeKeys => {
      console.info(\`activeKeys ===> \`, activeKeys);
    };
    return {
      activeKey,
      handleExpand,
    };
  },
});
<\/script>
`,
    path: "demos/components/Collapse/basic.vue"
  }, null, _parent));
  _push(`<h2 id="attributes" tabindex="-1">Attributes <a class="header-anchor" href="#attributes" aria-label="Permalink to &quot;Attributes&quot;">​</a></h2><p>The default size is medium.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="mb-5">
    <div>size:</div>
    <h-radio-group v-model="selectSize">
      <h-radio
        v-for="(label, index) in ['small', 'medium', 'large']"
        :key="index"
        :label="label"
        size="small"
      />
    </h-radio-group>
  </div>
  <div class="mb-5">
    <div>expand-icon-position:</div>
    <h-radio-group v-model="selectPosition">
      <h-radio
        v-for="(label, index) in ['left', 'right']"
        :key="index"
        :label="label"
        size="small"
      />
    </h-radio-group>
  </div>
  <div class="flex justify-space-between">
    <h-collapse
      :active-key="activeKey"
      style="width: 500px"
      :size="selectSize"
      :expand-icon-position="selectPosition"
      @change="handleExpand"
    >
      <h-collapse-item title="This is a panel header." name="1">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
        <div>sunt nostrud amet.Amet minim mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="Why can i not submit a higher price?" name="2">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="How are you？" name="3">How are you？</h-collapse-item>
      <h-collapse-item title="What are Promotion Products?" name="4">
        What are Promotion Products?
      </h-collapse-item>
    </h-collapse>
    <h-collapse
      :active-key="activeKey"
      filled
      :size="selectSize"
      style="width: 500px"
      :expand-icon-position="selectPosition"
    >
      <h-collapse-item title="This is a panel header." name="1">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
        <div>sunt nostrud amet.Amet minim mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="Why can i not submit a higher price?" name="2">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="How are you？" name="3">How are you？</h-collapse-item>
      <h-collapse-item title="What are Promotion Products?" name="4">
        What are Promotion Products?
      </h-collapse-item>
    </h-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const activeKey = ref(['1', '2']);
    const handleExpand = activeKeys => {
      console.info(\`activeKeys ===> \`, activeKeys);
    };
    const selectSize = ref('medium');
    const selectPosition = ref('left');
    return {
      activeKey,
      handleExpand,
      selectSize,
      selectPosition,
    };
  },
});
<\/script>
`,
    path: "demos/components/Collapse/size.vue"
  }, null, _parent));
  _push(`<h2 id="accordion" tabindex="-1">Accordion <a class="header-anchor" href="#accordion" aria-label="Permalink to &quot;Accordion&quot;">​</a></h2><p>Set <code>accordion</code> to open only one panel at a time.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex justify-space-between">
    <h-collapse :active-key="activeKey" accordion style="width: 500px">
      <h-collapse-item title="This is a panel header." name="1">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="Why can i not submit a higher price?" name="2">
        <div>Why can i not submit a higher price?</div>
      </h-collapse-item>
      <h-collapse-item title="How are you？" name="3">How are you？</h-collapse-item>
      <h-collapse-item title="What are Promotion Products?" name="4">
        What are Promotion Products?
      </h-collapse-item>
    </h-collapse>
    <h-collapse
      :active-key="activeKey"
      accordion
      filled
      style="width: 500px"
      @change="handleExpand"
    >
      <h-collapse-item title="This is a panel header." name="1">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="Why can i not submit a higher price?" name="2">
        <div>Why can i not submit a higher price?</div>
      </h-collapse-item>
      <h-collapse-item title="How are you？" name="3">How are you？</h-collapse-item>
      <h-collapse-item title="What are Promotion Products?" name="4">
        What are Promotion Products?
      </h-collapse-item>
    </h-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const activeKey = ref('1');
    const handleExpand = val => {
      console.info(\`activeKey ===> \`, val);
    };
    return {
      activeKey,
      handleExpand,
    };
  },
});
<\/script>
`,
    path: "demos/components/Collapse/accordion.vue"
  }, null, _parent));
  _push(`<h2 id="nested-panels" tabindex="-1">Nested Panels <a class="header-anchor" href="#nested-panels" aria-label="Permalink to &quot;Nested Panels&quot;">​</a></h2><p>Nested collapse panels.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex justify-space-between">
    <h-collapse :active-key="activeKey" style="width: 500px">
      <h-collapse-item title="This is a panel header." name="1">
        <h-collapse :active-key="activeKey">
          <h-collapse-item title="This is a panel header." name="1">
            <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
            <div>Velit officia consequat duis enim velit mollit.</div>
          </h-collapse-item>
          <h-collapse-item title="This is a panel header." name="0">
            <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
            <div>Velit officia consequat duis enim velit mollit.</div>
          </h-collapse-item>
        </h-collapse>
      </h-collapse-item>
      <h-collapse-item title="Why can i not submit a higher price?" name="2">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="How are you？" name="3">How are you？</h-collapse-item>
      <h-collapse-item title="What are Promotion Products?" name="4">
        What are Promotion Products?
      </h-collapse-item>
    </h-collapse>
    <h-collapse :active-key="activeKey" style="width: 500px" filled>
      <h-collapse-item title="This is a panel header." name="1">
        <h-collapse :active-key="activeKey">
          <h-collapse-item title="This is a panel header." name="1">
            <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
            <div>Velit officia consequat duis enim velit mollit.</div>
          </h-collapse-item>
          <h-collapse-item title="This is a panel header." name="0">
            <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
            <div>Velit officia consequat duis enim velit mollit.</div>
          </h-collapse-item>
        </h-collapse>
      </h-collapse-item>
      <h-collapse-item title="Why can i not submit a higher price?" name="2">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="How are you？" name="3">How are you？</h-collapse-item>
      <h-collapse-item title="What are Promotion Products?" name="4">
        What are Promotion Products?
      </h-collapse-item>
    </h-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const activeKey = ref(['1']);
    return {
      activeKey,
    };
  },
});
<\/script>
`,
    path: "demos/components/Collapse/nest.vue"
  }, null, _parent));
  _push(`<h2 id="others" tabindex="-1">Others <a class="header-anchor" href="#others" aria-label="Permalink to &quot;Others&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex justify-space-between">
    <h-collapse :active-key="activeKey" style="width: 500px" @change="handleExpand">
      <h-collapse-item name="1">
        <template #title>
          <AIcon name="task_complete" class="mr-2" size="24" />
          This is a panel header.
        </template>
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
        <div>sunt nostrud amet.Amet minim mollit.</div>
      </h-collapse-item>
      <h-collapse-item name="2">
        <template #title>
          <div class="flex justify-space-between flex-1">
            <div>Why can i not submit a higher price?</div>
            <div class="ml-3">Extra Info</div>
          </div>
        </template>
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item name="3">
        <template #title>
          <div class="flex justify-space-between flex-1">
            <div>How are you？</div>
            <h-button class="ml-3" size="small" :plain="true" @click.stop="handleClickButton">
              Default
            </h-button>
          </div>
        </template>
        How are you？
      </h-collapse-item>
      <h-collapse-item name="4">
        <template #title>
          <div class="flex justify-space-between flex-1">
            <div>What are Promotion Products?</div>
            <AIcon class="ml-3" name="alarm" />
          </div>
        </template>
        What are Promotion Products?
      </h-collapse-item>
    </h-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const activeKey = ref(['1', '2']);
    const handleExpand = activeKeys => {
      console.info(\`activeKeys ===> \`, activeKeys);
    };
    const handleClickButton = () => {
      console.info('click button');
    };
    return {
      activeKey,
      handleExpand,
      handleClickButton,
    };
  },
});
<\/script>
`,
    path: "demos/components/Collapse/other.vue"
  }, null, _parent));
  _push(`<h2 id="collapse-api" class="no-underline h2"><a href="#collapse-api" class="!no-underline">Collapse Api</a></h2><h3 id="collapse-props" class="no-underline h3"><a href="#collapse-props" class="!no-underline">Collapse Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active-key</td><td>Configuration for active key.</td><td><code>string | number | (string | number)[]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">accordion</td><td>Configuration for accordion.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">border</td><td>Configuration for border.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filled</td><td>Configuration for filled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-icon-position</td><td>Configuration for expand icon position.</td><td><code>&#39;left&#39; | &#39;right&#39;</code></td><td class="text-center">No</td><td>&#39;left&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-all</td><td>Configuration for expand all.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="collapse-emits" class="no-underline h3"><a href="#collapse-emits" class="!no-underline">Collapse Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">Emitted when change changes.</td><td rowspan="1">( activeKeys: <code>string | number | (string | number)[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">activeKeys</td><td><code>string | number | (string | number)[]</code></td><td>The active keys value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:active-key</td><td rowspan="1">Emitted when update:active key changes.</td><td rowspan="1">( activeKeys: <code>string | number | (string | number)[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">activeKeys</td><td><code>string | number | (string | number)[]</code></td><td></td></tr></tbody></table><h2 id="collapseitem-api" class="no-underline h2"><a href="#collapseitem-api" class="!no-underline">CollapseItem Api</a></h2><h3 id="collapseitem-props" class="no-underline h3"><a href="#collapseitem-props" class="!no-underline">CollapseItem Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>Configuration for title.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>Configuration for name.</td><td><code>string | number</code></td><td class="text-center">Yes</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-icon</td><td>Configuration for expand icon.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">color</td><td>Configuration for color.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">background</td><td>Configuration for background.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">directive</td><td>Configuration for directive.</td><td><code>&#39;show&#39; | &#39;if&#39;</code></td><td class="text-center">No</td><td>&#39;show&#39;</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Collapse.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Collapse = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Collapse as default
};
