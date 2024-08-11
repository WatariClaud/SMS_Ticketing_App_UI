import { Component, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HasBgImageComponent } from '../../has-bg-image/has-bg-image/has-bg-image.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-default-form',
  standalone: true,
  imports: [HasBgImageComponent, FormComponent],
  templateUrl: './default-form.component.html',
  styleUrl: './default-form.component.css'
})
export class DefaultFormComponent {
  selectedServiceId: string = '';
  is_engineer_route: boolean = false;
  
  constructor(private router: Router) {
    this.is_engineer_route = this.router.url.includes('/engineer');
  }
  
  onServiceSelected(serviceId: number): void {
    this.selectedServiceId = serviceId.toString();
  }

}
