import { onBeforeUnmount, ref, watch, type Ref } from 'vue';

interface UseDemoSourceOptions {
  source: Ref<string>;
  compile: (source: string) => void | Promise<void>;
  loadOriginal: () => void | Promise<void>;
  delay?: number;
}

export function useDemoSource(options: UseDemoSourceOptions) {
  const code = ref(options.source.value);
  let compileTimer: ReturnType<typeof setTimeout> | undefined;

  function clearCompileTimer() {
    clearTimeout(compileTimer);
    compileTimer = undefined;
  }

  function reset() {
    clearCompileTimer();
    if (code.value === options.source.value) {
      void options.loadOriginal();
      return;
    }
    code.value = options.source.value;
  }

  watch(options.source, value => {
    if (code.value === value) reset();
    else code.value = value;
  });

  watch(code, value => {
    clearCompileTimer();
    if (value === options.source.value) {
      void options.loadOriginal();
      return;
    }
    compileTimer = setTimeout(() => void options.compile(value), options.delay ?? 250);
  });

  onBeforeUnmount(clearCompileTimer);

  return { code, reset };
}
