<template>
  <div class="container">
    <div class="block">
      <span class="title">直接使用图标 :</span>
      <IconSuccessFilledDark />
      <IconErrorFilledLight />
      <IconNio @click="test" />
    </div>
    <div class="block">
      <span class="title">设置 size 控制大小 :</span>
      <IconSuccessFilledDark size="16" />
      <IconErrorFilledLight />
      <IconTime :size="32" />
    </div>
    <div class="block">
      <span class="title">设置 color 控制颜色 :</span>
      <IconSuccessFilledDark :color="['white', '#17963b']" />
      <IconErrorFilledLight :color="['white', 'red']" />
      <IconTime :color="['red', '#17963b']" />
    </div>
    <div class="block">
      <span class="title">设置 spin 开启动画 :</span>
      <IconSuccessFilledDark spin="cw" />
      <IconErrorFilledLight spin="ccw" />
      <IconLoadingLine spin="cw" :color="['#24A7B2']" />
    </div>
    <div class="block">
      <span class="title">设置 rotate 转动方向 :</span>
      <IconSuccessFilledDark :rotate="90" />
      <IconErrorFilledLight :rotate="45" />
      <IconTime :rotate="180" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// 单个引入
import {
  IconSuccessFilledDark,
  IconErrorFilledLight,
  IconLoadingLine,
  IconNio,
  IconTime,
} from '@aurora/icon';
export default defineComponent({
  components: {
    IconTime,
    IconSuccessFilledDark,
    IconErrorFilledLight,
    IconNio,
    IconLoadingLine,
  },
  setup() {
    const test = () => {
      console.info('svg');
    };
    return {
      test,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.container .block {
  margin: 20px;
}

.container .block .title {
  margin-right: 20px;
  display: inline-block;
}

.container .block .a-icon {
  margin-right: 20px;
}
</style>
