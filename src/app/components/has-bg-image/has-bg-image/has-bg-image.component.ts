import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-has-bg-image',
  standalone: true,
  imports: [],
  templateUrl: './has-bg-image.component.html',
  styleUrl: './has-bg-image.component.css'
})
export class HasBgImageComponent {
  is_admin_route: boolean = false;
  is_guard_route: boolean = false;

  constructor(private router: Router) {
    this.is_admin_route = this.router.url.includes('/admin');
    this.is_guard_route = this.router.url.includes('/security/authenticate');
  }
}
