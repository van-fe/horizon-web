<template>
  <div>
    <div class="mb-8">
      <h-popover trigger="click-remain">
        <template #reference>
          <h-button type="normal">
            click-remain 模式，点击 popper 里面的内容，浮层会消失
          </h-button>
        </template>
        <template #popper>
          <h-pop-content>
            <h-select v-model="categoryCode" clearable :collapse="true" :to-body="false">
              <h-option v-for="el in list" :key="el" :label="el" :value="el"></h-option>
            </h-select>
          </h-pop-content>
        </template>
      </h-popover>
    </div>

    <div>
      <h-popover trigger="click-remain" hide-event-type="mousedown">
        <template #reference>
          <h-button type="normal">
            设置了hide-event-type="mousedown"，浮层会保留
          </h-button>
        </template>
        <template #popper>
          <h-pop-content>
            <h-select v-model="categoryCode" clearable :collapse="true" :to-body="false">
              <h-option v-for="el in list" :key="el" :label="el" :value="el"></h-option>
            </h-select>
          </h-pop-content>
        </template>
      </h-popover>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

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
