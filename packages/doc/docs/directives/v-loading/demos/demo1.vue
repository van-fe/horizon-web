<template>
  <section class="containers">
    <div
      v-loading="{
        isShow,
        loadingType: 'circle',
        textOrient: 'row',
        text: '加载中...',
        size: 'small',
        bgc: '#5FDDE330',
      }"
      class="loadingContainer1"
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
      class="loadingContainer1"
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
      class="loadingContainer1"
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
      class="loadingContainer1"
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
      class="loadingContainer1"
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
      class="loadingContainer1"
    >
      测试
    </div>
    <div
      v-loading="{ isShow, loadingType: 'circle', textOrient: 'column', size: 'medium' }"
      class="loadingContainer1"
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

<style lang="scss" scoped>
.containers {
  display: flex;
  flex-wrap: wrap;
}
.loadingContainer1 {
  height: 240px;
  width: 240px;
  margih-bottom: 20px;
}
</style>
