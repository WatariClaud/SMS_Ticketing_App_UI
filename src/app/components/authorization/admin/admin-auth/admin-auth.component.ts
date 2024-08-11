import { Component } from '@angular/core';
import { HasBgImageComponent } from '../../../has-bg-image/has-bg-image/has-bg-image.component';
import { FormComponent } from '../../form/form.component';

@Component({
  selector: 'app-admin-auth',
  standalone: true,
  imports: [HasBgImageComponent, FormComponent],
  templateUrl: './admin-auth.component.html',
  styleUrl: './admin-auth.component.css'
})
export class AdminAuthComponent {

}
