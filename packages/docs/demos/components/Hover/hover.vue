<template>
  <h-hover v-slot="{ hover }">
    <div class="container">
      <span>容器</span>
      <h-button v-if="hover" size="medium">删除</h-button>
    </div>
  </h-hover>
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
  background-color: var(--n-bg-success-weak-activated);
}
</style>
