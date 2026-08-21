import { Button } from '@aurora/horizon-react';

export default function ButtonSizeDemo({ locale }: { locale: 'en' | 'zh' }) {
  const label = locale === 'en' ? 'Create' : '创建';
  return (
    <div className="docs-demo__actions">
      <Button size="huge">{label}</Button>
      <Button size="large">{label}</Button>
      <Button size="medium">{label}</Button>
      <Button size="small">{label}</Button>
      <Button autoFit>{locale === 'en' ? 'Fit' : '适应内容'}</Button>
    </div>
  );
}
