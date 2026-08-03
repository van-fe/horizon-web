<template>
  <ul>
    <li>
      <p>带操作</p>
      <h-card top-divider>
        <template #header>
          <div class="header">
            卡片标题
            <a>操作</a>
          </div>
        </template>
        {{ content }}
      </h-card>
    </li>
    <li>
      <p>checkbox</p>
      <h-card top-divider>
        <template #header>
          <div class="header2">
            <h-checkbox v-model="checkbox">卡片标题</h-checkbox>
          </div>
        </template>
        {{ content }}
      </h-card>
    </li>
    <li>
      <p>带标签</p>
      <h-card top-divider>
        <template #header>
          <div class="header3">
            <div>
              <h-tag size="medium">标签</h-tag>
            </div>
            <span class="title">卡片标题</span>
          </div>
        </template>
        {{ content }}
      </h-card>
    </li>
    <li>
      <p>带图标</p>
      <h-card top-divider>
        <template #header>
          <div class="header4">
            <svg
              t="1671430836155"
              class="icon"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2785"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="200"
              height="200"
            >
              <path
                fill="currentColor"
                d="M512.042667 682.666667c-94.122667 0-170.666667-76.544-170.666667-170.666667s76.544-170.666667 170.666667-170.666667 170.666667 76.544 170.666666 170.666667-76.586667 170.666667-170.666666 170.666667z m0-298.666667c-70.570667 0-128 57.429333-128 128s57.429333 128 128 128 128-57.429333 128-128-57.429333-128-128-128z"
                p-id="2786"
              ></path>
              <path
                fill="currentColor"
                d="M512.042667 810.666667C267.989333 810.666667 66.56 603.562667 10.666667 540.074667a42.922667 42.922667 0 0 1-0.085334-56.106667C66.517333 420.48 267.989333 213.333333 512.042667 213.333333c243.797333 0 445.098667 206.72 501.205333 270.378667l0.256 0.298667c13.866667 15.957333 13.866667 40.021333 0 55.978666C957.525333 603.52 756.053333 810.666667 512.042667 810.666667z m0-554.666667C285.909333 256 95.573333 452.010667 42.666667 512.128 95.616 571.989333 285.866667 768 512.042667 768c226.133333 0 416.426667-196.010667 469.376-256.128C928.426667 452.010667 738.133333 256 512.042667 256z"
                p-id="2787"
              ></path>
            </svg>
            <p>DD UED TEAM</p>
            <p style="color:#868a9a;font-weight:400">描述文案描述文案描述文案描述文案</p>
          </div>
        </template>
        {{ content }}
      </h-card>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const checkbox = ref(false);
const content = ref(
  '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案',
);
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 16px;

  a {
    color: #00bebe;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
  }
}

.header2 {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 16px;

  .checkbox {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 1px solid #9b9da9;
    border-radius: 4px;
    margin-right: 12px;
  }
}
.header3 {
  .title {
    margin-top: 12px;
    display: block;
    color: #040b29;
    line-height: 24px;
    font-weight: 700;
    font-size: 16px;
  }
}
.header4 {
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 16px;

  svg {
    width: 28px;
    height: 28px;
    color: #00b3be;
  }
  p {
    margin: 0;
    &:first-of-type {
      margin: 12px 0 4px;
      font-size: 16px;
      color: #040b29;
    }
    &:last-of-type {
      color: #6f7385;
      font-size: 12px;
    }
  }
}
p {
  margin: 20px 0;
}
ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 12px;
}
</style>
