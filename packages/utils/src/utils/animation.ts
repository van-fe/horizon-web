// https://easings.net/#easeInOutCubic
export const cubic = (value: number): number => Math.pow(value, 3);

export const easeInOutCubic = (x: number): number => {
  return x < 0.5 ? 4 * cubic(x) : 1 - cubic(-2 * x + 2) / 2;
};
