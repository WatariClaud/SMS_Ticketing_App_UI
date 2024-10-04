import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastType } from './toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private messageService: MessageService
  ) { }

  showSuccess(summary: string, detail: string): void {
    this.messageService.add({
      severity: ToastType.SUCCESS,
      summary,
      detail
    });
  }

  showInfo(summary: string, detail: string): void {
    this.messageService.add({
      severity: ToastType.INFO,
      summary,
      detail
    });
  }

  showWarning(summary: string, detail: string): void {
    this.messageService.add({
      severity: ToastType.WARN,
      summary,
      detail
    });
  }

  showError(summary: string, detail: string): void {
    this.messageService.add({
      severity: ToastType.ERROR,
      summary,
      detail
    });
  }
}
