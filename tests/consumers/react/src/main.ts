import { createElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Button,
  DescriptionItem,
  Descriptions,
  List,
  ListItem,
  Mask,
  Select,
  Spin,
  Time,
} from '@aurora/horizon-web-react';
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
    createElement(Time, { calculative: true, time: 10, endTime: 15 }, 'React time consumer'),
    createElement(
      Descriptions,
      { title: 'React descriptions consumer' },
      createElement(DescriptionItem, { label: 'Status', value: 'Ready' }),
    ),
    createElement(
      List,
      { header: 'React list consumer' },
      createElement(ListItem, { title: 'Status', describe: 'Ready' }),
    ),
  ),
);
