import { type Ref, ref, watch } from 'vue';

/**
 * 3s 无操作自动隐藏工具栏
 */
export default function useHideTools(modelValueRef: Ref<Boolean>, autoHideToolsRef: Ref<Boolean>) {
  const showToolsRef = ref(true);
  const hideToolsDelay = () => {
    return setTimeout(() => {
      showToolsRef.value = false;
    }, 3000);
  };
  let timer: any;
  const done = () => {
    showToolsRef.value = true;
    clearTimeout(timer);
    timer = hideToolsDelay();
  };
  // 鼠标点击、鼠标移动、键盘按键 视为有操作，其他如滚动、缩放等，视为无操作
  const events = ['click', 'mousemove', 'keypress', 'keydown', 'wheel'];
  watch(
    () => modelValueRef.value,
    val => {
      if (val) {
        if (!autoHideToolsRef.value) {
          return;
        }
        timer = hideToolsDelay();
        events.forEach(eventName => {
          window.addEventListener(eventName, done);
        });
      } else {
        events.forEach(eventName => {
          window.removeEventListener(eventName, done);
        });
      }
    },
  );

  return {
    showToolsRef,
  };
}
