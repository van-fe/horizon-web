import { useRef } from 'react';
import { Button, Hover } from '@aurora/horizon-react';
import type { HoverHandle } from '@aurora/horizon-react';

export default function HoverCommandsDemo({ locale }: { locale: 'en' | 'zh' }) {
  const hoverRef = useRef<HoverHandle>(null);
  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
      <Hover ref={hoverRef} disabled>
        {({ hover }) => (
          <output>
            {hover ? (locale === 'zh' ? '显示' : 'Shown') : locale === 'zh' ? '隐藏' : 'Hidden'}
          </output>
        )}
      </Hover>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={() => hoverRef.current?.show()}>
          {locale === 'zh' ? '显示' : 'Show'}
        </Button>
        <Button onClick={() => hoverRef.current?.hide()}>
          {locale === 'zh' ? '隐藏' : 'Hide'}
        </Button>
      </div>
    </div>
  );
}
