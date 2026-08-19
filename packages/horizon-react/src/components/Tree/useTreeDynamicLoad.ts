import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  TreeDynamicLoader,
  TreeFieldMap,
  TreeNormalizedNode,
  TreeOption as CoreTreeOption,
  TreeValue,
} from '@aurora/core';
import { replaceTreeChildren, TreeDynamicLoadController } from '@aurora/core';

interface UseTreeDynamicLoadOptions<Option extends CoreTreeOption> {
  data: readonly Option[];
  fieldMap?: TreeFieldMap;
  loader?: TreeDynamicLoader<Option>;
  commitData(data: readonly Option[]): void;
  onError?(error: unknown, node: TreeNormalizedNode<Option>): void;
}

/** Coordinates lazy Tree requests with StrictMode-safe controller replacement. */
export function useTreeDynamicLoad<Option extends CoreTreeOption>({
  data,
  fieldMap,
  loader,
  commitData,
  onError,
}: UseTreeDynamicLoadOptions<Option>) {
  const controllerRef = useRef<TreeDynamicLoadController<Option> | null>(null);
  const mountedRef = useRef(false);
  const dataRef = useRef(data);
  const loaderRef = useRef(loader);
  const fieldMapRef = useRef(fieldMap);
  const callbackRef = useRef({ commitData, onError });
  const [loadingValues, setLoadingValues] = useState<ReadonlySet<TreeValue>>(new Set());
  dataRef.current = data;
  callbackRef.current = { commitData, onError };

  useEffect(() => {
    mountedRef.current = true;
    controllerRef.current = new TreeDynamicLoadController<Option>();
    return () => {
      mountedRef.current = false;
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (loaderRef.current !== loader) controllerRef.current?.invalidateLoader();
    loaderRef.current = loader;
  }, [loader]);

  useEffect(() => {
    controllerRef.current?.invalidateData();
    setLoadingValues(new Set());
  }, [data]);

  useEffect(() => {
    if (fieldMapRef.current !== fieldMap) controllerRef.current?.invalidateData();
    fieldMapRef.current = fieldMap;
    setLoadingValues(new Set());
  }, [fieldMap]);

  const load = useCallback(
    async (node: TreeNormalizedNode<Option>): Promise<boolean> => {
      const controller = controllerRef.current;
      const currentLoader = loaderRef.current;
      if (!controller || !currentLoader || controller.isLoading(node.value)) return false;
      setLoadingValues(current => new Set(current).add(node.value));
      const result = await controller.load(node, current =>
        currentLoader({ level: current.level, node: current }),
      );
      if (!mountedRef.current) return false;
      setLoadingValues(current => {
        const next = new Set(current);
        next.delete(node.value);
        return next;
      });
      if (result.status === 'loaded') {
        callbackRef.current.commitData(
          replaceTreeChildren(dataRef.current, node.value, result.children, fieldMap),
        );
        return true;
      }
      if (result.status === 'rejected') callbackRef.current.onError?.(result.error, node);
      return false;
    },
    [fieldMap],
  );

  return { load, loadingValues };
}
