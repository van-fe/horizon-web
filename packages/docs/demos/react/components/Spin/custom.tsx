import { Spin } from '@aurora/horizon-web-react';

export default function SpinCustomDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
      {(['small', 'medium', 'large'] as const).map(size => (
        <Spin
          indicator={<span aria-hidden="true">◌</span>}
          key={size}
          size={size}
          tipContent={<strong>{isEnglish ? `${size} task` : `${size} 任务`}</strong>}
        />
      ))}
    </div>
  );
}
