import { Component } from '@angular/core';
import { FormComponent } from '../../authorization/form/form.component';
import { LeftSidebarComponent } from '../../dashboard/left-sidebar/left-sidebar/left-sidebar.component';
import { MainDashboardComponent } from '../../dashboard/main/main-dashboard/main-dashboard.component';

@Component({
  selector: 'app-teller',
  standalone: true,
  imports: [
    FormComponent,
    LeftSidebarComponent,
    MainDashboardComponent
  ],
  templateUrl: './teller.component.html',
  styleUrl: './teller.component.css'
})
export class TellerComponent {

}
