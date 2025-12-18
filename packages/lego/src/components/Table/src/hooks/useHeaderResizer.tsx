import type { NTableColumnData } from '../utils/types';
import { NTableColumnContextKey } from '../utils/types';
import { cls, ComponentClassBlock, cssVariableKey } from '@nio-fe/shared';
import type { StyleValue } from 'vue';
import { inject, provide, ref } from 'vue';
import {
  NTableRefreshLayoutInjectKey,
  NTableUseHeaderResizerPluginInjectKey,
} from '../utils/injectKeys';

export default function useHeaderResizerCursorLine() {
  const cursorLineStyle = ref<StyleValue>();

  function useHeaderResizerPlugin(column: NTableColumnData, showDivider: boolean) {
    const classHelper = new ComponentClassBlock('table-v3');

    const refreshLayout = inject(NTableRefreshLayoutInjectKey)!;

    let startX = 0;
    let startWidth = 0;

    function setCursorLineStyle() {
      if (column[NTableColumnContextKey].isResizing) {
        const elementRect =
          column[NTableColumnContextKey].selfElement.value!.getBoundingClientRect();

        cursorLineStyle.value = {
          display: 'block',
          transform: `translate(${elementRect.right - 1}px, ${elementRect.top}px)`,
          [cssVariableKey('table', 'column', 'height')]: `${
            elementRect.height + column[NTableColumnContextKey].childrenEachRowColumnsHeightSum
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
        column[NTableColumnContextKey].resizeWidth = startWidth + evt.clientX - startX;
        setCursorLineStyle();

        requestAnimationFrame(() => {
          refreshLayout();
        });
      }
    }

    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      column[NTableColumnContextKey].isResizing = false;
      setCursorLineStyle();
    }

    function handleMouseDown(evt: MouseEvent) {
      startX = evt.clientX;

      if (column.props.resizable) {
        column[NTableColumnContextKey].isResizing = true;
        startWidth = column[NTableColumnContextKey].selfElement.value?.clientWidth || 0;

        column[NTableColumnContextKey].resizeWidth = startWidth;

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

  provide(NTableUseHeaderResizerPluginInjectKey, useHeaderResizerPlugin);

  return {
    useHeaderResizerPlugin,
    cursorLineStyle,
  };
}
