export * from './contract';

export function formatBadgeContent(content: string | number, maximum: number): string | number {
  return Number(content) <= maximum ? content : `${maximum}+`;
}

export { badgeManifest } from './manifest';
