<template>
  <div class="h-demo">
    <div class="h-demo__container">
      <div class="h-demo__title">通过 type 设置类型</div>
      <h-avatar class="avatar" icon="friend" type="work" size="mini" />
      <h-avatar class="avatar" icon="friend" type="work" size="small" />
      <h-avatar class="avatar" icon="friend" type="work" size="smedium" />
      <h-avatar class="avatar" icon="friend" type="work" />
      <h-avatar class="avatar" icon="friend" type="work" size="large" />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">自定义颜色</div>
      <h-avatar class="avatar" icon="friend" type="work" style="color: #178ca6; border-color: #178ca6" />
      <h-avatar class="avatar" icon="friend" type="work" style="color: #0ba1d6; border-color: #0ba1d6" />
      <h-avatar class="avatar" icon="friend" type="work" style="color: #00bebe; border-color: #00bebe" />
      <h-avatar class="avatar" icon="friend" type="work" style="color: #e56c25; border-color: #e56c25" />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">通过 src 设置文字</div>
      <h-avatar class="avatar" src="Design" type="work" size="mini" />
      <h-avatar class="avatar" src="Design" type="work" size="small" />
      <h-avatar class="avatar" src="Design" type="work" size="smedium" />
      <h-avatar class="avatar" src="Design" type="work" />
      <h-avatar class="avatar" src="Design" type="work" size="large" />
      <h-avatar class="avatar" src="平台设计" type="work" size="mini" />
      <h-avatar class="avatar" src="平台设计" type="work" size="small" />
      <h-avatar class="avatar" src="平台设计" type="work" size="smedium" />
      <h-avatar class="avatar" src="平台设计" type="work" />
      <h-avatar class="avatar" src="平台设计" type="work" size="large" />
    </div>
  </div>
</template>

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
