import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ConsultationService } from '../../../services/consultation';

@Component({
  selector: 'app-consultations-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consultations-list.html',
  styleUrl: './consultations-list.css'
})
export class ConsultationsList implements OnInit {
  consultations: any[] = [];
  loading = true;

  constructor(public router: Router, private consultationService: ConsultationService) {}

  ngOnInit() {
    this.loadConsultations();
  }

  loadConsultations() {
    this.loading = true;
    this.consultationService.getAll().subscribe({
      next: (res: any) => {
        this.consultations = res.resultData || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching consultations', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string) {
    if (!status) return '';
    switch (status.toLowerCase()) {
      case 'pending': return 'pill-active';
      case 'completed': 
      case 'succeeded': return 'pill-completed';
      case 'cancelled': 
      case 'closed': return 'pill-closed';
      default: return 'pill-active';
    }
  }
}
