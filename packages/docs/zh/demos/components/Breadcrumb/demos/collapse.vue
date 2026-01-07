<template>
  <div class="demo-block">
    <h-row>
      <h-col :span="24">
        <h-form label-position="left" label-vertical-align="middle" style="max-width: 500px">
          <h-form-item label="width">
            <h-slider v-model="width" :min="100" :max="600" :step="25" :input-enable="true" />
          </h-form-item>
        </h-form>
      </h-col>
      <h-col :span="24">
        <div class="demo-title">
          整体折行
        </div>
        <div :style="{width: width + 'px'}">
          <h-breadcrumb>
            <h-breadcrumb-item>Home</h-breadcrumb-item>
            <h-breadcrumb-item>Sub Page1</h-breadcrumb-item>
            <h-breadcrumb-item>Sub Page2</h-breadcrumb-item>
            <h-breadcrumb-item>Sub Page3</h-breadcrumb-item>
            <h-breadcrumb-item>Sub Page4</h-breadcrumb-item>
            <h-breadcrumb-item>Sub Page5</h-breadcrumb-item>
            <h-breadcrumb-item>Sub Page6</h-breadcrumb-item>
          </h-breadcrumb>
        </div>
      </h-col>
      <h-col :span="24">
        <div class="demo-title">超过最大尺寸后，自动收起展示</div>
        <div :style="{width: width + 'px'}">
          <h-breadcrumb display-type="ellipsis" @itemClick="onItemClick">
            <h-breadcrumb-item key="1">Home</h-breadcrumb-item>
            <h-breadcrumb-item key="2" :clickable="true" @click="onClick">Sub Page1</h-breadcrumb-item>
            <h-breadcrumb-item key="3">Sub Page2</h-breadcrumb-item>
            <h-breadcrumb-item key="4">Sub Page3</h-breadcrumb-item>
            <h-breadcrumb-item key="5">Sub Page4</h-breadcrumb-item>
            <h-breadcrumb-item key="6">Sub Page5</h-breadcrumb-item>
            <h-breadcrumb-item key="7">Sub Page6</h-breadcrumb-item>
          </h-breadcrumb>
        </div>
      </h-col>
    </h-row>
  </div>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { useBreadcrumbItemProps } from '@aurora/horizon-web';

const width = ref(600);

function onItemClick(prop: ExtractPropTypes<typeof useBreadcrumbItemProps>, evt: MouseEvent) {
  console.info('item-click: ', prop, evt);
}

function onClick(evt: MouseEvent) {
  console.info('click:', evt);
}
</script>
