<template>
  <div class="alert-types-demo">
    <h-alert title="同步进行中" type="info" show-icon :closable="false" />
    <h-alert title="发布成功" type="success" show-icon :closable="false" />
    <h-alert title="存储空间即将用尽" type="warning" show-icon :closable="false" />
    <h-alert title="连接失败" type="error" show-icon :closable="false" />
  </div>
</template>

<style scoped>
.alert-types-demo {
  display: grid;
  gap: var(--h-spacing-4);
}
</style>
