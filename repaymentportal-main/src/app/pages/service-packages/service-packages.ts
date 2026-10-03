import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-packages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-packages.html',
  styleUrl: './service-packages.css',
})
export class ServicePackages {
  packages = [
    { id: 1, name: 'Basic Plan', price: '$99/mo', duration: 'Monthly', status: 'active', updated: '2024-02-01' },
    { id: 2, name: 'Premium Plan', price: '$299/mo', duration: 'Monthly', status: 'active', updated: '2024-02-15' },
    { id: 3, name: 'Enterprise Plan', price: 'Custom', duration: 'Annual', status: 'pending', updated: '2024-03-01' },
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
