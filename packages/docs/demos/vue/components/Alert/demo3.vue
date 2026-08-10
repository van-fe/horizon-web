<template>
  <div class="alert-layout-demo">
    <h-alert
      title="账单已生成"
      description="本月账单金额为 ¥368.00。"
      type="info"
      show-icon
      primary-button-text="查看账单"
      :on-primary="closeAlert"
    />
    <h-alert
      title="发布前需要确认"
      :description="longDescription"
      type="warning"
      show-icon
      primary-button-text="继续发布"
      default-button-text="返回检查"
      :on-primary="closeAlert"
      :on-default="closeAlert"
    />
  </div>
</template>

<script setup lang="ts">
const longDescription =
  '本次发布包含权限配置与数据结构变更。请确认迁移任务已经完成，并通知仍在使用旧版本的协作者。';

function closeAlert(close: () => void) {
  close();
}
</script>

<style scoped>
.alert-layout-demo {
  display: grid;
  gap: var(--h-spacing-4);
}
</style>
