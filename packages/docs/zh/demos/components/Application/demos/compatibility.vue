<template>
  <n-row>
    <n-col>
      <n-application compatibility="button.size,radio.size,checkbox.size">
        <n-row>
          <n-col :span="24">
            <n-button type="normal" size="mini" :auto-fit="true">Mini</n-button>
            <n-button type="normal" size="small" :auto-fit="true">Small</n-button>
            <n-button type="normal" size="medium" :auto-fit="true">Medium</n-button>
            <n-button type="normal" size="large" :auto-fit="true">Large</n-button>
          </n-col>
          <n-col :span="24">
            <n-checkbox v-model="checkboxValue1" class="checkbox" border size="medium">
              checked
            </n-checkbox>
            <n-checkbox v-model="checkboxValue2" class="checkbox" border size="medium">
              unChecked
            </n-checkbox>
          </n-col>
          <n-col :span="24">
            <n-radio v-model="radioValue" :label="1" class="radio" border size="medium">
              option 1
            </n-radio>
            <n-radio v-model="radioValue" :label="2" class="radio" border size="medium">
              option 2
            </n-radio>
          </n-col>
        </n-row>
      </n-application>
    </n-col>
  </n-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const size = ref('medium');
    const value1 = ref([]);
    const value2 = ref('');
    const checkboxValue1 = ref(true);
    const checkboxValue2 = ref(false);
    const radioValue = ref(1);

    return {
      size,
      value1,
      value2,
      checkboxValue1,
      checkboxValue2,
      radioValue,
    };
  },
});
</script>

<style scoped>
.checkbox + .checkbox {
  margin-left: 15px;
}

.radio + .radio {
  margin-left: 15px;
}
</style>
