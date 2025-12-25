<template>
  <div class="recycle-scroller-demo">
    <!-- 测试条件 -->
    <section>
      <n-alert
        type="warning"
        title="注意: 必需为该组件提供item的高度信息!"
        description="可以通过设置itemSize, itemSecondarySize, minItemSize为item设置高度. 或者在数据中提供高度字段, 但需要sizeField配合"
        size="small"
        show-icon
        round
        :closable="false"
      />
      <n-row :gutter="14" style="margin-top: 20px">
        <n-col :span="12">
          <n-row>
            <n-col :span="5" class="align-center">生成数据</n-col>
            <n-col :span="11">
              <n-input-number v-model="inputCount" @input="inputCountInput"></n-input-number>
            </n-col>
            <n-col :span="8">
              <n-button circle type="primary" size="medium" @click="addItem">+1</n-button>
            </n-col>
          </n-row>
        </n-col>
        <n-col :span="12">
          <n-row>
            <n-col :span="8" class="align-center">从数据中获得高度</n-col>
            <n-col :span="16"><n-checkbox v-model="enableLetters"></n-checkbox></n-col>
          </n-row>
        </n-col>
        <!-- <n-col :span="8">
          <n-row>
            <n-col :span="7" class="align-center">
              页面模式
              <div>(pageMode属性)</div>
            </n-col>
            <n-col :span="15" style="color: #999">
              开启页面模式会取消组件自己的滚动属性, 找到组件的父滚动容器作为'根'计算虚拟滚动
            </n-col>
          </n-row>
        </n-col> -->
      </n-row>
      <n-row :gutter="14">
        <n-col :span="12">
          <n-row>
            <n-col :span="5" class="align-center">缓存值设置</n-col>
            <n-col :span="11">
              <n-input-number v-model="buffer" :max="1000" :min="1"></n-input-number>
            </n-col>
            <n-col :span="8"></n-col>
          </n-row>
        </n-col>
        <n-col :span="12">
          <n-row>
            <n-col :span="5" class="align-center">滚动至</n-col>
            <n-col :span="11"><n-input-number v-model="scrollTo"></n-input-number></n-col>
            <n-col :span="8">
              <n-button circle type="primary" size="medium" @click="doScrollTo">执行</n-button>
            </n-col>
          </n-row>
        </n-col>
      </n-row>
      <n-row style="padding-bottom: 24px; border-bottom: 1px solid #ccc">
        <n-col :span="3" class="align-center">滚动状态</n-col>
        <n-col :span="21" class="align-center">
          ({{ updateParts.viewStartIdx }} - [{{ updateParts.visibleStartIdx }} -
          {{ updateParts.visibleEndIdx }}] - {{ updateParts.viewEndIdx }})
          <br />
          (元素索引开始于 - [可见元素开始于 - 可见元素结束于] - 元素索引结束于)
        </n-col>
      </n-row>
    </section>

    <!-- 组件 -->
    <NRecycleScroller
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
        <n-alert title="我是before插槽" type="success" round :closeable="false"></n-alert>
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
    </NRecycleScroller>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick, watch, computed } from 'vue';
import { NRecycleScrollerInstance } from '@aurora/horizon-web';
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

    const scrollerRef = ref<NRecycleScrollerInstance | null>(null);

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
        name: faker.name.fullName(),
        // avatar: faker.internet.avatar(),
        avatar: 'https://www.nio.cn/cdn-static/mynio/nextjs/images/home/nioApp/nio-app-logo.png',
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
</script>

<style lang="scss" scoped>
.recycle-scroller-demo:not(.page-mode) {
  height: 100%;
  display: flex;
  flex-direction: column;

  .n-alert {
    :deep(.n-alert__mul-close) {
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
.n-recycle-scroller__item-view {
  cursor: pointer;
}
:deep(.n-recycle-scroller__item-view) {
  cursor: pointer;
  &.is-hover {
    background-color: #4fc08d;
  }
}

.n-recycle-scroller__item-view .tr {
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
