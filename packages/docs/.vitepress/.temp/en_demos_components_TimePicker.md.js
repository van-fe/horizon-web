import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/TimePicker.md","filePath":"en/demos/components/TimePicker.md"}');
const _sfc_main = { name: "en/demos/components/TimePicker.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>TimePicker</h1><p class="description">Basic time selection control, you can configure the input box style by setting the <code>inputStyle</code> attribute.</p><h2 id="input-box-style" tabindex="-1">Input Box Style <a class="header-anchor" href="#input-box-style" aria-label="Permalink to &quot;Input Box Style&quot;">​</a></h2><p>Basic time selection control, you can configure the input box style by setting the <code>inputStyle</code> attribute.</p>`);
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
    path: "demos/components/TimePicker/basic.vue"
  }, null, _parent));
  _push(`<h2 id="single-column-double-column-and-triple-column-modes" tabindex="-1">Single Column, Double Column and Triple Column Modes <a class="header-anchor" href="#single-column-double-column-and-triple-column-modes" aria-label="Permalink to &quot;Single Column, Double Column and Triple Column Modes&quot;">​</a></h2><p>You can set the time selection mode by setting the <code>type</code> attribute, for example: <code>time</code>, <code>minutes</code> and <code>seconds</code> set single column, double column and triple column modes respectively.</p>`);
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
    path: "demos/components/TimePicker/time.vue"
  }, null, _parent));
  _push(`<h2 id="time-range" tabindex="-1">Time Range <a class="header-anchor" href="#time-range" aria-label="Permalink to &quot;Time Range&quot;">​</a></h2><p>Set time range selection by setting the <code>is-range</code> attribute.</p>`);
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
    path: "demos/components/TimePicker/is-range.vue"
  }, null, _parent));
  _push(`<h2 id="time-disabled-selection" tabindex="-1">Time Disabled Selection <a class="header-anchor" href="#time-disabled-selection" aria-label="Permalink to &quot;Time Disabled Selection&quot;">​</a></h2><p>Set the disabled selection of the time control by setting the <code>disabledTime</code> attribute.</p>`);
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
    path: "demos/components/TimePicker/disabled-time.vue"
  }, null, _parent));
  _push(`<h2 id="custom-time-interval" tabindex="-1">Custom Time Interval <a class="header-anchor" href="#custom-time-interval" aria-label="Permalink to &quot;Custom Time Interval&quot;">​</a></h2><p>The <code>pickerOptions</code> attribute can custom set the start, end and interval of the time control. Note: Custom time cells do not support repetition.</p>`);
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
    path: "demos/components/TimePicker/step.vue"
  }, null, _parent));
  _push(`<h2 id="custom-prefix-and-suffix-content" tabindex="-1">Custom Prefix and Suffix Content <a class="header-anchor" href="#custom-prefix-and-suffix-content" aria-label="Permalink to &quot;Custom Prefix and Suffix Content&quot;">​</a></h2><p>You can set the icons of the input box through <code>prefixIcon</code> and <code>suffixIcon</code>, and you can also set prefix and suffix content through slots <code>prefix</code> and <code>suffix</code>.</p>`);
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
    path: "demos/components/TimePicker/basic.vue"
  }, null, _parent));
  _push(`<h2 id="bottom-extension-area" tabindex="-1">Bottom Extension Area <a class="header-anchor" href="#bottom-extension-area" aria-label="Permalink to &quot;Bottom Extension Area&quot;">​</a></h2><p>The component provides 2 functional buttons by default: cancel and confirm. You can customize the number and functions of buttons through the <code>footer</code> slot.</p>`);
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
    path: "demos/components/TimePicker/confirm-type.vue"
  }, null, _parent));
  _push(`<h2 id="custom-time-element-text" tabindex="-1">Custom Time Element Text <a class="header-anchor" href="#custom-time-element-text" aria-label="Permalink to &quot;Custom Time Element Text&quot;">​</a></h2><p>Customize the text displayed in the trigger through the <code>formatTriggerText</code> attribute, and customize the text of each time element through the <code>formatCellText</code> attribute.</p>`);
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
    path: "demos/components/TimePicker/format-cell-text.vue"
  }, null, _parent));
  _push(`<h2 id="insufficient-space" tabindex="-1">Insufficient Space <a class="header-anchor" href="#insufficient-space" aria-label="Permalink to &quot;Insufficient Space&quot;">​</a></h2><p>When the space at the display position is insufficient, when all directions cannot be satisfied, you can prevent the popover from being cut off through <code>preventOverflow</code></p><p>You can adjust the flip position by setting fallbackPlacements. For example, if the top and bottom positions are not enough to display and you want to display on the left, you can set fallbackPlacements to [&#39;top&#39;, &#39;bottom&#39;, &#39;left&#39;]</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" :show-popover-content-only="true" />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="value2" is-range :show-popover-content-only="true" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
<\/script>
`,
    path: "demos/components/TimePicker/show-popover-content-only.vue"
  }, null, _parent));
  _push(`<h2 id="timepicker-api" class="no-underline h2"><a href="#timepicker-api" class="!no-underline">TimePicker Api</a></h2><h3 id="timepicker-props" class="no-underline h3"><a href="#timepicker-props" class="!no-underline">TimePicker Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>Configuration for model value.</td><td><code>ConfigType | [ConfigType, ConfigType]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>Configuration for type.</td><td><code>&#39;time&#39; | &#39;minutes&#39; | &#39;seconds&#39;</code></td><td class="text-center">No</td><td>&#39;minutes&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>Configuration for clearable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>Configuration for trigger.</td><td><code>&#39;click&#39; | &#39;hover&#39; | &#39;never&#39;</code></td><td class="text-center">No</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>Configuration for placement.</td><td><code>| &#39;auto&#39;<br>      | &#39;auto-start&#39;<br>      | &#39;auto-end&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;<br>      | &#39;left&#39;</code></td><td class="text-center">No</td><td>&#39;bottom-start&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>Configuration for to body.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-style</td><td>Configuration for input style.</td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;no-border&#39;</code></td><td class="text-center">No</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placeholder</td><td>Configuration for placeholder.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">start-placeholder</td><td>Configuration for start placeholder.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">end-placeholder</td><td>Configuration for end placeholder.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">empty-text</td><td>Configuration for empty text.</td><td><code>string | VNode</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">destroy-on-hide</td><td>Configuration for destroy on hide.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popover-options</td><td>Configuration for popover options.</td><td><code>Partial&lt;PopoverProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-input-width</td><td>Configuration for fit input width.</td><td><code>boolean | &#39;fit-content&#39;</code></td><td class="text-center">No</td><td>&#39;fit-content&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-show-delay</td><td>Configuration for hover show delay.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-hide-delay</td><td>Configuration for hover hide delay.</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputable</td><td>Configuration for inputable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-type</td><td>Configuration for confirm type.</td><td><code>&#39;enter&#39; | &#39;blur&#39;</code></td><td class="text-center">No</td><td>&#39;enter&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">readonly</td><td>Configuration for readonly.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-list-max-height</td><td>Configuration for option list max height.</td><td><code>string | number</code></td><td class="text-center">No</td><td>296</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-show-after</td><td>Configuration for tooltip show after.</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-hide-after</td><td>Configuration for tooltip hide after.</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-range</td><td>Configuration for is range.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">single-trigger</td><td>Configuration for single trigger.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">range-separator</td><td>Configuration for range separator.</td><td><code>string | Component | VNode</code></td><td class="text-center">No</td><td>IconSwapRight</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">range-panel-separator</td><td>Configuration for range panel separator.</td><td><code>string | Component | VNode</code></td><td class="text-center">No</td><td>IconSwapRight</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">time-step</td><td>Configuration for time step.</td><td><code>number</code></td><td class="text-center">No</td><td>30</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hour-step</td><td>Configuration for hour step.</td><td><code>number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">minute-step</td><td>Configuration for minute step.</td><td><code>number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">second-step</td><td>Configuration for second step.</td><td><code>number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">start-at</td><td>Configuration for start at.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;00:00:00&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">end-at</td><td>Configuration for end at.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;23:59:59&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled-time</td><td>Configuration for disabled time.</td><td><code>HTimePickerDisabledTimeMethodType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-style</td><td>Configuration for panel style.</td><td><code>CSSProperties</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-class</td><td>Configuration for panel class.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format</td><td>Configuration for format.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value-format</td><td>Configuration for value format.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-time-tooltip</td><td>Configuration for show time tooltip.</td><td><code>HTimePickerShowTimeTooltipType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prefix-icon</td><td>Configuration for prefix icon.</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">suffix-icon</td><td>Configuration for suffix icon.</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear-icon</td><td>Configuration for clear icon.</td><td><code>iconPropType</code></td><td class="text-center">No</td><td>IconClose</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fallback-placements</td><td>Configuration for fallback placements.</td><td><code>PopoverProps[&#39;fallbackPlacements&#39;]</code></td><td class="text-center">No</td><td>[<br>      &#39;top-start&#39;,<br>      &#39;bottom-end&#39;,<br>      &#39;top-end&#39;,<br>      &#39;right-start&#39;,<br>      &#39;left-start&#39;,<br>      &#39;right-end&#39;,<br>      &#39;left-end&#39;,<br>      &#39;auto-start&#39;,<br>      &#39;auto-end&#39;,<br>    ]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prevent-overflow</td><td>Configuration for prevent overflow.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format-cell-text</td><td>Configuration for format cell text.</td><td><code>(type: &#39;hours&#39; | &#39;minutes&#39; | &#39;seconds&#39; | &#39;time&#39;, value: string) =&gt; string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format-trigger-text</td><td>Configuration for format trigger text.</td><td><code>(value: Dayjs, text: string) =&gt; string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">need-confirm</td><td>Configuration for need confirm.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-button-text</td><td>Configuration for confirm button text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-cancel-button</td><td>Configuration for show cancel button.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-button-text</td><td>Configuration for cancel button text.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-button-props</td><td>Configuration for confirm button props.</td><td><code>Partial&lt;ButtonProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-button-props</td><td>Configuration for cancel button props.</td><td><code>Partial&lt;ButtonProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-status</td><td>Configuration for input status.</td><td><code>&#39;error&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-link-panels</td><td>Configuration for is link panels.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-now</td><td>Configuration for show now.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">width</td><td>Configuration for width.</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-width</td><td>Configuration for panel width.</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-min-width</td><td>Configuration for panel min width.</td><td><code>string | number</code></td><td class="text-center">No</td><td>273</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-max-width</td><td>Configuration for panel max width.</td><td><code>string | number</code></td><td class="text-center">No</td><td>360</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">picker-min-width</td><td>Configuration for picker min width.</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">picker-max-width</td><td>Configuration for picker max width.</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-to-display-value</td><td>Configuration for hover to display value.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">initial-value</td><td>Configuration for initial value.</td><td><code>null</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-popover-content-only</td><td>Configuration for show popover content only.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="timepicker-emits" class="no-underline h3"><a href="#timepicker-emits" class="!no-underline">TimePicker Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">Emitted when change changes.</td><td rowspan="1">( val: <code>SingleOrArrayPickerDataType&lt;Dayjs | string | undefined | null&gt;</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">val</td><td><code>SingleOrArrayPickerDataType&lt;Dayjs | string | undefined | null&gt;</code></td><td>The val value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">pick</td><td rowspan="2">Emitted when pick changes.</td><td rowspan="2">( val: <code>Dayjs</code>, type: <code>&#39;time&#39; | &#39;hour&#39; | &#39;minute&#39; | &#39;second&#39;</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">val</td><td><code>Dayjs</code></td><td>The val value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;time&#39; | &#39;hour&#39; | &#39;minute&#39; | &#39;second&#39;</code></td><td>The type value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">input</td><td rowspan="2">Emitted when input changes.</td><td rowspan="2">( val: <code>string</code>, evt: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">val</td><td><code>string</code></td><td>The val value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>Event</code></td><td>The evt value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">Emitted when focus changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">Emitted when blur changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">Emitted when clear changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm</td><td rowspan="1">Emitted when confirm changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel</td><td rowspan="1">Emitted when cancel changes.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-visible-change</td><td rowspan="1">Emitted when dropdown visible change changes.</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>The visible value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">Emitted when click changes.</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>The evt value.</td></tr></tbody></table><h3 id="timepicker-exposes" class="no-underline h3"><a href="#timepicker-exposes" class="!no-underline">TimePicker Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clickTimeCell</td><td rowspan="3">Controls click time cell.</td><td rowspan="3">( value: <code>Dayjs</code>, triggerType: <code>&#39;click&#39; | &#39;input&#39; | &#39;confirmable-input&#39;</code>, type: <code>&#39;start&#39; | &#39;end&#39;</code> ) =&gt; <code>boolean</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>Dayjs</code></td><td>The value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">triggerType</td><td><code>&#39;click&#39; | &#39;input&#39; | &#39;confirmable-input&#39;</code></td><td>The trigger type value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;start&#39; | &#39;end&#39;</code></td><td>The type value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">changePanelVisible</td><td rowspan="1">Controls change panel visible.</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirmHandle</td><td rowspan="1">Controls confirm handle.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelHandle</td><td rowspan="1">Controls cancel handle.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearHandle</td><td rowspan="1">Controls clear handle.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">Controls focus.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">Controls blur.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">Controls clear.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/TimePicker.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TimePicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  TimePicker as default
};
