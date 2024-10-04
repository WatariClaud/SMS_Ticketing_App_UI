import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { HasBgImageComponent } from '../../has-bg-image/has-bg-image/has-bg-image.component';
import guards_enrolled from '../../../dummy-data/guards_enrolled';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-security-guard-authorization',
  standalone: true,
  imports: [
    HasBgImageComponent,
    FormComponent,
    ButtonModule
  ],
  templateUrl: './security-guard-authorization.component.html',
  styleUrl: './security-guard-authorization.component.css',
})
export class SecurityGuardAuthorizationComponent {
  selectedGuardId: string = '';

  onGuardSelected(guardId: any): void {
    this.selectedGuardId = guardId.toString();
  }
}
