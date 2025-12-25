<template>
  <n-row>
    <n-col :span="8">
      <div class="demo-title">medium(default)</div>
      <n-radio-button
        v-model="radio"
        :value="1"
        class="radio"
        size="medium"
        :border="true"
        @change="selectRadio"
      >
        Option 1
      </n-radio-button>
      <n-radio-button
        v-model="radio"
        :value="2"
        class="radio"
        size="medium"
        :border="true"
        @change="selectRadio"
      >
        Option 2
      </n-radio-button>
    </n-col>
    <n-col :span="8">
      <div class="demo-title">large</div>
      <n-radio-button
        v-model="radio"
        :value="1"
        class="radio"
        size="large"
        :border="true"
        @change="selectRadio"
      >
        Option 1
      </n-radio-button>
      <n-radio-button
        v-model="radio"
        :value="2"
        class="radio"
        size="large"
        :border="true"
        @change="selectRadio"
      >
        Option 2
      </n-radio-button>
    </n-col>
  </n-row>
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
  margin-left: 12px;
}
</style>
