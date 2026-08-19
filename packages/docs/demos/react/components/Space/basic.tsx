import { Button, Space } from '@aurora/horizon-react';

export default function SpaceDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';

  return (
    <div className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'Space keeps action groups and stacked metadata aligned with consistent gaps.'
          : 'Space 使用一致的间距排列操作组和纵向信息。'}
      </p>
      <Space size="medium" wrap>
        <Button>{isEnglish ? 'Create' : '新建'}</Button>
        <Button variant="normal">{isEnglish ? 'Preview' : '预览'}</Button>
        <Button variant="normal">{isEnglish ? 'Archive' : '归档'}</Button>
      </Space>
      <Space direction="vertical" separator size={12}>
        <span>{isEnglish ? 'Owner: Aurora Team' : '负责人：Aurora 团队'}</span>
        <span>{isEnglish ? 'Updated: today' : '更新时间：今天'}</span>
        <span>{isEnglish ? 'Status: active' : '状态：进行中'}</span>
      </Space>
    </div>
  );
}
