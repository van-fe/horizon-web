import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Calendar.md","filePath":"en/demos/components/Calendar.md"}');
const _sfc_main = { name: "en/demos/components/Calendar.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Calendar</h1><p class="description">You can control not to display dates that are not in the current month by setting <code>date-type</code> to <code>only-current</code></p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="wrapper">
    <h-calendar v-model="value" :auto-fit="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref();

    return {
      value,
    };
  },
});
<\/script>

<style scoped>
.wrapper {
  height: 1000px;
}
</style>
`,
    path: "demos/components/Calendar/base.vue"
  }, null, _parent));
  _push(`<h2 id="date-mode" tabindex="-1">Date Mode <a class="header-anchor" href="#date-mode" aria-label="Permalink to &quot;Date Mode&quot;">​</a></h2><p>You can control not to display dates that are not in the current month by setting <code>date-type</code> to <code>only-current</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="wrapper">
    <h-calendar
      v-model="value"
      v-model:mode="mode"
      :class="['week', 'day'].includes(mode) ? 'limit' : ''"
      date-type="only-current"
      :mode-switchable="true"
      :mode-switchable-list="['year', 'month', 'week', 'day']"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref();
    const mode = ref('month');

    return {
      value,
      mode,
    };
  },
});
<\/script>

<style scoped>
.wrapper .limit {
  height: 800px;
}
</style>
`,
    path: "demos/components/Calendar/date-type.vue"
  }, null, _parent));
  _push(`<h2 id="can-select-date" tabindex="-1">Can Select Date <a class="header-anchor" href="#can-select-date" aria-label="Permalink to &quot;Can Select Date&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="Pickable">
      <h-radio-group v-model="pickable">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="DateType">
      <h-radio-group v-model="dateType">
        <h-radio label="full">Full</h-radio>
        <h-radio label="only-current">Only Current</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-calendar
    :pickable="pickable"
    :date-type="dateType"
    :disable-date="disableDate"
    :mode-switchable="true"
    @date-click="onDateClick"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Dayjs } from 'dayjs';

export default defineComponent({
  setup() {
    const pickable = ref(true);
    const dateType = ref('full');

    function onDateClick(date: string, type: 'month' | 'year' | 'week') {
      console.info(date, type);
    }

    function disableDate(date: Dayjs) {
      return [0, 6].includes(date.day());
    }

    return {
      pickable,
      dateType,
      onDateClick,
      disableDate,
    };
  },
});
<\/script>
`,
    path: "demos/components/Calendar/pickable.vue"
  }, null, _parent));
  _push(`<h2 id="set-banner" tabindex="-1">Set Banner <a class="header-anchor" href="#set-banner" aria-label="Permalink to &quot;Set Banner&quot;">​</a></h2><p>You can set the displayed banner through <code>pin-flags</code> to display some activities</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="wrapper">
    <h-form label-position="left" label-vertical-align="middle" label-width="150px">
      <h-form-item label="Reserve Event">
        <h-radio-group v-model="reserveEvent">
          <h-radio :label="1">Don't reserve</h-radio>
          <h-radio :label="2">Reserve original</h-radio>
          <h-radio :label="3">Reserve and modify</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="Date Type">
        <h-radio-group v-model="dateType">
          <h-radio label="full">Full</h-radio>
          <h-radio label="only-current">Only Current</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="Pin Flags Show Time">
        <h-radio-group v-model="showTime">
          <h-radio :label="true">Yes</h-radio>
          <h-radio :label="false">No</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="Create Flag Can Though Disable Date Or Hour">
        <h-radio-group v-model="createFlagCanThoughDisableDateOrHour">
          <h-radio :label="true">Yes</h-radio>
          <h-radio :label="false">No</h-radio>
        </h-radio-group>
      </h-form-item>
    </h-form>
    <h-calendar
      v-model:pin-flags="pinFlags"
      model-value="2022-10-10"
      :date-type="dateType"
      :pickable="true"
      mode="month"
      :pin-flags-show-time="showTime"
      :mode-switchable="true"
      :mode-switchable-list="['year', 'month']"
      :enable-create-pin-flags="true"
      :disable-date="disableDate"
      :create-flag-can-though-disable-date-or-hour="createFlagCanThoughDisableDateOrHour"
      :creating-pin-flag-callback="onCreatingPinFlagCallback"
      :creat-finish-flag-callback="onCreatFinishFlagCallback"
      @pinFlagClick="onFlagClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue';
import { HCalendarPinFlag } from '@aurora/horizon-web';
import { Dayjs } from 'dayjs';

export default defineComponent({
  setup() {
    const reserveEvent = ref(1);
    const dateType = ref('full');
    const showTime = ref(true);
    const createFlagCanThoughDisableDateOrHour = ref(true);

    const pinFlags = ref<HCalendarPinFlag[]>([
      {
        title: 'Demo车展',
        startAt: '2022-10-14',
        endAt: '2022-10-20 23:59:59',
        tooltip: 'Demo车展，千万不要错过',
        clickable: true,
      },
      {
        title: '车主面对面',
        startAt: '2022-10-17',
        endAt: '2022-10-19 23:59:59',
        tooltip: '车主面对面，直面心灵的碰撞',
        type: 'warning',
      },
      {
        title: '国庆节',
        startAt: '2022-10-1',
        endAt: '2022-10-8',
        type: 'success',
      },
      {
        title: 'WAD团建',
        startAt: '2022-10-21',
        type: 'success',
      },
      {
        title: '自驾游',
        startAt: '2022-10-22',
        endAt: '2022-10-24',
        type: 'warning',
      },
      {
        title: '桌游聚会',
        startAt: '2022-10-22 12:00',
        type: 'default',
      },
      {
        title: h('span', '请假'),
        startAt: '2022-10-12 00:00',
        endAt: '2022-10-12 12:00',
        type: 'error',
        tooltip: true,
      },
      {
        title: '室内游',
        startAt: '2022-10-22 10:00',
        endAt: '2022-10-23 18:00',
        type: 'success',
        color: 'dodgerblue',
        background: 'skyblue',
      },
    ]);

    function onFlagClick(flag: HCalendarPinFlag) {
      console.info(flag);
    }

    function onCreatingPinFlagCallback(date: Dayjs) {
      console.info(date.format('YYYY-MM-DD'));

      return {
        title: 'New Event',
        type: 'pill',
      };
    }

    function onCreatFinishFlagCallback(flag: HCalendarPinFlag) {
      return new Promise(resolve => {
        console.info(flag);

        switch (reserveEvent.value) {
          case 1:
            resolve(false);
            break;
          case 2:
            resolve(true);
            break;
          case 3:
            flag.title = 'Created Flag';
            resolve(flag);
            break;
        }
      });
    }

    return {
      dateType,
      reserveEvent,
      pinFlags,
      showTime,
      createFlagCanThoughDisableDateOrHour,
      disableDate(date: Dayjs) {
        return [0, 6].includes(date.day());
      },
      onFlagClick,
      onCreatingPinFlagCallback,
      onCreatFinishFlagCallback,
    };
  },
});
<\/script>

<style scoped>
.wrapper {
  max-height: 1200px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.wrapper .h-calendar {
  flex: 1;
}
</style>
`,
    path: "demos/components/Calendar/pin-flag.vue"
  }, null, _parent));
  _push(`<h2 id="set-week-and-day-banner" tabindex="-1">Set Week and Day Banner <a class="header-anchor" href="#set-week-and-day-banner" aria-label="Permalink to &quot;Set Week and Day Banner&quot;">​</a></h2><p>You can set the displayed banner through <code>pin-flags</code> and can finely set the time to display some activities</p><p>Use the <code>disableHours</code> callback function to return the unavailable hour intervals for the given day</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="wrapper">
    <h-form label-position="left" label-vertical-align="middle" label-width="200px">
      <h-form-item label="Enable Create Pin Flags">
        <h-radio-group v-model="enableCreatePinFlags">
          <h-radio :label="true">True</h-radio>
          <h-radio :label="false">False</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="Reserve Event">
        <h-radio-group v-model="reserveEvent">
          <h-radio :label="1">Don't reserve</h-radio>
          <h-radio :label="2">Reserve original</h-radio>
          <h-radio :label="3">Reserve and modify</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="Show Spacing Between Flags">
        <h-radio-group v-model="showSpacingBetweenFlags">
          <h-radio :label="true">True</h-radio>
          <h-radio :label="false">False</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="Create Flag Can Though Disable Date Or Hour">
        <h-radio-group v-model="createFlagCanThoughDisableDateOrHour">
          <h-radio :label="true">Yes</h-radio>
          <h-radio :label="false">No</h-radio>
        </h-radio-group>
      </h-form-item>
    </h-form>
    <h-calendar
      v-model:pin-flags="pinFlags"
      :pickable="true"
      mode="week"
      :mode-switchable="true"
      :mode-switchable-list="['week', 'day']"
      :enable-create-pin-flags="enableCreatePinFlags"
      :pin-flags-show-time="true"
      :creating-pin-flag-callback="onCreatingPinFlagCallback"
      :creat-finish-flag-callback="onCreatFinishFlagCallback"
      :create-flag-can-though-disable-date-or-hour="createFlagCanThoughDisableDateOrHour"
      :show-spacing-between-flags="showSpacingBetweenFlags"
      :disable-hours="disableHours"
      @pinFlagClick="onFlagClick"
    >
      <template #dayHeader="dayStr, dayObj, isToday">
        {{ dayStr }} {{ dayObj.format('dddd') }} {{ isToday ? 'Today' : '' }}
      </template>
    </h-calendar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { HCalendarPinFlag } from '@aurora/horizon-web';
import dayjs, { Dayjs } from 'dayjs';

export default defineComponent({
  setup() {
    const reserveEvent = ref(1);
    const enableCreatePinFlags = ref(true);
    const showSpacingBetweenFlags = ref(true);
    const createFlagCanThoughDisableDateOrHour = ref(true);
    const weekStart = dayjs().startOf('week');

    const pinFlags = ref<HCalendarPinFlag[]>([
      {
        startAt: weekStart.day(1).hour(8),
        endAt: weekStart.day(1).hour(9),
        type: 'success',
        clickable: true,
      },
      {
        title: '会议',
        startAt: weekStart.day(1).hour(9),
        endAt: weekStart.day(1).hour(10).minute(30),
        type: 'info',
      },
      {
        startAt: weekStart.day(1).hour(10).minute(30),
        endAt: weekStart.day(1).hour(14),
        type: 'warning',
      },
      {
        startAt: weekStart.day(3).hour(9),
        endAt: weekStart.day(4).hour(6),
        type: 'success',
      },
      {
        title: 'On Leave',
        startAt: weekStart.day(5).hour(8),
        endAt: weekStart.day(5).hour(15),
        type: 'error',
      },
    ]);

    function onFlagClick(flag: HCalendarPinFlag) {
      console.info(flag);
    }

    function onCreatingPinFlagCallback(date: Dayjs) {
      console.info(date.format('YYYY-MM-DD HH:mm'));

      return {
        title: 'New Event',
        type: 'pill',
      };
    }

    function onCreatFinishFlagCallback(flag: HCalendarPinFlag) {
      return new Promise(resolve => {
        console.info(flag);

        switch (reserveEvent.value) {
          case 1:
            resolve(false);
            break;
          case 2:
            resolve(true);
            break;
          case 3:
            flag.title = 'Created Flag';
            resolve(flag);
            break;
        }
      });
    }

    return {
      reserveEvent,
      enableCreatePinFlags,
      showSpacingBetweenFlags,
      createFlagCanThoughDisableDateOrHour,
      pinFlags,
      onFlagClick,
      onCreatingPinFlagCallback,
      onCreatFinishFlagCallback,
      disableHours(date: Dayjs) {
        if ([0, 6].includes(Number(date.format('d')))) {
          return [[date, date.endOf('d')]];
        } else if (date.isSame(dayjs().startOf('d'))) {
          return [[date, date.add(8, 'h')], [date.add(10, 'h'), date.add(12, 'h').add(20, 'm')], [date.add(20, 'h'), date.endOf('d')]];
        } else {
          return [[date, date.add(8, 'h')], [date.add(20, 'h'), date.endOf('d')]];
        }
      },
    };
  },
});
<\/script>

<style scoped>
.wrapper {
  max-height: 1000px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.wrapper .h-calendar {
  flex: 1;
}
</style>
`,
    path: "demos/components/Calendar/pin-flag-week-day.vue"
  }, null, _parent));
  _push(`<h2 id="custom-header" tabindex="-1">Custom Header <a class="header-anchor" href="#custom-header" aria-label="Permalink to &quot;Custom Header&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-calendar>
    <template #header>
      <h-input v-model="searchWord" placeholder="搜索" size="large" suffix-icon="search" />
    </template>
  </h-calendar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const searchWord = ref('');

    return {
      searchWord,
    };
  },
});
<\/script>
`,
    path: "demos/components/Calendar/custom-header.vue"
  }, null, _parent));
  _push(`<h2 id="custom-date-cell-content" tabindex="-1">Custom Date Cell Content <a class="header-anchor" href="#custom-date-cell-content" aria-label="Permalink to &quot;Custom Date Cell Content&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');

const actionList = [
  {
    time: '09:00',
    text: '每日三省吾身之一',
  },
  {
    time: '09:10',
    text: '今天算了',
  },
  {
    time: '09:20',
    text: '还是省一下吧',
  },
  {
    time: '09:30',
    text: '每日三省吾身之一',
  },
  {
    time: '10:30',
    text: '每日三省吾身之二',
  },
  {
    time: '11:30',
    text: '每日三省吾身之三',
  },
];
<\/script>

<template>
  <h-calendar>
    <template #dateCellAppend="dateFormat">
      <div v-if="today === dateFormat" class="wrap">
        <div v-for="item of actionList.slice(0, 3)" :key="item.time" class="row">
          <div class="dot" />
          {{ item.time }} {{item.text}}
        </div>
        <template v-if="actionList.length > 3">
          <h-popover placement="bottom-start" :arrow="false" :distance="0">
            <template #reference>
              <div class="row desc">
                还有{{ actionList.length - 3 }}个日程
              </div>
            </template>
            <template #popper>
              <h-pop-content class="pop-content">
                <div class="title">{{ dayjs().format('MM.DD dddd') }}</div>
                <div class="content">
                  <div v-for="item of actionList.slice(3)" :key="item.time" class="row">
                    <div class="dot" />
                    {{ item.time }} {{item.text}}
                  </div>
                </div>
              </h-pop-content>
            </template>
          </h-popover>
        </template>
      </div>
    </template>
  </h-calendar>
</template>

<style>
.wrap {
  margin: 0 -8px;
}

.row {
  height: 26px;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.row.desc {
  color: var(--h-text-disabled);
  cursor: pointer;
}

.pop-content {
  padding: 20px;
  width: 300px;
}

.title {
  height: 28px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid var(--h-divider-default);
  padding-bottom: 17px;
  margin-bottom: 15px;
}

.dot {
  width: 8px;
  height: 8px;
  background: var(--h-bg-brand-default);
  margin-right: 4px;
}
</style>
`,
    path: "demos/components/Calendar/custom-date.vue"
  }, null, _parent));
  _push(`<h2 id="calendar-api" class="no-underline h2"><a href="#calendar-api" class="!no-underline">Calendar Api</a></h2><h3 id="calendar-props" class="no-underline h3"><a href="#calendar-props" class="!no-underline">Calendar Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>Configuration for model value.</td><td><code>Date | string | Dayjs</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mode</td><td>Configuration for mode.</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td class="text-center">No</td><td>&#39;month&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mode-switchable</td><td>Configuration for mode switchable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mode-switchable-list</td><td>Configuration for mode switchable list.</td><td><code>Array&lt;&#39;year&#39; | &#39;month&#39; | &#39;week&#39; | &#39;day&#39;&gt;</code></td><td class="text-center">No</td><td>() =&gt; [&#39;year&#39;, &#39;month&#39;, &#39;week&#39;]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default-start-hour</td><td>Configuration for default start hour.</td><td><code>number</code></td><td class="text-center">No</td><td>8</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format</td><td>Configuration for format.</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;YYYY-MM-DD&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">date-type</td><td>Configuration for date type.</td><td><code>&#39;full&#39; | &#39;only-current&#39;</code></td><td class="text-center">No</td><td>&#39;full&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disable-date</td><td>Configuration for disable date.</td><td><code>(date: Dayjs) =&gt; boolean</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disable-hours</td><td>Configuration for disable hours.</td><td><code>(date: Dayjs) =&gt; Array&lt;[Dayjs, Dayjs]&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hour-format</td><td>Configuration for hour format.</td><td><code>&#39;24&#39; | &#39;12&#39;</code></td><td class="text-center">No</td><td>&#39;12&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pickable</td><td>Configuration for pickable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">enable-create-pin-flags</td><td>Configuration for enable create pin flags.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">creating-pin-flag-callback</td><td>Configuration for creating pin flag callback.</td><td><code>(date: Dayjs) =&gt; {<br>        title?: string;<br>        type?: HCalendarPinFlag[&#39;type&#39;];<br>      }</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">creat-finish-flag-callback</td><td>Configuration for creat finish flag callback.</td><td><code>(flag: HCalendarPinFlag) =&gt; Promise&lt;boolean | HCalendarPinFlag&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">create-flag-can-though-disable-date-or-hour</td><td>Configuration for create flag can though disable date or hour.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pin-flags</td><td>Configuration for pin flags.</td><td><code>HCalendarPinFlag[]</code></td><td class="text-center">No</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pin-flags-show-time</td><td>Configuration for pin flags show time.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-spacing-between-flags</td><td>Configuration for show spacing between flags.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-fit</td><td>Configuration for auto fit.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">current-time-line</td><td>Configuration for current time line.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr></tbody></table><h3 id="calendar-emits" class="no-underline h3"><a href="#calendar-emits" class="!no-underline">Calendar Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:pin-flags</td><td rowspan="1">Emitted when update:pin flags changes.</td><td rowspan="1">( pinFlags: <code>HCalendarPinFlag[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pinFlags</td><td><code>HCalendarPinFlag[]</code></td><td>The pin flags value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:mode</td><td rowspan="1">Emitted when update:mode changes.</td><td rowspan="1">( mode: <code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mode</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td>The mode value.</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="3">Emitted when change changes.</td><td rowspan="3">( date: <code>string</code>, type: <code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code>, rawDate: <code>Dayjs</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">date</td><td><code>string</code></td><td>The date value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td>The type value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rawDate</td><td><code>Dayjs</code></td><td>The raw date value.</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">date-click</td><td rowspan="3">Emitted when date click changes.</td><td rowspan="3">( date: <code>string</code>, type: <code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code>, rawDate: <code>Dayjs</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">date</td><td><code>string</code></td><td>The date value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td>The type value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rawDate</td><td><code>Dayjs</code></td><td>The raw date value.</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">type-change</td><td rowspan="3">Emitted when type change changes.</td><td rowspan="3">( date: <code>string</code>, type: <code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code>, rawDate: <code>Dayjs</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">date</td><td><code>string</code></td><td>The date value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td>The type value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rawDate</td><td><code>Dayjs</code></td><td>The raw date value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">pin-flag-click</td><td rowspan="1">Emitted when pin flag click changes.</td><td rowspan="1">( pinFlag: <code>HCalendarPinFlag</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pinFlag</td><td><code>HCalendarPinFlag</code></td><td></td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">prev-click</td><td rowspan="3">Emitted when prev click changes.</td><td rowspan="3">( prevDate: <code>string</code>, type: <code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code>, rawDate: <code>Dayjs</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prevDate</td><td><code>string</code></td><td>The prev date value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td>The type value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rawDate</td><td><code>Dayjs</code></td><td>The raw date value.</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">next-click</td><td rowspan="3">Emitted when next click changes.</td><td rowspan="3">( nextDate: <code>string</code>, type: <code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code>, rawDate: <code>Dayjs</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">nextDate</td><td><code>string</code></td><td>The next date value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td>The type value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rawDate</td><td><code>Dayjs</code></td><td>The raw date value.</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Calendar.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Calendar as default
};
