<template>
  <div class="placement">
    <div>
      <h-button v-popconfirm="{ placement: 'top-start' }" type="normal" @click="del">
        topStart
      </h-button>
      <h-button v-popconfirm="{ placement: 'top' }" type="normal" @click="del">top</h-button>
      <h-button v-popconfirm="{ placement: 'top-end' }" type="normal" @click="del">topEnd</h-button>
    </div>
    <div>
      <h-space block direction="vertical">
        <h-button v-popconfirm="{ placement: 'left-start' }" type="normal" @click="del">
          leftStart
        </h-button>
        <h-button v-popconfirm="{ placement: 'left' }" type="normal" @click="del">left</h-button>
        <h-button v-popconfirm="{ placement: 'left-end' }" type="normal" @click="del">
          leftEnd
        </h-button>
      </h-space>
    </div>
    <div>
      <h-button
        v-popconfirm="{ placement: 'bottom-start' }"
        type="normal"
        class="mr-2"
        @click="del"
      >
        bottomStart
      </h-button>
      <h-button v-popconfirm="{ placement: 'bottom' }" type="normal" class="mr-2" @click="del">
        bottom
      </h-button>
      <h-button v-popconfirm="{ placement: 'bottom-end' }" type="normal" class="mr-2" @click="del">
        bottomEnd
      </h-button>
    </div>
    <div>
      <h-space block direction="vertical" align="end">
        <h-button v-popconfirm="{ placement: 'right-start' }" type="normal" @click="del">
          rightStart
        </h-button>
        <h-button v-popconfirm="{ placement: 'right' }" type="normal" @click="del">right</h-button>
        <h-button v-popconfirm="{ placement: 'right-end' }" type="normal" @click="del">
          rightEnd
        </h-button>
      </h-space>
    </div>
    <div>
      <h-button v-popconfirm="{ placement: 'auto-start' }" type="normal" class="mr-2" @click="del">
        autoStart
      </h-button>
      <h-button v-popconfirm="{ placement: 'auto' }" type="normal" class="mr-2" @click="del">
        auto
      </h-button>
      <h-button v-popconfirm="{ placement: 'auto-end' }" type="normal" class="mr-2" @click="del">
        autoEnd
      </h-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    return {
      optionsRef: ref({
        title: '确定要删除该项吗？',
        okText: '确定',
        cancelText: '取消',
      }),
      del: () => {
        $message('Action!');
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.placement {
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  grid-template-areas: 'a b c' 'd e f' 'g h i';
  height: 400px;
  width: 600px;
  justify-content: center;
  aligh-items: center;
}

.placement > div {
  &:nth-of-type(1) {
    grid-area: b;
    display: flex;
    justify-content: space-evenly;
  }

  &:nth-of-type(2) {
    grid-area: d;
  }

  &:nth-of-type(3) {
    grid-area: h;
    display: flex;
    justify-content: space-evenly;
  }

  &:nth-of-type(4) {
    grid-area: f;
  }

  &:nth-of-type(5) {
    grid-area: e;
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
