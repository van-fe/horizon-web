<template>
  <div class="mb-4">
    <h-switch v-model="isZebra" label="是否斑马纹" class="switch" />
    <h-switch v-model="isBorder" label="是否显示边框" class="switch" />
    <h-switch v-model="isSplit" label="是否显示分界线" class="switch" />
    <h-button size="medium" type="primary" class="switch" @click="changeTitleSize">
      切换标题size
    </h-button>
  </div>

  <h-list
    :data="list"
    :max-height="400"
    :zebra="isZebra"
    :is-border="isBorder"
    :split="isSplit"
  >
    <template #item="{ item, index }">
      <h-list-item
        :key="index"
        :title="item.title"
        :describe="item.describe"
        :subtitle="item.subtitle"
        :title-size="titleSize"
      >
        <template #sider>
          <h-image
            src="/demo-assets/scene-city.svg"
            object-fit="cover"
            :width="50"
            :height="50"
          />
        </template>
        <template #right>
          <section class="list-right">
            <section>
              <h-button size="medium" :plain="true" class="list-btn">撤销</h-button>
              <h-button size="medium" type="primary">提交</h-button>
            </section>
          </section>
        </template>
      </h-list-item>
    </template>
  </h-list>
</template>

<script lang="ts" setup>
import { HListItem } from '@aurora/horizon-web';
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
const isZebra = ref(true);
const isBorder = ref(false);
const isSplit = ref(false);
const titleSize = ref<'medium' | 'small'>('medium');
</script>

<style scoped>
.list-right {
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}
.list-btn {
  margin-right: 12px;
}
.switch {
  margin-right: 12px;
}
</style>
