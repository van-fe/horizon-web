import { useState } from 'react';
import { Pagination, Switch } from '@aurora/horizon-react';

export default function PaginationCustomDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [disabled, setDisabled] = useState(false);
  const [page, setPage] = useState(2);

  return (
    <section className="docs-demo">
      <label className="docs-demo__control">
        <span className="docs-demo__control-label">{en ? 'Disabled' : '禁用'}</span>
        <Switch onChange={setDisabled} value={disabled} />
      </label>
      <div className="docs-demo__stage" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 520 }}>
          <Pagination
            disabled={disabled}
            layout="pager"
            next={<span aria-hidden="true">→</span>}
            onPageChange={setPage}
            prefix={<strong>{en ? 'Orders' : '订单'}</strong>}
            previous={<span aria-hidden="true">←</span>}
            suffix={<small>{en ? 'Updated now' : '刚刚更新'}</small>}
            total={80}
            value={page}
          />
        </div>
      </div>
    </section>
  );
}
