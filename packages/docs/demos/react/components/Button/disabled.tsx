import { Button } from '@aurora/horizon-react';

export default function ButtonDisabledDemo({ locale }: { locale: 'en' | 'zh' }) {
  return (
    <div className="docs-demo__actions">
      <Button disabled>{locale === 'en' ? 'Unavailable' : '不可用'}</Button>
      <Button disabled plain variant="normal">
        {locale === 'en' ? 'Unavailable plain' : '不可用简洁按钮'}
      </Button>
      <Button aria-label={locale === 'en' ? 'Loading upload' : '正在上传'} loading>
        {locale === 'en' ? 'Uploading' : '上传中'}
      </Button>
    </div>
  );
}
