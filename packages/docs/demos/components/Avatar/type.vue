<template>
  <div class="h-demo">
    <div class="h-demo__container">
      <div class="h-demo__title">通过 size 设置形状</div>
      <h-avatar class="avatar" size="mini" :random-src="avatarSources" />
      <h-avatar class="avatar" size="small" :random-src="avatarSources" />
      <h-avatar class="avatar" size="smedium" :random-src="avatarSources" />
      <h-avatar class="avatar" :random-src="avatarSources" />
      <h-avatar class="avatar" size="large" :random-src="avatarSources" />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">通过 src 自定义头像资源</div>
      <h-avatar class="avatar" src="/demo-assets/avatar-coral.svg" />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">通过 fit 设置适应容器,同原生 object-fit</div>
      <h-avatar
        class="avatar"
        src="/demo-assets/avatar-cyan.svg"
        fit="contain"
      />
      <h-avatar
        class="avatar"
        src="/demo-assets/avatar-cyan.svg"
      />
      <h-avatar
        class="avatar"
        src="/demo-assets/avatar-cyan.svg"
        fit="cover"
      />
      <h-avatar
        class="avatar"
        src="/demo-assets/avatar-cyan.svg"
        fit="none"
      />
      <h-avatar
        class="avatar"
        src="/demo-assets/avatar-cyan.svg"
        fit="scale-down"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const avatarSources = [
  '/demo-assets/avatar-coral.svg',
  '/demo-assets/avatar-indigo.svg',
  '/demo-assets/avatar-cyan.svg',
];
</script>

<style scoped>
.avatar + .avatar {
  margin-left: 20px;
}

.h-demo__container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.h-demo__title {
  margin-right: 20px;
}
</style>
