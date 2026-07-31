import type { HTableColumnData } from '../utils/types';
import { HTableColumnContextKey } from '../utils/types';
import { cls, ComponentClassBlock, cssVariableKey } from '@aurora/utils';
import type { SetupContext, StyleValue } from 'vue';
import { onBeforeUnmount, provide, ref } from 'vue';
import { HTableUseHeaderResizerPluginInjectKey } from '../utils/injectKeys';
import type { TableEmits } from '../composables/useEmits';

export default function useHeaderResizerCursorLine(
  refreshLayout: () => void,
  emit: SetupContext<TableEmits>['emit'],
) {
  const cursorLineStyle = ref<StyleValue>();
  let activeMouseMove: ((evt: MouseEvent) => void) | undefined;
  let activeMouseUp: ((evt: MouseEvent) => void) | undefined;

  function removeDocumentListeners() {
    if (activeMouseMove) {
      document.removeEventListener('mousemove', activeMouseMove);
    }
    if (activeMouseUp) {
      document.removeEventListener('mouseup', activeMouseUp);
    }

    activeMouseMove = undefined;
    activeMouseUp = undefined;
  }

  function useHeaderResizerPlugin(column: HTableColumnData, showDivider: boolean) {
    const classHelper = new ComponentClassBlock('table');

    let startX = 0;
    let startWidth = 0;

    function setCursorLineStyle() {
      if (column[HTableColumnContextKey].isResizing) {
        const elementRect =
          column[HTableColumnContextKey].selfElement.value!.getBoundingClientRect();

        cursorLineStyle.value = {
          display: 'block',
          transform: `translate(${elementRect.right - 1}px, ${elementRect.top}px)`,
          [cssVariableKey('table', 'column', 'height')]: `${
            elementRect.height + column[HTableColumnContextKey].childrenEachRowColumnsHeightSum
          }px`,
        };
      } else {
        cursorLineStyle.value = {
          display: 'none',
        };
      }
    }

    function handleMouseMove(evt: MouseEvent) {
      if (column.props.resizable) {
        const parsedMinWidth = Number.parseFloat(column.props.minWidth?.toString() ?? '');
        const minWidth = Number.isFinite(parsedMinWidth) ? parsedMinWidth : 40;

        column[HTableColumnContextKey].resizeWidth = Math.max(
          minWidth,
          startWidth + evt.clientX - startX,
        );
        setCursorLineStyle();

        requestAnimationFrame(() => {
          refreshLayout();
        });
      }
    }

    function handleMouseUp(evt: MouseEvent) {
      removeDocumentListeners();
      column[HTableColumnContextKey].isResizing = false;
      setCursorLineStyle();

      if (
        column[HTableColumnContextKey].resizeWidth > 0 &&
        column[HTableColumnContextKey].resizeWidth !== startWidth
      ) {
        emit('headerDragend', column[HTableColumnContextKey].resizeWidth, startWidth, column, evt);
      }
    }

    function handleMouseDown(evt: MouseEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      startX = evt.clientX;

      if (column.props.resizable) {
        column[HTableColumnContextKey].isResizing = true;
        startWidth = column[HTableColumnContextKey].selfElement.value?.clientWidth || 0;

        column[HTableColumnContextKey].resizeWidth = startWidth;

        removeDocumentListeners();
        activeMouseMove = handleMouseMove;
        activeMouseUp = handleMouseUp;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }

      setCursorLineStyle();
    }

    return (
      <div
        class={cls(
          classHelper.em('header', 'divider'),
          classHelper.is('visible', showDivider),
          classHelper.is('resizable', column.props.resizable),
        )}
        onMousedown={handleMouseDown}
      ></div>
    );
  }

  provide(HTableUseHeaderResizerPluginInjectKey, useHeaderResizerPlugin);
  onBeforeUnmount(removeDocumentListeners);

  return {
    useHeaderResizerPlugin,
    cursorLineStyle,
  };
}
