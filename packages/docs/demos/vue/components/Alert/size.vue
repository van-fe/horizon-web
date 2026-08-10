<template>
  <div class="alert-size-demo">
    <h-alert
      size="small"
      title="系统维护"
      description="今晚 22:00 开始，预计持续 10 分钟。"
      type="info"
      show-icon
      :closable="false"
    />
    <h-alert
      size="medium"
      title="系统维护"
      description="今晚 22:00 开始，预计持续 10 分钟。"
      type="info"
      show-icon
      :closable="false"
    />
  </div>
</template>

<style scoped>
.alert-size-demo {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--h-spacing-5);
}

@media (max-width: 640px) {
  .alert-size-demo {
    grid-template-columns: 1fr;
  }
}
</style>
