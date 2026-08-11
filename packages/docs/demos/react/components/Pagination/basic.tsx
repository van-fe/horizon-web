import { useState } from 'react';
import { Pagination } from '@aurora/horizon-web-react';

export default function PaginationBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [page, setPage] = useState(3);
  const [pageSize, setPageSize] = useState(10);

  return (
    <section className="docs-demo">
      <div className="docs-demo__stage" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 640 }}>
          <Pagination
            labels={{
              navigation: en ? 'Search result pages' : '搜索结果分页',
              pageSizeOption: en ? ' / page' : ' 条/页',
              pageSizeSelection: en ? 'Items per page' : '每页数量',
              rangeTotal: en ? '{range} of {total}' : '第 {range} 条，共 {total} 条',
            }}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            pageSize={pageSize}
            pageSizes={[10, 20, 50]}
            total={237}
            value={page}
          />
        </div>
      </div>
      <span aria-live="polite" className="docs-demo__status">
        {en ? `Page ${page}, ${pageSize} items per page` : `第 ${page} 页，每页 ${pageSize} 条`}
      </span>
    </section>
  );
}
