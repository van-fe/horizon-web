import { Button } from '@aurora/horizon-react';

export default function ButtonTextDemo({ locale }: { locale: 'en' | 'zh' }) {
  return (
    <div className="docs-demo__actions">
      <Button text>{locale === 'en' ? 'View details' : '查看详情'}</Button>
      <Button text variant="normal">
        {locale === 'en' ? 'Dismiss' : '暂不处理'}
      </Button>
      <Button text variant="danger">
        {locale === 'en' ? 'Remove' : '移除'}
      </Button>
    </div>
  );
}
