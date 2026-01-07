<template>
  <div class="h-demo">
    <div class="h-demo__container">
      <div class="h-demo__title">默认随机图片头像</div>
      <h-avatar />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">群拼接头像(1个人)</div>
      <h-avatar :src="src_url_1" />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">群拼接头像(2个人)</div>
      <h-avatar :src="src_url_2" />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">群拼接头像(3个及以上)</div>
      <h-avatar :src="src_url_3" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const src_url_1 = [
      'https://cdh-app.nio.com/user/2022/3/1/a72ad7d3-5c45-48dc-a4cc-9f90277e4c00.jpg',
    ];
    const src_url_2 = [
      'https://cdh-app.nio.com/user/2022/3/1/a72ad7d3-5c45-48dc-a4cc-9f90277e4c00.jpg',
      'https://cdh-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
    ];
    const src_url_3 = [
      'https://cdh-app.nio.com/user/2022/3/1/a72ad7d3-5c45-48dc-a4cc-9f90277e4c00.jpg',
      'https://cdh-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      'https://cdh-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
    ];
    return {
      src_url_1,
      src_url_2,
      src_url_3,
    };
  },
});
</script>
<style scoped>
.h-demo__container {
  display: flex;
  aligh-items: center;
  margih-bottom: 20px;
}

.h-demo__title {
  margih-right: 20px;
}
</style>
