<template>
  <section class="containers">
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'row',
        text: '加载中...',
        size: 'medium',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'row',
        text: '加载中...',
        size: 'medium',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'row',
        text: '加载中...',
        size: 'large',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'circle',
        textOrient: 'row',
        text: '加载中...',
        size: 'small',
        bgc: '#5FDDE330',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'circle',
        textOrient: 'row',
        text: '加载中...',
        size: 'medium',
        bgc: '#5FDDE330',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'circle',
        textOrient: 'row',
        text: '加载中...',
        size: 'large',
        bgc: '#5FDDE330',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'column',
        text: '加载中...',
        size: 'small',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'column',
        text: '加载中...',
        size: 'medium',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'dots',
        textOrient: 'column',
        text: '加载中...',
        size: 'large',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'circle',
        textOrient: 'column',
        text: '加载中...',
        size: 'small',
        bgc: '#5FDDE330',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'circle',
        textOrient: 'column',
        text: '加载中...',
        size: 'medium',
        bgc: '#5FDDE330',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{
        isShow,
        loadingType: 'circle',
        textOrient: 'column',
        text: '加载中...',
        size: 'large',
        bgc: '#5FDDE330',
      }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{ isShow, loadingType: 'dots', textOrient: 'column', size: 'large' }"
      class="loadingContainer"
    >
      测试
    </div>
    <div
      v-loading="{ isShow, loadingType: 'circle', textOrient: 'column', size: 'medium' }"
      class="loadingContainer"
    >
      测试
    </div>
  </section>
  <h-button size="large" type="primary" @click="show">显示</h-button>
  <h-button size="large" type="primary" @click="hide">隐藏</h-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const isShow = ref<any>(true);
const show = () => {
  isShow.value = true;
};
const hide = () => {
  isShow.value = false;
};
</script>

<style>
.containers {
  display: flex;
  flex-wrap: wrap;
}
.loadingContainer {
  height: 240px;
  width: 240px;
  margin-bottom: 20px;
}
</style>
