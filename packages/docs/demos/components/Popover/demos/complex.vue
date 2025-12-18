<template>
  <div>
    <div class="mb-8">
      <n-popover trigger="click-remain">
        <template #reference>
          <n-button type="secondary" class="mr-4">
            click-remain 模式，点击 popper 里面的内容，浮层会消失
          </n-button>
        </template>
        <template #popper>
          <n-pop-content>
            <n-select clearable :collapse="true" :to-body="false" v-model="categoryCode">
              <n-option v-for="el in list" :key="el" :label="el" :value="el"></n-option>
            </n-select>
          </n-pop-content>
        </template>
      </n-popover>
    </div>

    <div>
      <n-popover trigger="click-remain" hide-event-type="mousedown">
        <template #reference>
          <n-button type="secondary" class="mr-4">
            设置了hide-event-type="mousedown"，浮层会保留
          </n-button>
        </template>
        <template #popper>
          <n-pop-content>
            <n-select clearable :collapse="true" :to-body="false" v-model="categoryCode">
              <n-option v-for="el in list" :key="el" :label="el" :value="el"></n-option>
            </n-select>
          </n-pop-content>
        </template>
      </n-popover>
    </div>
  </div>
</template>

<script>
import { defineComponent, h } from 'vue';

export default defineComponent({
  components: {},
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6],
      categoryCode: '',
    };
  },
});
</script>

<style>
</style>
