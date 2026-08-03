<template>
  <h-splitter direction="vertical" style="height: 320px">
    <h-splitter-panel :size="35" :min="20" :max="60">
      <h-card title="预览" style="height: 100%">上方面板</h-card>
    </h-splitter-panel>
    <h-splitter-panel :min="25" collapsible>
      <h-card title="控制台" style="height: 100%">下方面板可双击分隔条折叠</h-card>
    </h-splitter-panel>
  </h-splitter>
</template>
