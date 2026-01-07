<template>
  <div class="flex justify-space-between">
    <h-collapse :active-key="activeKey" accordion style="width: 500px">
      <h-collapse-item title="This is a panel header." name="1">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="Why can i not submit a higher price?" name="2">
        <div>Why can i not submit a higher price?</div>
      </h-collapse-item>
      <h-collapse-item title="How are you？" name="3">How are you？</h-collapse-item>
      <h-collapse-item title="What are Promotion Products?" name="4">
        What are Promotion Products?
      </h-collapse-item>
    </h-collapse>
    <h-collapse
      :active-key="activeKey"
      accordion
      filled
      style="width: 500px"
      @change="handleExpand"
    >
      <h-collapse-item title="This is a panel header." name="1">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item title="Why can i not submit a higher price?" name="2">
        <div>Why can i not submit a higher price?</div>
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
    const activeKey = ref('1');
    const handleExpand = val => {
      console.info(`activeKey ===> `, val);
    };
    return {
      activeKey,
      handleExpand,
    };
  },
});
</script>
