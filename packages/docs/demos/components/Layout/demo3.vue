<template>
  <div class="demo">
    <h-row :hspace="0">
      <h-col><div class="grid-content">unset</div></h-col>
      <h-col><div class="grid-content">unset</div></h-col>
      <h-col><div class="grid-content">unset</div></h-col>
    </h-row>
    <h-row :hspace="0" align="top">
      <h-col><div class="grid-content">align top</div></h-col>
      <h-col><div class="grid-content">align top</div></h-col>
      <h-col><div class="grid-content">align top</div></h-col>
    </h-row>
    <h-row :hspace="0" align="middle">
      <h-col><div class="grid-content">align middle</div></h-col>
      <h-col><div class="grid-content">align middle</div></h-col>
      <h-col><div class="grid-content">align middle</div></h-col>
    </h-row>
    <h-row :hspace="0" align="bottom">
      <h-col><div class="grid-content">align bottom</div></h-col>
      <h-col><div class="grid-content">align bottom</div></h-col>
      <h-col><div class="grid-content">align bottom</div></h-col>
    </h-row>
    <h-row :hspace="0" class="auto_height" justify="start">
      <h-col :span="4"><div class="grid-content">justify start</div></h-col>
      <h-col :span="4"><div class="grid-content">justify start</div></h-col>
      <h-col :span="4"><div class="grid-content">justify start</div></h-col>
    </h-row>
    <h-row :hspace="0" class="auto_height" justify="center">
      <h-col :span="4"><div class="grid-content">justify center</div></h-col>
      <h-col :span="4"><div class="grid-content">justify center</div></h-col>
      <h-col :span="4"><div class="grid-content">justify center</div></h-col>
    </h-row>
    <h-row :hspace="0" class="auto_height" justify="end">
      <h-col :span="4"><div class="grid-content">justify end</div></h-col>
      <h-col :span="4"><div class="grid-content">justify end</div></h-col>
      <h-col :span="4"><div class="grid-content">justify end</div></h-col>
    </h-row>
    <h-row :hspace="0" class="auto_height" justify="space-between">
      <h-col :span="4"><div class="grid-content">justify space-between</div></h-col>
      <h-col :span="4"><div class="grid-content">justify space-between</div></h-col>
      <h-col :span="4"><div class="grid-content">justify space-between</div></h-col>
    </h-row>
    <h-row :hspace="0" class="auto_height" justify="space-around">
      <h-col :span="4"><div class="grid-content">justify space-around</div></h-col>
      <h-col :span="4"><div class="grid-content">justify space-around</div></h-col>
      <h-col :span="4"><div class="grid-content">justify space-around</div></h-col>
    </h-row>
    <h-row :hspace="0" class="auto_height" justify="space-evenly">
      <h-col :span="4"><div class="grid-content">justify space-evenly</div></h-col>
      <h-col :span="4"><div class="grid-content">justify space-evenly</div></h-col>
      <h-col :span="4"><div class="grid-content">justify space-evenly</div></h-col>
    </h-row>
  </div>
</template>

<style scoped>
.demo .grid-content {
  text-align: center;
  background-color: #b7e8ea;
  line-height: 32px;
}

.demo .h-row {
  background-color: #00bcbc;
  background-clip: content-box;
  min-height: 60px;
}

.demo .h-row.auto_height {
  min-height: auto;
}

.demo .h-col {
  background-clip: content-box;
}

.demo .h-col:nth-child(odd) {
  background-color: #b9d9eb;
}
</style>
<script setup lang="ts">
</script>
