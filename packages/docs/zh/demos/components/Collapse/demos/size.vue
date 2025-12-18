<template>
  <div class="mb-5">
    <div>size:</div>
    <n-radio-group v-model="selectSize">
      <n-radio
        v-for="(label, index) in ['small', 'medium', 'large']"
        :key="index"
        :label="label"
        size="small"
      />
    </n-radio-group>
  </div>
  <div class="mb-5">
    <div>expand-icon-position:</div>
    <n-radio-group v-model="selectPosition">
      <n-radio
        v-for="(label, index) in ['left', 'right']"
        :key="index"
        :label="label"
        size="small"
      />
    </n-radio-group>
  </div>
  <div class="flex justify-space-between">
    <n-collapse
      :active-key="activeKey"
      style="width: 500px"
      :size="selectSize"
      :expand-icon-position="selectPosition"
      @change="handleExpand"
    >
      <n-collapse-item title="This is a panel header." name="1">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
        <div>sunt nostrud amet.Amet minim mollit.</div>
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
    <n-collapse
      :active-key="activeKey"
      filled
      :size="selectSize"
      style="width: 500px"
      :expand-icon-position="selectPosition"
    >
      <n-collapse-item title="This is a panel header." name="1">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
        <div>sunt nostrud amet.Amet minim mollit.</div>
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
    const activeKey = ref(['1', '2']);
    const handleExpand = activeKeys => {
      console.log(`activeKeys ===> `, activeKeys);
    };
    const selectSize = ref('medium');
    const selectPosition = ref('left');
    return {
      activeKey,
      handleExpand,
      selectSize,
      selectPosition,
    };
  },
});
</script>
