import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Calendar.md","filePath":"zh/demos/components/Calendar.md"}');
const _sfc_main = { name: "demos/components/Calendar.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Calendar</h1><p class="description">用来显示日期，并且可以方便的在日历上以横幅的方式展示某些活动</p><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2>`);
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
  _push(`<h2 id="日期模式" tabindex="-1">日期模式 <a class="header-anchor" href="#日期模式" aria-label="Permalink to &quot;日期模式&quot;">​</a></h2><p>可以通过设置 <code>date-type</code> 为 <code>only-current</code> 来控制不展示非当月的日期</p>`);
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
  _push(`<h2 id="可以选择日期" tabindex="-1">可以选择日期 <a class="header-anchor" href="#可以选择日期" aria-label="Permalink to &quot;可以选择日期&quot;">​</a></h2>`);
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
  _push(`<h2 id="设置横幅" tabindex="-1">设置横幅 <a class="header-anchor" href="#设置横幅" aria-label="Permalink to &quot;设置横幅&quot;">​</a></h2><p>可以通过 <code>pin-flags</code> 设置展示的横幅，用来展示一些活动</p>`);
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
  _push(`<h2 id="设置周、日的横幅" tabindex="-1">设置周、日的横幅 <a class="header-anchor" href="#设置周、日的横幅" aria-label="Permalink to &quot;设置周、日的横幅&quot;">​</a></h2><p>可以通过 <code>pin-flags</code> 设置展示的横幅，并可以精细化设置时间，用来展示一些活动</p><p>使用 <code>disableHours</code> 回调函数，返回给与的当天的不可用的小时区间</p>`);
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
  _push(`<h2 id="自定义头部" tabindex="-1">自定义头部 <a class="header-anchor" href="#自定义头部" aria-label="Permalink to &quot;自定义头部&quot;">​</a></h2>`);
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
  _push(`<h2 id="自定义日期格子内容" tabindex="-1">自定义日期格子内容 <a class="header-anchor" href="#自定义日期格子内容" aria-label="Permalink to &quot;自定义日期格子内容&quot;">​</a></h2>`);
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
  _push(`<h2>Calendar Api</h2><h3>Calendar Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v-model</td><td>当前日历显示的日期<br>既可以传入 <code>Date</code>，也可以是可以被 <code>dayjs</code> 解析的合法日期的字符串<br>如果为空，则默认显示当前时间所在年/月/周</td><td><code>Date | string | Dayjs</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mode</td><td>显示类型，默认为 &#39;month&#39;，如果 &#39;month&#39; 不在 <code>modeSwitchableList</code> 中，则取 <code>modeSwitchableList</code> 第一项<br><code>month</code>: 月历<br><code>week</code>: 周历<br><code>year</code>: 年历<br><code>day</code>: 日历</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td class="text-center">否</td><td>&#39;month&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mode-switchable</td><td>是否允许切换显示类型</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mode-switchable-list</td><td>允许切换显示类型的列表</td><td><code>Array&lt;&#39;year&#39; | &#39;month&#39; | &#39;week&#39; | &#39;day&#39;&gt;</code></td><td class="text-center">否</td><td>() =&gt; [&#39;year&#39;, &#39;month&#39;, &#39;week&#39;]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default-start-hour</td><td>默认开始展示小时<br>在 <code>mode</code> 为 <code>week</code> 或 <code>day</code> 时有效</td><td><code>number</code></td><td class="text-center">否</td><td>8</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format</td><td>日期格式化，会影响回调的日期格式</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;YYYY-MM-DD&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">date-type</td><td>日期显示方式<br><code>full</code>: 全部展示（默认）<br><code>only-current</code>: 仅显示当月日期，不显示上个月、下个月的日期</td><td><code>&#39;full&#39; | &#39;only-current&#39;</code></td><td class="text-center">否</td><td>&#39;full&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disable-date</td><td>禁用的日期，用于 <code>mode</code> 为 <code>year</code> 或 <code>month</code></td><td><code>(date: Dayjs) =&gt; boolean</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disable-hours</td><td>禁用的小时的钩子，用于 <code>mode</code> 为 <code>week</code> 或 <code>day</code></td><td><code>(date: Dayjs) =&gt; Array&lt;[Dayjs, Dayjs]&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hour-format</td><td>周历和日历上，小时显示方式</td><td><code>&#39;24&#39; | &#39;12&#39;</code></td><td class="text-center">否</td><td>&#39;12&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pickable</td><td>是否允许选择日期或时间</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">enable-create-pin-flags</td><td>是否允许创建横幅</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">creating-pin-flag-callback</td><td>创建横幅时的回调<br>需要返回 <code>title</code> 或 <code>type</code></td><td><code>(date: Dayjs) =&gt; {<br>        title?: string;<br>        type?: HCalendarPinFlag[&#39;type&#39;];<br>      }</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">creat-finish-flag-callback</td><td>创建 Flag 的回调:<br><code>false</code> 会删除 <code>Flag</code><br><code>true</code> 会保留临时创建的 <code>Flag</code><br><code>HCalendarPinFlag</code> 对象，会根据回调对象修改临时创建 <code>Flag</code> 的对象</td><td><code>(flag: HCalendarPinFlag) =&gt; Promise&lt;boolean | HCalendarPinFlag&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">create-flag-can-though-disable-date-or-hour</td><td>是否允许横幅创建时穿过不可用日期和时间</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pin-flags</td><td>横幅内容<br>一般可设置某些日期范围内的活动标识<br>要注意时区问题<br>会自动根据开始时间和结束时间排序</td><td><code>HCalendarPinFlag[]</code></td><td class="text-center">否</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pin-flags-show-time</td><td>横幅是否展示时间，如果跨天则会附加展示日期</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-spacing-between-flags</td><td>是否在两个紧接着的横幅中间留有空隙<br>仅限 <code>mode</code> 为 <code>&#39;week&#39;</code> 和 <code>&#39;day&#39;</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-fit</td><td>是否自动填满父容器<br>不可用于 <code>mode</code> 为 <code>week</code> 和 <code>day</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">current-time-line</td><td>是否显示当前时间的标线<br>仅在 <code>mode</code> 为 <code>week</code> 和 <code>day</code> 时有效</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr></tbody></table><h3>Calendar Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:pin-flags</td><td rowspan="1">当 <code>pinFlags</code> 变化时触发</td><td rowspan="1">( pinFlags: <code>HCalendarPinFlag[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pinFlags</td><td><code>HCalendarPinFlag[]</code></td><td>更改后的 <code>pinFlags</code></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:mode</td><td rowspan="1">当 <code>mode</code> 变化时触发</td><td rowspan="1">( mode: <code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mode</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td><code>month</code> | <code>year</code> | <code>week</code> | <code>day</code></td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="3">当当前日期变化时响应</td><td rowspan="3">( date: <code>string</code>, type: <code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code>, rawDate: <code>Dayjs</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">date</td><td><code>string</code></td><td>根据 <code>format</code> 做的格式转换后的日期</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td>当前日历类型</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rawDate</td><td><code>Dayjs</code></td><td>原始Dayjs对象</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">date-click</td><td rowspan="3">当日期被点击时触发，只有当 <code>clickable = true</code> 后点击日期才可以被触发</td><td rowspan="3">( date: <code>string</code>, type: <code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code>, rawDate: <code>Dayjs</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">date</td><td><code>string</code></td><td>根据 <code>format</code> 做的格式转换后的日期</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td>当前日历类型</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rawDate</td><td><code>Dayjs</code></td><td>原始Dayjs对象</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">type-change</td><td rowspan="3">当日历类型切换后时触发</td><td rowspan="3">( date: <code>string</code>, type: <code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code>, rawDate: <code>Dayjs</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">date</td><td><code>string</code></td><td>根据 <code>format</code> 做的格式转换后的日期</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td>当前日历类型</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rawDate</td><td><code>Dayjs</code></td><td>原始Dayjs对象</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">pin-flag-click</td><td rowspan="1">当横幅被点击时触发</td><td rowspan="1">( pinFlag: <code>HCalendarPinFlag</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">pinFlag</td><td><code>HCalendarPinFlag</code></td><td></td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">prev-click</td><td rowspan="3">点击切换上一个切换时触发</td><td rowspan="3">( prevDate: <code>string</code>, type: <code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code>, rawDate: <code>Dayjs</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prevDate</td><td><code>string</code></td><td>切换后的日期时间</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td>当前日历类型</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rawDate</td><td><code>Dayjs</code></td><td>原始Dayjs对象</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">next-click</td><td rowspan="3">点击切换下一个时触发</td><td rowspan="3">( nextDate: <code>string</code>, type: <code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code>, rawDate: <code>Dayjs</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">nextDate</td><td><code>string</code></td><td>切换后的日期时间</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td><code>&#39;month&#39; | &#39;year&#39; | &#39;week&#39; | &#39;day&#39;</code></td><td>当前日历类型</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">rawDate</td><td><code>Dayjs</code></td><td>原始Dayjs对象</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Calendar.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Calendar as default
};
