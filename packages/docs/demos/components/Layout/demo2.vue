<template>
  <div class="demo">
    <h-row :gutter="10">
      <h-col><div class="grid-content">gutter 10px</div></h-col>
      <h-col><div class="grid-content">gutter 10px</div></h-col>
      <h-col><div class="grid-content">gutter 10px</div></h-col>
    </h-row>
    <h-row :hspace="0" :vspace="4">
      <h-col><div class="grid-content">hspace 0px, vspace 4px</div></h-col>
      <h-col><div class="grid-content">hspace 0px, vspace 4px</div></h-col>
      <h-col><div class="grid-content">hspace 0px, vspace 4px</div></h-col>
    </h-row>
    <h-row :hspace="8">
      <h-col><div class="grid-content">hspace 8px</div></h-col>
      <h-col><div class="grid-content">hspace 8px</div></h-col>
      <h-col><div class="grid-content">hspace 8px</div></h-col>
      <h-col><div class="grid-content">hspace 8px</div></h-col>
      <h-col><div class="grid-content">hspace 8px</div></h-col>
      <h-col><div class="grid-content">hspace 8px</div></h-col>
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
