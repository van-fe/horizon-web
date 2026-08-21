import { Button } from '@aurora/horizon-react';
import { useState } from 'react';

export default function ButtonActiveDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [view, setView] = useState<'list' | 'grid'>('list');
  return (
    <div className="docs-demo__actions">
      <Button active={view === 'list'} onClick={() => setView('list')}>
        {locale === 'en' ? 'List' : '列表'}
      </Button>
      <Button active={view === 'grid'} onClick={() => setView('grid')} variant="normal">
        {locale === 'en' ? 'Grid' : '网格'}
      </Button>
    </div>
  );
}
