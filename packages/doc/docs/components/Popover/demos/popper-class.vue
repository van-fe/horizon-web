<template>
  <div class="mb-4">
    使用popperClass挂载样式，但是custom-style选择器写在test-wrap下面，所以没生效
  </div>
  <div class="test-wrap mb-4">
    <n-popover popper-class="custom-style">
      <template #reference>
        <n-button type="normal">使用popperClass挂载样式</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div class="popper">
            <div class="header">内容标题</div>
            <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
          </div>
        </n-pop-content>
      </template>
    </n-popover>
  </div>
  <div class="mb-4">使用popperClass挂载样式，custom-style2选择器直接写在顶层，可以生效</div>
  <div class="test-wrap mb-4">
    <n-popover class="mr-4" popper-class="custom-style2">
      <template #reference>
        <n-button type="normal">使用popperClass挂载样式</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div class="popper">
            <div class="header">内容标题</div>
            <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
          </div>
        </n-pop-content>
      </template>
    </n-popover>
  </div>
  <div class="mb-4">在Dialog中使用popover，设置toBody来处理z-index的问题</div>
  <n-button type="normal" class="mb-4" @click="dialogShow1 = true">在Dialog中使用popover</n-button>
  <n-dialog
    v-model="dialogShow1"
    title="标题"
    @primaryClick="dialogShow1 = false"
    @secondaryClick="dialogShow1 = false"
  >
    <n-popover class="mr-4">
      <template #reference>
        <n-button type="normal">不设置toBody</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div class="popper">
            <div class="header">内容标题</div>
            <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
          </div>
        </n-pop-content>
      </template>
    </n-popover>
    <n-popover class="mr-4" :to-body="false">
      <template #reference>
        <n-button type="normal">设置toBody为false</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div class="popper">
            <div class="header">内容标题</div>
            <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
          </div>
        </n-pop-content>
      </template>
    </n-popover>
  </n-dialog>
  <div class="mb-4">在Dialog中使用popover，直接设置z-index</div>
  <n-button type="normal" class="mb-4" @click="dialogShow2 = true">在Dialog中使用popover</n-button>
  <n-dialog
    v-model="dialogShow2"
    title="标题"
    @primaryClick="dialogShow2 = false"
    @secondaryClick="dialogShow2 = false"
  >
    <n-popover class="mr-4">
      <template #reference>
        <n-button type="normal">不设置z-index</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div class="popper">
            <div class="header">内容标题</div>
            <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
          </div>
        </n-pop-content>
      </template>
    </n-popover>
    <n-popover class="mr-4" popper-class="custom-style3">
      <template #reference>
        <n-button type="normal">设置z-index，注意样式如果写在scoped中可能不生效</n-button>
      </template>
      <template #popper>
        <n-pop-content>
          <div class="popper">
            <div class="header">内容标题</div>
            <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
          </div>
        </n-pop-content>
      </template>
    </n-popover>
  </n-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      dialogShow1: false,
      dialogShow2: false,
    };
  },
});
</script>

<style scoped>
.test-wrap .custom-style .popper {
  width: 280px;
}

.test-wrap .custom-style .header {
  color: red;
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.test-wrap .custom-style .content {
  font-size: 14px;
  line-height: 22px;
}

.test-wrap .custom-style .nocontent-wrap {
  background-color: #555;
  color: #fff;
}

.custom-style2 .popper {
  width: 280px;
}

.custom-style2 .header {
  color: red;
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.custom-style2 .content {
  font-size: 14px;
  line-height: 22px;
}

.custom-style2 .nocontent-wrap {
  background-color: #555;
  color: #fff;
}
</style>

<style>
.custom-style3 {
  z-index: 1100;
}
</style>
