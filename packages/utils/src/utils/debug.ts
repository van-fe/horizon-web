function canOutputDebugInfo() {
  return window?.localStorage?.getItem('debug') === '1';
}

export function debug(...info: any[]) {
  if (canOutputDebugInfo()) {
    console.debug(...info);
  }
}
