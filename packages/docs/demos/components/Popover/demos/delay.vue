<template>
  <div class="mb-4">
    <n-popover class="mr-4" :hover-hide-delay="100" popper-class="delay_popper">
      <template #reference>
        <n-button :plain="true">hoverHideDelay: 100</n-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </n-popover>
    <n-popover class="mr-4" :hover-hide-delay="0" popper-class="delay_popper">
      <template #reference>
        <n-button :plain="true">hoverHideDelay: 0</n-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </n-popover>
    <n-popover class="mr-4" :hover-hide-delay="500" popper-class="delay_popper">
      <template #reference>
        <n-button :plain="true">hoverHideDelay: 500</n-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </n-popover>
  </div>
  <div class="mb-4">
    <n-popover class="mr-4" :hover-show-delay="0" popper-class="delay_popper">
      <template #reference>
        <n-button :plain="true">hoverShowDelay: 0</n-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </n-popover>
    <n-popover class="mr-4" :hover-show-delay="100" popper-class="delay_popper">
      <template #reference>
        <n-button :plain="true">hoverShowDelay: 100</n-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </n-popover>
    <n-popover class="mr-4" :hover-show-delay="500" popper-class="delay_popper">
      <template #reference>
        <n-button :plain="true">hoverShowDelay: 500</n-button>
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
.delay_popper .popper {
  width: 280px;
}

.delay_popper .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.delay_popper .content {
  font-size: 14px;
  line-height: 22px;
}
</style>
