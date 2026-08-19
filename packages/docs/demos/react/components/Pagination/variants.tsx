import { useState } from 'react';
import type { PaginationVariant } from '@aurora/horizon-react';
import { Pagination, Segmented, SegmentedItem } from '@aurora/horizon-react';

export default function PaginationVariantsDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [variant, setVariant] = useState<PaginationVariant>('default');
  const [page, setPage] = useState(4);

  return (
    <section className="docs-demo">
      <div className="docs-demo__controls">
        <div className="docs-demo__control">
          <span className="docs-demo__control-label">{en ? 'Variant' : '模式'}</span>
          <Segmented
            onChange={value => setVariant(value as PaginationVariant)}
            size="small"
            value={variant}
          >
            <SegmentedItem value="default">Default</SegmentedItem>
            <SegmentedItem value="simple">Simple</SegmentedItem>
            <SegmentedItem value="simplest">Simplest</SegmentedItem>
          </Segmented>
        </div>
      </div>
      <div className="docs-demo__stage" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 560 }}>
          <Pagination
            layout="total, pager, jumper"
            onPageChange={setPage}
            total={120}
            value={page}
            variant={variant}
          />
        </div>
      </div>
    </section>
  );
}
