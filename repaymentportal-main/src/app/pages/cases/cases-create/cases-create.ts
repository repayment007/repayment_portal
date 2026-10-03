import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cases-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cases-create.html',
  styleUrl: './cases-create.css',
})
export class CasesCreate {
  caseForm = {
    caseNumber: '',
    clientName: '',
    type: 'Legal',
    status: 'active',
    openedDate: new Date().toISOString().split('T')[0],
    description: ''
  };

  caseTypes = ['Legal', 'Health', 'Financial', 'Social', 'Employment'];
  caseStatuses = ['active', 'pending', 'closed'];

  constructor(private router: Router) {}

  saveCase() {
    console.log('Saving case:', this.caseForm);
    // In a real app, this would call a service
    this.router.navigate(['/cases']);
  }
}
