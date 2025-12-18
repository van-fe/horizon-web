import { ref } from 'vue';

type Options = {
  showAfter?: number;
};

export default function (options: Options = {}) {
  const tooltipVisible = ref(false);
  let mouseEnterTimer: ReturnType<typeof setTimeout> | undefined;

  // 合并默认配置
  options = Object.assign({ showAfter: 200 }, options);

  function toggleTooltip(visible = true) {
    if (visible) {
      mouseEnterTimer = setTimeout(() => (tooltipVisible.value = true), options.showAfter);
    } else {
      clearTimeout(mouseEnterTimer);
      tooltipVisible.value = false;
    }
  }

  return { tooltipVisible, toggleTooltip };
}
