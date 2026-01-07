<template>
  <h-popover :arrow="false" popper-class="arrow_popover">
    <template #reference>
      <h-button :plain="true">no arrow</h-button>
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
