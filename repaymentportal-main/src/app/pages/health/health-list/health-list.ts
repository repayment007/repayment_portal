import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HealthService } from '../../../services/health';

@Component({
  selector: 'app-health-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './health-list.html',
  styleUrl: './health-list.css',
})
export class HealthList implements OnInit {
  healthRecords: any[] = [];
  loading = true;

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    this.loadHealthRecords();
  }

  loadHealthRecords() {
    this.loading = true;
    this.healthService.getAll().subscribe({
      next: (res: any) => {
        this.healthRecords = res.resultData || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching health records', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string) {
    if (!status) return 'pill-active';
    switch (status.toLowerCase()) {
      case 'completed': return 'pill-active';
      case 'pending': return 'pill-pending';
      case 'cancelled': return 'pill-closed';
      default: return 'pill-active';
    }
  }
}
