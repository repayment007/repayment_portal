import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-health-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './health-create.html',
  styleUrl: './health-create.css',
})
export class HealthCreate {
  recordForm = {
    clientName: '',
    checkupType: 'General',
    status: 'Pending',
    date: new Date().toISOString().split('T')[0],
    result: '',
    notes: ''
  };

  checkupTypes = ['General', 'Blood Test', 'X-Ray', 'Consultation', 'Dental'];
  statuses = ['Completed', 'Pending', 'Cancelled'];

  constructor(private router: Router) {}

  saveRecord() {
    console.log('Saving health record:', this.recordForm);
    this.router.navigate(['/health']);
  }
}
