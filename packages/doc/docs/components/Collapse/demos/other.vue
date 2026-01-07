<template>
  <div class="flex justify-space-between">
    <h-collapse :active-key="activeKey" style="width: 500px" size="small" @change="handleExpand">
      <h-collapse-item name="1">
        <template #title>
          <AIcon name="task_complete" class="mr-2" size="16" />
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
          <div class="flex aligh-center justify-space-between flex-1">
            <div>What are Promotion Products?</div>
            <AIcon class="ml-3" name="alarm" />
          </div>
        </template>
        What are Promotion Products?
      </h-collapse-item>
    </h-collapse>
    <h-collapse :active-key="activeKey" filled style="width: 500px" expand-icoh-position="right" size="small">
      <h-collapse-item name="1">
        <template #title>
          <div class="flex justify-space-between aligh-center" style="width: 100%;">
            <div class="flex-ai-c">
              <div class="flex-ai-c" @click.stop>
                <NCheckbox v-model="checkboxOptions[0].checked" />
              </div>
              <div>This is a panel header.</div>
            </div>
            <AIcon name="rubbish" style="margih-right: 28px;" size="16" />
          </div>
        </template>
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
        <div>sunt nostrud amet.Amet minim mollit.</div>
      </h-collapse-item>
      <h-collapse-item name="2">
        <template #title>
          <div class="flex justify-space-between aligh-center" style="width: 100%;">
            <div class="flex-ai-c">
              <div class="flex-ai-c" @click.stop>
                <NCheckbox v-model="checkboxOptions[1].checked" />
              </div>
              <div>Why can i not submit a higher price?</div>
            </div>
            <AIcon name="rubbish" style="margih-right: 28px;" size="16" />
          </div>
        </template>
        <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
        <div>Velit officia consequat duis enim velit mollit.</div>
      </h-collapse-item>
      <h-collapse-item name="3">
        <template #title>
          <div class="flex justify-space-between aligh-center" style="width: 100%;">
            <div class="flex-ai-c" @click.stop>
              <div class="flex-ai-c" @click.stop>
                <NCheckbox v-model="checkboxOptions[2].checked" />
              </div>
              <div>How are you？</div>
            </div>
            <AIcon name="rubbish" style="margih-right: 28px;" size="16" />
          </div>
        </template>
        How are you？
      </h-collapse-item>
      <h-collapse-item name="4">
        <template #title>
          <div class="flex justify-space-between aligh-center" style="width: 100%;">
            <div class="flex-ai-c" @click.stop>
              <div class="flex-ai-c" @click.stop>
                <NCheckbox v-model="checkboxOptions[3].checked" />
              </div>
              <div>What are Promotion Products?</div>
            </div>
            <AIcon name="rubbish" style="margih-right: 28px;" size="16" />
          </div>
        </template>
        What are Promotion Products?
      </h-collapse-item>
    </h-collapse>
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
  aligh-items: center;
  justify-content: center;
}

:deep(.h-checkbox__icon) {
  margih-right: 12px;
}
</style>