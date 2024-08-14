import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent{
  @Input() ButtonText = '';
  @Input() ButtonEvent: any;
  @Input() hasValidInput: string = '';
  
  onButtonClick(event: Event) {
    this.ButtonEvent(event, 'argument');
  }
}
