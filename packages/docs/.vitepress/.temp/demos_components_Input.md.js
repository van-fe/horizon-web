import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Input.md","filePath":"zh/demos/components/Input.md"}');
const _sfc_main = { name: "demos/components/Input.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Input</h1><p class="description">输入框组件</p><h2 id="常规状态" tabindex="-1">常规状态 <a class="header-anchor" href="#常规状态" aria-label="Permalink to &quot;常规状态&quot;">​</a></h2><p>输入框样式</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-form-item label="style">
      <h-radio-group v-model="inputStyle">
        <h-radio
          v-for="(label, index) in ['normal', 'no-border', 'emphasize']"
          :key="index"
          :label="label"
          size="small"
        />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="disabled">
      <h-radio-group v-model="inputDisabled">
        <h-radio
          v-for="(label, index) in ['disabled', 'useable']"
          :key="index"
          :label="label"
          size="small"
        />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="Label">
      <h-input v-model="val" :input-style = 'inputStyle' :disabled="inputDisabled === 'disabled'"/>
    </h-form-item>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val = ref('');
    const inputStyle = ref('normal');
    const inputDisabled = ref('useable');
    return {
      val,
      inputStyle,
      inputDisabled
    };
  },
});
<\/script>
`,
    path: "demos/components/Input/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="密码输入框" tabindex="-1">密码输入框 <a class="header-anchor" href="#密码输入框" aria-label="Permalink to &quot;密码输入框&quot;">​</a></h2><p><code>type</code>设置为<code>password</code>时输入框将隐藏输入内容，点击右侧的眼睛图标可以查看输入内容</p><p>PS: 在<code>password</code>状态设置<code>show-password</code>为<code>true</code>的情况下，<code>suffix-icon</code>将会失效</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-input v-model="val" clearable type="password" show-password />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val = ref('');
    return {
      val,
    };
  },
});
<\/script>
`,
    path: "demos/components/Input/password.vue"
  }, null, _parent));
  _push(`<h2 id="禁用状态" tabindex="-1">禁用状态 <a class="header-anchor" href="#禁用状态" aria-label="Permalink to &quot;禁用状态&quot;">​</a></h2><p>在<code>disabled</code>状态将不能输入</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-input v-model="val" disabled />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val = ref('');
    return {
      val,
    };
  },
});
<\/script>
`,
    path: "demos/components/Input/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="可清空" tabindex="-1">可清空 <a class="header-anchor" href="#可清空" aria-label="Permalink to &quot;可清空&quot;">​</a></h2><p>设置 <code>clearable</code>，即可在有值时显示清空图标</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-form-item label="Label">
      <h-input v-model="val" clearable />
    </h-form-item>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val = ref('');
    return {
      val,
    };
  },
});
<\/script>
`,
    path: "demos/components/Input/clearable.vue"
  }, null, _parent));
  _push(`<h2 id="输入状态" tabindex="-1">输入状态 <a class="header-anchor" href="#输入状态" aria-label="Permalink to &quot;输入状态&quot;">​</a></h2><p>传入<code>status=error</code>，将显示错误状态</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space>
    <h-input v-model="val" status="error" />
    <h-input v-model="val" input-style="emphasize" status="error" />
    <h-input v-model="val" input-style="no-border" status="error" />
  </h-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val = ref('');
    return {
      val,
    };
  },
});
<\/script>
`,
    path: "demos/components/Input/status.vue"
  }, null, _parent));
  _push(`<h2 id="尺寸" tabindex="-1">尺寸 <a class="header-anchor" href="#尺寸" aria-label="Permalink to &quot;尺寸&quot;">​</a></h2><p>组件提供了 <code>small</code> <code>medium</code> <code>large</code>三种尺寸，默认为<code>medium</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-row>
      <h-form-item label="style">
      <h-radio-group v-model="inputStyle">
        <h-radio
          v-for="(label, index) in ['normal', 'no-border', 'emphasize']"
          :key="index"
          :label="label"
          size="small"
        />
      </h-radio-group>
    </h-form-item>
    </h-row>
    <h-row>
      <h-col :span="8">
        <h-form-item label="Large">
          <h-input v-model="val1" size="large" :input-style = 'inputStyle'/>
        </h-form-item>
      </h-col>
      <h-col :span="8">
        <h-form-item label="Medium">
          <h-input v-model="val2" size="medium" :input-style = 'inputStyle'/>
        </h-form-item>
      </h-col>
      <h-col :span="8">
        <h-form-item label="Small">
          <h-input v-model="val3" size="small" :input-style = 'inputStyle'/>
        </h-form-item>
      </h-col>
    </h-row>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val1 = ref('');
    const val2 = ref('');
    const val3 = ref('');
    const inputStyle = ref('normal');
    return {
      val1,
      val2,
      val3,
      inputStyle,
    };
  },
});
<\/script>
`,
    path: "demos/components/Input/size.vue"
  }, null, _parent));
  _push(`<h2 id="图标和前后缀" tabindex="-1">图标和前后缀 <a class="header-anchor" href="#图标和前后缀" aria-label="Permalink to &quot;图标和前后缀&quot;">​</a></h2><p>通过<code>prefix-icon</code>和<code>suffix-icon</code>设置图标</p><p>通过<code>prefix</code>和<code>suffix</code> <code>slot</code>可以设置前缀和后缀内容，可用于设置带有action的icon</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<!--
 * @Date: 2022-01-07 16:11:17
 * @LastEditTime: 2022-01-12 14:00:06
 * @Description: file content
-->
<template>
  <h-row>
    <h-col :span="12">
      <h-input v-model="val1" suffix-icon="check" />
    </h-col>
    <h-col :span="12">
      <h-input v-model="val2">
        <template #prefix>¥</template>
        <template #suffix>RMB</template>
      </h-input>
    </h-col>
  </h-row>
  <h-row>
    <h-col>
      <h-input v-model="val3">
        <template #suffix>
          <h-tooltip placement="top" content="show location detail">
            <a-icon name="location" />
          </h-tooltip>
        </template>
      </h-input>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AIcon } from '@aurora/icon';

export default defineComponent({
  components: {
    AIcon,
  },
  setup() {
    const val1 = ref('');
    const val2 = ref('');
    const val3 = ref('');
    return {
      val1,
      val2,
      val3,
    };
  },
});
<\/script>
`,
    path: "demos/components/Input/icon.vue"
  }, null, _parent));
  _push(`<h2 id="组合式输入框" tabindex="-1">组合式输入框 <a class="header-anchor" href="#组合式输入框" aria-label="Permalink to &quot;组合式输入框&quot;">​</a></h2><p>通过<code>prepend</code>和<code>append</code> <code>slot</code>可以为输入框添加一个前置或后置元素<br><code>--n-input-bg--prepend-append: transparent</code> 为了解决图标和前后缀的背景色问题</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-input v-model="val1">
    <template #prepend>https://</template>
    <template #append>.com</template>
  </h-input>
  <br />
  <br />
  <h-input v-model="val2" style="--n-input-bg--prepend-append: transparent">
    <template #prepend>
      <h-select v-model="select1" placeholder="Please Select" size="medium" style="width: 200px">
        <h-option key="1" label="选项1" value="1"></h-option>
        <h-option key="2" label="选项2" value="2"></h-option>
      </h-select>
    </template>
  </h-input>
  <br />
  <br />
  <h-input v-model="val3" style="--n-input-bg--prepend-append: transparent">
    <template #append>
      <h-select v-model="select2" placeholder="Please Select" size="medium">
        <h-option key="1" label="选项1" value="1"></h-option>
      </h-select>
    </template>
  </h-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val1 = ref('');
    const val2 = ref('');
    const val3 = ref('');
    const select1 = ref();
    const select2 = ref();
    return {
      val1,
      val2,
      val3,
      select1,
      select2,
    };
  },
});
<\/script>
`,
    path: "demos/components/Input/mixed.vue"
  }, null, _parent));
  _push(`<h2 id="多行输入框" tabindex="-1">多行输入框 <a class="header-anchor" href="#多行输入框" aria-label="Permalink to &quot;多行输入框&quot;">​</a></h2><p>将<code>type</code>设置为<code>textarea</code>时，输入框将会变为多行输入框</p><p>通过<code>resize</code>可以设置多行输入框是否可拖拽</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="12">
      <h6>普通</h6>
      <h-input v-model="val1" type="textarea" :rows="3" resize="none" />
    </h-col>
    <h-col :span="12">
      <h6>可拖拽</h6>
      <h-input v-model="val2" type="textarea" :rows="3" />
    </h-col>
    <h-col :span="12">
      <h6>自适应高度</h6>
      <h-input v-model="val3" :auto-size="true" type="textarea" />
    </h-col>
    <h-col :span="12">
      <h6>最大最小高度</h6>
      <h-input v-model="val4" :auto-size="{ minRows: 4, maxRows: 8 }" type="textarea" />
    </h-col>
    <h-col :span="12">
      <h6>最小高度</h6>
      <h-input v-model="val7" :auto-size="{ minRows: 2,maxRows:null }" type="textarea" />
    </h-col>
    <h-col :span="12">
      <h6>最大高度</h6>
      <h-input v-model="val8" :auto-size="{ maxRows: 6 }" type="textarea" />
    </h-col>
    <h-col :span="12">
      <h6>input-style为noborder</h6>
      <h-input v-model="val5" resize="none" type="textarea" input-style="no-border" />
    </h-col>
    <h-col :span="12">
      <h6>input-style为emphasize</h6>
      <h-input v-model="val6" resize="none" type="textarea" input-style="emphasize" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const val1 = ref('');
const val2 = ref('');
const val3 = ref('');
const val4 = ref('');
const val5 = ref('');
const val6 = ref('');
const val7 = ref('');
const val8 = ref('');
<\/script>
<style scoped>
h6 {
  font-size: 14px;
}
</style>
`,
    path: "demos/components/Input/textarea.vue"
  }, null, _parent));
  _push(`<h2 id="字数限制" tabindex="-1">字数限制 <a class="header-anchor" href="#字数限制" aria-label="Permalink to &quot;字数限制&quot;">​</a></h2><p>通过<code>maxlength</code>和<code>showLimit</code>可显示输入框的字数限制</p><p>注意: 启用了 <code>enable-out-of-exceeded</code> 后，不会限制字数，所以表单验证需要结合 <code>n-form</code> 的 <code>max</code> 设置</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-switch v-model="disabled" label="禁用" status />
  <h-form :model="formModel" :rules="rules">
    <h-form-item label="Input" prop="val1">
      <h-input v-model="formModel.val1" :disabled="disabled" :maxlength="10" show-limit />
    </h-form-item>
    <h-form-item label="Input enable out of exceeded" prop="val2">
      <h-input
        v-model="formModel.val2"
        :disabled="disabled"
        :maxlength="10"
        show-limit
        enable-out-of-exceeded
      />
    </h-form-item>
    <h-form-item label="Textarea" prop="val3">
      <h-input
        v-model="formModel.val3"
        :disabled="disabled"
        type="textarea"
        :maxlength="100"
        :rows="3"
        show-limit
      />
    </h-form-item>
    <h-form-item label="Textarea enable out of exceeded" prop="val4">
      <h-input
        v-model="formModel.val4"
        :disabled="disabled"
        type="textarea"
        :maxlength="100"
        :rows="1"
        show-limit
        enable-out-of-exceeded
      />
    </h-form-item>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { HFormRule } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const disabled = ref(false);
    const formModel = ref({
      val1: '',
      val2: '',
      val3: '',
      val4: '',
    });

    const rules = ref<Record<string, HFormRule | HFormRule[]>>({
      val1: {
        max: 10,
        message: 'Please enter less than 10 characters',
      },
      val2: {
        max: 10,
        message: 'Please enter less than 10 characters',
      },
      val3: {
        max: 100,
        message: 'Please enter less than 100 characters',
      },
      val4: {
        max: 100,
        message: 'Please enter less than 100 characters',
      },
    });

    return {
      formModel,
      rules,
      disabled,
    };
  },
});
<\/script>
`,
    path: "demos/components/Input/limit.vue"
  }, null, _parent));
  _push(`<h2 id="搜索输入框" tabindex="-1">搜索输入框 <a class="header-anchor" href="#搜索输入框" aria-label="Permalink to &quot;搜索输入框&quot;">​</a></h2><p>搜索输入框，可对输入内容进行一键清空</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-input v-model="val" clearable placeholder="Please input search keywords" @keyup.enter="handleSearch">
    <template #prefix>
      <a-icon name="search" style="color: var(--h-text-disabled)" />
    </template>
  </h-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AIcon } from '@aurora/icon';
export default defineComponent({
  components: { AIcon },
  setup() {
    const handleSearch = e => {
      console.info('[handleSearch]', e.target.value);
    };
    const val = ref('');
    return {
      val,
      handleSearch,
    };
  },
});
<\/script>
`,
    path: "demos/components/Input/search.vue"
  }, null, _parent));
  _push(`<h2 id="input-events" tabindex="-1">Input Events <a class="header-anchor" href="#input-events" aria-label="Permalink to &quot;Input Events&quot;">​</a></h2><p>可对输入框绑定事件，具体事件见下方说明</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-input
    ref="input"
    v-model="val"
    clearable

    @input="handleInput"
    @change="handleChange"
    @clear="handleClear"
    @keyup.enter="handleKeyUpEnter"
  />
  <div>{{ hint }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val = ref('');
    const hint = ref('');
    const handleInput = (value: string) => {
      console.info('[handleInput]', value);
    };
    const handleChange = (value: string) => {
      console.info('[handleChange]', value);
    };
    const handleClear = () => {
      console.info('[handleClear]');
      hint.value = 'Cleared';
    };
    const handleKeyUpEnter = (event: Event) => {
      console.info('[pressEnter]', event);
      hint.value = 'Pressed Enter';
    };
    return {
      val,
      hint,
      handleInput,
      handleChange,
      handleClear,
      handleKeyUpEnter,
    };
  },
});
<\/script>
`,
    path: "demos/components/Input/event.vue"
  }, null, _parent));
  _push(`<h2>Input Api</h2><h3>Input Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>绑定值</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>类型，目前仅支持三种</td><td><code>&#39;text&#39; | &#39;textarea&#39; | &#39;password&#39;</code></td><td class="text-center">否</td><td>&#39;text&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placeholder</td><td>占位文本</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>是否可清空</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">readonly</td><td>是否只读，原生属性</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prefix-icon</td><td>前缀图标</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">suffix-icon</td><td>后缀图标</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-password</td><td>是否显示切换密码图标</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-limit</td><td>是否显示输入字数统计，需要与maxlength配合使用</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">maxlength</td><td>原生属性，最大输入长度</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">enable-out-of-exceeded</td><td>允许在设置了 <code>maxlength</code> 后仍超出输入范围<br>但此时会提示 <code>error</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">minlength</td><td>原生属性，最小输入长度</td><td><code>number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rows</td><td>type为textarea时的初始行数</td><td><code>number</code></td><td class="text-center">否</td><td>2</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">resize</td><td>是否可改变textarea大小</td><td><code>&#39;none&#39; | &#39;both&#39; | &#39;horizontal&#39; | &#39;vertical&#39; | &#39;block&#39; | &#39;inline&#39;</code></td><td class="text-center">否</td><td>&#39;vertical&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-style</td><td>inputStyle属性</td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;no-border&#39;</code></td><td class="text-center">否</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td>输入框状态</td><td><code>&#39;error&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-size</td><td>自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }</td><td><code>boolean | { minRows?: number; maxRows?: number }</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3>Input Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">鼠标点击时触发</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">input</td><td rowspan="2">在 Input 值改变时触发</td><td rowspan="2">( value: <code>string</code>, evt: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string</code></td><td>input值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>Event</code></td><td>输入事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">在 Input 失去焦点且值发生变化时触发</td><td rowspan="1">( value: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>string</code></td><td>input值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">在 Input 获得焦点时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>聚焦事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">在 Input 失去焦点时触发</td><td rowspan="1">( evt: <code>FocusEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>FocusEvent</code></td><td>失焦事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">在点击由 clearable 属性生成的清空按钮时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">keydown</td><td rowspan="1">键盘按键按下事件</td><td rowspan="1">( evt: <code>KeyboardEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>KeyboardEvent</code></td><td>键盘事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">keypress</td><td rowspan="1">键盘按键事件</td><td rowspan="1">( evt: <code>KeyboardEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>KeyboardEvent</code></td><td>键盘事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">keyup</td><td rowspan="1">键盘按键按下后抬起事件</td><td rowspan="1">( evt: <code>KeyboardEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>KeyboardEvent</code></td><td>键盘事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">compositionstart</td><td rowspan="1">组合输入事件开始时触发，如中文拼音</td><td rowspan="1">( evt: <code>CompositionEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>CompositionEvent</code></td><td>组合输入事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">compositionupdate</td><td rowspan="1">组合输入事件结束时触发，如中文拼音</td><td rowspan="1">( evt: <code>CompositionEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>CompositionEvent</code></td><td>组合输入事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">compositionend</td><td rowspan="1">组合输入事件变化时触发，如中文拼音</td><td rowspan="1">( evt: <code>CompositionEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>CompositionEvent</code></td><td>组合输入事件</td></tr></tbody></table><h3>Input Exposes</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">input</td><td rowspan="1">input HTMLInput<br>如果 <code>type=textarea</code>，则返回的是textarea HTMLElement</td><td rowspan="1"><code>HTMLInputElement</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">使 Input 失去焦点</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">使 Input 获取焦点</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">select</td><td rowspan="1">选中 Input 的内容</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Input.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Input = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Input as default
};
