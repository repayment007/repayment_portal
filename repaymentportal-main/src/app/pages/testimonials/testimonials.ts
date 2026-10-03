import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  testimonials = [
    { id: 1, author: 'Alice Johnson', company: 'Tech Inc.', rating: 5, status: 'active', date: '2024-03-01' },
    { id: 2, author: 'Bob Smith', company: 'Logistics Ltd.', rating: 4, status: 'pending', date: '2024-03-05' },
    { id: 3, author: 'Charlie Brown', company: 'Creative Agency', rating: 5, status: 'active', date: '2024-03-10' },
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
