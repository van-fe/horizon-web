import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/TimePicker.md","filePath":"zh/demos/components/TimePicker.md"}');
const _sfc_main = { name: "demos/components/TimePicker.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_code_block = resolveComponent("code-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>TimePicker</h1><p class="description">选择或输入时间的控件</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2><p>默认情况下，是 <strong>时+分</strong> 的选择器</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio value="small" />
        <h-radio value="medium" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="style">
      <h-radio-group v-model="inputStyle">
        <h-radio value="normal" />
        <h-radio value="no-border" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="disabled">
      <h-radio-group v-model="disabled">
        <h-radio :value="true">True</h-radio>
        <h-radio :value="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" :size="size" :input-style="inputStyle" :disabled="disabled" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TimePickerProps } from '@aurora/horizon-web';

const value = ref();
const size = ref<NonNullable<TimePickerProps['size']>>('medium');
const inputStyle = ref<TimePickerProps['inputStyle']>('normal');
const disabled = ref(false);
<\/script>
`,
    path: "demos/components/timepicker/basic.vue"
  }, null, _parent));
  _push(`<h2 id="范围选择" tabindex="-1">范围选择 <a class="header-anchor" href="#范围选择" aria-label="Permalink to &quot;范围选择&quot;">​</a></h2><p>设置 <code>is-range</code>，可以开启范围选择器</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" is-range />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
<\/script>
`,
    path: "demos/components/timepicker/is-range.vue"
  }, null, _parent));
  _push(`<h2 id="可清空" tabindex="-1">可清空 <a class="header-anchor" href="#可清空" aria-label="Permalink to &quot;可清空&quot;">​</a></h2><p>设置 <code>clearable</code>，默认开启，在有值时可以点击清空图标清空数据</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" clearable />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="value2" is-range clearable />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
<\/script>
`,
    path: "demos/components/timepicker/clearable.vue"
  }, null, _parent));
  _push(`<h2 id="单个触发器的范围选择" tabindex="-1">单个触发器的范围选择 <a class="header-anchor" href="#单个触发器的范围选择" aria-label="Permalink to &quot;单个触发器的范围选择&quot;">​</a></h2><p>当触发器父容器空间有限，可以设置 <code>single-trigger</code>，即可只渲染单个触发器</p><p>另外，在默认情况下，如果选择了开始或结束时间，则时间选择器中会自动将开始或结束时间之前或之后的时间禁用，如果需要解除联动，则设置 <code>is-link-panels = false</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" is-range single-trigger />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="value2" is-range single-trigger placeholder="Do Not Link Panels" :is-link-panels="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
<\/script>
`,
    path: "demos/components/timepicker/single-trigger.vue"
  }, null, _parent));
  _push(`<h2 id="简单使用" tabindex="-1">简单使用 <a class="header-anchor" href="#简单使用" aria-label="Permalink to &quot;简单使用&quot;">​</a></h2><p>设置 <code>type = &#39;time&#39;</code> 即可开启简单时间选择器</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" type="time" />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="rangeValue" type="time" is-range />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const rangeValue = ref();
<\/script>
`,
    path: "demos/components/timepicker/time.vue"
  }, null, _parent));
  _push(`<h2 id="设置秒" tabindex="-1">设置秒 <a class="header-anchor" href="#设置秒" aria-label="Permalink to &quot;设置秒&quot;">​</a></h2><p>设置 <code>type = &#39;seconds&#39;</code> 即可开启精确到秒的选择器</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" type="seconds" />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="rangeValue" type="seconds" is-range />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const rangeValue = ref();
<\/script>
`,
    path: "demos/components/timepicker/seconds.vue"
  }, null, _parent));
  _push(`<h2 id="确认方式" tabindex="-1">确认方式 <a class="header-anchor" href="#确认方式" aria-label="Permalink to &quot;确认方式&quot;">​</a></h2><p>默认情况下，用户在输入时间结束后，需要按下回车确认</p><p>也可以通过设置 <code>confirm-type=&quot;blur&quot;</code> 控制在失焦或按下回车时都确认</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker
        v-model="value"
        placeholder="Press Enter key to confirm"
        @update:modelValue="onUpdate"
        @change="onChange" />
    </h-col>
    <h-col :span="6">
      <h-time-picker
        v-model="value2"
        confirm-type="blur"
        placeholder="Input blur to confirm"
        @update:modelValue="onUpdate"
        @change="onChange" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();

function onUpdate(val: unknown) {
  console.info('update: ', val);
}

function onChange(val: unknown) {
  console.info('change: ', val);
}
<\/script>
`,
    path: "demos/components/timepicker/confirm-type.vue"
  }, null, _parent));
  _push(`<h2 id="设置禁选" tabindex="-1">设置禁选 <a class="header-anchor" href="#设置禁选" aria-label="Permalink to &quot;设置禁选&quot;">​</a></h2><p>可以通过传入 <code>disabled-time</code> 来控制时间是否不可被选择</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" :disabled-time="disabledTime" />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="value2" is-range :disabled-time="disabledTime" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { Dayjs } from 'dayjs';

const value = ref('08:50');
const value2 = ref();

function disabledTime(date: Dayjs) {
  return (
    date.isBefore(dayjs().set('hour', 9).set('minute', 30), 'minute') || date.isAfter(dayjs().set('hour', 18), 'hour')
  );
}
<\/script>
`,
    path: "demos/components/timepicker/disabled-time.vue"
  }, null, _parent));
  _push(`<h2 id="快捷选择此刻" tabindex="-1">快捷选择此刻 <a class="header-anchor" href="#快捷选择此刻" aria-label="Permalink to &quot;快捷选择此刻&quot;">​</a></h2><p>设置 <code>show-now</code>，即可在面板中显示【此刻】按钮</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" show-now />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="value2" is-range show-now />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
<\/script>
`,
    path: "demos/components/timepicker/show-now.vue"
  }, null, _parent));
  _push(`<h2 id="时间步长" tabindex="-1">时间步长 <a class="header-anchor" href="#时间步长" aria-label="Permalink to &quot;时间步长&quot;">​</a></h2><p>设置 <code>time-step</code> <code>hour-step</code> <code>minute-step</code> <code>second-step</code>，可以控制相应时间的步长</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row align="middle">
    <h-col :span="2">Time:</h-col>
    <h-col :span="6">
      <h-time-picker v-model="value" type="time" :time-step="60" />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="rangeValue" type="time" :time-step="60" is-range />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="2">Minute:</h-col>
    <h-col :span="6">
      <h-time-picker v-model="value2" type="minutes" :hour-step="3" :minute-step="5" />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="rangeValue2" type="minutes" :hour-step="3" :minute-step="5" is-range />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="2">Second:</h-col>
    <h-col :span="6">
      <h-time-picker v-model="value3" type="seconds" :hour-step="3" :minute-step="5" :second-step="10" />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="rangeValue3" type="seconds" :hour-step="3" :minute-step="5" :second-step="10" is-range />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const rangeValue = ref();
const value2 = ref();
const rangeValue2 = ref();
const value3 = ref();
const rangeValue3 = ref();
<\/script>
`,
    path: "demos/components/timepicker/step.vue"
  }, null, _parent));
  _push(`<h2 id="不可输入" tabindex="-1">不可输入 <a class="header-anchor" href="#不可输入" aria-label="Permalink to &quot;不可输入&quot;">​</a></h2><p>默认配置下，允许用户手动修改输入框中的数值来进行时间的切换。如果不希望用户手动输入，则可以配置 <code>inputable = false</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" :inputable="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
<\/script>
`,
    path: "demos/components/timepicker/inputable.vue"
  }, null, _parent));
  _push(`<h2 id="只读" tabindex="-1">只读 <a class="header-anchor" href="#只读" aria-label="Permalink to &quot;只读&quot;">​</a></h2><p>不允许修改已选值的情况下，可以设置 <code>readonly</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" readonly />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('20:30');
<\/script>
`,
    path: "demos/components/timepicker/readonly.vue"
  }, null, _parent));
  _push(`<h2 id="限定的开始和结束时间" tabindex="-1">限定的开始和结束时间 <a class="header-anchor" href="#限定的开始和结束时间" aria-label="Permalink to &quot;限定的开始和结束时间&quot;">​</a></h2><p>默认配置中，时间开始结束是 <code>[0 ~ 24)</code> (左开右闭区间)，如果需要扩增或缩减时间范围，需要设置 <code>start-at</code> 和 <code>end-at</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" start-at="08" end-at="21" placeholder="Please pick work time" />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="value2" start-at="00" end-at="30" placeholder="after the day" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
<\/script>
`,
    path: "demos/components/timepicker/start-end-range.vue"
  }, null, _parent));
  _push(`<h2 id="自定义文案" tabindex="-1">自定义文案 <a class="header-anchor" href="#自定义文案" aria-label="Permalink to &quot;自定义文案&quot;">​</a></h2><p>如果需要对每个日期格子自定义文案，可以设置 <code>format-cell-text</code> 和</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" start-at="8" end-at="32" :format-cell-text="formatCellText" :format-trigger-text="formatTriggerText" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { TimePickerProps } from '@aurora/horizon-web';

const value = ref();

const formatCellText: TimePickerProps['formatCellText'] = (unit, value) => {
  if (unit === 'hours') {
    if ((Number(value)) > 23) {
      return \`次日 \${(Number(value) - 24).toString().padStart(2, '0')}\`;
    }
  }

  return value;
};

const formatTriggerText: TimePickerProps['formatTriggerText'] = (day, text) => {
  if (day.diff(dayjs().startOf('day'), 'hours') > 23) {
    return \`次日 \${text}\`;
  } else return text;
};
<\/script>
`,
    path: "demos/components/timepicker/format-cell-text.vue"
  }, null, _parent));
  _push(`<h2 id="显示文字提示" tabindex="-1">显示文字提示 <a class="header-anchor" href="#显示文字提示" aria-label="Permalink to &quot;显示文字提示&quot;">​</a></h2><p>如果对时间格子在悬浮时需要显示提示文字，则传入 <code>show-time-tooltip</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" type="time" :show-time-tooltip="showTimeTooltip" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

const value = ref();

function showTimeTooltip(time: Dayjs) {
  if (time.hour() < 9 || time.hour() > 20) {
    return {
      show: false,
    };
  }

  return {
    show: true,
    content: 'Working hours',
  };
}
<\/script>
`,
    path: "demos/components/timepicker/show-time-tooltip.vue"
  }, null, _parent));
  _push(`<h2 id="清空后默认值" tabindex="-1">清空后默认值 <a class="header-anchor" href="#清空后默认值" aria-label="Permalink to &quot;清空后默认值&quot;">​</a></h2><p>可以配置 <code>:initial-value=&quot;null&quot;</code> 用于在清空后给 <code>model-value</code> 附默认值</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      {{ Object.prototype.toString.call(value) }}
      <h-time-picker v-model="value" :initial-value="null" @update:modelValue="onUpdate" @change="onChange" @pick="onPick" />
    </h-col>
    <h-col :span="6">
      {{ Object.prototype.toString.call(value2) }}
      <h-time-picker v-model="value2" :is-range="true" :initial-value="null" @update:modelValue="onUpdate" @change="onChange" @pick="onPick" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();

function onUpdate(val: unknown) {
  console.info('update: ', val);
}

function onChange(val: unknown) {
  console.info('change: ', val);
}

function onPick(val: unknown) {
  console.info('pick: ', val);
}
<\/script>
`,
    path: "demos/components/timepicker/initial-value.vue"
  }, null, _parent));
  _push(`<h2 id="类型定义" tabindex="-1">类型定义 <a class="header-anchor" href="#类型定义" aria-label="Permalink to &quot;类型定义&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_code_block, { src: "../../../../horizon-web/src/components/TimePicker/src/utils/types.ts" }, null, _parent));
  _push(`<h2 id="timepicker-api" class="no-underline h2"><a href="#timepicker-api" class="!no-underline">TimePicker Api</a></h2><h3 id="timepicker-props" class="no-underline h3"><a href="#timepicker-props" class="!no-underline">TimePicker Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>双向绑定值</td><td><code>ConfigType | [ConfigType, ConfigType]</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>面板类型<br><code>time</code>：只显示到 时<br><code>minutes</code>：只显示到 分<br><code>seconds</code>：只显示到 秒</td><td><code>&#39;time&#39; | &#39;minutes&#39; | &#39;seconds&#39;</code></td><td class="text-center">否</td><td>&#39;minutes&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>是否可清空输入框</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>触发方式</td><td><code>&#39;click&#39; | &#39;hover&#39; | &#39;never&#39;</code></td><td class="text-center">否</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>面板弹出位置</td><td><code>| &#39;auto&#39;<br>      | &#39;auto-start&#39;<br>      | &#39;auto-end&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;<br>      | &#39;left&#39;</code></td><td class="text-center">否</td><td>&#39;bottom-start&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>是否发送到 <code>body</code> 节点</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-style</td><td>输入样式</td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;no-border&#39;</code></td><td class="text-center">否</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placeholder</td><td>非范围选择占位内容，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">start-placeholder</td><td>时间范围开始占位内容，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">end-placeholder</td><td>时间范围结束占位内容，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-text</td><td>空状态文字，默认使用国际化配置</td><td><code>string | VNode</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">destroy-on-hide</td><td>在隐藏后是否销毁面板</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popover-options</td><td>给 <code>popover</code> 的额外参数</td><td><code>Partial&lt;PopoverProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-input-width</td><td>下拉框宽度是否与输入框相同</td><td><code>boolean | &#39;fit-content&#39;</code></td><td class="text-center">否</td><td>&#39;fit-content&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-show-delay</td><td>鼠标悬浮后多久显示 popper<br>仅在 trigger = hover 时有效</td><td><code>number</code></td><td class="text-center">否</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-hide-delay</td><td>鼠标移出后后多久隐藏 popper<br>仅在 trigger = hover 时有效</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputable</td><td>输入框是否允许输入</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-type</td><td>确认输入的方式，默认按回车确认输入值<br>如果传入 <code>&#39;blur&#39;</code>，会在失焦或按下回车时确认输入值</td><td><code>&#39;enter&#39; | &#39;blur&#39;</code></td><td class="text-center">否</td><td>&#39;enter&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">readonly</td><td>是否只读</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-list-max-height</td><td>选项列表最大高度</td><td><code>string | number</code></td><td class="text-center">否</td><td>296</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-show-after</td><td>所有有 <code>tooltip</code> 的地方，在悬浮后延迟多少毫秒显示 <code>tooltip</code></td><td><code>number</code></td><td class="text-center">否</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-hide-after</td><td>所有有 <code>tooltip</code> 的地方，在显示后延迟多少毫秒移除 <code>tooltip</code></td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-range</td><td>是否为时间范围选择</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">single-trigger</td><td>在时间范围选择时，是否只渲染一个触发器</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">range-separator</td><td>时间范围选择起止隔符</td><td><code>string | Component | VNode</code></td><td class="text-center">否</td><td>IconSwapRight</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">range-panel-separator</td><td>时间范围选择面板起止隔符</td><td><code>string | Component | VNode</code></td><td class="text-center">否</td><td>IconSwapRight</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">time-step</td><td>时间步长，单位为分钟，在 <code>type = &#39;time&#39;</code> 时有效</td><td><code>number</code></td><td class="text-center">否</td><td>30</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hour-step</td><td>小时步长，在 <code>type = &#39;minutes&#39; or &#39;seconds&#39;</code> 时有效</td><td><code>number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">minute-step</td><td>分钟步长，在 <code>type = &#39;minutes&#39; or &#39;seconds&#39;</code> 时有效</td><td><code>number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">second-step</td><td>秒步长，在 <code>type = &#39;seconds&#39;</code> 时有效</td><td><code>number</code></td><td class="text-center">否</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">start-at</td><td>开始时间</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;00:00:00&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">end-at</td><td>结束时间</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;23:59:59&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled-time</td><td>设置禁选时间<br>详见类型定义</td><td><code>HTimePickerDisabledTimeMethodType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-style</td><td>弹出层样式</td><td><code>CSSProperties</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-class</td><td>弹出层类名</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format</td><td>输入框显示值的格式，默认根据 <code>type</code> 自动设置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value-format</td><td>绑定值的格式，不指定则使用 <code>Dayjs</code> 对象</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-time-tooltip</td><td>时间单元格是否展示tooltip，参数为当前时间 <code>Dayjs</code> 对象，返回对象：show是否展示，content展示内容</td><td><code>HTimePickerShowTimeTooltipType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prefix-icon</td><td>前缀图标<br>在 <code>input-style = &#39;normal&#39; or &#39;emphasize&#39;</code> 时，默认 <code>IconTime</code><br>在 <code>input-style = &#39;no-border</code> 时，默认 <code>false</code></td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">suffix-icon</td><td>后缀图标</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear-icon</td><td>清空图标</td><td><code>iconPropType</code></td><td class="text-center">否</td><td>IconClose</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fallback-placements</td><td>当显示位置的空间不够时 设置时间面板的默认显示位置顺序</td><td><code>PopoverProps[&#39;fallbackPlacements&#39;]</code></td><td class="text-center">否</td><td>[<br>      &#39;top-start&#39;,<br>      &#39;bottom-end&#39;,<br>      &#39;top-end&#39;,<br>      &#39;right-start&#39;,<br>      &#39;left-start&#39;,<br>      &#39;right-end&#39;,<br>      &#39;left-end&#39;,<br>      &#39;auto-start&#39;,<br>      &#39;auto-end&#39;,<br>    ]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prevent-overflow</td><td>是否阻止 <code>popper</code> 超出边界</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format-cell-text</td><td>自定义单元格文案</td><td><code>(type: &#39;hours&#39; | &#39;minutes&#39; | &#39;seconds&#39; | &#39;time&#39;, value: string) =&gt; string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format-trigger-text</td><td>自定义触发器文案</td><td><code>(value: Dayjs, text: string) =&gt; string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">need-confirm</td><td>是否需要确认</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-button-text</td><td>确认按钮文本，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-cancel-button</td><td>展示取消按钮</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-button-text</td><td>取消按钮文本，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-button-props</td><td>确认按钮的属性设置</td><td><code>Partial&lt;ButtonProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-button-props</td><td>取消按钮的属性设置</td><td><code>Partial&lt;ButtonProps&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-status</td><td>输入框状态</td><td><code>&#39;error&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-link-panels</td><td>时间范围时，前后时间是否联动，即前时间小于后时间，大于后时间的时间不可选</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-now</td><td>在面板底部显示【此刻】</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">width</td><td>时间框宽度</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-width</td><td>时间选择框宽度尺寸</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-min-width</td><td>弹窗最小宽度</td><td><code>string | number</code></td><td class="text-center">否</td><td>273</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-max-width</td><td>弹窗最大宽度</td><td><code>string | number</code></td><td class="text-center">否</td><td>360</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">picker-min-width</td><td>输入框最小宽度<br>普通选择: 160<br>范围选择: 180</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">picker-max-width</td><td>输入框最大宽度</td><td><code>string | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-to-display-value</td><td>是否在悬浮时显示时间</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">initial-value</td><td>默认值<br>可以在清空时，指定为 null<br>默认为 undefined</td><td><code>null</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-popover-content-only</td><td>是否仅展示弹窗内容</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3 id="timepicker-emits" class="no-underline h3"><a href="#timepicker-emits" class="!no-underline">TimePicker Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">当 <code>model-value</code> 变化时触发</td><td rowspan="1">( val: <code>SingleOrArrayPickerDataType&lt;Dayjs | string | undefined | null&gt;</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">val</td><td><code>SingleOrArrayPickerDataType&lt;Dayjs | string | undefined | null&gt;</code></td><td>变化的 <code>model-value</code> 值</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">pick</td><td rowspan="2">当用户选择时间时触发</td><td rowspan="2">( val: <code>Dayjs</code>, type: <code>&#39;time&#39; | &#39;hour&#39; | &#39;minute&#39; | &#39;second&#39;</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">val</td><td><code>Dayjs</code></td><td>选择的日期</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;time&#39; | &#39;hour&#39; | &#39;minute&#39; | &#39;second&#39;</code></td><td>当前选择器类型</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">input</td><td rowspan="2">输入时触发</td><td rowspan="2">( val: <code>string</code>, evt: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">val</td><td><code>string</code></td><td>输入的文字</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>Event</code></td><td>输入事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">聚焦时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">清空时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm</td><td rowspan="1">点击确定时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel</td><td rowspan="1">点击取消时触发</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-visible-change</td><td rowspan="1">下拉面板显隐通知</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>是否显示</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击时触发</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>点击事件</td></tr></tbody></table><h3 id="timepicker-exposes" class="no-underline h3"><a href="#timepicker-exposes" class="!no-underline">TimePicker Exposes</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clickTimeCell</td><td rowspan="3"></td><td rowspan="3">( value: <code>Dayjs</code>, triggerType: <code>&#39;click&#39; | &#39;input&#39; | &#39;confirmable-input&#39;</code>, type: <code>&#39;start&#39; | &#39;end&#39;</code> ) =&gt; <code>boolean</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>Dayjs</code></td><td>时间</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">triggerType</td><td><code>&#39;click&#39; | &#39;input&#39; | &#39;confirmable-input&#39;</code></td><td>触发方式</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;start&#39; | &#39;end&#39;</code></td><td>设置的面板类型</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">changePanelVisible</td><td rowspan="1">更改面板隐藏</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirmHandle</td><td rowspan="1">确认方法</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelHandle</td><td rowspan="1">取消方法</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearHandle</td><td rowspan="1">清除方法</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">聚焦方法</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">失焦方法</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">清除方法</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/TimePicker.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TimePicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  TimePicker as default
};
