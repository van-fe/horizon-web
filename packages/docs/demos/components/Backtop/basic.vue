<template>
  <div>
    滚动页面可见
    <h-backtop target="main.h-main" @click="onClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const onClick = () => {
      console.info('----点击事件触发----');
    };
    return {
      onClick,
    };
  },
});
</script>
