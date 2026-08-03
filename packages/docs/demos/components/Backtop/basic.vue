<template>
  <div>
    滚动页面可见
    <h-backtop :visibility-height="200" @click="onClick" />
  </div>
</template>

<script setup lang="ts">
function onClick() {
  console.info('----点击事件触发----');
}
</script>
