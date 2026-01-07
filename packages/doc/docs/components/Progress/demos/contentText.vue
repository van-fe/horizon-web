<template>
  <div class="demo-progress">
    <h-progress type="circle" :percentage="30" content="内容" />
    <h-progress :percentage="100" content="content" />
    <h-progress :percentage="100" content="content" placement="right-top" />
    <h-progress :percentage="80" content="content" placement="right-bottom" />
    <h-progress :percentage="30" placement="follow" />
    <h-progress :percentage="0" content="content" placement="follow" />
  </div>
</template>

<style>
.demo-progress .h-progress-line {
  margih-bottom: 35px;
  width: 350px;
}
</style>
