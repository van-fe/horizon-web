<template>
  <div class="wrapper">
    <div class="content-box">
      <n-watermark
        :content="content"
        :image="image"
        :rotate="rotate"
        :z-index="zIndex"
        :line-gap="lineGap"
        :gap="[gapX, gapY]"
        :offset="[offsetX, offsetY]"
        :opacity="opacity"
        :global="global"
        @tampered="tamperedHandle"
      >
        <div style="height: 500px; overflow: auto;">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem rerum, dolores ex ipsa distinctio officiis necessitatibus ab deserunt aperiam veritatis quisquam nihil non praesentium quasi ad tempore est. Necessitatibus, id.
          Voluptatem incidunt fugiat fuga quasi iure nobis assumenda impedit nesciunt sequi facere illo ad, necessitatibus odit rerum itaque maxime. Quos molestias aut iste quas eveniet. Tempore culpa molestias beatae impedit.
          Tempore distinctio accusantium commodi illum ducimus rerum magnam totam sapiente obcaecati illo nostrum corrupti qui velit accusamus iste a et quos, quae cupiditate at deleniti eos! Minima qui debitis in.
          Necessitatibus officiis nulla iste incidunt unde iure, natus vel voluptatem voluptates minus commodi ad? Velit facere, dolorum rem explicabo voluptate ullam! Facere porro suscipit reprehenderit impedit maxime sed vero aliquid?
          Cumque, harum. Dignissimos, est quo aliquid placeat minus at quae fugiat deserunt, iure beatae quasi alias aspernatur explicabo, assumenda facere quibusdam veritatis unde dolorem facilis. Delectus officiis quae facilis aliquid?
          Minus expedita dolor omnis necessitatibus earum? Enim assumenda sequi dolorum consequuntur possimus nulla vero fuga asperiores voluptate laudantium, qui aliquam corporis aliquid, repellat eius eos nisi quam velit modi maxime.
          Vel minus, ab voluptas veritatis nobis libero ipsum eum ullam blanditiis architecto voluptatem. Eveniet accusantium nobis rerum a aspernatur! Odit nemo quidem tenetur, perspiciatis optio molestias! Modi, beatae. Veritatis, quos.
          Esse unde ipsam saepe magni, blanditiis qui obcaecati rem officiis earum repellat, et totam sit odio quo, doloribus harum eos vel voluptates excepturi a ducimus! Dolorem quis libero voluptate esse!
          Nihil nemo laudantium dolore voluptatem iste omnis maxime tenetur, nisi ut veniam doloremque exercitationem vero, qui, porro pariatur! Minus, fugiat ipsa explicabo praesentium tempora delectus aspernatur saepe dolor aliquam pariatur?
          Maxime cum facere saepe? Dolorem, ipsa, animi excepturi corporis sint velit incidunt placeat totam esse, quos dolores vel? Facilis at maiores ullam dolores voluptas eum temporibus rerum quam modi tempore.
          Nihil nemo laudantium dolore voluptatem iste omnis maxime tenetur, nisi ut veniam doloremque exercitationem vero, qui, porro pariatur! Minus, fugiat ipsa explicabo praesentium tempora delectus aspernatur saepe dolor aliquam pariatur?
          Maxime cum facere saepe? Dolorem, ipsa, animi excepturi corporis sint velit incidunt placeat totam esse, quos dolores vel? Facilis at maiores ullam dolores voluptas eum temporibus rerum quam modi tempore.
        </div>
      </n-watermark>
    </div>
    <div class="control-box">
      <strong>全局模式</strong>
      <div class="control-item">
        <n-switch v-model="global" />
      </div>
      <strong>文本内容</strong>
      <div class="control-item">
        <n-input v-model="content" />
      </div>
      <strong>是否显示图片内容</strong>
      <div class="control-item">
        <n-switch v-model="showImage" />
      </div>
      <template v-if="showImage">
        <strong>图片内容</strong>
        <div class="control-item">
          <n-input v-model="image" />
        </div>
      </template>
      <strong>旋转角度</strong>
      <div class="control-item">
        <n-input-number v-model="rotate" />
      </div>
      <strong>zIndex层级</strong>
      <div class="control-item">
        <n-input-number v-model="zIndex" />
      </div>
      <strong>多行文本垂直方向的间距</strong>
      <div class="control-item">
        <n-input-number v-model="lineGap" />
      </div>
      <strong>水平及垂直间距（gapX、gapY）</strong>
      <div class="control-item">
        <n-input-number v-model="gapX" />
        <n-input-number v-model="gapY" />
      </div>
      <strong>水平及垂直偏移量（offsetX、offsetY）</strong>
      <div class="control-item">
        <n-input-number v-model="offsetX" />
        <n-input-number v-model="offsetY" />
      </div>
      <strong>不透明度</strong>
      <div class="control-item">
        <n-input-number v-model="opacity" :min="0" :max="1" :step="0.1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const global = ref(false);
const content = ref('watermark watermark');
const image = ref<string | null>(null);
const showImage = ref(false);
const rotate = ref(-15);
const zIndex = ref(99999);
const lineGap = ref(5);
const gapX = ref(100);
const gapY = ref(60);
const offsetX = ref(0);
const offsetY = ref(0);
const opacity = ref(0.1);

watch(showImage, () => {
  image.value = showImage.value ? 'https://cdn-app.nio.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg' : null;
});

const tamperedHandle = () => {
  console.log("水印元素被“删除”或“篡改”啦！");
};
</script>

<style scoped lang="scss">
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
.wrapper .content-box {
  float: left;
  margin-right: 30px;
  width: 60%;
  border: 1px solid #e8e8e8;
}
.wrapper .control-box {
  float: left;
  width: 30%;
}
.control-item {
  display: flex;
  margin-bottom: 5px;
  & > div:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
