import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-casenotes-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './casenotes-view.html',
  styleUrl: './casenotes-view.css',
})
export class CasenotesView implements OnInit {
  note = {
    id: 1,
    caseId: 'CASE-1001',
    author: 'Dr. Smith',
    status: 'new',
    content: 'Initial assessment completed. Client shows positive response to therapy. Recommended follow-up in two weeks to monitor progress and adjust treatment plan if necessary.',
    date: '2024-03-01'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Viewing note ID:', id);
  }

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
