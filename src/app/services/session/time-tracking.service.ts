import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService implements OnInit, OnDestroy {
  private predefinedTime: Date | null = null;
  private timeDifferenceSubject = new BehaviorSubject<string>('');
  private updateSubscription: Subscription | null = null;

  timeDifference$ = this.timeDifferenceSubject.asObservable();

  setPredefinedTime(predefinedTime: any): void {
    this.predefinedTime = predefinedTime;
    this.calculateTimeDifference(new Date());

    this.startUpdateInterval();
  }

  calculateTimeDifference(currentTime: Date): void {
    if (this.predefinedTime) {
      const timeDiff = currentTime.getTime() - this.predefinedTime.getTime();
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      const timeDifference = `${days} days, ${hours % 24} hours, ${
        minutes % 60
      } minutes, ${seconds % 60} seconds`;
      ``;
      this.timeDifferenceSubject.next(timeDifference);
    }
  }

  private startUpdateInterval(): void {
    this.clearUpdateInterval();

    this.updateSubscription = interval(1000).subscribe(() => {
      this.calculateTimeDifference(new Date());
    });
  }

  private clearUpdateInterval(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
      this.updateSubscription = null;
    }
  }

  ngOnInit(): void {
    this.startUpdateInterval();
  }
  ngOnDestroy(): void {
    this.clearUpdateInterval();
  }
}
