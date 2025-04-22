export function isPadBrowser() {
  if (!globalThis?.navigator) {
    return false;
  }

  const userAgent = globalThis.navigator.userAgent.toLowerCase();

  const padKeywords = [
    'ipad', // Apple iPad
    'android', // Android Pad
    'tablet', // Universal panel marking
    'kindle', // Amazon Kindle Pad
    'silk', // Amazon Silk Browser（Commonly used on Kindle tablets）
  ];

  return padKeywords.some(keyword => userAgent.includes(keyword)) && !userAgent.includes('mobile');
}
