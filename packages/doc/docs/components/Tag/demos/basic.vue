<template>
  <n-row :gutter="10">
    <n-col :span="8">
      <div class="demo-title">默认状态</div>
      <n-tag :clickable="false" size="small">Small</n-tag>
      <n-tag :clickable="false">Medium</n-tag>
      <n-tag :clickable="false" size="large">Large</n-tag>
    </n-col>
    <n-col :span="8">
      <div class="demo-title">强调状态</div>
      <n-tag :clickable="false" :bold="true" size="small">Small</n-tag>
      <n-tag :clickable="false" :bold="true">Medium</n-tag>
      <n-tag :clickable="false" :bold="true" size="large">Large</n-tag>
    </n-col>
  </n-row>
</template>
