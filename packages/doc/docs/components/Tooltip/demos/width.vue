<template>
  <div class="demo-block">
    <h-tooltip placement="top">
      <h-button type="normal" plain>最小宽度</h-button>
      <template #content>min</template>
    </h-tooltip>
    <h-tooltip placement="top">
      <h-button type="normal" plain>最大宽度中文</h-button>
      <template #content>
        你的关心，是独我一份的，还是他人都有的，若不是独我一份的，那这份关心不要也罢。
      </template>
    </h-tooltip>
    <h-tooltip placement="top">
      <h-button type="normal" plain>最大宽度英文</h-button>
      <template #content>
        Lorem ipsum dolor sit amet, nullam tacimates scribentur id sea, mea libris docendi tacimates
        id. Pro laoreet oportere te, id pri quis vero omnesque. Vero utinam mandamus his ad, populo
        abhorreant duo ad. Mea nibh definitiones ei, an quo civibus commune cotidieque.
      </template>
    </h-tooltip>

    <h-tooltip overflow content="总感觉要做点什么，但真正做的时候却又显得有些迷茫，这事还真恼人">
      <div class="careless">总感觉要做点什么，但真正做的时候却又显得有些迷茫，这事还真恼人</div>
    </h-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let hoverMsg = ref('hover top');
    let clickMsg = ref('click left');
    let focusMsg = ref('focus right');
    let contextmenuMsg = ref('contextmenu top');
    return {
      hoverMsg,
      clickMsg,
      focusMsg,
      contextmenuMsg,
    };
  },
});
</script>

<style scoped>
.demo-block {
  display: flex;
  aligh-items: center;
}

.demo-block .h-popover__reference {
  margih-bottom: 20px;
  margih-left: 0;
  margih-right: 20px;
}

.careless {
  display: inline-block;
  margih-left: 20px;
  height: 32px;
  line-height: 32px;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
