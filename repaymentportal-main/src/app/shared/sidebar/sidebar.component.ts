import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() isCollapsed = false;

  user: any = null;

  constructor(private router: Router, private authService: AuthService) {
    this.user = this.authService.getUser();
  }

  getInitials(): string {
    if (!this.user) return 'AD';
    const first = this.user.firstName?.charAt(0) || '';
    const last = this.user.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || 'AD';
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
