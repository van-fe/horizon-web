<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-radio
        v-model="radio"
        :value="1"
        class="radio"
        @change="selectRadio"
      >
        Option 1
      </h-radio>
      <h-radio
        v-model="radio"
        :value="2"
        class="radio"
        @change="selectRadio"
      >
        Option 2
      </h-radio>
    </h-grid-item>
  </h-grid>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref(1);

const selectRadio = (val: boolean) => {
  console.info('selectRadio ==> ', val);
};
</script>

<style scoped>
.radio + .radio {
  margin-left: 15px;
}
</style>
