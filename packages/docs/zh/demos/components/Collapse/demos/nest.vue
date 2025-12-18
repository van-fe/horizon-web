<template>
  <div class="flex justify-space-between">
    <n-collapse :active-key="activeKey" style="width: 500px">
      <n-collapse-item title="This is a panel header." name="1">
        <n-collapse :active-key="activeKey">
          <n-collapse-item title="This is a panel header." name="1">
            <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
            <div>Velit officia consequat duis enim velit mollit.</div>
          </n-collapse-item>
          <n-collapse-item title="This is a panel header." name="0">
            <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
            <div>Velit officia consequat duis enim velit mollit.</div>
          </n-collapse-item>
        </n-collapse>
      </n-collapse-item>
      <n-collapse-item title="Why can i not submit a higher price?" name="2">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </n-collapse-item>
      <n-collapse-item title="How are you？" name="3">How are you？</n-collapse-item>
      <n-collapse-item title="What are Promotion Products?" name="4">
        What are Promotion Products?
      </n-collapse-item>
    </n-collapse>
    <n-collapse :active-key="activeKey" style="width: 500px" filled>
      <n-collapse-item title="This is a panel header." name="1">
        <n-collapse :active-key="activeKey">
          <n-collapse-item title="This is a panel header." name="1">
            <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
            <div>Velit officia consequat duis enim velit mollit.</div>
          </n-collapse-item>
          <n-collapse-item title="This is a panel header." name="0">
            <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
            <div>Velit officia consequat duis enim velit mollit.</div>
          </n-collapse-item>
        </n-collapse>
      </n-collapse-item>
      <n-collapse-item title="Why can i not submit a higher price?" name="2">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </n-collapse-item>
      <n-collapse-item title="How are you？" name="3">How are you？</n-collapse-item>
      <n-collapse-item title="What are Promotion Products?" name="4">
        What are Promotion Products?
      </n-collapse-item>
    </n-collapse>
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
