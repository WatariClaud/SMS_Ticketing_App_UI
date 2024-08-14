import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-time',
  standalone: true,
  imports: [],
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.css']
})
export class CurrentTimeComponent implements OnInit, OnDestroy {
  @Input() startTime?: Date | string; // Allow startTime to be either Date or string
  currentTime: string = '';
  timeDifference: string = '';
  private intervalId: any;
  private predefinedTime?: Date;

  ngOnInit(): void {
    // Convert startTime to a Date object if it's a string
    if (this.startTime) {
      if (typeof this.startTime === 'string') {
        this.predefinedTime = new Date(this.startTime);
      } else if (this.startTime instanceof Date) {
        this.predefinedTime = this.startTime;
      }

      // Validate the date
      if (this.predefinedTime && !isNaN(this.predefinedTime.getTime())) {
        // Valid date
      } else {
        // Invalid date handling
        this.predefinedTime = undefined;
        console.warn('Invalid startTime provided, it must be a valid Date.');
      }
    }

    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();

    if (this.predefinedTime) {
      this.calculateTimeDifference(now);
    }
  }

  private calculateTimeDifference(currentTime: Date): void {
    if (this.predefinedTime) {
      const timeDiff = currentTime.getTime() - this.predefinedTime.getTime();
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      this.timeDifference = `Time Lapsed: ${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
