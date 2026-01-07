<template>
  <h-space block style="width: 230px">
    <h-button type="normal">Hello</h-button>
    <h-space-item class="custom">自定义元素</h-space-item>
    <h-button type="normal">World</h-button>
  </h-space>
</template>

<style scoped>
.custom {
  mih-width: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
