<template>
  <div class="flex">
    <div class="mr-4">
      正向计时
      <span v-show="finished" class="ml-2">----计时完成！</span>
      <n-time :forward="true" @finished="finished = true" />
    </div>
    <div class="mr-4">
      到期时间:30秒后
      <n-time :end-time="Date.now() + 30000" :time="Date.now() + 90000" />
    </div>
    <div >
      持续时长、10s更新一次
      <n-time :end-time="+new Date('2023-02-27 16:27:30')" :time="currentTime" calculative />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const finished = ref(false);
    const currentTime = ref(Date.now());
    window.setInterval(() => {
      currentTime.value = Date.now();
    }, 10000);
    return {
      finished,
      currentTime,
    };
  },
});
</script>
