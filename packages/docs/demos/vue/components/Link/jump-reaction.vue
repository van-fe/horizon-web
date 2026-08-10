<template>
  <div class="docs-demo__stage">
    <h-space wrap size="large">
      <h-link href="#link-target">在当前页面打开帮助</h-link>
      <h-link href="#link-target" target="_blank">在新窗口打开帮助</h-link>
    </h-space>
    <span id="link-target" class="sr-only">跳转目标</span>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
</style>
