export enum ToastType {
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export interface Toast {
  severity: ToastType;
  summary: string;
  detail: string;
  life: number;
}
