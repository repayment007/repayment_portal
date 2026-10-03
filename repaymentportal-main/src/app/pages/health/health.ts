import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health.html',
  styleUrl: './health.css',
})
export class Health {
  records = [
    { id: 1, patientName: 'John Doe', provider: 'City Hospital', type: 'Checkup', status: 'active', date: '2024-03-01' },
    { id: 2, patientName: 'Jane Smith', provider: 'Wellness Center', type: 'Vaccination', status: 'new', date: '2024-03-05' },
    { id: 3, patientName: 'Robert Johnson', provider: 'City Hospital', type: 'Surgery', status: 'urgent', date: '2024-03-10' },
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
