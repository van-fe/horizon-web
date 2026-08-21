import { Button } from '@aurora/horizon-react';

export default function ButtonBorderStyleDemo({ locale }: { locale: 'en' | 'zh' }) {
  const label = locale === 'en' ? 'Secondary action' : '次要操作';
  return (
    <div className="docs-demo__actions">
      <Button borderStyle="solid" plain variant="normal">
        {label}
      </Button>
      <Button borderStyle="dashed" plain variant="normal">
        {label}
      </Button>
      <Button borderStyle="dotted" plain variant="normal">
        {label}
      </Button>
    </div>
  );
}
