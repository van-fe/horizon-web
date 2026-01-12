<template>
  <h-row>
    <h-col>
      <h-application compatibility="button.size,radio.size,checkbox.size">
        <h-row>
          <h-col :span="24">
            <h-button type="normal" size="mini" :auto-fit="true">Mini</h-button>
            <h-button type="normal" size="small" :auto-fit="true">Small</h-button>
            <h-button type="normal" size="medium" :auto-fit="true">Medium</h-button>
            <h-button type="normal" size="large" :auto-fit="true">Large</h-button>
          </h-col>
          <h-col :span="24">
            <h-checkbox v-model="checkboxValue1" class="checkbox" border size="medium">
              checked
            </h-checkbox>
            <h-checkbox v-model="checkboxValue2" class="checkbox" border size="medium">
              unChecked
            </h-checkbox>
          </h-col>
          <h-col :span="24">
            <h-radio v-model="radioValue" :label="1" class="radio" border size="medium">
              option 1
            </h-radio>
            <h-radio v-model="radioValue" :label="2" class="radio" border size="medium">
              option 2
            </h-radio>
          </h-col>
        </h-row>
      </h-application>
    </h-col>
  </h-row>
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
