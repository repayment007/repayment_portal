import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultations-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './consultations-create.html',
  styleUrl: './consultations-create.css',
})
export class ConsultationsCreate {
  consultationForm = {
    clientName: '',
    consultantName: '',
    dateTime: '',
    topic: '',
    status: 'scheduled',
    notes: ''
  };

  statuses = ['scheduled', 'completed', 'cancelled'];

  constructor(private router: Router) {}

  save() {
    console.log('Saving consultation:', this.consultationForm);
    this.router.navigate(['/consultations']);
  }
}
