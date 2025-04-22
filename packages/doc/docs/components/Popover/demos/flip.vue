<template>
  <div class="mb-4">
    <n-popover class="mr-4" popper-class="flip_popover" trigger="click" placement="top">
      <template #reference>
        <n-button type="normal">flip top bottom</n-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </n-popover>
  </div>
  <!--  -->
  <div class="mb-4">
    <n-popover
      class="mr-4"
      trigger="click"
      popper-class="flip_popover"
      :fallback-placements="['top', 'bottom', 'left', 'right']"
    >
      <template #reference>
        <n-button type="normal">fallbackPlacements left right</n-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </n-popover>
  </div>
  <div class="mb-4">
    <n-popover
      class="mr-4"
      trigger="click"
      popper-class="flip_popover"
      prevent-overflow
    >
      <template #reference>
        <n-button type="normal">preventOverflow enabled</n-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </n-popover>
  </div>
</template>

<script>
import { defineComponent, h } from 'vue';
import { NPopContent } from '@nio-fe/lego';

const DemoContent = defineComponent({
  render: () =>
    h(
      NPopContent,
      {},
      {
        default: () =>
          h(
            'div',
            {
              class: 'popper',
            },
            [
              h(
                'div',
                {
                  class: 'header',
                },
                ['内容标题'],
              ),
              h(
                'div',
                {
                  class: 'content',
                },
                ['我是气泡卡片文本描述内容, 我是气泡卡片文字链接...'],
              ),
            ],
          ),
      },
    ),
});

export default defineComponent({
  components: {
    DemoContent,
  },
});
</script>

<style>
.flip_popover .popper {
  width: 280px;
}

.flip_popover .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.flip_popover .content {
  font-size: 14px;
  line-height: 22px;
  height: 400px;
}
</style>
