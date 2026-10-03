import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-health-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './health-edit.html',
  styleUrl: './health-edit.css',
})
export class HealthEdit {
  recordForm = {
    id: 1,
    clientName: 'Alice Johnson',
    checkupType: 'General',
    status: 'Completed',
    date: '2024-03-01',
    result: 'Healthy',
    notes: 'Client is in excellent health. Recommended next checkup in 6 months.'
  };

  checkupTypes = ['General', 'Blood Test', 'X-Ray', 'Consultation', 'Dental'];
  statuses = ['Completed', 'Pending', 'Cancelled'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  saveRecord() {
    console.log('Updating health record:', this.recordForm);
    this.router.navigate(['/health']);
  }
}
