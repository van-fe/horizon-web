<template>
  <div class="options flex align-center justify-start">
    <n-radio
      v-model="radio"
      value="pure"
      class="radio"
      @change="selectRadio"
    >
      纯白
    </n-radio>
    <n-radio
      v-model="radio"
      value="zebra"
      class="radio"
      @change="selectRadio"
    >
      斑马纹
    </n-radio>
    <n-radio
      v-model="radio"
      value="split"
      class="radio"
      @change="selectRadio"
    >
      分界线
    </n-radio>
    <n-button size="medium" type="primary" class="switch" @click="changeTitleSize">
      切换标题size
    </n-button>
  </div>

  <n-list
    :data="list"
    :max-height="400"
    :zebra="isZebra"
    :split="isSplit"
    size="small"
  >
    <template #item="{ item, index }">
      <n-list-item
        :key="index"
        :title="item.title"
        :describe="item.describe"
        :subtitle="item.subtitle"
        :title-size="titleSize"
      >
        <template #sider>
          <n-image
            src="https://source.niohome.com//MyNextEv/image/cutting/672C4D53B6559FFFF2A0523B21D36B35.jpg"
            object-fit="cover"
            :width="50"
            :height="50"
          />
        </template>
        <template #right>
          <section class="list-right">
            <section>
              <n-button size="medium" :plain="true">撤销</n-button>
              <n-button size="medium" type="primary">提交</n-button>
            </section>
          </section>
        </template>
      </n-list-item>
    </template>
  </n-list>
</template>

<script lang="ts" setup>
import { NListItem } from '@nio-fe/lego';
import { reactive, ref } from 'vue';
const list = reactive(
  Array(10)
    .fill('')
    .map((item, index) => {
      return {
        title: 'This is Title' + item,
        subtitle: 'Subhead' + item,
        describe: `${index}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat eget ipsum vel blandit. Nam sed enim orci. Vivamus non eros at ex varius luctus. Pellentesque blandit molestie leo, vel vulputate mi vehicula ac. Etiam dignissim arcu eget felis egestas cursus. Pellentesque tempus sollicitudin nulla at hendrerit.`,
      };
    }),
);
const changeTitleSize = () => {
  titleSize.value = titleSize.value === 'medium' ? 'small' : 'medium';
};
const isZebra = ref(false);
const isSplit = ref(false);
const titleSize = ref<'medium' | 'small'>('medium');

const radio = ref<'pure' | 'zebra' | 'split'>('pure')

const selectRadio = (val: 'pure' | 'zebra' | 'split') => {
  if (val === 'pure') {
    isZebra.value = false;
    isSplit.value = false;
  } else if (val === 'zebra') {
    isZebra.value = true;
    isSplit.value = false;
  } else if (val === 'split') {
    isZebra.value = false;
    isSplit.value = true;
  }
};  
</script>

<style scoped>
.list-right {
  height: 100%;
  display: flex;
  align-items: center;
}
.options {
  gap: 16px;
}
</style>
