<script setup lang="ts"></script>

<template>
  <h-row>
    <h-col :span="24">
      <h-button type="normal" :link="true">Normal Link Button</h-button>
      <h-button type="primary" :link="true">Primary Link Button</h-button>
      <h-button type="danger" :link="true">Danger Link Button</h-button>
      <h-button type="normal" :link="true" href="/">href 跳到首页</h-button>
      <h-button type="normal" :link="true" to="/">router 跳到首页</h-button>
    </h-col>
  </h-row>
</template>

<style scoped>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
