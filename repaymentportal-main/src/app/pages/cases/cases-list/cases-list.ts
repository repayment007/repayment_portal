import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CaseService } from '../../../services/case';

@Component({
  selector: 'app-cases-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cases-list.html'
})
export class CasesList implements OnInit {
  cases: any[] = [];
  loading = true;

  constructor(public router: Router, private caseService: CaseService) {}

  ngOnInit() {
    this.loadCases();
  }

  loadCases() {
    this.loading = true;
    this.caseService.getAll().subscribe({
      next: (res: any) => {
        this.cases = res.resultData || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching cases', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string) {
    if (!status) return '';
    switch (status.toLowerCase()) {
      case 'active': return 'pill-active';
      case 'pending': return 'pill-pending';
      case 'closed': return 'pill-closed';
      case 'urgent': return 'pill-urgent';
      default: return '';
    }
  }
}
