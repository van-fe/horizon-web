export function getPrecision(val: number) {
  return val.toString().split('.')?.[1]?.length || 0;
}

export function addValue(a: number, b: number, symbol = 1) {
  const precisionValue = Math.max(getPrecision(a), getPrecision(b));
  const tens = Math.pow(10, precisionValue);

  return (a * tens + b * tens * symbol) / tens;
}

export function subValue(a: number, b: number) {
  return addValue(a, b, -1);
}

export function remainderValue(a: number, b: number) {
  const precisionValue = Math.max(getPrecision(a), getPrecision(b));
  const tens = Math.pow(10, precisionValue);

  return ((a * tens) % (b * tens)) / tens;
}
