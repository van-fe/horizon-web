import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/VirtualScroller.md","filePath":"en/demos/components/VirtualScroller.md"}');
const _sfc_main = { name: "en/demos/components/VirtualScroller.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>VirtualScroller</h1><p class="description">If you can determine the element size scenario, using RecycleScroller will have better performance</p><h2 id="recyclescroller-basic-usage" tabindex="-1">RecycleScroller Basic Usage <a class="header-anchor" href="#recyclescroller-basic-usage" aria-label="Permalink to &quot;RecycleScroller Basic Usage&quot;">​</a></h2><p>If you can determine the element size scenario, using RecycleScroller will have better performance</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="recycle-scroller-demo">
    <!-- 测试条件 -->
    <section>
      <h-alert
        type="warning"
        title="注意: 必需为该组件提供item的高度信息!"
        description="可以通过设置itemSize, itemSecondarySize, minItemSize为item设置高度. 或者在数据中提供高度字段, 但需要sizeField配合"
        size="small"
        show-icon
        round
        :closable="false"
      />
      <h-row :gutter="14" style="margin-top: 20px">
        <h-col :span="12">
          <h-row>
            <h-col :span="5" class="align-center">生成数据</h-col>
            <h-col :span="11">
              <h-input-number v-model="inputCount" @input="inputCountInput"></h-input-number>
            </h-col>
            <h-col :span="8">
              <h-button circle type="primary" size="medium" @click="addItem">+1</h-button>
            </h-col>
          </h-row>
        </h-col>
        <h-col :span="12">
          <h-row>
            <h-col :span="8" class="align-center">从数据中获得高度</h-col>
            <h-col :span="16"><h-checkbox v-model="enableLetters"></h-checkbox></h-col>
          </h-row>
        </h-col>
        <!-- <h-col :span="8">
          <h-row>
            <h-col :span="7" class="align-center">
              页面模式
              <div>(pageMode属性)</div>
            </h-col>
            <h-col :span="15" style="color: #999">
              开启页面模式会取消组件自己的滚动属性, 找到组件的父滚动容器作为'根'计算虚拟滚动
            </h-col>
          </h-row>
        </h-col> -->
      </h-row>
      <h-row :gutter="14">
        <h-col :span="12">
          <h-row>
            <h-col :span="5" class="align-center">缓存值设置</h-col>
            <h-col :span="11">
              <h-input-number v-model="buffer" :max="1000" :min="1"></h-input-number>
            </h-col>
            <h-col :span="8"></h-col>
          </h-row>
        </h-col>
        <h-col :span="12">
          <h-row>
            <h-col :span="5" class="align-center">滚动至</h-col>
            <h-col :span="11"><h-input-number v-model="scrollTo"></h-input-number></h-col>
            <h-col :span="8">
              <h-button circle type="primary" size="medium" @click="doScrollTo">执行</h-button>
            </h-col>
          </h-row>
        </h-col>
      </h-row>
      <h-row style="padding-bottom: 24px; border-bottom: 1px solid #ccc">
        <h-col :span="3" class="align-center">滚动状态</h-col>
        <h-col :span="21" class="align-center">
          ({{ updateParts.viewStartIdx }} - [{{ updateParts.visibleStartIdx }} -
          {{ updateParts.visibleEndIdx }}] - {{ updateParts.viewEndIdx }})
          <br />
          (元素索引开始于 - [可见元素开始于 - 可见元素结束于] - 元素索引结束于)
        </h-col>
      </h-row>
    </section>

    <!-- 组件 -->
    <h-recycle-scroller
      ref="scrollerRef"
      class="scroller"
      :scroller-height="500"
      :items="items"
      :buffer="buffer"
      :item-size="itemHeight"
      :page-mode="pageMode"
      size-field="height"
      emit-update
      @scroll-start="onScrollTop"
      @scroll-end="onScrollEnd"
      @update="onUpdate"
    >
      <!-- before 插槽 -->
      <template #before>
        <h-alert title="我是before插槽" type="success" round :closeable="false"></h-alert>
      </template>

      <template #default="props">
        <div v-if="props.item.type === 'letter'" class="tr letter big">
          <div class="td index">{{ props.index }}</div>
          <div class="td value">{{ props.item.value.name }} Scoped</div>
        </div>
        <div v-else class="tr person">
          <div class="td index">{{ props.index }}</div>
          <div class="td">
            <div class="info">
              <div class="avatar">
                <img v-if="props.item.value.avatar" :src="props.item.value.avatar" alt="" />
              </div>
              <span>{{ props.item.value.name }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- <template #after>
        i'm after slot
      </template> -->
    </h-recycle-scroller>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick, watch, computed } from 'vue';
import { HRecycleScrollerInstance } from '@aurora/horizon-web';
import { faker } from '@faker-js/faker';

type Value = {
  name: String;
  avatar: String;
};
type Item = {
  id: number;
  index: number;
  type: String;
  value: Value;
  height: number;
};

export default defineComponent({
  setup() {
    let uid = 0;

    const scrollerRef = ref<HRecycleScrollerInstance | null>(null);

    const items = ref<Item[]>([]);
    const count = ref<number>(10000);
    const buffer = ref<number>(200);
    // 是否在每个字母区的第一个添加 组名. 如果添加: 则itemSize为null, 组件会根据数据中的height来计算每一项高度;
    const enableLetters = ref<Boolean>(true);
    const pageMode = ref<Boolean>(false);
    const scrollTo = ref<number>(100);
    const updateParts = ref<{
      viewStartIdx: number;
      viewEndIdx: number;
      visibleStartIdx: number;
      visibleEndIdx: number;
    }>({
      viewStartIdx: 0,
      viewEndIdx: 0,
      visibleStartIdx: 0,
      visibleEndIdx: 0,
    });

    const itemHeight = computed((): number | null => {
      return enableLetters.value ? null : 50;
    });

    const inputCount = computed({
      get: () => count.value,
      set: (val: number) => {
        if (val > 200000) {
          val = 200000;
        } else if (val < 0) {
          val = 0;
        }
        count.value = val;
      },
    });

    // 切换是否添加组头字母时, 重新生成数据;
    watch(
      () => enableLetters.value,
      () => generateItems(),
    );

    watch(
      () => count.value,
      () => generateItems(),
    );

    onMounted(() => {
      nextTick(generateItems);
    });

    function generateItems() {
      const _items = _getData(count.value, enableLetters.value);
      items.value = _items;
    }

    function _generateItem() {
      return {
        name: faker.person.fullName(),
        // avatar: faker.internet.avatar(),
        avatar: 'https://www.example.com/cdn-static/mydemo/nextjs/images/home/demoApp/demo-app-logo.png',
      };
    }

    function _getData(count: number, letters: Boolean): Item[] {
      const raw: { [key: string]: Array<{ name: string; avatar: string }> } = {};

      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

      for (const l of alphabet) {
        raw[l] = [];
      }

      for (let i = 0; i < count; i++) {
        const item = _generateItem();
        const letter = item.name.charAt(0).toLowerCase();
        raw[letter].push(item);
      }

      const list = [];
      let index = 1;

      for (const l of alphabet) {
        raw[l] = raw[l].sort((a, b) => (a.name < b.name ? -1 : 1));
        if (letters) {
          list.push({
            id: uid++,
            index: index++,
            type: 'letter',
            value: { name: l, avatar: '' },
            height: 200,
          });
        }

        for (const item of raw[l]) {
          list.push({
            id: uid++,
            index: index++,
            type: 'person',
            value: item,
            // height: Math.round(Math.random() * (100 - 50)) + 50,
            height: 50,
          });
        }
      }

      return list;
    }

    function _addItem(l: Item[]) {
      l.push({
        id: uid++,
        index: l.length + 1,
        type: 'person',
        value: _generateItem(),
        height: 50,
        // height: Math.round(Math.random() * (60 - 30)) + 30,
      });
    }

    function inputCountInput(val: number) {
      count.value = val;
    }

    function doScrollTo() {
      scrollerRef.value?.scrollToItem(scrollTo.value);
    }

    function addItem() {
      _addItem(items.value);
    }

    function onUpdate(
      viewStartIndex: number,
      viewEndIndex: number,
      visibleStartIndex: number,
      visibleEndIndex: number,
    ) {
      updateParts.value.viewStartIdx = viewStartIndex;
      updateParts.value.viewEndIdx = viewEndIndex;
      updateParts.value.visibleStartIdx = visibleStartIndex;
      updateParts.value.visibleEndIdx = visibleEndIndex;
    }

    function onScrollTop() {
      console.info('组件滚动到起始位置了~~');
    }

    function onScrollEnd() {
      console.info('组件滚动到未尾位置了~~');
    }

    return {
      inputCount,
      items,
      itemHeight,
      buffer,
      enableLetters,
      pageMode,
      scrollTo,
      scrollerRef,
      updateParts,
      doScrollTo,
      addItem,
      onUpdate,
      inputCountInput,
      onScrollTop,
      onScrollEnd,
    };
  },
});
<\/script>

<style lang="scss" scoped>
.recycle-scroller-demo:not(.page-mode) {
  height: 100%;
  display: flex;
  flex-direction: column;

  .h-alert {
    :deep(.h-alert__mul-close) {
      display: none;
    }
  }
}
.align-center {
  line-height: 2.3;
  white-space: nowrap;
}
.scroller {
  width: 100%;
  height: 500px;
}
.letter {
  text-transform: uppercase;
  color: grey;
  font-weight: bold;
}
.h-recycle-scroller__item-view {
  cursor: pointer;
}
:deep(.h-recycle-scroller__item-view) {
  cursor: pointer;
  &.is-hover {
    background-color: #4fc08d;
  }
}

.h-recycle-scroller__item-view .tr {
  display: flex;
  align-items: center;
}

.letter .td {
  padding: 12px;
}

.letter.big {
  font-weight: normal;
  height: 200px;
}

.letter.big .value {
  font-size: 120px;
}
.index {
  color: rgba(0, 0, 0, 0.2);
  width: 55px;
  text-align: right;
  flex: auto 0 0;
}

.person .td:first-child {
  padding: 12px;
}

.person .info {
  display: flex;
  align-items: center;
  height: 48px;
}

.avatar {
  width: 50px;
  height: 50px;
  margin: 2px 12px 2px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar img {
  width: 90%;
  height: 90%;
}
</style>
`,
    path: "demos/components/VirtualScroller/RecycleScrollerDemo.vue"
  }, null, _parent));
  _push(`<h2 id="recyclescroller-grid-usage" tabindex="-1">RecycleScroller Grid Usage <a class="header-anchor" href="#recyclescroller-grid-usage" aria-label="Permalink to &quot;RecycleScroller Grid Usage&quot;">​</a></h2><p>In grid mode, itemSize is the width and height of a single grid. You can achieve different widths and heights with itemSecondarySize</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="grid-scroller-demo">
    <section class="toolbar">
      <div class="tip">每行网格数:</div>
      <div class="slider-wrap">
        <h-slider
          v-model="gridItems"
          :min="2"
          :max="10"
        ></h-slider>
      </div>
      <div class="grid-num">{{ gridItems }}</div>
    </section>

    <h-recycle-scroller
      class="scroller"
      :item-size="128"
      :items="items"
      :grid-items="gridItems"
    >
      <template #default="{ item, index }">
        <div class="item">
          <div class="index">{{ index }}</div>
          <div class="name">{{ item.name }}</div>
        </div>
      </template>
    </h-recycle-scroller>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import { faker } from '@faker-js/faker';

type Item = {
  id: number;
  name: string;
}

const gridItems = ref(5);
const items = ref<Item[]>([]);

onMounted(() => {
  for (let i = 0; i < 5000; i++) {
    items.value.push({
      id: i,
      name: faker.person.fullName(),
    });
  }
});
<\/script>

<style lang="scss" scoped>
.grid-scroller-demo {
  height: 500px;
  display: flex;
  flex-direction: column;

  .toolbar {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .tip {
      margin-right: 10px;
      width: 100px;
    }
    .slider-wrap {
      width: 160px;
    }
    .grid-num {
      background-color: rgb(196, 196, 196);
      margin-left: 10px;
      border-radius: 4px;
      padding: 0 10px;
    }
  }

  .scroller {
    flex: 1;
  }

  .item {
    border: 1px solid #cecece;
    border-radius: 4px;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
    height: 100%;
    cursor: pointer;

    &:hover {
      background-color: #c8c8c8;
    }
  }
}
</style>`,
    path: "demos/components/VirtualScroller/GridDemo.vue"
  }, null, _parent));
  _push(`<h2 id="virtualscroller-basic-usage" tabindex="-1">VirtualScroller Basic Usage <a class="header-anchor" href="#virtualscroller-basic-usage" aria-label="Permalink to &quot;VirtualScroller Basic Usage&quot;">​</a></h2><p>VirtualScroller doesn&#39;t care whether the elements wrapped by the scroll container have specified heights</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="virtual-scroller-demo">
    <section class="toolbar">
      <h-row>
        <h-col :span="10">
          <h-input v-model="tmpKw" placeholder="type kw to search">
            <template #append>
              <h-button :icon="IconSearch" size="medium" @click="doSearch"></h-button>
            </template>
          </h-input>
        </h-col>
        <h-col :span="20"></h-col>
      </h-row>
    </section>
    <h-virtual-scroller class="scroller" :items="filteredItems" :min-item-size="54">
      <template #before>
        <div class="notice">这是一个消息列表, 我们并不清楚任意一个消息元素的高度~</div>
      </template>
      <template #after>
        <div class="notice">已经没有更多了~</div>
      </template>
      <template #empty>no data yet~!</template>

      <template #default="{ item, active, index }">
        <h-virtual-scroller-item
          :item="item"
          :active="active"
          :data-active="active"
          :data-index="index"
          :size-dependencies="[item.message]"
          :title="\`Click to change message \${index}\`"
          class="message"
        >
          <div class="avatar">
            <img :key="item.avatar" :src="item.avatar" alt="avatar" class="image" />
          </div>
          <div class="text">
            {{ item.message }}
          </div>
          <div class="index">
            <span>{{ item.id }} (id)</span>
            <span>{{ index }} (index)</span>
          </div>
        </h-virtual-scroller-item>
        <!-- <div class="">{{ JSON.stringify(props) }}</div> -->
      </template>
    </h-virtual-scroller>
  </div>
</template>

<script lang="ts">
import { faker } from '@faker-js/faker';
import { defineComponent, onMounted, ref, computed } from 'vue';
import { IconSearch } from '@aurora/icon';

type Message = {
  id: number;
  avatar: string;
  message: string;
};

export default defineComponent({
  name: 'VirtualScrollerDemo',
  setup() {
    const items = ref<Message[]>([]);
    const kw = ref<string>('');
    const tmpKw = ref<string>('');

    function generateMessage() {
      return {
        avatar: 'https://www.example.com/cdn-static/mydemo/nextjs/images/home/demoApp/demo-app-logo.png',
        message: faker.lorem.text(),
      };
    }

    const filteredItems = computed((): Message[] => {
      let ret: Message[] = [];
      if (!kw.value) ret = items.value;
      const lowerKw = kw.value.toLowerCase();
      ret = items.value.filter(i => i.message.toLowerCase().includes(lowerKw));
      return ret;
    });

    onMounted(() => {
      for (let i = 0; i < 10000; i++) {
        items.value.push({
          id: i,
          ...generateMessage(),
        });
      }
    });

    function doSearch() {
      kw.value = tmpKw.value;
    }

    return {
      filteredItems,
      tmpKw,
      doSearch,
    };
  },
  computed: {
    IconSearch() {
      return IconSearch;
    },
  },
});
<\/script>

<style lang="scss">
.virtual-scroller-demo {
  height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.scroller {
  flex: auto 1 1;
  border: solid 1px #42b983;
}

.toolbar {
  flex: auto 0 0;
  text-align: center;
}

.notice {
  padding: 24px;
  font-size: 20px;
  color: #999;
}

.message {
  display: flex;
  min-height: 32px;
  padding: 12px;
  box-sizing: border-box;
}

.avatar {
  flex: auto 0 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
}

.avatar .image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}

.index,
.text {
  flex: 1;
}

.text {
  max-width: 400px;
}

.index {
  opacity: 0.5;
}

.index span {
  display: inline-block;
  width: 160px;
  text-align: right;
}
</style>
`,
    path: "demos/components/VirtualScroller/VirtualScrollerDemo.vue"
  }, null, _parent));
  _push(`<h2 id="virtualscroller-horizontal-scroll" tabindex="-1">VirtualScroller Horizontal Scroll <a class="header-anchor" href="#virtualscroller-horizontal-scroll" aria-label="Permalink to &quot;VirtualScroller Horizontal Scroll&quot;">​</a></h2><p>VirtualScroller doesn&#39;t care whether the elements wrapped by the scroll container have specified widths. In the Demo, setting random width for HVirtualScrollerItem is to make the text wrap</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="virtual-scroller-horizontal">
    <section class="toolbar">
      <h-row>
        <h-col :span="10">
          <h-input v-model="tmpKw" placeholder="type kw to search">
            <template #append>
              <h-button :icon="IconSearch" size="medium" type="info" @click="doSearch"></h-button>
            </template>
          </h-input>
        </h-col>
        <h-col :span="20"></h-col>
      </h-row>
    </section>

    <h-virtual-scroller
      :items="filteredItems"
      :min-item-size="54"
      direction="horizontal"
      :scroller-height="500"
      class="scroller-h"
    >
      <template #default="{ item, index, active }">
        <h-virtual-scroller-item
          :item="item"
          :active="active"
          :title="\`Click to change message \${index}\`"
          :style="{
            width: \`\${Math.max(130, Math.round((item.message.length / 20) * 20))}px\`,
          }"
          class="message-h"
        >
          <div class="avatar-h">
            <img :key="item.avatar" :src="item.avatar" alt="avatar" class="image-h" />
          </div>
          <div class="text-h">
            {{ item.message }}
          </div>
          <div class="index-h">
            <span>{{ item.id }} (id)</span>
            <span>{{ index }} (index)</span>
          </div>
        </h-virtual-scroller-item>
      </template>
    </h-virtual-scroller>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { faker } from '@faker-js/faker';
import { IconSearch } from '@aurora/icon';

type Message = {
  id: number | string;
  avatar: string;
  message: string;
};

const items = ref<Message[]>([]);
const kw = ref<string>('');
const tmpKw = ref<string>('');

const filteredItems = computed((): Message[] => {
  let ret: Message[] = [];
  if (!kw.value) ret = items.value;
  const lowerKw = kw.value.toLowerCase();
  ret = items.value.filter(i => i.message.toLowerCase().includes(lowerKw));
  return ret;
});

function generateItems() {
  for (let i = 0; i < 10000; i++) {
    items.value.push({
      id: i + '_sjifeji',
      message: faker.lorem.text(),
      avatar: 'https://www.example.com/cdn-static/mydemo/nextjs/images/home/demoApp/demo-app-logo.png',
    });
  }
}

function doSearch() {
  kw.value = tmpKw.value;
}

generateItems();
<\/script>

<style lang="scss" scoped>
.virtual-scroller-horizontal {
  height: 100%;
  min-height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.scroller-h {
  flex: auto 1 1;
  flex-direction: column;
}
.message-h {
  display: flex;
  flex-direction: column;
  min-height: 32px;
  padding: 12px;
  box-sizing: border-box;
}

.avatar-h {
  flex: auto 0 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
  margin-bottom: 10px;
}

.avatar-h .image-h {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}

.index-h,
.text-h {
  flex: 1;
  margin-bottom: 10px;
}

.index-h {
  opacity: 0.5;
  display: flex;
  flex-direction: column;
}

.index-h span {
  display: inline-block;
}
</style>
`,
    path: "demos/components/VirtualScroller/HorizontalDemo.vue"
  }, null, _parent));
  _push(`<h2>VirtualScroller Api</h2><h3>VirtualScroller Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">items</td><td>用于展示的数据</td><td><code>any[]</code></td><td class="text-center">Yes</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">min-item-size</td><td>如果项目的高度（或水平模式下的宽度）未知，则使用最小尺寸。</td><td><code>number | string</code></td><td class="text-center">Yes</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key-field</td><td>指定传入items的row-key</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;id&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">direction</td><td>组件滚动方向, Default为 vertical</td><td><code>&#39;horizontal&#39; | &#39;vertical&#39;</code></td><td class="text-center">No</td><td>&#39;vertical&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">list-tag</td><td>自定义滚动容器的元素Type</td><td><code>keyof HTMLElementTagNameMap</code></td><td class="text-center">No</td><td>&#39;div&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">item-tag</td><td>自定义 用来包裹滚动项目的元素Type</td><td><code>keyof HTMLElementTagNameMap</code></td><td class="text-center">No</td><td>&#39;div&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroller-height</td><td>滚动容器高度</td><td><code>number | string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroller-max-height</td><td>滚动容器最大高度</td><td><code>number | string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">emit-update</td><td>(default: false): 是否开启每次更新虚拟滚动条内容时都会发出“update”事件（可能会影响性能）。</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">update-interval</td><td>(default: 0):每次更新列表状态后, 对列表重新排序的延迟时间</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">buffer</td><td>(default: 200) 设置可视区域外多少像素, 开始预渲染节点</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-wrapper-by-children</td><td>是否根据子元素的宽高撑开父容器<br>开启会影响性能，请酌情使用</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3>VirtualScroller Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">resize</td><td rowspan="1">滚动视口尺寸发生改变时的事件</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td rowspan="1">组件visible值发生改变时的事件</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="4" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update</td><td rowspan="4">组件滚动产生项目位置变化后的事件</td><td rowspan="4">( startIndex: <code>number</code>, endIndex: <code>number</code>, visibleStartIndex: <code>number</code>, visibleEndIndex: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">startIndex</td><td><code>number</code></td><td>已经渲染但没有进入视口的元素的索引值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">endIndex</td><td><code>number</code></td><td>已经渲染但是已经划出视口的元素的索引值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visibleStartIndex</td><td><code>number</code></td><td>进入视口的起始元素索引值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visibleEndIndex</td><td><code>number</code></td><td>进入视口的结束元素索引值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">mouse-enter</td><td rowspan="1">鼠标移入</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">mouse-leave</td><td rowspan="1">鼠标移出</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-end</td><td rowspan="1">组件滚动到末尾触发的事件</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-start</td><td rowspan="1">组件滚动到起始位置时触发的事件</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-begin</td><td rowspan="1">滚动开始时触发通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-stop</td><td rowspan="1">滚动结束后触发通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3>VirtualScroller Exposes</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollToItem</td><td rowspan="1">使组件滚动到指定索引值位置;</td><td rowspan="1">( index: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">index</td><td><code>number</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollToBottom</td><td rowspan="1">使列表滚动到结尾</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2>VirtualScrollerItem Api</h2><h3>VirtualScrollerItem Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">item</td><td>数据源, 只能是NVirtualScroller组件default插槽提供的数据</td><td><code>object</code></td><td class="text-center">Yes</td><td>() =&gt; ({})</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">watch-data</td><td>开启对itemName的深度监听, 以重新计算尺寸(不推荐, 性能不好)</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active</td><td>由RecycleScroller提供, 标记该项目为活动状态.避免不必要的尺寸计算</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">index</td><td>simpleArray模式下, index作为数据主键</td><td><code>number</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size-dependencies</td><td>指明会影响尺寸变化的字段, 比watchData高效. 此处指定的数据变化会导致尺寸重新计算</td><td><code>array</code></td><td class="text-center">No</td><td>null</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">emit-resize</td><td>项目尺寸变化后, 是否发送resize事件</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tag</td><td>用来渲染VirtualScrollerItem根元素的htmlType, 默认为div</td><td><code>keyof HTMLElementTagNameMap</code></td><td class="text-center">No</td><td>&#39;div&#39;</td></tr></tbody></table><h3>VirtualScrollerItem Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">resize</td><td rowspan="1">元素被监听到尺寸变化时的事件</td><td rowspan="1">( id: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">id</td><td><code>number</code></td><td>发生变化的Item的id</td></tr></tbody></table><h2>RecycleScroller Api</h2><h3>RecycleScroller Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">items</td><td>用于展示的数据</td><td><code>any[]</code></td><td class="text-center">Yes</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">key-field</td><td>指定传入items的row-key</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;id&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type-field</td><td>(default: &#39;type&#39;)用于区分列表中不同种类组件的字段。 对于每种不同的Type，将创建一个回收项目池。</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;type&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size-field</td><td>用于在可变大小模式下获取项目大小的字段。</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;size&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">page-mode</td><td>页面模式扩展了虚拟滚动器并使用页面视口来计算哪些项目是可见的。 这样，您就可以在前后带有 HTML 元素（如页眉和页脚）的大页面中使用它。</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">direction</td><td>组件滚动方向, Default为 vertical</td><td><code>&#39;horizontal&#39; | &#39;vertical&#39;</code></td><td class="text-center">No</td><td>&#39;vertical&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">list-tag</td><td>自定义滚动容器的元素Type</td><td><code>keyof HTMLElementTagNameMap</code></td><td class="text-center">No</td><td>&#39;div&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">item-tag</td><td>自定义 用来包裹滚动项目的元素Type</td><td><code>keyof HTMLElementTagNameMap</code></td><td class="text-center">No</td><td>&#39;div&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">list-class</td><td>为 滚动容器 添加样式名称</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">item-class</td><td>为每个项目添加样式名称</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">grid-items</td><td>网格模式时, 列的数量</td><td><code>number</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">item-size</td><td>网格模式时, 单个网格的 宽和高</td><td><code>number</code></td><td class="text-center">No</td><td>null</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">item-secondary-size</td><td>网格模式时, 单个网格的备用尺寸. 他的权重比itemSize高, 可以配合itemSizeName实现宽高不相等的网格</td><td><code>number</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">min-item-size</td><td>如果项目的高度（或水平模式下的宽度）未知，则使用最小尺寸。</td><td><code>number | string</code></td><td class="text-center">No</td><td>null</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">buffer</td><td>(default: 200) 设置可视区域外多少像素, 开始预渲染节点</td><td><code>number</code></td><td class="text-center">No</td><td>200</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">emit-update</td><td>(default: false): 是否开启每次更新虚拟滚动条内容时都会发出“update”事件（可能会影响性能）。</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">update-interval</td><td>(default: 0):每次更新列表状态后, 对列表重新排序的延迟时间</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">skip-hover</td><td>(default: false): 是否在hover时 为 item添加hover样式. 如果需要, 请覆盖is-hover来定义具体样式</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroller-height</td><td>滚动容器高度</td><td><code>number | string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroller-max-height</td><td>滚动容器最大高度</td><td><code>number | string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-option</td><td>滚动时的额外选项</td><td><code>ScrollOptions</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>尺寸</td><td><code>&#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand-wrapper-by-children</td><td>是否根据子元素的宽高撑开父容器<br>开启会影响性能，请酌情使用</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3>RecycleScroller Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td rowspan="1">组件visible值发生改变时的事件</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">hidden</td><td rowspan="1">组件隐藏时的事件</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">resize</td><td rowspan="1">滚动视口尺寸发生改变时的事件</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="4" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update</td><td rowspan="4">组件滚动产生项目位置变化后的事件</td><td rowspan="4">( startIndex: <code>number</code>, endIndex: <code>number</code>, visibleStartIndex: <code>number</code>, visibleEndIndex: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">startIndex</td><td><code>number</code></td><td>已经渲染但没有进入视口的元素的索引值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">endIndex</td><td><code>number</code></td><td>已经渲染但是已经划出视口的元素的索引值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visibleStartIndex</td><td><code>number</code></td><td>进入视口的起始元素索引值</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visibleEndIndex</td><td><code>number</code></td><td>进入视口的结束元素索引值</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-end</td><td rowspan="1">组件滚动到末尾触发的事件</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-start</td><td rowspan="1">组件滚动到起始位置时触发的事件</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">mouse-enter</td><td rowspan="1">鼠标移入</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">mouse-leave</td><td rowspan="1">鼠标移出</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-begin</td><td rowspan="1">滚动开始时触发通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-stop</td><td rowspan="1">滚动结束后触发通知</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h3>RecycleScroller Exposes</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollToItem</td><td rowspan="1">使组件滚动到指定索引值位置;</td><td rowspan="1">( index: <code>number</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">index</td><td><code>number</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getRootEl</td><td rowspan="1">获取组件的根元素实例</td><td rowspan="1">( ) =&gt; <code>HTMLDivElement | null</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/VirtualScroller.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const VirtualScroller = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  VirtualScroller as default
};
