import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { HasBgImageComponent } from '../../has-bg-image/has-bg-image/has-bg-image.component';
import guards_enrolled from '../../../dummy-data/guards_enrolled';

@Component({
  selector: 'app-security-guard-authorization',
  standalone: true,
  imports: [HasBgImageComponent, FormComponent],
  templateUrl: './security-guard-authorization.component.html',
  styleUrl: './security-guard-authorization.component.css'
})
export class SecurityGuardAuthorizationComponent {
  selectedGuardId: string = '';
  
  onGuardSelected(guardId: number): void {
    this.selectedGuardId = guardId.toString();
  }

  // simulate backend data
  guards_enrolled = guards_enrolled;
}
