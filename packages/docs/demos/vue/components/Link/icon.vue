<template>
  <div class="docs-demo__stage">
    <h-space wrap size="large">
      <h-link href="#link-share" :underline="false" icon="share" icon-suffix="2xs">分享项目</h-link>
      <h-link href="#link-export" :underline="false" icon="download" icon-suffix="2xs">
        导出报告
      </h-link>
      <h-link :underline="false" icon="share" icon-suffix="2xs" disabled>分享已关闭</h-link>
    </h-space>
  </div>
</template>
