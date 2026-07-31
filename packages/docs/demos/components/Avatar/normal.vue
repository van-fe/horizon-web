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
      '/demo-assets/avatar-coral.svg',
    ];
    const src_url_2 = [
      '/demo-assets/avatar-coral.svg',
      '/demo-assets/avatar-indigo.svg',
    ];
    const src_url_3 = [
      '/demo-assets/avatar-coral.svg',
      '/demo-assets/avatar-indigo.svg',
      '/demo-assets/avatar-cyan.svg',
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
  align-items: center;
  margin-bottom: 20px;
}

.h-demo__title {
  margin-right: 20px;
}
</style>
