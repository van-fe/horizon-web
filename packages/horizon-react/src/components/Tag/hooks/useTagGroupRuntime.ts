import type { RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { TagId, TagMutationController, TagMutationControllerOptions } from '@aurora/core';
import { createTagMutationController } from '@aurora/core';
import type { TagCollapseController } from '@aurora/horizon-core';
import { createTagCollapseController, observeTagResize } from '@aurora/horizon-core';
import type { TagGroupProps } from '../types';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface UseTagGroupRuntimeOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  itemCount: number;
  minDisplayed?: number;
  collapse: boolean;
  fillUp: boolean;
  beforeCreate?: TagMutationControllerOptions['beforeCreate'];
  beforeEdit?: TagMutationControllerOptions['beforeEdit'];
  beforeClose?: TagMutationControllerOptions['beforeClose'];
  onCreated?: TagGroupProps['onCreated'];
  onEdited?: TagGroupProps['onEdited'];
  onClosed?: TagGroupProps['onClosed'];
  onToggled?: TagGroupProps['onToggled'];
  onExceeded?: TagGroupProps['onExceeded'];
}

export function useTagGroupRuntime({
  containerRef,
  itemCount,
  minDisplayed,
  collapse,
  fillUp,
  beforeCreate,
  beforeEdit,
  beforeClose,
  onCreated,
  onEdited,
  onClosed,
  onToggled,
  onExceeded,
}: UseTagGroupRuntimeOptions) {
  const mutationRef = useRef<TagMutationController | undefined>(undefined);
  const collapseRef = useRef<TagCollapseController | undefined>(undefined);
  const callbacksRef = useRef({ onCreated, onEdited, onClosed, onToggled, onExceeded });
  const itemCountRef = useRef(itemCount);
  const minimumRef = useRef(minDisplayed);
  const visibleRef = useRef(minDisplayed ?? itemCount);
  const [visibleCount, setVisibleCount] = useState(minDisplayed ?? itemCount);
  const [collapsed, setCollapsed] = useState(collapse);
  const collapsedRef = useRef(collapse);
  const [pending, setPending] = useState(false);
  const [lines, setLines] = useState(1);
  const overflowRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    callbacksRef.current = { onCreated, onEdited, onClosed, onToggled, onExceeded };
    itemCountRef.current = itemCount;
    minimumRef.current = minDisplayed;
    visibleRef.current = visibleCount;
    collapsedRef.current = collapsed;
  }, [
    collapsed,
    itemCount,
    minDisplayed,
    onClosed,
    onCreated,
    onEdited,
    onExceeded,
    onToggled,
    visibleCount,
  ]);

  useIsomorphicLayoutEffect(() => {
    const controller = createTagMutationController({ beforeCreate, beforeEdit, beforeClose });
    mutationRef.current = controller;
    const unsubscribe = controller.subscribe(() => setPending(controller.getState().pending));
    return () => {
      unsubscribe();
      controller.destroy();
      if (mutationRef.current === controller) mutationRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    mutationRef.current?.update({ beforeCreate, beforeEdit, beforeClose });
  }, [beforeClose, beforeCreate, beforeEdit]);

  useIsomorphicLayoutEffect(() => {
    const controller = createTagCollapseController({
      getContainer: () => containerRef.current,
      getItemCount: () => itemCountRef.current,
      getVisibleCount: () => visibleRef.current,
      setVisibleCount: count => {
        visibleRef.current = count;
        setVisibleCount(count);
      },
      afterRender: () => undefined,
      getMinDisplayed: () => minimumRef.current,
      onLinesChange: setLines,
      onOverflowChange: overflowing => {
        if (overflowing && !overflowRef.current) callbacksRef.current.onExceeded?.();
        overflowRef.current = overflowing;
      },
    });
    collapseRef.current = controller;
    void controller.calculate();
    return () => {
      controller.destroy();
      if (collapseRef.current === controller) collapseRef.current = undefined;
    };
  }, [containerRef]);

  const calculate = useCallback(() => {
    void collapseRef.current?.calculate();
  }, []);

  const calculateAsync = useCallback(async () => {
    await collapseRef.current?.calculate();
  }, []);

  useEffect(() => {
    collapsedRef.current = collapse;
    setCollapsed(collapse);
    calculate();
  }, [calculate, collapse, fillUp, itemCount, minDisplayed]);

  useEffect(() => {
    if (!containerRef.current) return;
    return observeTagResize(containerRef.current, calculate).destroy;
  }, [calculate, containerRef]);

  const toggle = useCallback((nextExpanded?: boolean) => {
    const expanded = nextExpanded ?? collapsedRef.current;
    const nextCollapsed = !expanded;
    collapsedRef.current = nextCollapsed;
    setCollapsed(nextCollapsed);
    callbacksRef.current.onToggled?.(expanded);
  }, []);

  const edit = useCallback(
    async (content: string, oldValue: string, id: TagId | undefined, create: boolean) => {
      const result = create
        ? await mutationRef.current?.create(content)
        : await mutationRef.current?.edit(content, oldValue, id);
      calculate();
      if (result?.status !== 'accepted') return false;
      if (create) callbacksRef.current.onCreated?.(content);
      else callbacksRef.current.onEdited?.(content, oldValue, id);
      return true;
    },
    [calculate],
  );

  const close = useCallback(async (id?: TagId) => {
    const result = await mutationRef.current?.close(id);
    if (result?.status !== 'accepted') return false;
    callbacksRef.current.onClosed?.(id);
    return true;
  }, []);

  return {
    visibleCount,
    collapsed,
    pending,
    lines,
    calculate,
    calculateAsync,
    toggle,
    edit,
    close,
  };
}
