export * from './contract';

export function getAvatarInitials(value: string, maxLength = 2): string {
  const words = value.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  return (
    words.length === 1
      ? words[0].slice(0, maxLength)
      : words
          .map(word => word[0])
          .join('')
          .slice(0, maxLength)
  ).toUpperCase();
}

export { avatarManifest } from './manifest';
