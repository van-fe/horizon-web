import { createElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Mask, Select, Spin } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';

const options = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
];

createRoot(document.getElementById('root')!).render(
  createElement(
    StrictMode,
    null,
    createElement(Button, null, 'React consumer'),
    createElement(Select, { options }),
    createElement(Mask, { absolute: true, visible: false }, 'React mask consumer'),
    createElement(Spin, { spinning: false }, 'React spin consumer'),
  ),
);
