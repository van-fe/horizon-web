<template>
  <div class="n-demo">
    <div class="n-demo__container">
      <div class="n-demo__title">通过 size 设置形状</div>
      <n-avatar class="avatar" size="mini" />
      <n-avatar class="avatar" size="small" />
      <n-avatar class="avatar" size="smedium" />
      <n-avatar class="avatar" />
      <n-avatar class="avatar" size="large" />
    </div>
    <div class="n-demo__container">
      <div class="n-demo__title">通过 src 自定义头像资源</div>
      <n-avatar class="avatar" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
    </div>
    <div class="n-demo__container">
      <div class="n-demo__title">通过 fit 设置适应容器,同原生 object-fit</div>
      <n-avatar
        class="avatar"
        src="https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg"
        fit="contain"
      />
      <n-avatar
        class="avatar"
        src="https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg"
      />
      <n-avatar
        class="avatar"
        src="https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg"
        fit="cover"
      />
      <n-avatar
        class="avatar"
        src="https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg"
        fit="none"
      />
      <n-avatar
        class="avatar"
        src="https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg"
        fit="scale-down"
      />
    </div>
  </div>
</template>

<style scoped>
.avatar + .avatar {
  margin-left: 20px;
}

.n-demo__container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.n-demo__title {
  margin-right: 20px;
}
</style>
