import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConsultationService } from '../../../services/consultation';
import { AdminService } from '../../../services/admin';

@Component({
  selector: 'app-consultations-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './consultations-edit.html',
  styleUrl: './consultations-edit.css',
})
export class ConsultationsEdit implements OnInit {
  consultationId: string | null = null;
  consultationForm: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    caseType: '',
    scamType: '',
    amountLost: 0,
    message: '',
    status: 'PENDING',
    notes: '',
    handledBy: null,
    scheduledAt: null
  };

  admins: any[] = [];
  statuses = ['PENDING', 'COMPLETED', 'CANCELLED'];
  loading = true;
  errorMsg = '';

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private consultationService: ConsultationService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.consultationId = this.route.snapshot.paramMap.get('id');
    if (this.consultationId) {
      this.loadAdmins();
      this.loadConsultation();
    } else {
      this.router.navigate(['/consultations']);
    }
  }

  loadAdmins() {
    this.adminService.getAll().subscribe({
      next: (res: any) => {
        this.admins = res.resultData || [];
      },
      error: (err) => console.error('Error fetching admins', err)
    });
  }

  loadConsultation() {
    if (!this.consultationId) return;
    this.loading = true;
    this.consultationService.getById(this.consultationId).subscribe({
      next: (res: any) => {
        const data = res.resultData || res;
        this.consultationForm = {
          ...data,
          handledBy: data.handledBy?._id || data.handledBy || null,
          scheduledAt: data.scheduledAt ? new Date(data.scheduledAt).toISOString().slice(0, 16) : null
        };
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching consultation', err);
        this.errorMsg = 'Failed to load consultation details';
        this.loading = false;
      }
    });
  }

  save() {
    if (!this.consultationId) return;
    this.errorMsg = '';
    
    const payload = { ...this.consultationForm };
    if (!payload.handledBy) delete payload.handledBy;

    this.consultationService.update(this.consultationId, payload).subscribe({
      next: () => {
        this.router.navigate(['/consultations', this.consultationId]);
      },
      error: (err) => {
        console.error('Error updating consultation', err);
        this.errorMsg = 'Failed to update consultation. Please check your input.';
      }
    });
  }
}
