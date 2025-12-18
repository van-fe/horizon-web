export interface GroupedBasicTokenItem {
  label: string;
  value: string;
  group: string;
  rawLabel: string;
  isColor: boolean;
  path: string;
}

export interface GroupedBasicToken {
  group: string;
  rawName: string;
  children: GroupedBasicTokenItem[];
}
