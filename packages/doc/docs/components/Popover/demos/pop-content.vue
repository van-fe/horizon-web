<template>
  <n-popover class="mr-4" popper-class="content_popper">
    <template #reference>
      <n-button type="normal">使用PopContent组件包裹内容</n-button>
    </template>
    <template #popper>
      <n-pop-content>
        <div class="popper">
          <div class="header">内容标题</div>
          <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
        </div>
      </n-pop-content>
    </template>
  </n-popover>
  <n-popover popper-class="content_popper">
    <template #reference>
      <n-button type="normal">不使用PopContent组件包裹内容</n-button>
    </template>
    <template #popper>
      <div class="nocontent-wrap popper">
        <div class="header">内容标题</div>
        <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
      </div>
    </template>
  </n-popover>
</template>

<style>
.content_popper .popper {
  width: 280px;
}

.content_popper .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.content_popper .content {
  font-size: 14px;
  line-height: 22px;
}

.content_popper .nocontent-wrap {
  background-color: #555;
  color: #fff;
}
</style>
