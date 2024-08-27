import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetState } from '../../../services/get-state';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
})
export class LeftSidebarComponent implements OnInit {
  constructor(private state: GetState) { }
  private routeSubscription: Subscription = new Subscription();
  menu_items: any[] = [];

  isMinimized = false;
  currentRoute: string = '';
  isAdminMenu: boolean = false;

  ngOnInit(): void {
    if (this.state.returnRoute() === '/admin') {
      this.isAdminMenu = true;
      this.menu_items = [
        {
          title: 'Users',
          router_link: '/admin',
          icon: 'fas fa-user-alt',
          active: false,
        },
        {
          title: "Today's Tickets",
          router_link: '/hr/activity/today',
          icon: 'fas fa-calendar-day',
          active: false,
        },
        {
          title: "Pending Visits",
          router_link: '/hr/activity/pending',
          icon: 'pi pi-user-minus',
          active: false,
        },
        {
          title: 'Add New Helpdesk',
          router_link: '/admin/add-helpdesk',
          icon: 'fas fa-calendar-day',
          active: false,
        },
        {
          title: 'Stations',
          router_link: '/admin/stations',
          icon: 'pi pi-home',
          active: false,
        },
        {
          title: 'Logout',
          router_link: '/admin/logout',
          icon: 'fas fa-sign-out-alt',
          active: false,
        },
      ];
    } else {
      this.menu_items = [
        {
          title: 'Pending Activity',
          router_link: '/hr/activity/pending',
          icon: 'fas fa-tachometer-alt',
          active: false,
        },
        {
          title: 'Current Activity',
          router_link: '/hr/activity/current',
          icon: 'fas fa-tachometer-alt',
          active: false,
        },
        {
          title: 'Past Activity Today',
          router_link: '/hr/activity/today',
          icon: 'fas fa-calendar-day',
          active: false,
        },
        {
          title: 'Past Activity All',
          router_link: '/hr/activity/all',
          icon: 'fas fa-calendar-alt',
          active: false,
        },
        {
          title: 'Logout',
          router_link: '/hr/logout',
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
