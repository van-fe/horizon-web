<template>
  <div class="flex justify-space-between">
    <n-collapse :active-key="activeKey" style="width: 500px" size="small" @change="handleExpand">
      <n-collapse-item name="1">
        <template #title>
          <AIcon name="task_complete" class="mr-2" size="16" />
          This is a panel header.
        </template>
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
        <div>sunt nostrud amet.Amet minim mollit.</div>
      </n-collapse-item>
      <n-collapse-item name="2">
        <template #title>
          <div class="flex justify-space-between flex-1">
            <div>Why can i not submit a higher price?</div>
            <div class="ml-3">Extra Info</div>
          </div>
        </template>
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </n-collapse-item>
      <n-collapse-item name="3">
        <template #title>
          <div class="flex justify-space-between flex-1">
            <div>How are you？</div>
            <n-button class="ml-3" size="small" :plain="true" @click.stop="handleClickButton">
              Default
            </n-button>
          </div>
        </template>
        How are you？
      </n-collapse-item>
      <n-collapse-item name="4">
        <template #title>
          <div class="flex align-center justify-space-between flex-1">
            <div>What are Promotion Products?</div>
            <AIcon class="ml-3" name="alarm" />
          </div>
        </template>
        What are Promotion Products?
      </n-collapse-item>
    </n-collapse>
    <n-collapse :active-key="activeKey" filled style="width: 500px" expand-icon-position="right" size="small">
      <n-collapse-item name="1">
        <template #title>
          <div class="flex justify-space-between align-center" style="width: 100%;">
            <div class="flex-ai-c">
              <div class="flex-ai-c" @click.stop>
                <NCheckbox v-model="checkboxOptions[0].checked" />
              </div>
              <div>This is a panel header.</div>
            </div>
            <AIcon name="rubbish" style="margin-right: 28px;" size="16" />
          </div>
        </template>
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
        <div>sunt nostrud amet.Amet minim mollit.</div>
      </n-collapse-item>
      <n-collapse-item name="2">
        <template #title>
          <div class="flex justify-space-between align-center" style="width: 100%;">
            <div class="flex-ai-c">
              <div class="flex-ai-c" @click.stop>
                <NCheckbox v-model="checkboxOptions[1].checked" />
              </div>
              <div>Why can i not submit a higher price?</div>
            </div>
            <AIcon name="rubbish" style="margin-right: 28px;" size="16" />
          </div>
        </template>
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </n-collapse-item>
      <n-collapse-item name="3">
        <template #title>
          <div class="flex justify-space-between align-center" style="width: 100%;">
            <div class="flex-ai-c" @click.stop>
              <div class="flex-ai-c" @click.stop>
                <NCheckbox v-model="checkboxOptions[2].checked" />
              </div>
              <div>How are you？</div>
            </div>
            <AIcon name="rubbish" style="margin-right: 28px;" size="16" />
          </div>
        </template>
        How are you？
      </n-collapse-item>
      <n-collapse-item name="4">
        <template #title>
          <div class="flex justify-space-between align-center" style="width: 100%;">
            <div class="flex-ai-c" @click.stop>
              <div class="flex-ai-c" @click.stop>
                <NCheckbox v-model="checkboxOptions[3].checked" />
              </div>
              <div>What are Promotion Products?</div>
            </div>
            <AIcon name="rubbish" style="margin-right: 28px;" size="16" />
          </div>
        </template>
        What are Promotion Products?
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script lang="ts">
import { NCheckbox } from '@aurora/horizon-web';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const activeKey = ref(['1', '2']);
    const handleExpand = (activeKeys: string) => {
      console.info(`activeKeys ===> `, activeKeys);
    };
    const handleClickButton = () => {
      console.info('click button');
    };
    const checkboxOptions = ref([
      {
        key: 1,
        checked: true,
      },
      {
        key: 2,
        checked: false,
      },
      {
        key: 3,
        checked: false,
      },
      {
        key: 4,
        checked: false,
      },
    ]);


    return {
      activeKey,
      handleExpand,
      handleClickButton,
      checkboxOptions,
    };
  },
});
</script>

<style scoped>
.flex-ai-c {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.n-checkbox__icon) {
  margin-right: 12px;
}
</style>