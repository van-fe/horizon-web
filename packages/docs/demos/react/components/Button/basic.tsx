import { useState } from 'react';
import { Button } from '@aurora/horizon-web-react';

export default function ButtonDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [status, setStatus] = useState('');
  const isEnglish = locale === 'en';

  async function saveDraft() {
    setStatus(isEnglish ? 'Saving…' : '正在保存…');
    await new Promise(resolve => setTimeout(resolve, 600));
    setStatus(isEnglish ? 'Draft saved' : '草稿已保存');
  }

  return (
    <div className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'Use visual intent and guarded async actions without replacing native button behavior.'
          : '通过视觉意图和异步防重入表达操作，同时保留原生按钮行为。'}
      </p>
      <div className="docs-demo__actions">
        <Button variant="primary">{isEnglish ? 'Create project' : '创建项目'}</Button>
        <Button variant="normal">{isEnglish ? 'Preview' : '预览'}</Button>
        <Button variant="danger">{isEnglish ? 'Delete' : '删除'}</Button>
        <Button asyncAction={saveDraft} asyncState="loading" variant="primary">
          {isEnglish ? 'Save draft' : '保存草稿'}
        </Button>
      </div>
      {status && <span className="docs-demo__status">{status}</span>}
    </div>
  );
}
