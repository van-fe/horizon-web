import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Steps.md","filePath":"en/demos/components/Steps.md"}');
const _sfc_main = { name: "en/demos/components/Steps.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Steps</h1><p class="description">Change the state of the current node by controlling <code>status</code></p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>Change the state of the current node by controlling <code>status</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <div class="mb-4">
      <h-form label-position="left" label-vertical-align="middle">
        <h-form-item label="切换状态">
          <h-select v-model="status" style="width: fit-content">
            <h-option v-for="item of statusList" :key="item" :value="item" :label="item" />
          </h-select>
        </h-form-item>
      </h-form>
    </div>

    <h-steps :model-value="1" :status="status">
      <h-step>
        <template #title>Succeeded</template>
        <template #subtitle>
          <span>This is a description.</span>
        </template>
      </h-step>
      <h-step title="Processing" subtitle="This is a description." description="03/23/2021" />
      <h-step title="Future step" subtitle="This is a description." />
    </h-steps>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const statusList = ['wait', 'process', 'finish', 'warning', 'error'];
    const status = ref('wait');

    return {
      status,
      statusList,
    };
  },
});
<\/script>
`,
    path: "demos/components/Steps/basic.vue"
  }, null, _parent));
  _push(`<h2 id="small-steps" tabindex="-1">Small Steps <a class="header-anchor" href="#small-steps" aria-label="Permalink to &quot;Small Steps&quot;">​</a></h2><p>You can set <code>size = &#39;small&#39;</code> to enable small steps</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-steps :current="1" size="small" status="error">\n    <h-step title="Succeeded" />\n    <h-step title="Processing" />\n    <h-step title="Future step" />\n  </h-steps>\n</template>\n',
    path: "demos/components/Steps/small-size.vue"
  }, null, _parent));
  _push(`<h2 id="step-switch" tabindex="-1">Step Switch <a class="header-anchor" href="#step-switch" aria-label="Permalink to &quot;Step Switch&quot;">​</a></h2><p>You can switch steps by passing in <code>modelValue</code>. The corresponding <code>update:modelValue</code> will also notify when changed</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-steps v-model="current">
    <h-step v-for="item in steps" :key="item.title" :title="item.title" />
  </h-steps>
  <div class="steps-action">
    <h-button :disabled="current === 0" @click="prev">上一步</h-button>
    <h-button :disabled="current === steps.length" type="primary" @click="next">
      {{ current === steps.length - 1 ? '全部完成' : '下一步' }}
    </h-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const current = ref(0);
const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];
const next = () => {
  current.value++;
};
const prev = () => {
  current.value--;
};
<\/script>

<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}

.steps-action .h-button + .h-button {
  margin-left: 8px;
}
</style>
`,
    path: "demos/components/Steps/switch-step.vue"
  }, null, _parent));
  _push(`<h2 id="dot-steps" tabindex="-1">Dot Steps <a class="header-anchor" href="#dot-steps" aria-label="Permalink to &quot;Dot Steps&quot;">​</a></h2><p>You can set <code>progress-dot = true</code> to enable dot steps</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-steps :current="1" :progress-dot="true" status="error">\n    <h-step title="Succeeded" description="Here is a paragraph" />\n    <h-step title="Processing" description="Here is a paragraph" />\n    <h-step title="Future step" description="Here is a paragraph" />\n  </h-steps>\n</template>\n',
    path: "demos/components/Steps/dot.vue"
  }, null, _parent));
  _push(`<h2 id="vertical-steps" tabindex="-1">Vertical Steps <a class="header-anchor" href="#vertical-steps" aria-label="Permalink to &quot;Vertical Steps&quot;">​</a></h2><p>Set <code>direction = &quot;vertical&quot;</code> to enable vertical steps</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-row>\n    <h-col :span="8">\n      <h-steps direction="vertical" :model-value="1">\n        <h-step title="Succeeded" description="This is a description." />\n        <h-step title="Processing" description="This is a description." />\n        <h-step title="Future step" description="This is a description." />\n      </h-steps>\n    </h-col>\n    <h-col :span="8">\n      <h-steps direction="vertical" size="small" :model-value="1">\n        <h-step title="Succeeded" description="Here is a paragraph." />\n        <h-step title="Processing" description="Here is a paragraph." />\n        <h-step title="Future step" description="Here is a paragraph." />\n      </h-steps>\n    </h-col>\n    <h-col :span="8">\n      <h-steps :progress-dot="true" :model-value="1" direction="vertical" status="error">\n        <h-step title="Succeeded" description="Here is a paragraph. Here is a paragraph." />\n        <h-step title="Succeeded" description="Here is a paragraph. Here is a paragraph." />\n        <h-step title="Processing" description="Here is a paragraph. Here is a paragraph." />\n        <h-step title="Future step" description="Here is a paragraph." />\n        <h-step title="Future step" description="Here is a paragraph. Here is a paragraph." />\n      </h-steps>\n    </h-col>\n  </h-row>\n</template>\n\n<script setup lang="ts">\n<\/script>\n',
    path: "demos/components/Steps/vertical.vue"
  }, null, _parent));
  _push(`<h2 id="clickable" tabindex="-1">Clickable <a class="header-anchor" href="#clickable" aria-label="Permalink to &quot;Clickable&quot;">​</a></h2><p>Set <code>clickable = true</code> to switch steps by clicking</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-steps v-model="current" :clickable="true" @change="onChange">
    <h-step title="Step 1" description="Here is a paragraph." @click="onClickStep1" />
    <h-step title="Step 2" description="Cannot click" :clickable="false" />
    <h-step title="Step 3" description="Here is a paragraph." />
    <h-step title="Step 3" description="Here is a paragraph." />
  </h-steps>
  <br />
  <h-steps v-model="current" :clickable="true" direction="vertical" @change="onChange">
    <h-step title="Step 1" description="Here is a paragraph." />
    <h-step title="Step 2" description="Cannot click" :clickable="false" />
    <h-step title="Step 3" description="Here is a paragraph." />
    <h-step title="Step 3" description="Here is a paragraph." />
  </h-steps>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    onChange(current: number) {
      console.info('onChange:', current);
    },
    onClickStep1(evt: Event, index: number) {
      console.info({evt, index});
    },
  },
});
<\/script>
`,
    path: "demos/components/Steps/click.vue"
  }, null, _parent));
  _push(`<h2 id="specify-label-placement-position" tabindex="-1">Specify Label Placement Position <a class="header-anchor" href="#specify-label-placement-position" aria-label="Permalink to &quot;Specify Label Placement Position&quot;">​</a></h2><p>Configure <code>label-placement</code> to adjust label position</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div>\n    <h-steps :current="1" label-placement="vertical" status="error">\n      <h-step title="Succeeded" description="Here is a paragraph" />\n      <h-step title="Processing" description="Here is a paragraph" />\n      <h-step title="Future step" description="Here is a paragraph" />\n    </h-steps>\n    <br />\n    <br />\n    <h-steps progress-dot label-placement="vertical" :current="3" status="error">\n      <h-step title="Succeeded" description="Here is a paragraph" />\n      <h-step title="Succeeded" description="Here is a paragraph" />\n      <h-step title="Processing" description="Here is a paragraph" />\n      <h-step title="Future step" description="Here is a paragraph" />\n      <h-step title="Future step" description="Here is a paragraph" />\n    </h-steps>\n  </div>\n</template>\n',
    path: "demos/components/Steps/align-center.vue"
  }, null, _parent));
  _push(`<h2 id="specify-label-layout" tabindex="-1">Specify Label Layout <a class="header-anchor" href="#specify-label-layout" aria-label="Permalink to &quot;Specify Label Layout&quot;">​</a></h2><p>By setting <code>label-align</code>, <code>center</code> is centered, <code>left</code> is left-aligned</p><p>Only supports <code>label-placement=&quot;vertical&quot;</code> or <code>:progress-dot=&quot;true&quot;</code> situations</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-form label-position="left" label-vertical-align="middle">
      <h-form-item label="标签布局" style="width: fit-content">
        <h-select v-model="labelAlign">
          <h-option value="center" label="center"></h-option>
          <h-option value="left" label="left"></h-option>
        </h-select>
      </h-form-item>
    </h-form>

    <h-steps :current="1" :label-align="labelAlign" label-placement="vertical" class="my-8">
      <h-step title="Succeeded" description="Here is a paragraph" />
      <h-step title="Processing" description="Here is a paragraph" />
      <h-step title="Future step" description="Here is a paragraph" />
    </h-steps>
    <h-steps :progress-dot="true" :label-align="labelAlign" :current="3">
      <h-step title="Succeeded" description="Here is a paragraph" />
      <h-step title="Succeeded" description="Here is a paragraph" />
      <h-step title="Processing" description="Here is a paragraph" />
      <h-step title="Future step" description="Here is a paragraph" />
      <h-step title="Future step" description="Here is a paragraph" />
    </h-steps>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const labelAlign = ref('left');
<\/script>
`,
    path: "demos/components/Steps/label-align.vue"
  }, null, _parent));
  _push(`<h2 id="async-load" tabindex="-1">Async Load <a class="header-anchor" href="#async-load" aria-label="Permalink to &quot;Async Load&quot;">​</a></h2><p>Because the <code>steps</code> component determines the index of each step only when <code>n-step</code> is mounted, if there are fixed front and back steps but the middle steps are loaded asynchronously, it will cause the final order to be incorrect</p><p>Therefore, you need to set <code>index</code> for <code>n-step</code> to ensure the order meets expectations</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row :gutter="10">
    <h-col :span="24">
      <div class="demo-title">
        设置了 <code>index</code> 值
      </div>
      <h-steps v-model="current" :initial="initial">
        <h-step title="Start" :index="initial" />
        <h-step v-for="(item, index) in steps" :key="item.title" :title="item.title" :index="index + initial + 1" />
        <h-step title="End" :index="steps.length + initial + 1" />
      </h-steps>
    </h-col>
  </h-row>
  <h-row :gutter="10">
    <h-col :span="24">
      <div class="demo-title">
        未设置 <code>index</code> 值
      </div>
      <h-steps v-model="current" :initial="initial">
        <h-step title="Start" />
        <h-step v-for="item in steps" :key="item.title" :title="item.title" />
        <h-step title="End" />
      </h-steps>
    </h-col>
  </h-row>
  <div class="steps-action">
    <h-button :disabled="current === initial" @click="prev">上一步</h-button>
    <h-button :disabled="current === steps.length + initial + 2" type="primary" @click="next">
      {{ current === steps.length + initial + 2 ? '全部完成' : '下一步' }}
    </h-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const initial = 10;
const current = ref(initial);
const steps = ref<{title: string; content: string}[]>([]);

const next = () => {
  current.value++;
};
const prev = () => {
  current.value--;
};

onMounted(() => {
  setTimeout(() => {
    steps.value = [
      {
        title: 'First',
        content: 'First-content',
      },
      {
        title: 'Second',
        content: 'Second-content',
      },
    ];
  }, 500);

  setTimeout(() => {
    steps.value.push(
      {
        title: 'Last',
        content: 'Last-content',
      });
  }, 1000);
});
<\/script>

<style scoped>
.steps-action {
  margin-top: 24px;
}

.steps-action .h-button + .h-button {
  margin-left: 8px;
}
</style>
`,
    path: "demos/components/Steps/async-load.vue"
  }, null, _parent));
  _push(`<h2 id="intercept-switch" tabindex="-1">Intercept Switch <a class="header-anchor" href="#intercept-switch" aria-label="Permalink to &quot;Intercept Switch&quot;">​</a></h2><p>When <code>clickable = true</code> is set, user clicks to switch steps cannot be controlled by developers, so <code>before-change</code> is provided to intercept switch requests</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <h-steps v-model="modelValue" :clickable="true" :before-change="onBeforeChange">
      <h-step>
        <template #title>Succeeded</template>
        <template #subtitle>
          <span>This is a description.</span>
        </template>
      </h-step>
      <h-step title="Processing" subtitle="This is a description." description="03/23/2021" />
      <h-step title="Future step" subtitle="This is a description." />
    </h-steps>
  </div>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { $confirm, useStepProps } from '@aurora/horizon-web';

const modelValue = ref(0);

function onBeforeChange(next: number, curr: number, nextProp: ExtractPropTypes<typeof useStepProps>, currProp: ExtractPropTypes<typeof useStepProps>) {
  console.info({ next, curr, nextProp, currProp });

  return new Promise((resolve, reject) => {
    $confirm(\`是否同意切换步骤？从 【\${curr}】 切换到 【\${next}】\`, '切换步骤确认').then((close) => {
      resolve(true);
      close();
    }).catch(() => {
      reject();
    });
  });
}
<\/script>
`,
    path: "demos/components/Steps/before-change.vue"
  }, null, _parent));
  _push(`<h2 id="disabled" tabindex="-1">Disabled <a class="header-anchor" href="#disabled" aria-label="Permalink to &quot;Disabled&quot;">​</a></h2><p>Set <code>disabled</code> for <code>step-item</code> to prohibit interaction with the current step</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio label="small"></h-radio>
        <h-radio label="medium"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="dot">
      <h-radio-group v-model="dot">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-steps v-model="value" :progress-dot="dot" clickable label-align="left" :size="size">
    <h-step title="Succeeded" subtitle="This step is finished" />
    <h-step title="Disabled" :disabled="true" subtitle="This step is disabled" />
    <h-step title="Future step" subtitle="This is available" />
    <h-step title="Future step" subtitle="This is available" />
  </h-steps>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(1);
const size = ref('medium');
const dot = ref(false);
<\/script>
`,
    path: "demos/components/Steps/disabled.vue"
  }, null, _parent));
  _push(`<h2>Steps Api</h2><h3>Steps Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">current</td><td>指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status Name覆盖状态<br>请使用 <code>modelValue</code>，<code>current</code> 即将被废弃</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>指定当前步骤</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">direction</td><td>指定步骤条方向</td><td><code>&#39;horizontal&#39; | &#39;vertical&#39;</code></td><td class="text-center">No</td><td>&#39;horizontal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label-placement</td><td>指定标签放置位置，默认水平放图标右侧，可选 <code>vertical</code> 放图标下方</td><td><code>&#39;horizontal&#39; | &#39;vertical&#39;</code></td><td class="text-center">No</td><td>&#39;horizontal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>指定大小，目前支持普通（medium）和小型(small)</td><td><code>&#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td>指定当前步骤的状态</td><td><code>&#39;wait&#39; | &#39;process&#39; | &#39;finish&#39; | &#39;error&#39;</code></td><td class="text-center">No</td><td>&#39;process&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">progress-dot</td><td>设置点状步骤条</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clickable</td><td>是否可以点击步骤</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">controllable</td><td>是否点击步骤是受控的，即点击后可以直接切换步骤</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">initial</td><td>起始序号，从 0 开始记数</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">label-align</td><td>文本对齐方式，在 <code>direction = &#39;horizontal&#39;</code> 时有效</td><td><code>&#39;center&#39; | &#39;left&#39;</code></td><td class="text-center">No</td><td>&#39;center&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-change</td><td>手动点击 <code>n-step</code> 切换步骤前的回调<br>如果返回 false 或 Promise.resolve(false) Promise.reject ，则不会进行切换步骤</td><td><code>(<br>        next: number,<br>        current: number,<br>        nextProp: StepProps | undefined,<br>        currentProp: StepProps | undefined,<br>      ) =&gt; Awaitable&lt;boolean&gt;</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3>Steps Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:current</td><td rowspan="1">更新 <code>current</code> 时通知</td><td rowspan="1">( index: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">index</td><td><code>number</code></td><td>当前下标</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">当步骤变化时触发</td><td rowspan="1">( current: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">current</td><td><code>number</code></td><td>当前步骤下标</td></tr></tbody></table><h2>Step Api</h2><h3>Step Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>标题</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">subtitle</td><td>副标题</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">description</td><td>步骤的详情描述</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">index</td><td>指定当前步骤的下标<br>如果某些步骤是动态渲染的，会因为渲染顺序导致步骤进度非预期，所以需要自己设置 <code>index</code></td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clickable</td><td>是否可点击</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3>Step Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="2">step 点击触发</td><td rowspan="2">( evt: <code>Event</code>, index: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>Event</code></td><td>点击事件或键盘事件</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">index</td><td><code>number</code></td><td>当前元素下标</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Steps.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Steps = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Steps as default
};
