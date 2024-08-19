import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HasBgImageComponent } from '../../has-bg-image/has-bg-image/has-bg-image.component';
import { FormComponent } from '../form/form.component';
import { ButtonComponent } from "../button/button.component";
import { CreateTicketService } from '../../../services/api-calls/create-ticket.service';

@Component({
  selector: 'app-default-form',
  standalone: true,
  imports: [HasBgImageComponent, FormComponent, ButtonComponent],
  templateUrl: './default-form.component.html',
  styleUrl: './default-form.component.css'
})
export class DefaultFormComponent implements OnInit {
  selectedServiceId: string = '';
  is_engineer_route: boolean = false;
  ref_no: string = ''

  constructor(
    private router: Router,
    private createTicketService: CreateTicketService
  ) {
    this.is_engineer_route = this.router.url.includes('/engineer');
  }
  
  onServiceSelected(serviceId: number): void {
    this.selectedServiceId = serviceId.toString();
  }
  endSession () {
    
  };

  ngOnInit(): void {
    this.createTicketService.create_ref_no()
    .subscribe({
      next: (data) => {
        this.ref_no = data.ref_no;
        console.clear();
      }
    })
  }
}
