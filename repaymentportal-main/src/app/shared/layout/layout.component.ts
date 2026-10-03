import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  isMobOpen = false;
  isCollapsed = false;
  currentPageTitle = 'Dashboard';

  private titles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/reports': 'Reports & Analytics',
    '/programs': 'Programs List',
    '/create-program': 'Create Program',
    '/view-program': 'View Program',
    '/beneficiaries': 'Beneficiaries',
    '/donations': 'Donations',
    '/volunteers': 'Volunteers',
    '/profile': 'My Profile',
    '/admin-signup': 'Add Admin',
    '/settings': 'Settings',
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateTitle(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateTitle(event.urlAfterRedirects);
      if (this.isMob()) this.isMobOpen = false;
    });
  }

  updateTitle(url: string) {
    const key = Object.keys(this.titles).find(k => url.startsWith(k));
    this.currentPageTitle = key ? this.titles[key] : 'Dashboard';
  }

  isMob() {
    return window.innerWidth <= 900;
  }

  handleSbBtn() {
    if (this.isMob()) {
      this.isMobOpen = !this.isMobOpen;
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (!this.isMob()) {
      this.isMobOpen = false;
    }
  }
}
