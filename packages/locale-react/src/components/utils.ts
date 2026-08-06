export function mergeClassName(defaultClassName: string, className?: string): string {
  return className ? `${defaultClassName} ${className}` : defaultClassName;
}
