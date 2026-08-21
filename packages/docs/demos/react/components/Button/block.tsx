import { Button } from '@aurora/horizon-react';

export default function ButtonBlockDemo({ locale }: { locale: 'en' | 'zh' }) {
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      <Button block>{locale === 'en' ? 'Continue to review' : '继续审核'}</Button>
      <Button block plain variant="normal">
        {locale === 'en' ? 'Save for later' : '稍后保存'}
      </Button>
    </div>
  );
}
