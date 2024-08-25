import { Component } from '@angular/core';
import { HasBgImageComponent } from '../../has-bg-image/has-bg-image/has-bg-image.component';
import { FormComponent } from '../../authorization/form/form.component';

@Component({
  selector: 'app-teller-auth',
  standalone: true,
  imports: [HasBgImageComponent, FormComponent],
  templateUrl: './teller-auth.component.html',
  styleUrl: './teller-auth.component.css',
})
export class TellerAuthComponent {}
