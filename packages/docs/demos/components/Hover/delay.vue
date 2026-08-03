<template>
  <div>
    <h-hover v-slot="{ hover }" :hover-show-delay="1000">
      <div class="container">
        <span>容器1 按钮延迟1000 ms 出现</span>
        <h-button v-if="hover" size="medium">延迟出现</h-button>
      </div>
    </h-hover>
    <h-hover v-slot="{ hover }" :hover-hide-delay="1000">
      <div class="container">
        <span>容器2 按钮延迟1000 ms 隐藏</span>
        <h-button v-if="hover" size="medium">延迟隐藏</h-button>
      </div>
    </h-hover>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  background-color: var(--h-bg-success-weak-activated);
}
</style>
