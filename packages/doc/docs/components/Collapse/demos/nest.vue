<template>
  <div class="flex justify-space-between">
    <h-collapse :active-key="activeKey" style="width: 500px" border size="small">
      <h-collapse-item title="This is a panel header." name="1">
        <h-collapse :active-key="activeKey" border>
          <h-collapse-item title="This is a panel header." name="1">
            <div class="custom-area">自定义区域</div>
          </h-collapse-item>
          <h-collapse-item title="This is a panel header." name="0">
            <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
            <div>Velit officia consequat duis enim velit mollit.</div>
          </h-collapse-item>
        </h-collapse>
      </h-collapse-item>
      <h-collapse-item title="Why can i not submit a higher price?" name="2">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="How are you？" name="3">How are you？</h-collapse-item>
      <h-collapse-item title="What are Promotion Products?" name="4">
        What are Promotion Products?
      </h-collapse-item>
    </h-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const activeKey = ref(['1']);
    return {
      activeKey,
    };
  },
});
</script>

<style scoped>
.custom-area {
  text-align: center;
  line-height: 100px;
  width: 100%;
  height: 100px;
  background-color: rgba(156, 159, 172, 0.2);
  color: rgba(89, 94, 114, 1)
}
</style>
