<template>
  <div class="demo-block">
    <n-row>
      <n-col :span="24">
        <n-form label-position="left" label-vertical-align="middle" style="max-width: 500px">
          <n-form-item label="width">
            <n-slider v-model="width" :min="100" :max="600" :step="25" :input-enable="true" />
          </n-form-item>
        </n-form>
      </n-col>
      <n-col :span="24">
        <div class="demo-title">
          整体折行
        </div>
        <div :style="{width: width + 'px'}">
          <n-breadcrumb>
            <n-breadcrumb-item>Home</n-breadcrumb-item>
            <n-breadcrumb-item>Sub Page1</n-breadcrumb-item>
            <n-breadcrumb-item>Sub Page2</n-breadcrumb-item>
            <n-breadcrumb-item>Sub Page3</n-breadcrumb-item>
            <n-breadcrumb-item>Sub Page4</n-breadcrumb-item>
            <n-breadcrumb-item>Sub Page5</n-breadcrumb-item>
            <n-breadcrumb-item>Sub Page6</n-breadcrumb-item>
          </n-breadcrumb>
        </div>
      </n-col>
      <n-col :span="24">
        <div class="demo-title">超过最大尺寸后，自动收起展示</div>
        <div :style="{width: width + 'px'}">
          <n-breadcrumb display-type="ellipsis" @itemClick="onItemClick">
            <n-breadcrumb-item key="1">Home</n-breadcrumb-item>
            <n-breadcrumb-item key="2" :clickable="true" @click="onClick">Sub Page1</n-breadcrumb-item>
            <n-breadcrumb-item key="3">Sub Page2</n-breadcrumb-item>
            <n-breadcrumb-item key="4">Sub Page3</n-breadcrumb-item>
            <n-breadcrumb-item key="5">Sub Page4</n-breadcrumb-item>
            <n-breadcrumb-item key="6">Sub Page5</n-breadcrumb-item>
            <n-breadcrumb-item key="7">Sub Page6</n-breadcrumb-item>
          </n-breadcrumb>
        </div>
      </n-col>
    </n-row>
  </div>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { useBreadcrumbItemProps } from '@aurora/horizon-web';

const width = ref(600);

function onItemClick(prop: ExtractPropTypes<typeof useBreadcrumbItemProps>, evt: MouseEvent) {
  console.log('item-click: ', prop, evt);
}

function onClick(evt: MouseEvent) {
  console.log('click:', evt);
}
</script>
