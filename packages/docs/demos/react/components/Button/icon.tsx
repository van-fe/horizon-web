import { Button } from '@aurora/horizon-react';

const SaveIcon = () => <span aria-hidden="true">↓</span>;
const NextIcon = () => <span aria-hidden="true">→</span>;

export default function ButtonIconDemo({ locale }: { locale: 'en' | 'zh' }) {
  return (
    <div className="docs-demo__actions">
      <Button icon={<SaveIcon />}>{locale === 'en' ? 'Save' : '保存'}</Button>
      <Button suffix={<NextIcon />} variant="normal">
        {locale === 'en' ? 'Continue' : '继续'}
      </Button>
      <Button aria-label={locale === 'en' ? 'Save' : '保存'} icon={<SaveIcon />} />
    </div>
  );
}
