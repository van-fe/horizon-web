<script setup lang="ts"></script>

<template>
  <n-row>
    <n-col :span="24">
      <n-button type="normal" :link="true">Normal Link Button</n-button>
      <n-button type="primary" :link="true">Primary Link Button</n-button>
      <n-button type="danger" :link="true">Danger Link Button</n-button>
      <n-button type="normal" :link="true" href="/">href 跳到首页</n-button>
      <n-button type="normal" :link="true" to="/">router 跳到首页</n-button>
    </n-col>
  </n-row>
</template>

<style scoped>
.n-button + .n-button {
  margin-left: 10px;
}
</style>
