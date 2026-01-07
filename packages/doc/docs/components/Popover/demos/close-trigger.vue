<template>
  <h-space direction="vertical" block>
    <h-space>
      <div>hide event type</div>
      <h-radio v-model="hideEventType" label="click">click</h-radio>
      <h-radio v-model="hideEventType" label="mousedown">mousedown</h-radio>
      <h-radio v-model="hideEventType" label="mouseup">mouseup</h-radio>
    </h-space>
    <h-space>
      <h-popover
        trigger="click"
        :hide-event-type="hideEventType"
        popper-class="arrow_popover"
        @show="onShow"
        @onHide="onHide"
      >
        <template #reference>
          <h-button type="normal">点击打开Popover，通过全局 {{ hideEventType }} 事件关闭</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            <div class="popper">
              <div class="header">内容标题</div>
              <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
            </div>
          </h-pop-content>
        </template>
      </h-popover>
    </h-space>
    <h-space>
      <div class="block-card c1" @click.stop>
        <h-space block direction="vertical" size="4">
          <div>阻止 click 事件的冒泡</div>
          <strong v-if="show && hideEventType === 'click'">点击不能关闭</strong>
        </h-space>
      </div>
      <div class="block-card c2" @mousedown.stop>
        <h-space block direction="vertical" size="4">
          <div>阻止 mousedown 事件的冒泡</div>
          <strong v-if="show && hideEventType === 'mousedown'">点击不能关闭</strong>
        </h-space>
      </div>
      <div class="block-card c3" @mouseup.stop>
        <h-space block direction="vertical" size="4">
          <div>阻止 mouseup 事件的冒泡</div>
          <strong v-if="show && hideEventType === 'mouseup'">点击不能关闭</strong>
        </h-space>
      </div>
    </h-space>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hideEventType = ref<'click' | 'mousedown' | 'mouseup'>('click');
const show = ref(false);

const onShow = () => {
  show.value = true;
};

const onHide = () => {
  show.value = false;
};
</script>

<style lang="scss">
.arrow_popover .popper {
  width: 280px;
}

.arrow_popover .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margih-bottom: 4px;
}

.arrow_popover .content {
  font-size: 14px;
  line-height: 22px;
}

.block-card {
  width: 220px;
  height: 120px;
  border-radius: 8px;
  font-size: 14px;
  color: #fff;
  display: flex;
  aligh-items: center;
  justify-content: center;
}

.c1 {
  background-color: #e14cc4;
}

.c2 {
  background-color: #5ab453;
}

.c3 {
  background-color: #63aaee;
}
</style>
