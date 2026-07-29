import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/directives/v-popconfirm.md","filePath":"zh/demos/directives/v-popconfirm.md"}');
const _sfc_main = { name: "demos/directives/v-popconfirm.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="组件说明" tabindex="-1">组件说明 <a class="header-anchor" href="#组件说明" aria-label="Permalink to &quot;组件说明&quot;">​</a></h2><p>和其它所有组件库都不同，我们提供的是指令而非组件的方式来实现这一效果。这样做的好处是，你无需修改元素的结构，也无需手动将目标元素上的 <code>click</code> 事件移到气泡弹窗上 —— 这一切都是自动的。</p><h2 id="基础示例" tabindex="-1">基础示例 <a class="header-anchor" href="#基础示例" aria-label="Permalink to &quot;基础示例&quot;">​</a></h2><p>给需要二次确认的操作元素加上 <code>v-popconfirm</code> 即可，它会自动将元素的 <code>click</code> 事件转移到弹窗中。</p>`);
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
  _push(`<h2 id="自定义文本" tabindex="-1">自定义文本 <a class="header-anchor" href="#自定义文本" aria-label="Permalink to &quot;自定义文本&quot;">​</a></h2><p>你可以通过给 <code>v-popconfirm</code> 传入一个字符串来重新设置文本，也可以传入一个完整的配置对象。</p>`);
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
  _push(`<h2 id="自定义类型" tabindex="-1">自定义类型 <a class="header-anchor" href="#自定义类型" aria-label="Permalink to &quot;自定义类型&quot;">​</a></h2><p>通过 <code>type</code> 传入想要的类型，这会对应不同的图标，<code>none</code> 表示不显示图标。</p>`);
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
  _push(`<h2 id="自定义位置" tabindex="-1">自定义位置 <a class="header-anchor" href="#自定义位置" aria-label="Permalink to &quot;自定义位置&quot;">​</a></h2><p>气泡弹窗的位置默认是 <code>top</code>，有 15 个可选值。</p>`);
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
  _push(`<h2 id="自定义按钮" tabindex="-1">自定义按钮 <a class="header-anchor" href="#自定义按钮" aria-label="Permalink to &quot;自定义按钮&quot;">​</a></h2><p>你可以完全自定义按钮的文本和参数。</p>`);
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
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/directives/v-popconfirm.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vPopconfirm = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vPopconfirm as default
};
