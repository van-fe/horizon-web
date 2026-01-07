<template>
  <div class="flex justify-space-between">
    <h-collapse :active-key="activeKey" style="width: 500px" @change="handleExpand">
      <h-collapse-item name="1">
        <template #title>
          <AIcon name="task_complete" class="mr-2" size="24" />
          This is a panel header.
        </template>
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
        <div>sunt nostrud amet.Amet minim mollit.</div>
      </h-collapse-item>
      <h-collapse-item name="2">
        <template #title>
          <div class="flex justify-space-between flex-1">
            <div>Why can i not submit a higher price?</div>
            <div class="ml-3">Extra Info</div>
          </div>
        </template>
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item name="3">
        <template #title>
          <div class="flex justify-space-between flex-1">
            <div>How are you？</div>
            <h-button class="ml-3" size="small" :plain="true" @click.stop="handleClickButton">
              Default
            </h-button>
          </div>
        </template>
        How are you？
      </h-collapse-item>
      <h-collapse-item name="4">
        <template #title>
          <div class="flex justify-space-between flex-1">
            <div>What are Promotion Products?</div>
            <AIcon class="ml-3" name="alarm" />
          </div>
        </template>
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
    const handleExpand = activeKeys => {
      console.info(`activeKeys ===> `, activeKeys);
    };
    const handleClickButton = () => {
      console.info('click button');
    };
    return {
      activeKey,
      handleExpand,
      handleClickButton,
    };
  },
});
</script>
