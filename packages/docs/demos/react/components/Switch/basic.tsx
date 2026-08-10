import { useState } from 'react';
import { Switch } from '@aurora/horizon-web-react';

export default function SwitchDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [automaticUpdates, setAutomaticUpdates] = useState(true);
  const isEnglish = locale === 'en';

  return (
    <div className="docs-demo">
      <p className="docs-demo__description">
        {isEnglish
          ? 'The controlled value stays synchronized with the surrounding preference state.'
          : '受控值与外部偏好设置保持同步。'}
      </p>
      <div className="docs-demo__stage">
        <Switch
          label={isEnglish ? 'Automatic updates' : '自动更新'}
          onChange={setAutomaticUpdates}
          status
          statusOffText={isEnglish ? 'Off' : '关闭'}
          statusOnText={isEnglish ? 'On' : '开启'}
          value={automaticUpdates}
        />
      </div>
      <span className="docs-demo__value">value: {String(automaticUpdates)}</span>
    </div>
  );
}
