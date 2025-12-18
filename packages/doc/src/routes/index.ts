import * as VueRouter from 'vue-router';
import { getRouterBase } from '@nio-wad/fx-web';
import ComponentsPage from '../pages/components';
import routerJson from './router.json';
import type { RouteRecordRaw } from 'vue-router';

const dirScanRes = routerJson as Record<string, Record<string, Record<string, any>>>;

// 将名称转化为符合 URL 规范的形式（小写+连字符）
const name4Url = (name: string) => {
  return name.toLowerCase().replace(/ /g, '-');
};

const preImport = {
  features: import.meta.glob(`../../docs/features/**/*.md`),
  'getting-started': import.meta.glob(`../../docs/getting-started/**/*.md`),
};

const generateRoutes = ({ dir, multi }: { dir: string; multi?: boolean }) => {
  if (multi) {
    return Object.keys(dirScanRes['.md'][dir]).map(name => {
      const importPath = name.indexOf('.md') > -1 ? name : `${name}/doc.md`;
      const filename = name.replace(/.md$/, '');
      return {
        path: name4Url(filename),
        name: filename,
        component: preImport[dir as keyof typeof preImport][`../../docs/${dir}/${importPath}`],
      };
    });
  }

  return Object.keys(dirScanRes['.md'][dir]).map(name => ({
    path: name4Url(name),
    name,
    component: () => import(`../../docs/${dir}/${name}/doc.md`),
  }));
};

const routes: RouteRecordRaw[] = [
  {
    path: '/getting-started',
    name: 'Getting Started',
    component: ComponentsPage,
    children: generateRoutes({ dir: 'getting-started', multi: true }),
  },
  {
    path: '/features',
    name: 'Features',
    component: ComponentsPage,
    children: generateRoutes({ dir: 'features', multi: true }),
  },
  {
    path: '/style-animation',
    name: 'Styles & Animations',
    component: ComponentsPage,
    children: generateRoutes({ dir: 'style-animation' }),
  },
  {
    path: '/components',
    name: 'Components',
    component: ComponentsPage,
    children: generateRoutes({ dir: 'components' }),
  },
  {
    path: '/directives',
    name: 'Directives',
    component: ComponentsPage,
    children: generateRoutes({ dir: 'directives' }),
  },
  {
    path: '/methods',
    name: 'Methods',
    component: ComponentsPage,
    children: generateRoutes({ dir: 'methods' }),
  },
  {
    path: '/others',
    name: 'Others',
    component: ComponentsPage,
    children: generateRoutes({ dir: 'others' }),
  },
  { path: '/', redirect: '/getting-started' },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(getRouterBase()),
  routes,
});

export { routes, router };
