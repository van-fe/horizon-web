export const useFormatNumber = (
  number: number,
  separator: string,
  length: number,
  decimal: number,
) => {
  let result = '';
  const numberArr = number.toFixed(decimal).toString().split('.');
  let integer = numberArr[0];
  const decimals = numberArr[1] ? `.${numberArr[1]}` : '';
  while (integer.length > length) {
    result = separator + integer.slice(-length) + result;
    integer = integer.slice(0, integer.length - length);
  }
  if (integer) {
    result = integer + result;
  }
  if (number < 0) {
    result = result.replace(`-${separator}`, '-');
  }
  return result + decimals;
};
