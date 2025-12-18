export function sanitizeInput(input: string) {
  // 移除所有非数字、非负号、非小数点的字符
  input = input.replace(/[^\d.-]/g, '');

  // 移除非首位的负号
  input = input.replace(/(?!^)-/g, '');

  // 如果有多个小数点，只保留第一个小数点
  const parts = input.split('.');
  if (parts.length > 2) {
    input = parts[0] + '.' + parts.slice(1).join('');
  }

  // 确保负号只在首位
  if (input.indexOf('-') > 0) {
    input = input.replace(/-/g, '');
  }

  if (input.toString().startsWith('-.')) {
    input = input.toString().replace(/^-\./, '-0.');
  }

  return input;
}

export function formatInputForNumber(input: string | number) {
  if (input.toString().startsWith('.')) {
    input = '0' + input;
  }

  if (input === '-') {
    return null;
  }

  return input;
}
