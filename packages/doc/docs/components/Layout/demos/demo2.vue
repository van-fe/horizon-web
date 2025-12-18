<template>
  <div class="demo">
    <n-row :gutter="10">
      <n-col><div class="grid-content">gutter 10px</div></n-col>
      <n-col><div class="grid-content">gutter 10px</div></n-col>
      <n-col><div class="grid-content">gutter 10px</div></n-col>
    </n-row>
    <n-row :hspace="0" :vspace="4">
      <n-col><div class="grid-content">hspace 0px, vspace 4px</div></n-col>
      <n-col><div class="grid-content">hspace 0px, vspace 4px</div></n-col>
      <n-col><div class="grid-content">hspace 0px, vspace 4px</div></n-col>
    </n-row>
    <n-row :hspace="8">
      <n-col><div class="grid-content">hspace 8px</div></n-col>
      <n-col><div class="grid-content">hspace 8px</div></n-col>
      <n-col><div class="grid-content">hspace 8px</div></n-col>
      <n-col><div class="grid-content">hspace 8px</div></n-col>
      <n-col><div class="grid-content">hspace 8px</div></n-col>
      <n-col><div class="grid-content">hspace 8px</div></n-col>
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
