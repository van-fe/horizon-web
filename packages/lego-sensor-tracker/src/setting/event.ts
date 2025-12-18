export interface EventEmitterMap {
  login: (loginId: string) => void;
  logout: (isChangeId?: boolean) => void;
  quick: (name: string, data: any) => void;
  method: (name: string, data: Record<string, unknown>) => void;
  directive: (name: string, data: Record<string, unknown>) => void;
  [index: string]: (...args: any[]) => void;
}
