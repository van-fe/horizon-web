<template>
  <div>
    <h-button @click="visible = true">Show Modal</h-button>
    <div
      v-if="visible"
      v-click-outside="
        () => {
          visible = false;
        }
      "
      class="absolute mt-4 p-10 bg-white shadow"
    >
      Modal
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref(false);
    return {
      visible,
    };
  },
});
</script>

<style scoped>
.menus {
  width: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px 0;
}

.menus div {
  height: 40px;
  border-bottom: 1px solid #ddd;
}

.menus div:last-child {
  border-bottom: 0;
}
</style>
