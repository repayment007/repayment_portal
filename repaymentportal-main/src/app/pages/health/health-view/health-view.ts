import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-health-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './health-view.html',
  styleUrl: './health-view.css',
})
export class HealthView {
  record = {
    id: 1,
    clientName: 'Alice Johnson',
    checkupType: 'General',
    status: 'Completed',
    date: '2024-03-01',
    result: 'Healthy',
    notes: 'Client is in excellent health. Recommended next checkup in 6 months.'
  };

  constructor(private route: ActivatedRoute) {}

  getStatusClass(status: string) {
    switch (status.toLowerCase()) {
      case 'completed': return 'pill-active';
      case 'pending': return 'pill-pending';
      case 'cancelled': return 'pill-closed';
      default: return '';
    }
  }
}
