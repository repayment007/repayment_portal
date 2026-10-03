import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultations.html',
  styleUrl: './consultations.css',
})
export class Consultations {
  consultations = [
    { id: 1, clientName: 'Sarah Miller', consultant: 'Dr. Adams', type: 'General', status: 'active', date: '2024-03-12' },
    { id: 2, clientName: 'George Wilson', consultant: 'Dr. Baker', type: 'Specialist', status: 'pending', date: '2024-03-15' },
    { id: 3, clientName: 'Hannah Abbott', consultant: 'Dr. Adams', type: 'Follow-up', status: 'closed', date: '2024-02-28' },
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
