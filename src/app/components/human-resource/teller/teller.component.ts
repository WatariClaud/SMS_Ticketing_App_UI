import { Component } from '@angular/core';
import { FormComponent } from '../../authorization/form/form.component';

@Component({
  selector: 'app-teller',
  standalone: true,
  imports: [
    FormComponent
  ],
  templateUrl: './teller.component.html',
  styleUrl: './teller.component.css'
})
export class TellerComponent {

}
