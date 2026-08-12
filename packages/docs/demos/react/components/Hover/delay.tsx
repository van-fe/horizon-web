import { Hover } from '@aurora/horizon-web-react';

export default function HoverDelayDemo({ locale }: { locale: 'en' | 'zh' }) {
  return (
    <Hover showDelay={300} hideDelay={200}>
      {({ hover }) => (
        <button
          type="button"
          style={{
            minWidth: 220,
            minHeight: 44,
            background: hover ? 'var(--h-bg-active)' : undefined,
          }}
        >
          {locale === 'zh' ? '延迟 300ms 显示 / 200ms 隐藏' : 'Show after 300ms / hide after 200ms'}
        </button>
      )}
    </Hover>
  );
}
