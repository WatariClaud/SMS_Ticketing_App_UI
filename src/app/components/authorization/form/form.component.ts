import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotifierComponent } from '../../notifier/notifier/notifier.component';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [RouterOutlet, NotifierComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  title = 'sms-ticketing';
  currentTime: string = '';
  private intervalId: any;
  notificationMessage: string | null = null;
  notificationType: string = 'error';

  ngOnInit(): void {
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  createTicket(event: Event, argument: string): void {
    event.preventDefault();
    this.showNotification('Still building', 'success');
  }
  showNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;
    setTimeout(() => (this.notificationMessage = null), 3000);
  }
}
