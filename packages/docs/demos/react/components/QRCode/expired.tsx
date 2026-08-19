import { useState } from 'react';
import { QRCode } from '@aurora/horizon-react';

export default function QRCodeExpiredDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [revision, setRevision] = useState(1);
  const [expired, setExpired] = useState(true);
  return (
    <section className="docs-demo">
      <p className="docs-demo__description">
        {en
          ? 'Refresh an expired sign-in code without replacing the surrounding layout.'
          : '刷新失效的登录二维码，同时保持周围布局稳定。'}
      </p>
      <div className="docs-demo__stage">
        <QRCode
          ariaLabel={en ? 'One-time sign-in code' : '一次性登录二维码'}
          expired={expired}
          expiredText={en ? 'Sign-in code expired' : '登录二维码已失效'}
          value={`https://horizon.example/sign-in?revision=${revision}`}
          onRefresh={() => {
            setRevision(current => current + 1);
            setExpired(false);
          }}
        />
      </div>
      <output aria-live="polite" className="docs-demo__status">
        {en ? `Code revision: ${revision}` : `二维码版本：${revision}`}
      </output>
    </section>
  );
}
