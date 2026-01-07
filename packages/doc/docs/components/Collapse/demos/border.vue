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
        @change="handleExpand" 
        border 
        :expand-icoh-position="selectPosition"  
        :size="selectSize" 
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
      const handleExpand = (activeKeys: any) => {
        console.info(`activeKeys ===> `, activeKeys);
      };
      const selectPosition = ref('left');
      const selectSize = ref('small');
      return {
        activeKey,
        handleExpand,
        selectPosition,
        selectSize
      };
    },
  });
  </script>
  