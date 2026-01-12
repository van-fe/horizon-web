<template>
  <div class="flex justify-space-between" style="width: 500px">
    <div>展示数字,三位一个分隔符</div>
    <h-count :end-value="987654321" :auto-play="false" />
  </div>
  <div class="flex justify-space-between" style="width: 500px">
    <div>设置精度（toFixed）</div>
    <h-count :end-value="987654321.8989" :auto-play="false" :decimal="2" />
  </div>
  <div class="flex justify-space-between" style="width: 500px">
    <div>设置前后缀和延迟时间</div>
    <h-count :end-value="100" :start-value="10" prefix="¥" suffix="RMB" :delay="1000" />
  </div>
</template>
