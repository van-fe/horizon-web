<template>
  <div class="container">
    <div class="block">
      <span class="title">设置 name 选择图标 :</span>
      <n-icon name="success_filled" />
      <n-icon name="time" />
      <n-icon name="nio" @click="test" />
    </div>
    <div class="block">
      <span class="title">设置 size 控制大小 :</span>
      <n-icon name="time" size="16" />
      <n-icon name="time" />
      <n-icon name="time" size="32" />
    </div>
    <div class="block">
      <span class="title">设置 color 控制颜色 :</span>
      <n-icon name="time" color="red" />
      <n-icon name="time" color="#f6d110" />
      <n-icon name="time" color="rgb(36, 235, 32)" />
    </div>
    <div class="block">
      <span class="title">设置 spin 开启动画 :</span>
      <n-icon name="time" spin="cw" />
      <n-icon name="time" spin="ccw" />
      <n-icon name="loading" spin="cw" />
    </div>
    <div class="block">
      <span class="title">设置 rotate 转动方向 :</span>
      <n-icon name="time" :rotate="45" />
      <n-icon name="time" :rotate="90" />
      <n-icon name="time" :rotate="180" />
    </div>
    <div class="block">
      <span class="title">设置 className 选择图标(这种方式默认大小为16px) :</span>
      <span class="n-icon n-icon_success_filled"></span>
      <div class="n-icon n-icon_time"></div>
      <a class="n-icon n-icon_nio" href="//www.nio.cn/" target="_blank"></a>
    </div>
    <n-button
      v-tooltip="NextAudioState"
      type="normal"
      size="small"
      :text="true"
      :icon="NextAudioState"
      @click="playAudio"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const test = () => {
      console.log('font class');
    };
    const NextAudioState = ref('close');
    const playAudio = () => {
      NextAudioState.value = NextAudioState.value === 'close' ? 'nio' : 'close';
    };
    return {
      test,
      NextAudioState,
      playAudio,
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

.container .block .n-icon {
  margin-right: 20px;
}
</style>
