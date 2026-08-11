export function syncCheckboxIndeterminate(
  input: HTMLInputElement | null,
  indeterminate: boolean,
): void {
  if (input) input.indeterminate = indeterminate;
}
