import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  menu_items = [
    {
      title: 'Current Activity',
      router_link: '/hr/activity/current',
      icon: 'fas fa-tachometer-alt',
      active: false
    },
    {
      title: 'Past Activity Today',
      router_link: '/hr/activity/today',
      icon: 'fas fa-calendar-day',
      active: false
    },
    {
      title: 'Past Activity All',
      router_link: '/hr/activity/all',
      icon: 'fas fa-calendar-alt',
      active: false
    },
    {
      title: 'Logout',
      router_link: '/hr/logout',
      icon: 'fas fa-sign-out-alt',
      active: false
    },
  ];

  isMinimized = false;

  ngOnInit(): void {
    this.loadActiveState();
  }

  toggleSidebar(): void {
    this.isMinimized = !this.isMinimized;
  }

  setActive(item: any): void {
    this.menu_items.forEach(menuItem => menuItem.active = false);
    item.active = true;
    localStorage.setItem('activeMenu', item.router_link);
  }

  loadActiveState(): void {
    const activeLink = localStorage.getItem('activeMenu');
    if (activeLink) {
      this.menu_items.forEach(menuItem => {
        if (menuItem.router_link === activeLink) {
          menuItem.active = true;
        }
      });
    } else {
      this.menu_items[0].active = true;
    }
  }
}
