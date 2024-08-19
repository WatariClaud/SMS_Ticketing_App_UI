import { Component } from '@angular/core';
import { HasBgImageComponent } from '../../../../has-bg-image/has-bg-image/has-bg-image.component';
import { FormComponent } from '../../../form/form.component';

@Component({
  selector: 'app-station-management',
  standalone: true,
  imports: [
    HasBgImageComponent,
    FormComponent
  ],
  templateUrl: './station-management.component.html',
  styleUrl: './station-management.component.css'
})
export class StationManagementComponent {

}
