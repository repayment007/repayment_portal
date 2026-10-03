import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cases.html',
  styleUrl: './cases.css',
})
export class Cases {
  viewMode: 'list' | 'view' = 'list';
  selectedCase: any = null;

  constructor(public router: Router) {}

  cases = [
    { 
      id: 1, 
      caseNumber: 'CASE-1001', 
      clientName: 'Alice Johnson', 
      type: 'Legal', 
      status: 'active', 
      openedDate: '2024-01-10',
      description: 'Ongoing legal dispute regarding property boundaries.',
      assignedTo: 'John Lawyer',
      priority: 'High',
      lastUpdate: '2024-03-25'
    },
    { 
      id: 2, 
      caseNumber: 'CASE-1002', 
      clientName: 'Bob Smith', 
      type: 'Health', 
      status: 'pending', 
      openedDate: '2024-02-15',
      description: 'Post-surgery recovery monitoring and medication management.',
      assignedTo: 'Nurse Kelly',
      priority: 'Medium',
      lastUpdate: '2024-03-20'
    },
    { 
      id: 3, 
      caseNumber: 'CASE-1003', 
      clientName: 'Charlie Brown', 
      type: 'Financial', 
      status: 'closed', 
      openedDate: '2023-12-05',
      description: 'Annual financial audit and tax filing assistance.',
      assignedTo: 'Sarah Accountant',
      priority: 'Low',
      lastUpdate: '2024-01-15'
    },
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

  viewCase(caseItem: any) {
    this.selectedCase = caseItem;
    this.viewMode = 'view';
  }

  goBack() {
    this.viewMode = 'list';
    this.selectedCase = null;
  }
}
