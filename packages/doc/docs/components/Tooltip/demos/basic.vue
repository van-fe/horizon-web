<template>
  <div class="demo-block">
    <n-tooltip placement="top">
      <n-button type="normal" plain>Hover</n-button>
      <template #content>Dark</template>
    </n-tooltip>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.demo-block {
  display: flex;
  align-items: center;
}

.demo-block .n-popover__reference {
  margin-bottom: 20px;
  margin-left: 0;
  margin-right: 20px;
}
</style>
