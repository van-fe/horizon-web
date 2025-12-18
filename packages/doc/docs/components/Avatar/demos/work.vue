<template>
  <div class="n-demo">
    <div class="n-demo__container">
      <div class="n-demo__title">通过 type 设置类型</div>
      <n-avatar class="avatar" icon="friend" type="work" size="mini" />
      <n-avatar class="avatar" icon="friend" type="work" size="small" />
      <n-avatar class="avatar" icon="friend" type="work" size="smedium" />
      <n-avatar class="avatar" icon="friend" type="work" />
      <n-avatar class="avatar" icon="friend" type="work" size="large" />
    </div>
    <div class="n-demo__container">
      <div class="n-demo__title">自定义颜色</div>
      <n-avatar class="avatar" icon="friend" type="work" style="color: #178ca6; border-color: #178ca6" />
      <n-avatar class="avatar" icon="friend" type="work" style="color: #0ba1d6; border-color: #0ba1d6" />
      <n-avatar class="avatar" icon="friend" type="work" style="color: #00bebe; border-color: #00bebe" />
      <n-avatar class="avatar" icon="friend" type="work" style="color: #e56c25; border-color: #e56c25" />
    </div>
    <div class="n-demo__container">
      <div class="n-demo__title">通过 src 设置文字</div>
      <n-avatar class="avatar" src="Design" type="work" size="mini" />
      <n-avatar class="avatar" src="Design" type="work" size="small" />
      <n-avatar class="avatar" src="Design" type="work" size="smedium" />
      <n-avatar class="avatar" src="Design" type="work" />
      <n-avatar class="avatar" src="Design" type="work" size="large" />
      <n-avatar class="avatar" src="平台设计" type="work" size="mini" />
      <n-avatar class="avatar" src="平台设计" type="work" size="small" />
      <n-avatar class="avatar" src="平台设计" type="work" size="smedium" />
      <n-avatar class="avatar" src="平台设计" type="work" />
      <n-avatar class="avatar" src="平台设计" type="work" size="large" />
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
