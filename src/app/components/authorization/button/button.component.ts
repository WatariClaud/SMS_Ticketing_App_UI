import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    ButtonModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent implements OnInit {
  @Input() ButtonText = '';
  @Input() ButtonEvent: any;
  @Input() hasValidInput: string = '';
  @Input() endSession!: boolean;

  onButtonClick(event: Event) {
    this.ButtonEvent(event, 'argument');
  }
  ngOnInit(): void {
    console.log(this.endSession)
  }
}
