import { Button, HorizonWebProvider } from '@aurora/horizon-react';
import { useState } from 'react';

export default function ButtonLinkDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [route, setRoute] = useState('/overview');
  return (
    <HorizonWebProvider navigate={to => setRoute(String(to))}>
      <div className="docs-demo">
        <div className="docs-demo__actions" id="button-links">
          <Button href="#button-links" link>
            {locale === 'en' ? 'Native link' : '原生链接'}
          </Button>
          <Button link to="/projects">
            {locale === 'en' ? 'Application route' : '应用路由'}
          </Button>
        </div>
        <span className="docs-demo__status">{route}</span>
      </div>
    </HorizonWebProvider>
  );
}
