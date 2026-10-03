import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  admins = [
    { id: 1, name: 'Admin One', email: 'admin1@example.com', role: 'Super Admin', status: 'active', joined: '2023-10-01' },
    { id: 2, name: 'Admin Two', email: 'admin2@example.com', role: 'Moderator', status: 'pending', joined: '2023-11-15' },
    { id: 3, name: 'Admin Three', email: 'admin3@example.com', role: 'Editor', status: 'active', joined: '2024-01-20' },
  ];

  getStatusClass(status: string) {
    switch (status) {
      case 'active': return 'pill-active';
      case 'pending': return 'pill-pending';
      case 'closed': return 'pill-closed';
      case 'urgent': return 'pill-urgent';
      case 'new': return 'pill-new';
      default: return '';
    }
  }
}
