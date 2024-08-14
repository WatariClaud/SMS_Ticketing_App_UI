import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifier',
  standalone: true,
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css'],
  imports: [CommonModule],
})
export class NotifierComponent implements OnChanges {
  @Input() message: string | null = null;
  @Input() type: string = 'error';

  isSuccess: boolean = false;
  isError: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.isSuccess = this.type === 'success';
      this.isError = this.type === 'error';
    }
  }
}
