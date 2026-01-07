<template>
  <div class="placement-wrap">
    <div>
      <h-button
        v-popconfirm="{ placement: 'top-start' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        top-start
      </h-button>
      <h-button
        v-popconfirm="{ placement: 'top' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        top
      </h-button>
      <h-button
        v-popconfirm="{ placement: 'top-end' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        top-end
      </h-button>
    </div>
    <div>
      <h-button v-popconfirm="{ placement: 'left-start' }" size="medium" :plain="true" @click="del">
        left-start
      </h-button>
      <h-button v-popconfirm="{ placement: 'left' }" size="medium" :plain="true" @click="del">
        left
      </h-button>
      <h-button v-popconfirm="{ placement: 'left-end' }" size="medium" :plain="true" @click="del">
        left-end
      </h-button>
    </div>
    <div>
      <h-button
        v-popconfirm="{ placement: 'bottom-start' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        bottom-start
      </h-button>
      <h-button
        v-popconfirm="{ placement: 'bottom' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        bottom
      </h-button>
      <h-button
        v-popconfirm="{ placement: 'bottom-end' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        bottom-end
      </h-button>
    </div>
    <div>
      <h-button
        v-popconfirm="{ placement: 'right-start' }"
        size="medium"
        :plain="true"
        @click="del"
      >
        right-start
      </h-button>
      <h-button v-popconfirm="{ placement: 'right' }" size="medium" :plain="true" @click="del">
        right
      </h-button>
      <h-button v-popconfirm="{ placement: 'right-end' }" size="medium" :plain="true" @click="del">
        right-end
      </h-button>
    </div>
    <div>
      <h-button
        v-popconfirm="{ placement: 'auto-start' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        auto-start
      </h-button>
      <h-button
        v-popconfirm="{ placement: 'auto' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        auto
      </h-button>
      <h-button
        v-popconfirm="{ placement: 'auto-end' }"
        size="medium"
        :plain="true"
        class="mr-2"
        @click="del"
      >
        auto-end
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

<style scoped>
.placement-wrap {
  position: relative;
  width: 700px;
  text-align: center;
}

.placement-wrap > :nth-child(1) {
  margin-bottom: 20px;
}

.placement-wrap > :nth-child(2),
.placement-wrap > :nth-child(4) {
  width: 105px;
}

.placement-wrap > :nth-child(2) > button,
.placement-wrap > :nth-child(4) > button {
  margin: 0 0 20px;
}

.placement-wrap > :nth-child(4) {
  position: absolute;
  top: 52px;
  right: 0;
}

.placement-wrap > :nth-child(5) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}
</style>
