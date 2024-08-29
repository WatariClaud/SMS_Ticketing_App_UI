import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetState } from '../../../services/get-state';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../core/domain/user/user';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
})
export class LeftSidebarComponent implements OnInit {
  loggedInUser: User | null = this.authService.getSessionUser();

  constructor(
    private state: GetState,
    private authService: AuthService,
    private router: Router
  ) { }

  private routeSubscription: Subscription = new Subscription();
  menu_items: any[] = [];

  isMinimized = false;
  currentRoute: string = '';
  isAdminMenu: boolean = false;

  private logout(): void {
    this.authService.logoutUser();
  }

  private routeActive(route: string): boolean {
    this.router.navigate([route]);
    return true;
  }

  ngOnInit(): void {
    if (String(this.loggedInUser?.role).toLowerCase() === 'admin') {
      this.isAdminMenu = true;
      this.menu_items = [
        {
          title: 'Users',
          router_link: '/admin',
          action: () => this.routeActive('/admin'),
          icon: 'fas fa-user-alt',
          active: false,
        },
        {
          title: 'View Tickets',
          router_link: '/admin/view-visits',
          action: () => this.routeActive('/admin/view-visits'),
          icon: 'fas fa-calendar-day',
          active: false,
        },
        {
          title: 'Pending Visits',
          router_link: '/admin/activity/pending',
          action: () => this.routeActive('/admin/activity/pending'),
          icon: 'pi pi-user-minus',
          active: false,
        },
        {
          title: 'Add New Helpdesk',
          router_link: '/admin/add-helpdesk',
          action: () => this.routeActive('/admin/add-helpdesk'),
          icon: 'fas fa-calendar-day',
          active: false,
        },
        {
          title: 'Stations',
          router_link: '/admin/stations',
          action: () => this.routeActive('/admin/stations'),
          icon: 'pi pi-home',
          active: false,
        },
        {
          title: 'Reports',
          router_link: '/admin/reports',
          action: () => this.routeActive('/admin/reports'),
          icon: 'pi pi-home',
          active: false,
        },
        {
          title: 'Logout',
          router_link: '/admin/logout',
          action: () => this.logout(),
          icon: 'fas fa-sign-out-alt',
          active: false,
        },
      ];
    } else if (String(this.loggedInUser?.role).toLowerCase() === 'teller') {
      this.menu_items = [
        {
          title: 'Pending Activity',
          router_link: '/hr/activity/pending',
          action: () => this.routeActive('/hr/activity/pending'),
          icon: 'fas fa-tachometer-alt',
          active: false,
        },
        {
          title: 'Current Activity',
          router_link: '/hr/activity/current',
          action: () => this.routeActive('/hr/activity/current'),
          icon: 'fas fa-tachometer-alt',
          active: false,
        },
        {
          title: 'Past Activity Today',
          router_link: '/hr/activity/today',
          action: () => this.routeActive('/hr/activity/today'),
          icon: 'fas fa-calendar-day',
          active: false,
        },
        {
          title: 'Past Activity All',
          router_link: '/hr/activity/all',
          action: () => this.routeActive('/hr/activity/all'),
          icon: 'fas fa-calendar-alt',
          active: false,
        },
        {
          title: 'Logout',
          router_link: '/hr/logout',
          action: () => this.logout(),
          icon: 'fas fa-sign-out-alt',
          active: false,
        },
      ];
    }
    this.loadActiveState();
  }

  toggleSidebar(): void {
    this.isMinimized = !this.isMinimized;
  }

  setActive(item: any): void {
    this.menu_items.forEach((menuItem) => (menuItem.active = false));
    item.active = true;
    localStorage.setItem('activeMenu', item.router_link);
    item.action();
  }

  loadActiveState(): void {
    const activeLink = localStorage.getItem('activeMenu');
    if (activeLink) {
      this.menu_items.forEach((menuItem) => {
        if (menuItem.router_link === activeLink) {
          menuItem.active = true;
        }
      });
    } else {
      this.menu_items[0].active = true;
    }
  }
}
