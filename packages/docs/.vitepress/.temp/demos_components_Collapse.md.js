import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Collapse.md","filePath":"zh/demos/components/Collapse.md"}');
const _sfc_main = { name: "demos/components/Collapse.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Collapse</h1><p class="description">通过折叠面板收纳内容区域</p><h2 id="何时使用" tabindex="-1">何时使用 <a class="header-anchor" href="#何时使用" aria-label="Permalink to &quot;何时使用&quot;">​</a></h2><ol><li>折叠面板可以使信息处理和发现更加有效。对复杂区域进行分组和隐藏，保持页面的整洁。</li><li>如果用户可能会阅读所有内容，则不要使用折叠面板，因为它会增加额外点击的负担；而是使用带有普通标题的完整滚动页面。</li></ol><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2><p>默认可以同时展开多个面板，可以设置默认展开第几个。</p>`);
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
  _push(`<h2 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h2><p>默认大小是 medium。</p>`);
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
  _push(`<h2 id="手风琴" tabindex="-1">手风琴 <a class="header-anchor" href="#手风琴" aria-label="Permalink to &quot;手风琴&quot;">​</a></h2><p>设置<code>accordion</code>,每次只能打开一个面板。</p>`);
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
  _push(`<h2 id="面板嵌套" tabindex="-1">面板嵌套 <a class="header-anchor" href="#面板嵌套" aria-label="Permalink to &quot;面板嵌套&quot;">​</a></h2><p>嵌套折叠面板。</p>`);
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
  _push(`<h2 id="其他" tabindex="-1">其他 <a class="header-anchor" href="#其他" aria-label="Permalink to &quot;其他&quot;">​</a></h2>`);
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
  _push(`<h2>Collapse Api</h2><h3>Collapse Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active-key</td><td>当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)</td><td><code>string | number | (string | number)[]</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">accordion</td><td>是否手风琴模式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">border</td><td>是否边框模式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">filled</td><td>是否使用面分隔</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-icon-position</td><td>展开图标位置</td><td><code>&#39;left&#39; | &#39;right&#39;</code></td><td class="text-center">否</td><td>&#39;left&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>面板大小</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-all</td><td>默认展开全部(对手风琴模式无效)</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3>Collapse Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">改变当前激活的面板</td><td rowspan="1">( activeKeys: <code>string | number | (string | number)[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">activeKeys</td><td><code>string | number | (string | number)[]</code></td><td>页面大小</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:active-key</td><td rowspan="1">改变当前激活的面板</td><td rowspan="1">( activeKeys: <code>string | number | (string | number)[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">activeKeys</td><td><code>string | number | (string | number)[]</code></td><td></td></tr></tbody></table><h2>CollapseItem Api</h2><h3>CollapseItem Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>面板标题</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>唯一标志符</td><td><code>string | number</code></td><td class="text-center">是</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-icon</td><td>自定义展开图标</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">color</td><td>分隔线颜色</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">background</td><td>面板标题背景色</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">directive</td><td>v-if和v-show</td><td><code>&#39;show&#39; | &#39;if&#39;</code></td><td class="text-center">否</td><td>&#39;show&#39;</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Collapse.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Collapse = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Collapse as default
};
