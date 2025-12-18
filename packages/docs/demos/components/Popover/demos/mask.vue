<template>
  <div class="mb16">
    <n-popover
      class="mr16"
      popper-class="mask_popover"
      trigger="click"
      placement="top"
      :show-with-mask="maskOption"
    >
      <template #reference>
        <n-button :plain="true">show with mask</n-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </n-popover>
  </div>
</template>

<script>
import { defineComponent, h } from 'vue';
import { NPopContent } from '@aurora/horizon-web';

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
  data() {
    return {
      maskOption: {
        enable: true,
        // class: 'mask-opacity',
        // to: document.querySelector('#app')
      },
    };
  },
});
</script>

<style>
.mask_popover .popper {
  width: 280px;
}

.mask_popover .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.mask_popover .content {
  font-size: 14px;
  line-height: 22px;
}

.mask-opacity {
  opacity: 0;
}
</style>
