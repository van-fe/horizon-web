import type { HCascaderOption } from '@aurora/horizon-web';

export const workspaceOptions: HCascaderOption[] = [
  {
    value: 'product',
    label: 'Product',
    children: [
      {
        value: 'design-system',
        label: 'Design system',
        children: [
          { value: 'foundations', label: 'Foundations' },
          { value: 'components', label: 'Components' },
          { value: 'accessibility', label: 'Accessibility' },
        ],
      },
      {
        value: 'growth',
        label: 'Growth',
        children: [
          { value: 'activation', label: 'Activation' },
          { value: 'retention', label: 'Retention' },
        ],
      },
    ],
  },
  {
    value: 'engineering',
    label: 'Engineering',
    children: [
      {
        value: 'web-platform',
        label: 'Web platform',
        children: [
          { value: 'frontend', label: 'Frontend' },
          { value: 'developer-experience', label: 'Developer experience' },
        ],
      },
      {
        value: 'reliability',
        label: 'Reliability',
        children: [
          { value: 'observability', label: 'Observability' },
          { value: 'incident-response', label: 'Incident response' },
        ],
      },
    ],
  },
  {
    value: 'operations',
    label: 'Operations',
    children: [
      {
        value: 'customer-success',
        label: 'Customer success',
        children: [
          { value: 'onboarding', label: 'Onboarding' },
          { value: 'enterprise', label: 'Enterprise accounts' },
        ],
      },
      {
        value: 'finance',
        label: 'Finance',
        children: [
          { value: 'billing', label: 'Billing' },
          { value: 'planning', label: 'Planning' },
        ],
      },
    ],
  },
];

export const policyOptions: HCascaderOption[] = [
  {
    value: 'company',
    label: 'Company policies',
    selectable: false,
    children: [
      {
        value: 'security',
        label: 'Security',
        children: [
          { value: 'access-review', label: 'Access review' },
          { value: 'data-retention', label: 'Data retention', disabled: true },
        ],
      },
      {
        value: 'people',
        label: 'People operations',
        children: [
          { value: 'remote-work', label: 'Remote work' },
          { value: 'expenses', label: 'Expenses' },
        ],
      },
    ],
  },
  {
    value: 'team',
    label: 'Team playbooks',
    children: [
      {
        value: 'delivery',
        label: 'Delivery',
        children: [
          { value: 'release', label: 'Release checklist' },
          { value: 'incident', label: 'Incident response' },
        ],
      },
    ],
  },
];

export const allWorkspaceLeafPaths: string[][] = [
  ['product', 'design-system', 'foundations'],
  ['product', 'design-system', 'components'],
  ['product', 'design-system', 'accessibility'],
  ['product', 'growth', 'activation'],
  ['product', 'growth', 'retention'],
  ['engineering', 'web-platform', 'frontend'],
  ['engineering', 'web-platform', 'developer-experience'],
  ['engineering', 'reliability', 'observability'],
  ['engineering', 'reliability', 'incident-response'],
  ['operations', 'customer-success', 'onboarding'],
  ['operations', 'customer-success', 'enterprise'],
  ['operations', 'finance', 'billing'],
  ['operations', 'finance', 'planning'],
];

export function cloneOptions(options: HCascaderOption[] = workspaceOptions): HCascaderOption[] {
  return JSON.parse(JSON.stringify(options)) as HCascaderOption[];
}

export function formatPath(path: Array<string | number> | undefined): string {
  return path?.length ? path.join(' / ') : 'No selection yet';
}

export function formatSelectionCount(value: unknown[]): string {
  return `${value.length} ${value.length === 1 ? 'selection' : 'selections'}`;
}
