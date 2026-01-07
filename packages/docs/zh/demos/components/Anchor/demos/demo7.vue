<template>
  <div class="wrapper">
    <div class="control-box">
      <strong>设置 组件尺寸:</strong>
      <h-radio-group v-model="curSize">
        <h-radio v-for="item in sizeOptions" :key="item.value" :label="item.value" size="small">{{item.label}}</h-radio>
      </h-radio-group>
      <br/>
      <strong>设置 容器的最大高度(px):</strong>
      <h-input-number v-model="curMaxHeight" :precision="0" :step="50" />
      <br/><br/>
      <strong>设置 是否显示一级导航的数字后缀:</strong>
      <br/>
      <h-switch v-model="showTitleSuffix" status status-on-text="是" status-off-text="否" />
      <br/><br/>
      <strong>修改 倒数第二个导航title:</strong>
      <h-input v-model="lastSecondTitle" />
      <br/><br/>
      <strong>修改 倒数第一个导航title:</strong>
      <h-input v-model="lastFirstTitle" />
    </div>
    <div class="content-box">
      <h-anchor :scroll-container="scrollContainer" :size="curSize" :show-title-suffix="showTitleSuffix" :max-height="curMaxHeight" link-target="_top">
        <h-anchor-link href="#设置尺寸" title="设置尺寸"  />
        <h-anchor-link href="#是否改变hash" title="是否改变hash" />
        <h-anchor-link href="#自定义滚动容器" title="自定义滚动容器" />
        <h-anchor-link href="#设置偏移量" title="设置偏移量" />
        <h-anchor-link href="#是否开启折叠模式" title="是否开启折叠模式" />
        <h-anchor-link href="#是否展示侧边线" title="是否展示侧边线" />
        <h-anchor-link href="#监听自定义事件" :title="lastSecondTitle" />
        <h-anchor-link href="#额外的使用场景" :title="lastFirstTitle">
          <h-anchor-link href="#sectionOne3" title="sectionOne3" />
          <h-anchor-link href="#sectionOne4" title="sectionOne4" />
          <h-anchor-link href="#sectionOne5" title="sectionOne5" />
          <h-anchor-link href="#sectionOne6" title="多行文本溢出多行文本溢出多行文本溢出" />
        </h-anchor-link>
      </h-anchor>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const scrollContainer = top?.document.querySelector('main.h-main');
const curSize = ref<'medium' | 'small'>('medium');
const sizeOptions = ref([
  { label: 'medium', value: 'medium' },
  { label: 'small', value: 'small' },
]);
const curMaxHeight = ref(260);
const showTitleSuffix = ref(false);
const lastFirstTitle = ref('倒数第一个导航title');
const lastSecondTitle = ref('倒数第二个导航title');
</script>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 300px;
  margin: 10px;
}

.wrapper::after {
  content: '';
  display: block;
  clear: both;
}

.wrapper .control-box {
  float: left;
  width: 50%;
}

.wrapper .content-box {
  float: left;
  margin-left: 30px;
}
</style>
