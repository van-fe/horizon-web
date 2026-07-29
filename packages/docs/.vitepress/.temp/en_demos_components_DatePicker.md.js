import { resolveComponent, withCtx, createTextVNode, createVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/DatePicker.md","filePath":"en/demos/components/DatePicker.md"}');
const _sfc_main = { name: "en/demos/components/DatePicker.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_h_alert = resolveComponent("h-alert");
  const _component_code_block = resolveComponent("code-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>DatePicker</h1><p class="description">The DatePicker provides date selection by default.</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>The DatePicker provides date selection by default.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio value="small" />
        <h-radio value="medium" />
        <h-radio value="large" />
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
    <h-col :span="24">
      <h-date-picker
        v-model="value"
        type="date"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        @update:modelValue="onUpdate"
        @change="onChange"
        @pick="onPick"
      />
    </h-col>
    <h-col :span="24">
      <h-date-picker
        v-model="value2"
        type="date-range"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        @update:modelValue="onUpdate"
        @change="onChange"
        @pick="onPick"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DatePickerProps } from '@aurora/horizon-web';

const value = ref();
const value2 = ref('');
const size = ref<NonNullable<DatePickerProps['size']>>('medium');
const inputStyle = ref<DatePickerProps['inputStyle']>('normal');
const disabled = ref(false);

function onUpdate(val: unknown) {
  console.info('update: ', val);
}

function onChange(val: unknown) {
  console.info('change: ', val);
}

function onPick(val: unknown) {
  console.info('pick: ', val);
}

onMounted(() => {
  setTimeout(() => {
    value.value = new Date();
  }, 1000);
});
<\/script>
`,
    path: "demos/components/DatePicker/basic.vue"
  }, null, _parent));
  _push(`<h2 id="confirmation-mode" tabindex="-1">Confirmation Mode <a class="header-anchor" href="#confirmation-mode" aria-label="Permalink to &quot;Confirmation Mode&quot;">​</a></h2><p>By default, users press Enter to confirm the value after entering a date. Set <code>confirm-type=&quot;blur&quot;</code> to confirm when the input loses focus or when Enter is pressed.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker
        v-model="value"
        type="date"
        placeholder="Press Enter key to confirm"
        @update:modelValue="onUpdate"
        @change="onChange" />
    </h-col>
    <h-col :span="6">
      <h-date-picker
        v-model="value2"
        type="date"
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
    path: "demos/components/DatePicker/confirm-type.vue"
  }, null, _parent));
  _push(`<h2 id="clearable" tabindex="-1">Clearable <a class="header-anchor" href="#clearable" aria-label="Permalink to &quot;Clearable&quot;">​</a></h2><p>Set <code>clearable</code> (enabled by default) to allow users to clear the value with the clear icon.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" clearable />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="dateRange" clearable />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
<\/script>
`,
    path: "demos/components/DatePicker/clearable.vue"
  }, null, _parent));
  _push(`<h2 id="single-trigger-and-panel-for-range-selection" tabindex="-1">Single Trigger and Panel for Range Selection <a class="header-anchor" href="#single-trigger-and-panel-for-range-selection" aria-label="Permalink to &quot;Single Trigger and Panel for Range Selection&quot;">​</a></h2><p>Use <code>single-trigger</code> when the trigger container has limited space. Set <code>is-link-panels=&quot;false&quot;</code> to stop the year and month panels from being linked. On small screens, set <code>single-panel</code> to render one panel (<code>year-range</code>, <code>month-range</code>, and <code>date-range</code> only).</p>`);
  _push(ssrRenderComponent(_component_h_alert, {
    type: "info",
    style: { "margin": "20px 0" },
    closable: false,
    "show-icon": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`With a single trigger, the separator must be <code${_scopeId}>-</code>.`);
      } else {
        return [
          createTextVNode("With a single trigger, the separator must be "),
          createVNode("code", null, "-"),
          createTextVNode(".")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="datetimeRange" single-trigger />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="dateRange" single-trigger placeholder="Do Not Link Panels" :is-link-panels="false" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value3" type="dateRange" single-trigger single-panel placeholder="Single Panel" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { Dayjs } from 'dayjs';

const value = ref();
const value2 = ref<[Dayjs, Dayjs]>([dayjs().subtract(1, 'month'), dayjs().add(4, 'month')]);
const value3 = ref();
<\/script>
`,
    path: "demos/components/DatePicker/single-trigger.vue"
  }, null, _parent));
  _push(`<h2 id="date-display" tabindex="-1">Date Display <a class="header-anchor" href="#date-display" aria-label="Permalink to &quot;Date Display&quot;">​</a></h2><p>Only dates in the current month are shown by default. Set <code>show-before-after-date=&quot;true&quot;</code> to show adjacent dates, or <code>fixed-six-rows=&quot;true&quot;</code> to always display six calendar rows.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="date" placeholder="default" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="date" :show-before-after-date="true" placeholder="show before after date" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value3" type="date" :show-before-after-date="true" :fixed-six-rows="true" placeholder="fixed six rows" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
const value3 = ref();
<\/script>
`,
    path: "demos/components/DatePicker/date-display.vue"
  }, null, _parent));
  _push(`<h2 id="year-and-month-pickers" tabindex="-1">Year and Month Pickers <a class="header-anchor" href="#year-and-month-pickers" aria-label="Permalink to &quot;Year and Month Pickers&quot;">​</a></h2><p>Set <code>type</code> to <code>year</code>, <code>year-range</code>, <code>month</code>, or <code>month-range</code> to enable the corresponding picker.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row align="middle">
    <h-col :span="4">
      Year:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value1" type="year" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue1" type="year-range" />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      Month:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="month" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue2" type="month-range" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const rangeValue1 = ref();
const value2 = ref();
const rangeValue2 = ref();
<\/script>
`,
    path: "demos/components/DatePicker/year-month.vue"
  }, null, _parent));
  _push(`<h2 id="week-picker" tabindex="-1">Week Picker <a class="header-anchor" href="#week-picker" aria-label="Permalink to &quot;Week Picker&quot;">​</a></h2><p>The week picker always displays dates from the months before and after the current month. Dayjs does not parse formatted week input, so manually changing a week string has no effect.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="week" format="[week] ww" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(new Date);
<\/script>
`,
    path: "demos/components/DatePicker/week.vue"
  }, null, _parent));
  _push(`<h2 id="first-day-of-the-week" tabindex="-1">First Day of the Week <a class="header-anchor" href="#first-day-of-the-week" aria-label="Permalink to &quot;First Day of the Week&quot;">​</a></h2><p>The week starts on Sunday by default. Set <code>first-day-of-week</code> to a value from <code>0</code> (Sunday) to <code>6</code> (Saturday) to choose another first day. Changing this setting also changes the value of the week picker.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-form-item label="first day of week">
      <h-input-number v-model="firstDayOfWeek" :min="0" :max="6" style="width: 200px" />
    </h-form-item>
    <h-form-item label="show before and after date">
      <h-switch v-model="showBeforeAfterDate" status />
    </h-form-item>
    <h-form-item label="fixed six rows">
      <h-switch v-model="fixedSixRows" status />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="date" :first-day-of-week="firstDayOfWeek" :show-before-after-date="showBeforeAfterDate" :fixed-six-rows="fixedSixRows" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="values" type="date-range" :first-day-of-week="firstDayOfWeek" :show-before-after-date="showBeforeAfterDate" :fixed-six-rows="fixedSixRows" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="week" placeholder="week picker" format="[Week:] wo" :first-day-of-week="firstDayOfWeek" :show-before-after-date="showBeforeAfterDate" :fixed-six-rows="fixedSixRows" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DatePickerProps } from '@aurora/horizon-web';

const value = ref();
const values = ref();
const value2 = ref();
const firstDayOfWeek = ref<DatePickerProps['firstDayOfWeek']>(0);
const showBeforeAfterDate = ref(true);
const fixedSixRows = ref(false);
<\/script>
`,
    path: "demos/components/DatePicker/first-day-of-week.vue"
  }, null, _parent));
  _push(`<h2 id="disable-year-switching" tabindex="-1">Disable Year Switching <a class="header-anchor" href="#disable-year-switching" aria-label="Permalink to &quot;Disable Year Switching&quot;">​</a></h2><p>Set <code>show-year-button=&quot;false&quot;</code> to prevent users from switching years in the date picker.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="date" :show-year-button="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
<\/script>
`,
    path: "demos/components/DatePicker/show-year-button.vue"
  }, null, _parent));
  _push(`<h2 id="shortcuts" tabindex="-1">Shortcuts <a class="header-anchor" href="#shortcuts" aria-label="Permalink to &quot;Shortcuts&quot;">​</a></h2><p>Configure <code>shortcuts</code> to provide quick date selections.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="date" :shortcuts="shortcuts" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="dateRange" :shortcuts="shortcutRange" need-confirm />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { HDatePickerShortcutsType } from '@aurora/horizon-web';

const value = ref();
const value2 = ref();

const shortcuts = ref<HDatePickerShortcutsType[]>([
  {
    label: 'Last 7 days',
    value: dayjs().subtract(7, 'day'),
  }, {
    label: 'Yesterday',
    value: dayjs().subtract(1, 'day'),
  }, {
    label: 'Today',
    value: dayjs(),
  }, {
    label: 'Tomorrow',
    value: dayjs().add(1, 'day'),
  },
]);

const shortcutRange = ref<HDatePickerShortcutsType[]>([
  {
    label: 'Last Year',
    value: [dayjs().subtract(1, 'year'), dayjs()],
  }, {
    label: 'Last Month',
    value: [dayjs().subtract(1, 'month'), dayjs()],
  }, {
    label: 'Last Week',
    value: [dayjs().subtract(1, 'week'), dayjs()],
  }, {
    label: 'Next Week',
    value: [dayjs(), dayjs().add(1, 'week')],
  },
]);
<\/script>
`,
    path: "demos/components/DatePicker/shortcuts.vue"
  }, null, _parent));
  _push(`<h2 id="date-and-time-picker" tabindex="-1">Date and Time Picker <a class="header-anchor" href="#date-and-time-picker" aria-label="Permalink to &quot;Date and Time Picker&quot;">​</a></h2><p>Set <code>type</code> to <code>datetime</code> or <code>datetime-range</code> to enable date and time selection. Minute and second precision is available through <code>date-minutes</code>, <code>date-minutes-range</code>, <code>date-seconds</code>, and <code>date-seconds-range</code>.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row align="middle">
    <h-col :span="4">
      Datetime:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value" type="datetime" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue" type="datetime-range" />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      DateMinutes:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="date-minutes" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue2" type="date-minutes-range" />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      DateSeconds:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value3" type="date-seconds" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue3" type="date-seconds-range" />
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
    path: "demos/components/DatePicker/datetime.vue"
  }, null, _parent));
  _push(`<h2 id="formatting" tabindex="-1">Formatting <a class="header-anchor" href="#formatting" aria-label="Permalink to &quot;Formatting&quot;">​</a></h2><p>DatePicker uses Dayjs internally and supports all Dayjs formats, including formats provided by the <code>AdvancedFormat</code> plugin. When omitted, the format is inferred from <code>type</code> and the current locale.</p><p>See <a href="#supported-formats">Supported Formats</a>.</p>`);
  _push(ssrRenderComponent(_component_h_alert, {
    type: "info",
    style: { "margin": "20px 0" },
    closable: false,
    "show-icon": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`When the locale changes dynamically, only the format pattern changes. Localized tokens such as <code${_scopeId}>MMM</code> are not converted. Do not set the locale on the globally exported <code${_scopeId}>dayjs</code> instance.`);
      } else {
        return [
          createTextVNode("When the locale changes dynamically, only the format pattern changes. Localized tokens such as "),
          createVNode("code", null, "MMM"),
          createTextVNode(" are not converted. Do not set the locale on the globally exported "),
          createVNode("code", null, "dayjs"),
          createTextVNode(" instance.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="date" format="X" />
    </h-col>
    <h-col :span="12">
      <h-date-picker v-model="value2" type="date-range" format="YYYY-MMM-DD [Quarter:] Q [week:] wo" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
<\/script>
`,
    path: "demos/components/DatePicker/format.vue"
  }, null, _parent));
  _push(`<h2 id="value-conversion" tabindex="-1">Value Conversion <a class="header-anchor" href="#value-conversion" aria-label="Permalink to &quot;Value Conversion&quot;">​</a></h2><p>Use <code>format</code> to control the displayed value and <code>value-format</code> to control the <code>model-value</code> format. If <code>value-format</code> is omitted, Dayjs objects are returned.</p><p><code>value-format</code> controls both the input format and the format returned after a user selects a date or time. The input format also depends on <code>type</code> and the selected locale.</p>`);
  _push(ssrRenderComponent(_component_h_alert, {
    type: "error",
    style: { "margin": "20px 0" },
    closable: false,
    "show-icon": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`A Dayjs object prints in GMT+0 by default. The system time zone is applied during conversion.`);
      } else {
        return [
          createTextVNode("A Dayjs object prints in GMT+0 by default. The system time zone is applied during conversion.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="8">
      <div class="demo-title">
        Default: {{ value }}
      </div>
      <h-date-picker v-model="value" type="date" format="YYYY-MM-DD" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">
        Datetime Format: {{ value2 }}
      </div>
      <h-date-picker v-model="value2" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD HH:mm" />
    </h-col>
  </h-row>
  <h-row>
    <h-col :span="8">
      <div class="demo-title">
        Timestamp: {{ value3 }}
      </div>
      <h-date-picker v-model="value3" type="datetime" format="YYYY-MM-DD HH:mm:ss" value-format="X" />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">
        Timestamp(ms): {{ value4 }}
      </div>
      <h-date-picker v-model="value4" type="date-range" format="YYYY/MM/DD wo" value-format="x" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

const value = ref<Dayjs>();
const value2 = ref<string>();
const value3 = ref<number>(1734559200);
const value4 = ref<[number, number]>();
<\/script>
`,
    path: "demos/components/DatePicker/value-format.vue"
  }, null, _parent));
  _push(`<h2 id="hover-preview" tabindex="-1">Hover Preview <a class="header-anchor" href="#hover-preview" aria-label="Permalink to &quot;Hover Preview&quot;">​</a></h2><p>Set <code>hover-to-display-value=&quot;true&quot;</code> to display the hovered date in the input before it is selected.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form>
    <h-form-item label="hover to display value">
      <h-radio-group v-model="hoverToDisplayValue">
        <h-radio :value="true">True</h-radio>
        <h-radio :value="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="date" :hover-to-display-value="hoverToDisplayValue" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="values" type="dateRange" :hover-to-display-value="hoverToDisplayValue" />
    </h-col>
  </h-row>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="dateMinutes" :hover-to-display-value="hoverToDisplayValue" />
    </h-col>
    <h-col :span="12">
      <h-date-picker v-model="values2" type="dateMinutesRange" :hover-to-display-value="hoverToDisplayValue" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
const values = ref();
const values2 = ref();
const hoverToDisplayValue = ref(true);
<\/script>
`,
    path: "demos/components/DatePicker/hover-to-display-value.vue"
  }, null, _parent));
  _push(`<h2 id="disabled-dates-and-times" tabindex="-1">Disabled Dates and Times <a class="header-anchor" href="#disabled-dates-and-times" aria-label="Permalink to &quot;Disabled Dates and Times&quot;">​</a></h2><p>Use <code>disabled-date</code> and <code>disabled-time</code> to prevent dates or times from being selected. The <code>date</code> passed to <code>disabled-time</code> represents the current date, so only the time portion should be considered.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" :disabled-date="disabledDate" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="dateRange" :disabled-date="disabledDate" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value3" type="datetime" :disabled-date="disabledDate" :disabled-time="disabledTime" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value4" type="datetimeRange" :disabled-date="disabledDate" :begih-disabled-time="disabledTime" :end-disabled-time="disabledTime" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { Dayjs } from 'dayjs';

const value = ref(dayjs());
const value2 = ref();
const value3 = ref();
const value4 = ref();

function disabledDate(date: Dayjs) {
  return (
    date.isBefore(dayjs().startOf('week'), 'date') || date.isAfter(dayjs().add(7, 'days').endOf('week'), 'date')
  );
}

function disabledTime(time: Dayjs) {
  return (
    time.isBefore(dayjs().set('hour', 9).set('minute', 30), 'minute') || time.isAfter(dayjs().set('hour', 18), 'hour')
  );
}
<\/script>
`,
    path: "demos/components/DatePicker/disabled-date-and-time.vue"
  }, null, _parent));
  _push(`<h2 id="select-now" tabindex="-1">Select Now <a class="header-anchor" href="#select-now" aria-label="Permalink to &quot;Select Now&quot;">​</a></h2><p>Set <code>show-now</code> to display the current-time button. Use the <code>showNow</code> slot to replace its behavior. When <code>default-time</code> is also provided, its value takes precedence.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row align="middle">
    <h-col :span="4">
      Date:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value" show-now default-time="00:00" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="values" type="dateRange" show-now default-time="00:00" />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      Datetime:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="dateSeconds" show-now default-time="00:00" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="values2" type="dateSecondsRange" show-now need-confirm />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      Custom:
    </h-col>
    <h-col :span="6">
      <h-date-picker ref="datePickerRef" v-model="value3">
        <template #showNow>
          <h-button size="small" plain @click="setSingleDate">Tomorrow</h-button>
        </template>
      </h-date-picker>
    </h-col>
    <h-col :span="6">
      <h-date-picker ref="datePickerRef2" v-model="values3" type="datetimeRange">
        <template #showNow>
          <h-button size="small" plain @click="setRangeDate">Five minute later</h-button>
        </template>
      </h-date-picker>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const value = ref();
const value2 = ref();
const value3 = ref();
const values = ref();
const values2 = ref();
const values3 = ref();

const datePickerRef = ref();
const datePickerRef2 = ref();

function setSingleDate() {
  value3.value = dayjs().add(1, 'day');
  datePickerRef.value?.confirmHandle();
}

function setRangeDate() {
  values3.value = [dayjs(), dayjs().add(5, 'minutes')];
  datePickerRef2.value?.confirmHandle();
}
<\/script>
`,
    path: "demos/components/DatePicker/show-now.vue"
  }, null, _parent));
  _push(`<h2 id="default-panel-date" tabindex="-1">Default Panel Date <a class="header-anchor" href="#default-panel-date" aria-label="Permalink to &quot;Default Panel Date&quot;">​</a></h2><p>Set <code>panel-show-date</code> to lock the date initially displayed by the panel.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="date" panel-show-date="2024-01-01" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="date-range" panel-show-date="2020-10-01" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value3" type="date-range" :panel-show-date="panelShowDate" :is-link-panels="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { Dayjs } from 'dayjs';

const value = ref();
const value2 = ref();
const value3 = ref();

const panelShowDate = [dayjs().set('year', 2000).set('month', 1), dayjs().set('month', 10)] as [Dayjs, Dayjs];
<\/script>
`,
    path: "demos/components/DatePicker/panel-show-date.vue"
  }, null, _parent));
  _push(`<h2 id="time-steps" tabindex="-1">Time Steps <a class="header-anchor" href="#time-steps" aria-label="Permalink to &quot;Time Steps&quot;">​</a></h2><p>Use <code>time-step</code>, <code>hour-step</code>, <code>minute-step</code>, and <code>second-step</code> to control the corresponding time increments.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row align="middle">
    <h-col :span="2">Time:</h-col>
    <h-col :span="6">
      <h-date-picker v-model="value" type="datetime" :time-step="60" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue" type="datetimeRange" :time-step="60" />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="2">Minute:</h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="dateMinutes" :hour-step="3" :minute-step="5" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue2" type="dateMinutesRange" :hour-step="3" :minute-step="5" />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="2">Second:</h-col>
    <h-col :span="6">
      <h-date-picker v-model="value3" type="dateSeconds" :hour-step="3" :minute-step="5" :second-step="10" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue3" type="dateSecondsRange" :hour-step="3" :minute-step="5" :second-step="10" />
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
    path: "demos/components/DatePicker/step.vue"
  }, null, _parent));
  _push(`<h2 id="non-editable-input" tabindex="-1">Non-editable Input <a class="header-anchor" href="#non-editable-input" aria-label="Permalink to &quot;Non-editable Input&quot;">​</a></h2><p>The input is editable by default. Set <code>inputable=&quot;false&quot;</code> to prevent manual changes.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" :inputable="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
<\/script>
`,
    path: "demos/components/DatePicker/inputable.vue"
  }, null, _parent));
  _push(`<h2 id="readonly" tabindex="-1">Readonly <a class="header-anchor" href="#readonly" aria-label="Permalink to &quot;Readonly&quot;">​</a></h2><p>Set <code>readonly</code> to prevent changes to the selected value.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" readonly />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="values" readonly type="dateRange" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const value = ref(dayjs());
const values = ref([dayjs(), dayjs().add(1, 'day')]);
<\/script>
`,
    path: "demos/components/DatePicker/readonly.vue"
  }, null, _parent));
  _push(`<h2 id="tooltips" tabindex="-1">Tooltips <a class="header-anchor" href="#tooltips" aria-label="Permalink to &quot;Tooltips&quot;">​</a></h2><p>Pass <code>show-date-tooltip</code>, <code>show-month-tooltip</code>, <code>show-year-tooltip</code>, or <code>show-time-tooltip</code> to display tooltips when hovering date and time cells.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker
        v-model="value"
        type="datetime"
        :show-date-tooltip="showDateTooltip"
        :show-month-tooltip="showMonthTooltip"
        :show-year-tooltip="showYearTooltip"
        :show-time-tooltip="showTimeTooltip"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

const value = ref();

function showDateTooltip(date: Dayjs) {
  return {
    show: true,
    content: date.format('YYYY-MM-DD'),
  };
}

function showMonthTooltip(month: Dayjs) {
  return {
    show: true,
    content: \`\${month.daysInMonth()} Days\`,
  };
}

function showYearTooltip(year: Dayjs) {
  const isLoopYear = (year.year() % 4 === 0 && year.year() % 100 !== 0) || year.year() % 400 === 0;
  return {
    show: isLoopYear,
    content: isLoopYear ? 'Loop Year' : undefined,
  };
}

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
    path: "demos/components/DatePicker/show-tooltip.vue"
  }, null, _parent));
  _push(`<h2 id="dot-indicator" tabindex="-1">Dot Indicator <a class="header-anchor" href="#dot-indicator" aria-label="Permalink to &quot;Dot Indicator&quot;">​</a></h2><p>Use <code>show-dot</code> to display a dot below date cells. It is commonly combined with <code>show-date-tooltip</code>.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" :show-dot="isShowDot" :show-date-tooltip="showDateTooltip" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

const value = ref();

function isShowDot(date: Dayjs, panelType: 'day' | 'month' | 'year') {
  if (panelType !== 'day') {
    return false;
  }

  return [0, 6].includes(date.day());
}

function showDateTooltip(date: Dayjs) {
  return {
    show: [0, 6].includes(date.day()),
    content: 'Have a Rest',
  };
}
<\/script>
`,
    path: "demos/components/DatePicker/show-dot.vue"
  }, null, _parent));
  _push(`<h2 id="default-time" tabindex="-1">Default Time <a class="header-anchor" href="#default-time" aria-label="Permalink to &quot;Default Time&quot;">​</a></h2><p>Provide a default time to reduce manual input and improve the selection experience.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="datetime" :default-time="defaultTime" :need-confirm="true" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="dateMinutesRange" :default-time="defaultTimes" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value3" type="dateRange" :default-time="defaultTimes" format="YYYY-MM-DD HH:mm:ss" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
const value3 = ref();

const defaultTime = '20:00';
const defaultTimes = ['00:00:00', '23:59:59'];
<\/script>
`,
    path: "demos/components/DatePicker/default-time.vue"
  }, null, _parent));
  _push(`<h2 id="confirmation-required" tabindex="-1">Confirmation Required <a class="header-anchor" href="#confirmation-required" aria-label="Permalink to &quot;Confirmation Required&quot;">​</a></h2><p>Set <code>need-confirm</code> to prevent a selection from taking effect immediately.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row align="middle">
    <h-col :span="4">
      Year:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value1" type="year" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue1" type="year-range" need-confirm />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      Month:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="month" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue2" type="month-range" need-confirm />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      Week:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value3" type="week" format="[week] ww" need-confirm />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      Date:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value4" type="date" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue4" type="date-range" need-confirm />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      Datetime:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value5" type="datetime" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue5" type="datetime-range" need-confirm />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      DateMinutes:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value6" type="date-minutes" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue6" type="date-minutes-range" need-confirm />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      DateSeconds:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value7" type="date-seconds" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue7" type="date-seconds-range" need-confirm />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const rangeValue1 = ref();
const value2 = ref();
const rangeValue2 = ref();
const value3 = ref(new Date);
const value4 = ref();
const rangeValue4 = ref();
const value5 = ref();
const rangeValue5 = ref();
const value6 = ref();
const rangeValue6 = ref();
const value7 = ref();
const rangeValue7 = ref();
<\/script>
`,
    path: "demos/components/DatePicker/need-confirm.vue"
  }, null, _parent));
  _push(`<h2 id="custom-trigger" tabindex="-1">Custom Trigger <a class="header-anchor" href="#custom-trigger" aria-label="Permalink to &quot;Custom Trigger&quot;">​</a></h2><p>Use the <code>pickerOuter</code> slot to customize the trigger.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row align="middle">
    <h-col :span="12">
      <h-date-picker v-model="value" type="datetime" show-now>
        <template #pickerOuter>
          <h-button plain>Pick datetime: {{ value }}</h-button>
        </template>
      </h-date-picker>
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="12">
      <h-date-picker v-model="rangeValue" type="datetimeRange" show-now>
        <template #pickerOuter>
          <h-button plain>Pick datetimeRange: {{ rangeValue }}</h-button>
        </template>
      </h-date-picker>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const rangeValue = ref();
<\/script>
`,
    path: "demos/components/DatePicker/custom-trigger.vue"
  }, null, _parent));
  _push(`<h2 id="custom-trigger-text" tabindex="-1">Custom Trigger Text <a class="header-anchor" href="#custom-trigger-text" aria-label="Permalink to &quot;Custom Trigger Text&quot;">​</a></h2><p>Use <code>format-trigger-text</code> to customize the text displayed in the trigger. It can also define the separator for a single trigger. When the input format differs from <code>value-format</code>, editing the input cannot change the selected value; a non-<code>-</code> separator is not parsed for single triggers.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker
        v-model="value"
        type="date"
        :format-trigger-text="formatTriggerText"
      />
    </h-col>
    <h-col :span="6">
      <h-date-picker
        v-model="value2"
        type="datetimeRange"
        :single-trigger="true"
        :format-trigger-text="formatTriggerText"
        :default-time="['00:00', '23:59:59']"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DatePickerProps } from '@aurora/horizon-web';

const value = ref();
const value2 = ref();

const formatTriggerText: DatePickerProps['formatTriggerText'] = (days, text) => {
  console.info('format trigger text param: ', days, text);

  if (Array.isArray(days)) {
    return days.map(day => day?.format('YYYY-MM-DD HH:mm:ss')).join(' 至 ');
  } else {
    return days?.format('YYYY-MM-DD HH:mm:ss') || '';
  }
};
<\/script>
`,
    path: "demos/components/DatePicker/format-trigger-text.vue"
  }, null, _parent));
  _push(`<h2 id="custom-date-cell-content" tabindex="-1">Custom Date Cell Content <a class="header-anchor" href="#custom-date-cell-content" aria-label="Permalink to &quot;Custom Date Cell Content&quot;">​</a></h2><p>Use the <code>default</code> slot to customize date-cell content.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="date" :to-body="false">
        <template #default="{ grid }">
          <div :class="{'custom-grid': true, 'is-selected': grid.isSelected ,'is-holiday': ([0, 6].includes(grid.date.day()) && !isInWorkday(grid.date)) || isInHoliday(grid.date)}">
            {{ grid.text }}
            <div v-if="isInHoliday(grid.date)" class="badge holiday">休</div>
            <div v-if="isInWorkday(grid.date)" class="badge workday">班</div>
          </div>
        </template>
      </h-date-picker>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

const value = ref();

const holiday2025 = [
  '2025/01/01',
  '2025/01/28', '2025/01/29', '2025/01/30', '2025/01/31', '2025/02/01', '2025/02/02', '2025/02/03', '2025/02/04',
  '2025/04/04', '2025/04/05', '2025/04/06',
  '2025/05/01', '2025/05/02', '2025/05/03', '2025/05/04', '2025/05/05',
  '2025/05/31', '2025/06/01', '2025/06/02',
  '2025/10/01', '2025/10/02', '2025/10/03', '2025/10/04', '2025/10/05', '2025/10/06', '2025/10/07', '2025/10/08',
];

const workday2025 = [
  '2025/01/26', '2025/02/08',
  '2025/04/27',
  '2025/09/28', '2025/10/11',
];

const isInHoliday = (date: Dayjs) => holiday2025.includes(date.format('YYYY/MM/DD'));
const isInWorkday = (date: Dayjs) => workday2025.includes(date.format('YYYY/MM/DD'));

<\/script>

<style>
.custom-grid {
  width: 50px;
  height: 50px;
  display: flex;
  aligh-items: center;
  justify-content: center;
  border: 1px solid var(--h-divider-default);
  position: relative;
  cursor: pointer;
  transition: var(--h-transition-color-behavior);



  &.is-holiday {
    color: var(--h-text-secondary);
    background-color: var(--h-bg-secondary);
  }

  &.is-selected {
    color: var(--h-text-inverse);
    background-color: var(--h-bg-brand-activated);

    &:hover {
      background-color: var(--h-bg-brand-hover);
    }

    .badge {
      &.holiday {
        color: var(--h-text-inverse);
      }

      &.workday {
        color: var(--h-text-inverse);
      }
    }
  }

  &:not(.is-selected) {
    &:hover {
      background-color: var(--h-bg-weak-hover);
    }

    .badge {
      &.holiday {
        color: var(--h-text-success-default);
      }

      &.workday {
        color: var(--h-text-warning-default);
      }
    }
  }

  .badge {
    font-size: 12px;
    position: absolute;
    top: 0;
    right: 2px;
    transform: scale(.9);
  }
}
</style>`,
    path: "demos/components/DatePicker/default-slot.vue"
  }, null, _parent));
  _push(`<h2 id="custom-icons" tabindex="-1">Custom Icons <a class="header-anchor" href="#custom-icons" aria-label="Permalink to &quot;Custom Icons&quot;">​</a></h2><p>Use <code>prefix-icon</code> and <code>suffix-icon</code> to set the input icons.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row align="middle">
    <h-col :span="6">
      <h-date-picker v-model="value" type="datetime" prefix-icon="task_filled" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="datetime" :suffix-icon="h(IconFlip, {color: 'green', size: 14})" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { IconFlip } from '@aurora/icon';

const value = ref();
const value2 = ref();
<\/script>
`,
    path: "demos/components/DatePicker/custom-icon.vue"
  }, null, _parent));
  _push(`<h2 id="initial-value-after-clearing" tabindex="-1">Initial Value After Clearing <a class="header-anchor" href="#initial-value-after-clearing" aria-label="Permalink to &quot;Initial Value After Clearing&quot;">​</a></h2><p>Set <code>:initial-value=&quot;null&quot;</code> to assign a default <code>model-value</code> after clearing.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="6">
      {{ Object.prototype.toString.call(value) }}
      <h-date-picker v-model="value" type="date" :initial-value="null" @update:modelValue="onUpdate" @change="onChange" @pick="onPick" />
    </h-col>
    <h-col :span="6">
      {{ Object.prototype.toString.call(value2) }}
      <h-date-picker v-model="value2" type="date-range" :initial-value="null" @update:modelValue="onUpdate" @change="onChange" @pick="onPick" />
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
    path: "demos/components/DatePicker/initial-value.vue"
  }, null, _parent));
  _push(`<h2 id="render-panel-content-only" tabindex="-1">Render Panel Content Only <a class="header-anchor" href="#render-panel-content-only" aria-label="Permalink to &quot;Render Panel Content Only&quot;">​</a></h2><p>Set <code>show-popover-content-only=&quot;true&quot;</code> to render the panel without its trigger.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-date-picker
        v-model="value"
        type="date"
        :show-popover-content-only="true"
        @update:modelValue="onUpdate"
        @change="onChange"
        @pick="onPick"
      />
    </h-col>
    <h-col :span="24">
      <h-date-picker
        v-model="value2"
        type="date-range"
        :show-popover-content-only="true"
        @update:modelValue="onUpdate"
        @change="onChange"
        @pick="onPick"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value = ref();
const value2 = ref('');

function onUpdate(val: unknown) {
  console.info('update: ', val);
}

function onChange(val: unknown) {
  console.info('change: ', val);
}

function onPick(val: unknown) {
  console.info('pick: ', val);
}

onMounted(() => {
  setTimeout(() => {
    value.value = new Date();
  }, 1000);
});
<\/script>
`,
    path: "demos/components/DatePicker/show-popover-content-only.vue"
  }, null, _parent));
  _push(`<h2 id="basic-dayjs-configuration" tabindex="-1">Basic Dayjs Configuration <a class="header-anchor" href="#basic-dayjs-configuration" aria-label="Permalink to &quot;Basic Dayjs Configuration&quot;">​</a></h2><p>DatePicker uses Dayjs internally. The following configuration is global:</p>`);
  _push(ssrRenderComponent(_component_code_block, { src: "../../../../horizon-web/src/utils/useDayJs.ts" }, null, _parent));
  _push(`<h2 id="type-definitions" tabindex="-1">Type Definitions <a class="header-anchor" href="#type-definitions" aria-label="Permalink to &quot;Type Definitions&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_code_block, { src: "../../../../horizon-web/src/components/DatePicker/src/utils/types.ts" }, null, _parent));
  _push(`<h2 id="supported-formats" tabindex="-1">Supported Formats <a class="header-anchor" href="#supported-formats" aria-label="Permalink to &quot;Supported Formats&quot;">​</a></h2><p>The available date formats depend on the current locale:</p>`);
  _push(ssrRenderComponent(_component_code_block, { src: "../../../../horizon-web/src/locales/dateFormat.json" }, null, _parent));
  _push(`<h2>DatePicker Api</h2><h3>DatePicker Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>双向绑定值</td><td><code>| HDatePickerAccessDatetimeType<br>      | [HDatePickerAccessDatetimeType, HDatePickerAccessDatetimeType]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>面板Type<br>支持: &#39;year&#39;、&#39;month&#39;、&#39;week&#39;、&#39;date&#39;、&#39;datetime&#39;、&#39;date-minutes&#39;、&#39;date-seconds&#39;、&#39;date-range&#39;、&#39;month-range&#39;、&#39;year-range&#39;、&#39;datetime-range&#39;、&#39;date-minutes-range&#39;、&#39;date-seconds-range&#39;<br>以及其上的所有小驼峰写法和除去短横线的全小写写法</td><td><code>HDatePickerSupportType</code></td><td class="text-center">No</td><td>&#39;date&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearable</td><td>是否可清空输入框</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>触发方式</td><td><code>&#39;click&#39; | &#39;hover&#39;</code></td><td class="text-center">No</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>面板弹出位置</td><td><code>| &#39;auto&#39;<br>      | &#39;auto-start&#39;<br>      | &#39;auto-end&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;<br>      | &#39;left&#39;</code></td><td class="text-center">No</td><td>&#39;bottom-start&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>是否发送到 <code>body</code> 节点</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-style</td><td>输入样式</td><td><code>&#39;normal&#39; | &#39;emphasize&#39; | &#39;no-border&#39;</code></td><td class="text-center">No</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placeholder</td><td>非范围选择占位内容，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">start-placeholder</td><td>时间范围开始占位内容，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">end-placeholder</td><td>时间范围结束占位内容，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">destroy-on-hide</td><td>在隐藏后是否销毁面板</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popover-options</td><td>Additional options passed to the popover.</td><td><code>Partial&lt;PopoverProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit-input-width</td><td>下拉框宽度是否与输入框相同</td><td><code>boolean | &#39;fit-content&#39;</code></td><td class="text-center">No</td><td>&#39;fit-content&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-show-delay</td><td>鼠标悬浮后多久显示 popper<br>仅在 trigger = hover 时有效</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-hide-delay</td><td>鼠标移出后后多久隐藏 popper<br>仅在 trigger = hover 时有效</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">inputable</td><td>输入框是否允许输入</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-type</td><td>确认输入的方式，默认按回车确认输入值<br>如果传入 <code>&#39;blur&#39;</code>，会在失焦或按下回车时确认输入值</td><td><code>&#39;enter&#39; | &#39;blur&#39;</code></td><td class="text-center">No</td><td>&#39;enter&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">time-picker-confirm-type</td><td>在范围选择时，确认用户输入的方式，默认按回车确认输入值<br>如果传入 <code>&#39;blur&#39;</code>，会在失焦或按下回车时确认输入值</td><td><code>&#39;enter&#39; | &#39;blur&#39;</code></td><td class="text-center">No</td><td>&#39;enter&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">readonly</td><td>是否只读</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">option-list-max-height</td><td>选项列表最大高度</td><td><code>string | number</code></td><td class="text-center">No</td><td>&#39;256&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-show-after</td><td>所有有 <code>tooltip</code> 的地方，在悬浮后延迟多少毫秒显示 <code>tooltip</code></td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tooltip-hide-after</td><td>所有有 <code>tooltip</code> 的地方，在显示后延迟多少毫秒移除 <code>tooltip</code></td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-width</td><td>时间选择框宽度尺寸</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">single-panel</td><td>在范围选择时，是否只渲染一个面板</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">single-trigger</td><td>在范围选择时，是否只渲染一个触发器</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">range-separator</td><td>时间范围选择起止隔符</td><td><code>string | Component | VNode</code></td><td class="text-center">No</td><td>IconSwapRight</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">range-panel-separator</td><td>时间范围选择面板起止隔符</td><td><code>string | Component | VNode</code></td><td class="text-center">No</td><td>&#39;-&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">time-step</td><td>时间步长，单位为分钟，在 <code>type = &#39;time&#39;</code> 时有效</td><td><code>number</code></td><td class="text-center">No</td><td>30</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hour-step</td><td>小时步长，在 <code>type = &#39;minutes&#39; or &#39;seconds&#39;</code> 时有效</td><td><code>number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">minute-step</td><td>分钟步长，在 <code>type = &#39;minutes&#39; or &#39;seconds&#39;</code> 时有效</td><td><code>number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">second-step</td><td>秒步长，在 <code>type = &#39;seconds&#39;</code> 时有效</td><td><code>number</code></td><td class="text-center">No</td><td>1</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">time-start-at</td><td>开始时间</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;00:00:00&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">time-end-at</td><td>结束时间</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;23:59:59&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled-date</td><td>设置禁选日期<br>详见Type定义</td><td><code>HDatePickerDisabledDateMethodType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled-time</td><td>设置禁选时间<br>详见Type定义</td><td><code>HDatePickerDisabledTimeMethodType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">begin-disabled-time</td><td>在时间范围选择时，设置开始的禁选时间</td><td><code>HDatePickerDisabledTimeMethodType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">end-disabled-time</td><td>在时间范围选择时，设置结束的禁选时间</td><td><code>HDatePickerDisabledTimeMethodType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-style</td><td>弹出层样式</td><td><code>CSSProperties</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-class</td><td>弹出层类名</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format</td><td>输入框显示值的格式，默认根据 <code>type</code> 自动设置</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value-format</td><td>绑定值的格式，不指定则使用 <code>Dayjs</code> 对象</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prefix-icon</td><td>前缀图标<br>在 <code>input-style = &#39;normal&#39; or &#39;emphasize&#39;</code> 时，默认 <code>IconTime</code><br>在 <code>input-style = &#39;no-border</code> 时，默认 <code>false</code></td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">suffix-icon</td><td>后缀图标</td><td><code>iconMaybeFalsyPropType</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear-icon</td><td>清空图标</td><td><code>iconPropType</code></td><td class="text-center">No</td><td>IconClose</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fallback-placements</td><td>当显示位置的空间不够时 设置时间面板的默认显示位置顺序</td><td><code>PopoverProps[&#39;fallbackPlacements&#39;]</code></td><td class="text-center">No</td><td>[<br>      &#39;top-start&#39;,<br>      &#39;bottom-end&#39;,<br>      &#39;top-end&#39;,<br>      &#39;right-start&#39;,<br>      &#39;left-start&#39;,<br>      &#39;right-end&#39;,<br>      &#39;left-end&#39;,<br>      &#39;auto-start&#39;,<br>      &#39;auto-end&#39;,<br>    ]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prevent-overflow</td><td>是否阻止 <code>popper</code> 超出边界</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format-date-cell-text</td><td>自定义日期单元格文案</td><td><code>(type: &#39;year&#39; | &#39;month&#39; | &#39;day&#39;, value: Dayjs, rawText: string) =&gt; string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format-time-cell-text</td><td>自定义时间单元格文案</td><td><code>(type: &#39;hours&#39; | &#39;minutes&#39; | &#39;seconds&#39; | &#39;time&#39;, value: string) =&gt; string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format-trigger-text</td><td>自定义触发器文案</td><td><code>(<br>        value: Dayjs | undefined | null | [Dayjs | undefined | null, Dayjs | undefined | null],<br>        text: string | undefined | [string, string],<br>      ) =&gt; string | [string, string]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">need-confirm</td><td>是否需要确认</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-button-text</td><td>确认按钮文本，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-cancel-button</td><td>展示取消按钮</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-button-text</td><td>取消按钮文本，默认使用国际化配置</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm-button-props</td><td>确认按钮的Name设置</td><td><code>Partial&lt;ButtonProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel-button-props</td><td>取消按钮的Name设置</td><td><code>Partial&lt;ButtonProps&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">input-status</td><td>输入框状态</td><td><code>&#39;error&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-link-panels</td><td>时间范围时，前后时间是否联动，即前时间小于后时间，大于后时间的时间不可选</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-now</td><td>在面板底部显示【此刻】</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-before-after-date</td><td>是否显示非当前面板所在年、月、日的日期格子<br>对于 <code>year</code> <code>yearRange</code> <code>week</code> 强制显示</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-to-display-value</td><td>是否在悬浮时显示日期</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">shortcuts</td><td>快捷选项</td><td><code>HDatePickerShortcutsType[]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fixed-six-rows</td><td>是否固定显示6行日期</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-year-button</td><td>是否允许在日期面板上显示年的切换按钮</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-date-tooltip</td><td>日期格子显示提示文字的方法</td><td><code>HDatePickerShowDateTooltipType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-month-tooltip</td><td>月格子显示提示文字的方法</td><td><code>HDatePickerShowDateTooltipType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-year-tooltip</td><td>年格子显示提示文字的方法</td><td><code>HDatePickerShowDateTooltipType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-time-tooltip</td><td>时间格子显示提示文字的方法</td><td><code>HDatePickerShowTimeTooltipType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-show-date</td><td>面板展示的日期，默认为当前日期<br>如果是 <code>string</code> Type，可以无需考虑国际化问题，即填写 <code>YYYY-MM-DD</code> 格式的字符串即可<br>Type详见【Type定义】</td><td><code>| HDatePickerAccessDatetimeType<br>      | [HDatePickerAccessDatetimeType, HDatePickerAccessDatetimeType]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default-time</td><td>默认时间<br>如果是 <code>string</code> Type，则格式为 <code>HH:mm:ss</code> 或 <code>HH:mm</code></td><td><code>| HDatePickerAccessDatetimeType<br>      | [HDatePickerAccessDatetimeType, HDatePickerAccessDatetimeType]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-dot</td><td>是否在日期格子下显示圆点标识</td><td><code>HDatePickerShowDotType</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-min-width</td><td>弹窗最小宽度<br>普通选择: 160<br>范围选择: 180</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">panel-max-width</td><td>弹窗最大宽度</td><td><code>string | number</code></td><td class="text-center">No</td><td>&#39;fit-content&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">picker-min-width</td><td>输入框最小宽度</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">picker-max-width</td><td>输入框最大宽度</td><td><code>string | number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">first-day-of-week</td><td>一周开始的星期<br>0为周日</td><td><code>0 | 1 | 2 | 3 | 4 | 5 | 6</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-header</td><td>是否显示头部</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">initial-value</td><td>Default<br>可以在清空时，指定为 null<br>默认为 undefined</td><td><code>null</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-popover-content-only</td><td>是否仅展示弹窗内容</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3>DatePicker Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="1">Emitted when <code>model-value</code> changes.</td><td rowspan="1">( val: <code>| Dayjs<br>      | string<br>      | [Dayjs | string | undefined | null, Dayjs | string | undefined | null]<br>      | undefined<br>      | null</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">val</td><td><code>| Dayjs<br>      | string<br>      | [Dayjs | string | undefined | null, Dayjs | string | undefined | null]<br>      | undefined<br>      | null</code></td><td>The changed <code>model-value</code>.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">pick</td><td rowspan="1">Emitted when the user picks a date.</td><td rowspan="1">( val: <code>Dayjs | undefined | null | [Dayjs | undefined | null, Dayjs | undefined | null]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">val</td><td><code>Dayjs | undefined | null | [Dayjs | undefined | null, Dayjs | undefined | null]</code></td><td>The selected date, or an array for range selection.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">input</td><td rowspan="2">Emitted while the user is typing.</td><td rowspan="2">( val: <code>string</code>, evt: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">val</td><td><code>string</code></td><td>输入的文字</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>Event</code></td><td>输入事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">focus</td><td rowspan="1">Emitted when the input receives focus.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">blur</td><td rowspan="1">Emitted when the input loses focus.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clear</td><td rowspan="1">Emitted when the value is cleared.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirm</td><td rowspan="1">Emitted when the user clicks Confirm.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancel</td><td rowspan="1">Emitted when the user clicks Cancel.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">dropdown-visible-change</td><td rowspan="1">Emitted when the dropdown visibility changes.</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>是否显示</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">shortcut-click</td><td rowspan="1">Emitted when a shortcut is clicked.</td><td rowspan="1">( shortcut: <code>HDatePickerShortcutsType</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">shortcut</td><td><code>HDatePickerShortcutsType</code></td><td>当前点击的快捷选项</td></tr></tbody></table><h3>DatePicker Exposes</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">changePanelVisible</td><td rowspan="1">Change the panel visibility.</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">increaseYear</td><td rowspan="1">Increase the displayed year.</td><td rowspan="1">( amount: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">amount</td><td><code>number</code></td><td>增加的年份，如果需要减少，则传入负数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">increaseMonth</td><td rowspan="1">Increase the displayed month.</td><td rowspan="1">( amount: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">amount</td><td><code>number</code></td><td>增加的月份，如果需要减少，则传入负数</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">confirmHandle</td><td rowspan="1">Confirm the current value.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelHandle</td><td rowspan="1">Cancel the current selection.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">clearHandle</td><td rowspan="1">Clear the current value.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">refreshPanelShowDate</td><td rowspan="1">Refresh the date displayed by the panel.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/DatePicker.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DatePicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  DatePicker as default
};
