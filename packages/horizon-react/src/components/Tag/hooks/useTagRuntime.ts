import type { Dispatch, RefObject, SetStateAction } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import type { TagCloseVisibilityController, TagPressTracker } from '@aurora/horizon-core';
import {
  createTagCloseVisibilityController,
  createTagPressTracker,
  observeTagResize,
} from '@aurora/horizon-core';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface UseTagRuntimeOptions {
  rootRef: RefObject<HTMLSpanElement | null>;
  contentRef: RefObject<HTMLSpanElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  editing: boolean;
  showCloseDelay: number;
  calculate?: () => void;
  setPressed: Dispatch<SetStateAction<boolean>>;
  setShowEqualClose: Dispatch<SetStateAction<boolean>>;
}

export function useTagRuntime({
  rootRef,
  contentRef,
  inputRef,
  editing,
  showCloseDelay,
  calculate,
  setPressed,
  setShowEqualClose,
}: UseTagRuntimeOptions) {
  const mountedRef = useRef(false);
  const pressTrackerRef = useRef<TagPressTracker | undefined>(undefined);
  const closeVisibilityRef = useRef<TagCloseVisibilityController | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!editing) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [editing, inputRef]);

  useEffect(() => {
    closeVisibilityRef.current = createTagCloseVisibilityController({
      getDelay: () => showCloseDelay,
      onVisibleChange: setShowEqualClose,
      ownerWindow: rootRef.current?.ownerDocument.defaultView ?? undefined,
    });
    return () => {
      closeVisibilityRef.current?.destroy();
      closeVisibilityRef.current = undefined;
    };
  }, [rootRef, setShowEqualClose, showCloseDelay]);

  useEffect(() => {
    if (!contentRef.current || !calculate) return;
    return observeTagResize(contentRef.current, calculate).destroy;
  }, [calculate, contentRef]);

  useEffect(
    () => () => {
      pressTrackerRef.current?.destroy();
    },
    [],
  );

  const startPress = useCallback(() => {
    if (!rootRef.current) return;
    pressTrackerRef.current?.destroy();
    pressTrackerRef.current = createTagPressTracker(rootRef.current, setPressed);
  }, [rootRef, setPressed]);

  const cancelPendingClose = useCallback(() => {
    closeVisibilityRef.current?.cancelPending();
  }, []);

  const enterClose = useCallback((equally: boolean, clickable: boolean) => {
    closeVisibilityRef.current?.enter(equally, clickable);
  }, []);

  const leaveClose = useCallback(() => {
    closeVisibilityRef.current?.leave();
  }, []);

  return { mountedRef, startPress, cancelPendingClose, enterClose, leaveClose };
}
