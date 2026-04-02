import type { HTableColumnData } from '../utils/types';
import { HTableColumnContextKey } from '../utils/types';
import { cls, ComponentClassBlock, cssVariableKey } from '@aurora/utils';
import type { StyleValue } from 'vue';
import { inject, provide, ref } from 'vue';
import {
  HTableRefreshLayoutInjectKey,
  HTableUseHeaderResizerPluginInjectKey,
} from '../utils/injectKeys';

export default function useHeaderResizerCursorLine() {
  const cursorLineStyle = ref<StyleValue>();

  function useHeaderResizerPlugin(column: HTableColumnData, showDivider: boolean) {
    const classHelper = new ComponentClassBlock('table');

    const refreshLayout = inject(HTableRefreshLayoutInjectKey)!;

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
        column[HTableColumnContextKey].resizeWidth = startWidth + evt.clientX - startX;
        setCursorLineStyle();

        requestAnimationFrame(() => {
          refreshLayout();
        });
      }
    }

    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      column[HTableColumnContextKey].isResizing = false;
      setCursorLineStyle();
    }

    function handleMouseDown(evt: MouseEvent) {
      startX = evt.clientX;

      if (column.props.resizable) {
        column[HTableColumnContextKey].isResizing = true;
        startWidth = column[HTableColumnContextKey].selfElement.value?.clientWidth || 0;

        column[HTableColumnContextKey].resizeWidth = startWidth;

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

  return {
    useHeaderResizerPlugin,
    cursorLineStyle,
  };
}
