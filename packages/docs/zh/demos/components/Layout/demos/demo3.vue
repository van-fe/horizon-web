<template>
  <div class="demo">
    <n-row :hspace="0">
      <n-col><div class="grid-content">unset</div></n-col>
      <n-col><div class="grid-content">unset</div></n-col>
      <n-col><div class="grid-content">unset</div></n-col>
    </n-row>
    <n-row :hspace="0" align="top">
      <n-col><div class="grid-content">align top</div></n-col>
      <n-col><div class="grid-content">align top</div></n-col>
      <n-col><div class="grid-content">align top</div></n-col>
    </n-row>
    <n-row :hspace="0" align="middle">
      <n-col><div class="grid-content">align middle</div></n-col>
      <n-col><div class="grid-content">align middle</div></n-col>
      <n-col><div class="grid-content">align middle</div></n-col>
    </n-row>
    <n-row :hspace="0" align="bottom">
      <n-col><div class="grid-content">align bottom</div></n-col>
      <n-col><div class="grid-content">align bottom</div></n-col>
      <n-col><div class="grid-content">align bottom</div></n-col>
    </n-row>
    <n-row :hspace="0" class="auto_height" justify="start">
      <n-col :span="4"><div class="grid-content">justify start</div></n-col>
      <n-col :span="4"><div class="grid-content">justify start</div></n-col>
      <n-col :span="4"><div class="grid-content">justify start</div></n-col>
    </n-row>
    <n-row :hspace="0" class="auto_height" justify="center">
      <n-col :span="4"><div class="grid-content">justify center</div></n-col>
      <n-col :span="4"><div class="grid-content">justify center</div></n-col>
      <n-col :span="4"><div class="grid-content">justify center</div></n-col>
    </n-row>
    <n-row :hspace="0" class="auto_height" justify="end">
      <n-col :span="4"><div class="grid-content">justify end</div></n-col>
      <n-col :span="4"><div class="grid-content">justify end</div></n-col>
      <n-col :span="4"><div class="grid-content">justify end</div></n-col>
    </n-row>
    <n-row :hspace="0" class="auto_height" justify="space-between">
      <n-col :span="4"><div class="grid-content">justify space-between</div></n-col>
      <n-col :span="4"><div class="grid-content">justify space-between</div></n-col>
      <n-col :span="4"><div class="grid-content">justify space-between</div></n-col>
    </n-row>
    <n-row :hspace="0" class="auto_height" justify="space-around">
      <n-col :span="4"><div class="grid-content">justify space-around</div></n-col>
      <n-col :span="4"><div class="grid-content">justify space-around</div></n-col>
      <n-col :span="4"><div class="grid-content">justify space-around</div></n-col>
    </n-row>
    <n-row :hspace="0" class="auto_height" justify="space-evenly">
      <n-col :span="4"><div class="grid-content">justify space-evenly</div></n-col>
      <n-col :span="4"><div class="grid-content">justify space-evenly</div></n-col>
      <n-col :span="4"><div class="grid-content">justify space-evenly</div></n-col>
    </n-row>
  </div>
</template>

<style scoped>
.demo .grid-content {
  text-align: center;
  background-color: #b7e8ea;
  line-height: 32px;
}

.demo .n-row {
  background-color: #00bcbc;
  background-clip: content-box;
  min-height: 60px;
}

.demo .n-row.auto_height {
  min-height: auto;
}

.demo .n-col {
  background-clip: content-box;
}

.demo .n-col:nth-child(odd) {
  background-color: #b9d9eb;
}
</style>
<script setup lang="ts">
</script>
