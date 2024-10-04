import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TimeService } from '../../../services/session/time-tracking.service';
import { formatTimestamp, parseTimestamp } from '../../../globals/functions';

@Component({
  selector: 'app-current-time',
  standalone: true,
  imports: [],
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.css'],
})
export class CurrentTimeComponent implements OnInit {
  constructor(private timeService: TimeService) {}
  @Input() startTime?: Date | string;
  currentTime: string = '';
  timeDifference: string = '';
  private intervalId: any;
  private predefinedTime?: Date;

  ngOnInit(): void {
    if (this.startTime) {
      if (typeof this.startTime === 'string') {
        this.predefinedTime = new Date(this.startTime);
      } else if (this.startTime instanceof Date) {
        this.predefinedTime = this.startTime;
      }

      if (this.predefinedTime && !isNaN(this.predefinedTime.getTime())) {
      } else {
        this.predefinedTime = undefined;
        console.warn('Invalid startTime provided, it must be a valid Date.');
      }
    }

    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();

    if (this.predefinedTime) {
      this.timeService.setPredefinedTime(this.predefinedTime);
      this.timeService.timeDifference$.subscribe(
        (timeDiff) => (this.timeDifference = timeDiff)
      );

      setInterval(() => this.updateTime(), 1000);
    }
  }
}
