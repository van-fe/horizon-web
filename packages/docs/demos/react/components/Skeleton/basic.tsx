import { Skeleton, SkeletonItem, Space } from '@aurora/horizon-web-react';

export default function SkeletonDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Skeleton />
      <Skeleton
        placeholder={
          <Space align="center">
            <SkeletonItem shape="avatar" />
            <div style={{ width: 220 }}>
              <SkeletonItem shape="text" />
              <SkeletonItem shape="text" />
            </div>
          </Space>
        }
      />
      <Skeleton loading={false}>
        {isEnglish ? 'The loaded content is now visible.' : '加载完成后的内容已显示。'}
      </Skeleton>
    </Space>
  );
}
