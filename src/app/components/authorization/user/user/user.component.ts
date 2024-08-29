import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../form/form.component';
import { HasBgImageComponent } from '../../../has-bg-image/has-bg-image/has-bg-image.component';
import guards_enrolled from '../../../../dummy-data/guards_enrolled';
import { User } from '../../../../models/User';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormComponent,
    HasBgImageComponent,
    ButtonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  path: string = '';
  isAddingNewUser: boolean = true;
  isAuthenticatingUser: boolean = false;
  new_user_inputs = [
    {
      id: 1,
      title: 'email_address'
    },
    {
      id: 4,
      title: 'password'
    }
  ];

  ngOnInit() {
    this.activatedRoute.url.subscribe(urlSegments => {
      this.path = urlSegments.map(segment => segment.path).join('/');
      this.modifyArrayBasedOnPath();
    });
  }
  modifyArrayBasedOnPath() {
    if (this.path === 'create-teller') {
      this.new_user_inputs.push({
        id: 5,
        title: 'teller_counter_name',
      });
    }
    if (this.path === 'create-user') {
      this.new_user_inputs.push({
        id: 2,
        title: 'name',
      }, {
        id: 3,
        title: 'role',
      });
    }
    if (this.path === 'login-user') {
      this.isAddingNewUser = false;
      this.isAuthenticatingUser = true;
      console.log(this.new_user_inputs);
    }
  }

  // showNotif = new FormComponent(this.activatedRoute, this.router)
}
