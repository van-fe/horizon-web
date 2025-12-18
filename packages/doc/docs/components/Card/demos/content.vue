<template>
  <div class="content">
    <n-card title="标题">
      <img
          class="content-img"
          src="https://static.nio.com/fx-static/card-component/clbu60ecm0000072w2izw1wsp/img.png"
          alt=""
      />
    </n-card>
    <n-card>
      <ul class="list">
        <li :key="item" v-for="item in 3">
          <h4>标题</h4>
          <p>
            卡片内容区域可以是文字、图片、表单、表格等形式信息内容。可使用大中小不同的卡片尺寸，按业务需求进行呈现。
          </p>
        </li>
      </ul>
    </n-card>
    <n-card>
      <template #header>
        <n-tabs size="medium" v-model="tab">
          <n-tab label="标签一" name="label1"></n-tab>
          <n-tab label="标签二" name="label2"></n-tab>
          <n-tab label="标签三" name="label3"></n-tab>
        </n-tabs>
      </template>
      <p>
        这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段长很长很长很长很长很长很的内容文案
      </p>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('label1');
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
}
.content-img {
  width: 100%;
  object-fit: contain;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;

  li + li {
    margin-top: 24px;
    font-family: 'Blue Sky Noto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }
  h4 {
    font-weight: 400;
    color: #868A9A;
    margin-bottom: 4px;
  }
  p {
    color: #040b29;
  }
}
</style>
