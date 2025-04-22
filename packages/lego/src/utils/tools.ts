export const isEmptyArray = (arr: any[]): boolean => {
  return arr.flat(Infinity).length === 0;
};

export async function sleep(timeout = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export function transformRegString(str: string) {
  return str.replace(/(\W)/g, '\\$1');
}
