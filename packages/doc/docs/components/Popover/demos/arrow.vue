<template>
  <n-popover :arrow="false" popper-class="arrow_popover">
    <template #reference>
      <n-button type="normal">no arrow</n-button>
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
</template>

<style lang="scss">
.arrow_popover .popper {
  width: 280px;
}

.arrow_popover .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.arrow_popover .content {
  font-size: 14px;
  line-height: 22px;
}
</style>
