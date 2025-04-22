<template>
  <div class="demo">
    <n-row>
      <n-col><div class="grid-content">span unset</div></n-col>
    </n-row>
    <n-row>
      <n-col><div class="grid-content">span unset</div></n-col>
      <n-col :span="4"><div class="grid-content">span 4</div></n-col>
      <n-col><div class="grid-content">span unset</div></n-col>
    </n-row>
    <n-row>
      <n-col :span="4"><div class="grid-content">span 4</div></n-col>
      <n-col :span="8"><div class="grid-content">span 8</div></n-col>
      <n-col :span="12"><div class="grid-content">span 12</div></n-col>
    </n-row>
    <n-row>
      <n-col><div class="grid-content">span unset</div></n-col>
      <n-col :offset="3"><div class="grid-content">span unset, offset 3</div></n-col>
      <n-col :offset="3"><div class="grid-content">span unset, offset 3</div></n-col>
    </n-row>
  </div>
</template>

<style scoped>
.demo .grid-content {
  border-radius: 4px;
  line-height: 36px;
  text-align: center;
}

.demo .n-col {
  background-clip: content-box;
}

.demo .n-col:nth-child(odd) {
  background-color: #00bcbc;
}

.demo .n-col:nth-child(even) {
  background-color: #b7e8ea;
}
</style>
