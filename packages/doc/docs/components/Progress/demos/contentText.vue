<template>
  <div class="demo-progress">
    <n-progress type="circle" :percentage="30" content="内容" />
    <n-progress :percentage="100" content="content" />
    <n-progress :percentage="100" content="content" placement="right-top" />
    <n-progress :percentage="80" content="content" placement="right-bottom" />
    <n-progress :percentage="30" placement="follow" />
    <n-progress :percentage="0" content="content" placement="follow" />
  </div>
</template>

<style>
.demo-progress .n-progress-line {
  margin-bottom: 35px;
  width: 350px;
}
</style>
