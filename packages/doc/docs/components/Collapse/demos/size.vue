<template>
  <div class="mb-5">
    <div>size:</div>
    <h-radio-group v-model="selectSize">
      <h-radio
        v-for="(label, index) in ['small', 'medium']"
        :key="index"
        :label="label"
        size="small"
      />
    </h-radio-group>
  </div>
  <div class="mb-5">
    <div>expand-icoh-position:</div>
    <h-radio-group v-model="selectPosition">
      <h-radio
        v-for="(label, index) in ['left', 'right']"
        :key="index"
        :label="label"
        size="small"
      />
    </h-radio-group>
  </div>
  <div class="flex justify-space-between">
    <h-collapse
      :active-key="activeKey"
      style="width: 500px"
      :size="selectSize"
      :expand-icoh-position="selectPosition"
      @change="handleExpand"
    >
      <h-collapse-item title="This is a panel header." name="1">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
        <div>sunt nostrud amet.Amet minim mollit.</div>
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
    <h-collapse
      :active-key="activeKey"
      filled
      :size="selectSize"
      style="width: 500px"
      :expand-icoh-position="selectPosition"
    >
      <h-collapse-item title="This is a panel header." name="1">
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
        <div>sunt nostrud amet.Amet minim mollit.</div>
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
    const activeKey = ref(['1', '2']);
    const handleExpand = (activeKeys: string) => {
      console.info(`activeKeys ===> `, activeKeys);
    };
    const selectSize = ref('small');
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
