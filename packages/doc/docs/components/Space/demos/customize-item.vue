<template>
  <n-space block style="width: 230px">
    <n-button type="normal">Hello</n-button>
    <n-space-item class="custom">自定义元素</n-space-item>
    <n-button type="normal">World</n-button>
  </n-space>
</template>

<style scoped>
.custom {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
