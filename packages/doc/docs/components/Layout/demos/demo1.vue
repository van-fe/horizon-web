<template>
  <div class="demo">
    <h-row>
      <h-col><div class="grid-content">span unset</div></h-col>
    </h-row>
    <h-row>
      <h-col><div class="grid-content">span unset</div></h-col>
      <h-col :span="4"><div class="grid-content">span 4</div></h-col>
      <h-col><div class="grid-content">span unset</div></h-col>
    </h-row>
    <h-row>
      <h-col :span="4"><div class="grid-content">span 4</div></h-col>
      <h-col :span="8"><div class="grid-content">span 8</div></h-col>
      <h-col :span="12"><div class="grid-content">span 12</div></h-col>
    </h-row>
    <h-row>
      <h-col><div class="grid-content">span unset</div></h-col>
      <h-col :offset="3"><div class="grid-content">span unset, offset 3</div></h-col>
      <h-col :offset="3"><div class="grid-content">span unset, offset 3</div></h-col>
    </h-row>
  </div>
</template>

<style scoped>
.demo .grid-content {
  border-radius: 4px;
  line-height: 36px;
  text-align: center;
}

.demo .h-col {
  background-clip: content-box;
}

.demo .h-col:nth-child(odd) {
  background-color: #00bcbc;
}

.demo .h-col:nth-child(even) {
  background-color: #b7e8ea;
}
</style>
