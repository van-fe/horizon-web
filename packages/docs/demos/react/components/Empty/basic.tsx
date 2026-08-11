import { Button, Empty } from '@aurora/horizon-web-react';

export default function EmptyDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <Empty description={en ? 'No projects yet' : '暂无项目'}>
      <Button size="small">{en ? 'Create project' : '创建项目'}</Button>
    </Empty>
  );
}
