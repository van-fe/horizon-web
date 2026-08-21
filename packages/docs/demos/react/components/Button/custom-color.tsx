import { Button } from '@aurora/horizon-react';

export default function ButtonCustomColorDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <div className="docs-demo__actions">
      <Button color="brand">{en ? 'Create release' : '创建发布'}</Button>
      <Button color="indigo">{en ? 'Open insight' : '打开洞察'}</Button>
      <Button color="purple">{en ? 'View details' : '查看详情'}</Button>
      <Button color="magenta">{en ? 'Read report' : '阅读报告'}</Button>
      <Button color="#476582">{en ? 'Custom action' : '自定义操作'}</Button>
    </div>
  );
}
