<template>
  <div class="n-demo">
    <div class="n-demo__container">
      <div class="n-demo__title">默认随机图片头像</div>
      <n-avatar />
    </div>
    <div class="n-demo__container">
      <div class="n-demo__title">群拼接头像(1个人)</div>
      <n-avatar :src="src_url_1" />
    </div>
    <div class="n-demo__container">
      <div class="n-demo__title">群拼接头像(2个人)</div>
      <n-avatar :src="src_url_2" />
    </div>
    <div class="n-demo__container">
      <div class="n-demo__title">群拼接头像(3个及以上)</div>
      <n-avatar :src="src_url_3" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const src_url_1 = [
      'https://cdn-app.nio.com/user/2022/3/1/a72ad7d3-5c45-48dc-a4cc-9f90277e4c00.jpg',
    ];
    const src_url_2 = [
      'https://cdn-app.nio.com/user/2022/3/1/a72ad7d3-5c45-48dc-a4cc-9f90277e4c00.jpg',
      'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
    ];
    const src_url_3 = [
      'https://cdn-app.nio.com/user/2022/3/1/a72ad7d3-5c45-48dc-a4cc-9f90277e4c00.jpg',
      'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
      'https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
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
.n-demo__container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.n-demo__title {
  margin-right: 20px;
}
</style>
