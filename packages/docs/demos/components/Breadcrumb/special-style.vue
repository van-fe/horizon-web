<template>
  <div class="demo-block">
    <h-grid :gap="12">
      <h-grid-item :span="24">
        <div class="demo-title">
          单个文本超出一定长度后
        </div>
        <h-breadcrumb
          :separator="IconArrowRight"
          :texts="[
        { text: 'Home' },
        { text: 'long text long text long text long text long text long text long text long text' },
        { text: 'Sub Page2' },
      ]"
        />
      </h-grid-item>
      <h-grid-item :span="24">
        <div class="demo-title">当前所在位置增加字重</div>
        <h-breadcrumb
          :title="true"
          :texts="[
      { text: 'Home' },
      { text: 'Sub Page1' },
      { text: 'Sub Page2' },
      { text: 'Sub Page3' },
      { text: 'Sub Page4' },
    ]"
        />
      </h-grid-item>
    </h-grid>
  </div>
</template>

<script setup lang="ts">
import { IconArrowRight } from '@aurora/icon';
</script>
