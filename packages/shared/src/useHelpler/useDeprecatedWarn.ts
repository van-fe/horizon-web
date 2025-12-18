import { type Ref, unref, watch } from 'vue';

function warnPropertyLog(propertyName: string, replacePropertyName: string) {
  console.warn(
    `[LEGO] '${propertyName}' is deprecated, please use '${replacePropertyName}' instead.`,
  );
}

export function useDeprecatedWarnProperty<T>(
  property: Ref<T> | undefined,
  invariant: (value: T | undefined) => boolean,
  propertyName: string,
  replacePropertyName: string,
) {
  watch(
    () => unref(property),
    value => {
      if (!invariant(value)) return;

      warnPropertyLog(propertyName, replacePropertyName);
    },
    { immediate: true },
  );
}
