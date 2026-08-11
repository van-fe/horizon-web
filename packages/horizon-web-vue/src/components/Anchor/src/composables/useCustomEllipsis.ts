import type { Ref } from 'vue';
import { computed, watch, nextTick, ref } from 'vue';
import type { AnchorLinkProps } from './useProps';

const TEMP_SUFFIX = `...（00）`; // “数字后缀”模板，用于预判title添加“数字后缀”后是否会溢出（最大支持“两位数”）

export function useCustomEllipsis(
  props: AnchorLinkProps,
  showSuffix: Ref<boolean>,
  childLinksNum: Ref<number>,
  judgeIsOverflow: () => boolean,
  activeLink: Ref<string>,
  updateHighlightLine: (link: string) => void,
) {
  const displayTitle = ref('');
  const titleSuffix = ref('');
  const showCustomEllipsis = computed(() => titleSuffix.value !== '');

  const tooltipDisabled = ref(true);
  const updateTooltipStatus = () => {
    let res: boolean;
    if (!displayTitle.value) {
      res = true; // 若displayTitle为空串，禁用tooltip提示
    } else if (titleSuffix.value.indexOf('...') === 0) {
      res = false; // 若titleSuffix已经过JS打点处理，启用tooltip提示
    } else {
      res = !judgeIsOverflow();
    }
    tooltipDisabled.value = res;
  };

  // 更新title的“数字后缀”(动态包含省略号)
  const updateTitleSuffix = () => {
    if (showSuffix.value) {
      titleSuffix.value = TEMP_SUFFIX;
    }
    return nextTick(() => {
      let res = '';
      if (showSuffix.value) {
        const ellipsis = judgeIsOverflow() ? '...' : '';
        res = `${ellipsis}（${childLinksNum.value}）`;
      }
      titleSuffix.value = res;
    });
  };

  // 记录title子串是否会溢出隐藏（数组索引表示字符串长度，数组中的每一项表示是否会溢出隐藏，值为boolean。未判断到的值默认为空）
  const hiddenRecord = ref<boolean[]>([]);
  // 更新需要展示的displayTitle（利用“二分法”循环判断，直至找到刚好不会溢出的临界值并更新）
  const updateDisplayTitle = () => {
    return nextTick(() => {
      if (!props.title || !showSuffix.value) {
        updateTooltipStatus();
        updateHighlightLine(activeLink.value);
        return;
      }
      let min, max;
      const curLen = displayTitle.value.length;
      if (judgeIsOverflow()) {
        hiddenRecord.value[curLen] = true;
        const beforeFalseIndex = hiddenRecord.value.lastIndexOf(false);

        min = beforeFalseIndex !== -1 ? beforeFalseIndex : 0;
        max = curLen;
      } else {
        hiddenRecord.value[curLen] = false;
        const afterTrueIndex = hiddenRecord.value.indexOf(true, curLen);
        if (hiddenRecord.value[curLen + 1] || afterTrueIndex === -1) {
          updateTooltipStatus();
          updateHighlightLine(activeLink.value);
          return;
        }
        min = curLen;
        max = afterTrueIndex;
      }
      displayTitle.value = props.title.slice(0, Math.floor((min + max) / 2));
    });
  };

  watch(
    () => props.title,
    newVal => {
      hiddenRecord.value = []; // 重置溢出记录
      displayTitle.value = newVal ?? ''; // 初始化displayTitle
    },
    { immediate: true },
  );

  watch(
    displayTitle,
    async () => {
      await updateTitleSuffix();
      updateDisplayTitle();
    },
    { immediate: true },
  );

  /** 重新处理“溢出打点”逻辑 */
  const reRenderEllipsis = async () => {
    hiddenRecord.value = [];
    if (displayTitle.value !== props.title) {
      displayTitle.value = props.title ?? '';
    } else {
      await updateTitleSuffix();
      updateDisplayTitle();
    }
  };

  return {
    displayTitle,
    titleSuffix,
    showCustomEllipsis,
    tooltipDisabled,
    reRenderEllipsis,
  };
}
