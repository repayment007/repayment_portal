import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-view.html',
  styleUrl: './admin-view.css',
})
export class AdminView {
  admin = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: '2024-03-15 10:30 AM',
    permissions: 'Full Access'
  };

  constructor(private route: ActivatedRoute) {}

  getStatusClass(status: string) {
    switch (status.toLowerCase()) {
      case 'active': return 'pill-active';
      case 'inactive': return 'pill-pending';
      case 'suspended': return 'pill-closed';
      default: return '';
    }
  }
}
