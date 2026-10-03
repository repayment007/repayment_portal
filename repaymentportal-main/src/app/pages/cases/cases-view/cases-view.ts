import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cases-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cases-view.html',
  styleUrl: './cases-view.css',
})
export class CasesView implements OnInit {
  caseData = {
    id: 1,
    caseNumber: 'CASE-1001',
    clientName: 'Alice Johnson',
    type: 'Legal',
    status: 'active',
    openedDate: '2024-01-10',
    description: 'Initial legal consultation and documentation for the client. The case involves property dispute resolution and requires thorough review of land records and previous agreements.',
    assignedTo: 'John Doe',
    priority: 'High'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Viewing case ID:', id);
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'active': return 'pill-active';
      case 'pending': return 'pill-pending';
      case 'closed': return 'pill-closed';
      default: return '';
    }
  }
}
