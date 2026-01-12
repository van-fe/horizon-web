<template>
  <div class="n-demo">
    <div class="n-demo__container">
      <div class="n-demo__title">通过加载图片失败默认处理</div>
      <h-avatar size="large" :src="src1" @error="errorHandler1" />
    </div>
    <div class="n-demo__container">
      <div class="n-demo__title">通过 error 方法自定义处理加载图片失败情况</div>
      <h-avatar size="large" :src="src" @error="errorHandler" />
    </div>
    <div class="n-demo__container">
      <div class="n-demo__title">通过插槽自定义加载图片失败情况</div>
      <h-avatar size="large" :src="src2">
        <template #error>
          <div>失败了</div>
        </template>
      </h-avatar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let src = ref('https://cdn-app.nio.com/us/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg');
    let src2 = ref('https://cdn-app.nio.com/us/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg');
    let src1 = ref('https://cdn-app.nio.com/us/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg');
    const errorHandler = () => {
      src.value = 'https://cdn-app.nio.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg';
    };
    const errorHandler1 = () => {
      console.info('图片加载失败了');
    };
    return {
      errorHandler,
      errorHandler1,
      src,
      src1,
      src2,
    };
  },
});
</script>

<style scoped lang="scss">
.h-avatar {
  margin-right: 20px;
  &--error {
    background-color: #000;
    color: #fff;
  }
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
