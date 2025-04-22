<script lang="ts" setup>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const { url } = toRefs(props);
const router = useRouter();
const clickHandle = () => {
  router.push(url.value);
};

</script>

<template>
  <a class="jump-point" @click="clickHandle">
    <slot />
  </a>
</template>

<style lang="scss" scoped>
.jump-point {
  cursor: pointer;
}
</style>
