<template>
  <p>带关闭操作:为用户提供关闭操作</p>
  <n-alert description="这是一条提示消息" type="info" closable show-icon />
  <n-alert
    :closable="true"
    show-icon
    title="标题"
    description="描述文字不换行，按钮布局方式在容器的右侧"
    type="info"
  />
  <p>带一个操作按钮:为了解决提示框内的问题需要进行操作/跳转时</p>
  <n-alert
    closable
    show-icon
    description="这是一条提示消息"
    type="info"
    primary-button-text="确定"
  />
  <p>带两个操作按钮:为了解决提示框内的问题需要进行操作/跳转时</p>
  <n-alert
    closable
    show-icon
    description="这是一条提示消息"
    type="info"
    primary-button-text="确定"
    default-button-text="取消"
    @close="callback"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const onPrimary = (close: Function) => {
      close();
    };
    const callback = () => {
      alert('设置回调的alert！');
    };
    const onDefault = () => {};
    return {
      callback,
      onDefault,
      onPrimary,
    };
  },
});
</script>
<style scoped>
.n-alert {
  margin: 20px 0;
}

.n-alert:first-child {
  margin: 0;
}
</style>
