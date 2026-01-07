<template>
  <h-row :gutter="10">
    <h-col :span="8">
      <div class="demo-title">默认状态</div>
      <h-tag :clickable="false" size="small">Small</h-tag>
      <h-tag :clickable="false">Medium</h-tag>
      <h-tag :clickable="false" size="large">Large</h-tag>
    </h-col>
    <h-col :span="8">
      <div class="demo-title">强调状态</div>
      <h-tag :clickable="false" :bold="true" size="small">Small</h-tag>
      <h-tag :clickable="false" :bold="true">Medium</h-tag>
      <h-tag :clickable="false" :bold="true" size="large">Large</h-tag>
    </h-col>
  </h-row>
</template>
