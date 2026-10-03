import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'active', joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'active', joined: '2024-02-10' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'User', status: 'pending', joined: '2024-03-05' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'User', status: 'closed', joined: '2024-03-20' },
  ];

  getStatusClass(status: string) {
    switch (status) {
      case 'active': return 'pill-active';
      case 'pending': return 'pill-pending';
      case 'closed': return 'pill-closed';
      default: return '';
    }
  }
}
