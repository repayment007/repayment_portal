import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ConsultationService } from '../../../services/consultation';

@Component({
  selector: 'app-consultations-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consultations-view.html',
  styleUrl: './consultations-view.css',
})
export class ConsultationsView implements OnInit {
  consultation: any = null;
  loading: boolean = true;
  errorMsg: string = '';

  constructor(
    private route: ActivatedRoute,
    private consultationService: ConsultationService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadConsultation(id);
    } else {
      this.errorMsg = 'No consultation ID provided';
      this.loading = false;
    }
  }

  loadConsultation(id: string) {
    this.loading = true;
    this.consultationService.getById(id).subscribe({
      next: (res) => {
        this.consultation = res.resultData || res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching consultation', err);
        this.errorMsg = 'Failed to load consultation details';
        this.loading = false;
      }
    });
  }

  markAsSucceeded() {
    if (!this.consultation || !this.consultation.id) return;
    
    // Updates status to COMPLETED which acts as succeeding
    this.consultationService.update(this.consultation.id, { status: 'COMPLETED' }).subscribe({
      next: (res) => {
        const updated = res.resultData || res;
        this.consultation.status = updated.status || 'COMPLETED';
      },
      error: (err) => {
        console.error('Error updating consultation status', err);
        alert('Failed to update consultation status');
      }
    });
  }

  getStatusClass(status: string) {
    if (!status) return '';
    const s = status.toLowerCase();
    switch (s) {
      case 'pending': return 'pill-active';
      case 'completed': 
      case 'succeeded': return 'pill-completed';
      case 'cancelled': return 'pill-closed';
      default: return '';
    }
  }
}
