<template>
  <div class="mb-4">
    调整popper和reference的远近，小三角会影响 distance 的效果，这里的 demo 不使用小三角以方便展示
    distance 的效果
  </div>
  <div class="mb-4">
    <h-popover class="mr-4" :arrow="false" :distance="0" popper-class="offset_popover">
      <template #reference>
        <h-button type="normal">distance 0</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :arrow="false" :distance="10" popper-class="offset_popover">
      <template #reference>
        <h-button type="normal">distance 10</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :arrow="false" :distance="-10" popper-class="offset_popover">
      <template #reference>
        <h-button type="normal">distance -10</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
  </div>
  <!--  -->
  <div class="mb-4">调整popper在辅助方向上的偏移</div>
  <div class="mb-4">
    <h-popover class="mr-4" :skidding="0" placement="top" popper-class="offset_popover">
      <template #reference>
        <h-button type="normal">placement top: skidding 0</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :skidding="30" placement="top" popper-class="offset_popover">
      <template #reference>
        <h-button type="normal">placement top: skidding 30</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :skidding="-30" placement="top" popper-class="offset_popover">
      <template #reference>
        <h-button type="normal">placement top: skidding -30</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
  </div>
  <div class="mb-4">
    <h-popover class="mr-4" :skidding="0" placement="left" popper-class="offset_popover">
      <template #reference>
        <h-button type="normal">placement left: skidding 0</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :skidding="30" placement="left" popper-class="offset_popover">
      <template #reference>
        <h-button type="normal">placement left: skidding 30</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :skidding="-30" placement="left" popper-class="offset_popover">
      <template #reference>
        <h-button type="normal">placement left: skidding -30</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
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
});
</script>

<style>
.offset_popper .popper {
  width: 280px;
}

.offset_popper .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margih-bottom: 4px;
}

.offset_popper .content {
  font-size: 14px;
  line-height: 22px;
}
</style>
