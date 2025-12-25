<template>
  <div class="backtop-demo">
    滚动以下盒子可见
    <div class="scroll-box">
      指定的触发元素
      <div class="inner"></div>
    </div>

    <n-backtop target=".scroll-box" :bottom="300" :visibility-height="10" @click="onClick">
      👆
    </n-backtop>
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

<style scoped>
.backtop-demo .scroll-box {
  width: 300px;
  height: 300px;
  overflow: auto;
  border: 1px solid #14798f;
}

.backtop-demo .inner {
  height: 1000px;
}
</style>
