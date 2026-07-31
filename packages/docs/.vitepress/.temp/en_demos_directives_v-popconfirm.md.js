import { resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/directives/v-popconfirm.md","filePath":"en/demos/directives/v-popconfirm.md"}');
const _sfc_main = { name: "en/demos/directives/v-popconfirm.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_h_link = resolveComponent("h-link");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>v-popconfirm</h1><p class="description">Unlike all other component libraries, we provide a directive rather than a component to achieve this effect. The advantage of this is that you don&#39;t need to modify the element structure, nor do you need to manually move the <code>click</code> event on the target element to the bubble popup - all of this is automatic.</p><h2 id="component-instructions" tabindex="-1">Component Instructions <a class="header-anchor" href="#component-instructions" aria-label="Permalink to &quot;Component Instructions&quot;">​</a></h2><p>Unlike all other component libraries, we provide a directive rather than a component to achieve this effect. The advantage of this is that you don&#39;t need to modify the element structure, nor do you need to manually move the <code>click</code> event on the target element to the bubble popup - all of this is automatic.</p><h2 id="basic-example" tabindex="-1">Basic Example <a class="header-anchor" href="#basic-example" aria-label="Permalink to &quot;Basic Example&quot;">​</a></h2><p>Add <code>v-popconfirm</code> to the operation element that needs secondary confirmation, and it will automatically transfer the element&#39;s <code>click</code> event to the popup.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button v-popconfirm @click="del">Delete</h-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    return {
      del: () => {
        $message('Action!');
      },
    };
  },
});
<\/script>
`,
    path: "demos/directives/v-popconfirm/basic.vue"
  }, null, _parent));
  _push(`<h2 id="custom-text" tabindex="-1">Custom Text <a class="header-anchor" href="#custom-text" aria-label="Permalink to &quot;Custom Text&quot;">​</a></h2><p>You can reset the text by passing a string to <code>v-popconfirm</code>, or you can pass a complete configuration object.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button v-popconfirm="'确定要删除吗？'" class="mr-2" @click="del">Delete</h-button>
  <h-button v-popconfirm="{ title: '确定要删除吗？' }" @click="del">Delete</h-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    return {
      del: () => {
        $message('Action!');
      },
    };
  },
});
<\/script>
`,
    path: "demos/directives/v-popconfirm/title.vue"
  }, null, _parent));
  _push(`<h2 id="custom-type" tabindex="-1">Custom Type <a class="header-anchor" href="#custom-type" aria-label="Permalink to &quot;Custom Type&quot;">​</a></h2><p>Pass the desired type through <code>type</code>, which will correspond to different icons. <code>none</code> means no icon is displayed.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button
    v-for="typeName in types"
    :key="typeName"
    v-popconfirm="{ type: typeName }"
    class="mr-2"
    @click="del"
  >
    {{ typeName }}
  </h-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const types = ['none', 'info', 'success', 'warning', 'error'];
    return {
      types,
      del: () => {
        $message('Action!');
      },
    };
  },
});
<\/script>
`,
    path: "demos/directives/v-popconfirm/type.vue"
  }, null, _parent));
  _push(`<h2 id="custom-position" tabindex="-1">Custom Position <a class="header-anchor" href="#custom-position" aria-label="Permalink to &quot;Custom Position&quot;">​</a></h2><p>The position of the bubble popup defaults to <code>top</code>, with 15 optional values.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="placement-wrap">
    <div>
      <h-button
        v-popconfirm="{ placement: 'top-start' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        top-start
      </h-button>
      <h-button
        v-popconfirm="{ placement: 'top' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        top
      </h-button>
      <h-button
        v-popconfirm="{ placement: 'top-end' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        top-end
      </h-button>
    </div>
    <div>
      <h-button v-popconfirm="{ placement: 'left-start' }" size="medium" :plain="true" @click="del">
        left-start
      </h-button>
      <h-button v-popconfirm="{ placement: 'left' }" size="medium" :plain="true" @click="del">
        left
      </h-button>
      <h-button v-popconfirm="{ placement: 'left-end' }" size="medium" :plain="true" @click="del">
        left-end
      </h-button>
    </div>
    <div>
      <h-button
        v-popconfirm="{ placement: 'bottom-start' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        bottom-start
      </h-button>
      <h-button
        v-popconfirm="{ placement: 'bottom' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        bottom
      </h-button>
      <h-button
        v-popconfirm="{ placement: 'bottom-end' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        bottom-end
      </h-button>
    </div>
    <div>
      <h-button
        v-popconfirm="{ placement: 'right-start' }"
        size="medium"
        :plain="true"
        @click="del"
      >
        right-start
      </h-button>
      <h-button v-popconfirm="{ placement: 'right' }" size="medium" :plain="true" @click="del">
        right
      </h-button>
      <h-button v-popconfirm="{ placement: 'right-end' }" size="medium" :plain="true" @click="del">
        right-end
      </h-button>
    </div>
    <div>
      <h-button
        v-popconfirm="{ placement: 'auto-start' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        auto-start
      </h-button>
      <h-button
        v-popconfirm="{ placement: 'auto' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        auto
      </h-button>
      <h-button
        v-popconfirm="{ placement: 'auto-end' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        auto-end
      </h-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    return {
      optionsRef: ref({
        title: '确定要删除该项吗？',
        okText: '确定',
        cancelText: '取消',
      }),
      del: () => {
        $message('Action!');
      },
    };
  },
});
<\/script>

<style scoped>
.placement-wrap {
  position: relative;
  width: 700px;
  text-align: center;
}

.placement-wrap > :nth-child(1) {
  margin-bottom: 20px;
}

.placement-wrap > :nth-child(2),
.placement-wrap > :nth-child(4) {
  width: 105px;
}

.placement-wrap > :nth-child(2) > button,
.placement-wrap > :nth-child(4) > button {
  margin: 0 0 20px;
}

.placement-wrap > :nth-child(4) {
  position: absolute;
  top: 52px;
  right: 0;
}

.placement-wrap > :nth-child(5) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}
</style>
`,
    path: "demos/directives/v-popconfirm/demo2.vue"
  }, null, _parent));
  _push(`<h2 id="custom-buttons" tabindex="-1">Custom Buttons <a class="header-anchor" href="#custom-buttons" aria-label="Permalink to &quot;Custom Buttons&quot;">​</a></h2><p>You can completely customize the button text and parameters.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button v-popconfirm="optionsRef" @click="del">Delete</h-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    return {
      optionsRef: ref({
        title: '确定要删除吗？',
        okText: '确定',
        okButtonProps: {
          type: 'primary',
          kind: 'negative',
        },
        cancelText: '取消',
        cancelButtonProps: {
          type: 'text',
          kind: 'neutral',
        },
      }),
      del: () => {
        $message('Action!');
      },
    };
  },
});
<\/script>
`,
    path: "demos/directives/v-popconfirm/demo3.vue"
  }, null, _parent));
  _push(`<h2 id="popconfirm-api" class="no-underline h2"><a href="#popconfirm-api" class="!no-underline">Popconfirm Api</a></h2><h3 id="popconfirm-options" class="no-underline h3"><a href="#popconfirm-options" class="!no-underline">Popconfirm Options</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>是否Required</th><th>Default</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td rowspan="1">Description</td><td rowspan="1">No</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td rowspan="1">Description</td><td rowspan="1">No</td><td rowspan="1">&#39;warning&#39;</td><td rowspan="1"><code> &#39;none&#39; | &#39;info&#39; | &#39;success&#39; | &#39;warning&#39; | &#39;error&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">iconName</td><td rowspan="1">Custom 图标名称</td><td rowspan="1">No</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">iconSize</td><td rowspan="1">Custom 图标size</td><td rowspan="1">No</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">iconColor</td><td rowspan="1">Custom 图标color</td><td rowspan="1">No</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td rowspan="1">Description</td><td rowspan="1">No</td><td rowspan="1">&#39;top&#39;</td><td rowspan="1"><code> &#39;auto&#39; | &#39;auto-start&#39; | &#39;auto-end&#39; | &#39;top&#39; | &#39;top-start&#39; | &#39;top-end&#39; | &#39;bottom&#39; | &#39;bottom-start&#39; | &#39;bottom-end&#39; | &#39;right&#39; | &#39;right-start&#39; | &#39;right-end&#39; | &#39;left&#39; | &#39;left-start&#39; | &#39;left-end&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">okText</td><td rowspan="1">Description</td><td rowspan="1">No</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">okButtonProps</td><td rowspan="1">Description</td><td rowspan="1">No</td><td rowspan="1">-</td><td rowspan="1"><code> Object as DirectiveOptionType&lt;Partial&lt;ButtonProps&gt;&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelText</td><td rowspan="1">Cancelbuttontext, 会根据Current locale Display defaulttext</td><td rowspan="1">No</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelButtonProps</td><td rowspan="1">Cancelbutton的 props, Pass 一个对象, 详见 `);
  _push(ssrRenderComponent(_component_h_link, { href: "/pages/horizon-web/horizon-web/components/button#Api" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Button Props`);
      } else {
        return [
          createTextVNode("Button Props")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</td><td rowspan="1">No</td><td rowspan="1">-</td><td rowspan="1"><code> Object as DirectiveOptionType&lt;Partial&lt;ButtonProps&gt;&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">zIndex</td><td rowspan="1">Description</td><td rowspan="1">No</td><td rowspan="1">1000</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">toBody</td><td rowspan="1">Whether 将element发送到 body node</td><td rowspan="1">No</td><td rowspan="1">true</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/directives/v-popconfirm.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vPopconfirm = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vPopconfirm as default
};
