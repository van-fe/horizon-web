<template>
  <div class="h-demo">
    <div class="h-demo__container">
      <div class="h-demo__title">默认随机图片头像</div>
      <h-avatar :random-src="avatarSources" />
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
      <div class="h-demo__title">群拼接头像(3个人)</div>
      <h-avatar :src="src_url_3" />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">群拼接头像(4个人)</div>
      <h-avatar :src="src_url_4" />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">群拼接头像(5个人)</div>
      <h-avatar :src="src_url_5" />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">群拼接头像(9个人)</div>
      <h-avatar :src="src_url_9" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const avatarSources = [
      '/demo-assets/avatar-coral.svg',
      '/demo-assets/avatar-indigo.svg',
      '/demo-assets/avatar-cyan.svg',
    ];
    const groupSources = [...avatarSources, ...avatarSources, ...avatarSources];
    const src_url_1 = groupSources.slice(0, 1);
    const src_url_2 = groupSources.slice(0, 2);
    const src_url_3 = groupSources.slice(0, 3);
    const src_url_4 = groupSources.slice(0, 4);
    const src_url_5 = groupSources.slice(0, 5);
    const src_url_9 = groupSources;
    return {
      avatarSources,
      src_url_1,
      src_url_2,
      src_url_3,
      src_url_4,
      src_url_5,
      src_url_9,
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
