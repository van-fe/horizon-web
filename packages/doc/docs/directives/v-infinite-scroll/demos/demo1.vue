<template>
  <div v-infinite-scroll="param" class="iScroll">
    <p v-for="(item, idx) in list" :key="idx">
      {{ item }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
  setup() {
    const list = ref<any[]>([new Date(), new Date(), new Date()]);

    const loadMore = () => {
      param.block = true;
      list.value.push('触底' + new Date());
      setTimeout(() => {
        param.block = false;
      }, 1000);
    };
    const loadMoreTop = () => {
      param.block = true;
      list.value.unshift('触顶' + new Date());
      setTimeout(() => {
        param.block = false;
      }, 1000);
    };
    // 参数需要包裹在reactive内
    const param = reactive({
      onReachBottom: loadMore,
      onReachTop: loadMoreTop,
      block: false,
      distance: 10,
      interval: 1000,
    });

    return {
      param,
      list,
    };
  },
});
</script>

<style>
.iScroll {
  max-height: 90px;
  overflow-y: scroll;
}
</style>
