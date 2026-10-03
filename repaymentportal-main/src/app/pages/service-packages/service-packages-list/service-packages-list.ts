import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ServicePackageService } from '../../../services/service-package';

@Component({
  selector: 'app-service-packages-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-packages-list.html',
  styleUrl: './service-packages-list.css'
})
export class ServicePackagesList implements OnInit {
  packages: any[] = [];
  loading = true;

  constructor(public router: Router, private servicePackageService: ServicePackageService) {}

  ngOnInit() {
    this.loadPackages();
  }

  loadPackages() {
    this.loading = true;
    this.servicePackageService.getAll().subscribe({
      next: (res: any) => {
        this.packages = res.resultData || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching service packages', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string) {
    if (!status) return 'pill-active';
    switch (status.toLowerCase()) {
      case 'active': return 'pill-active';
      case 'inactive': return 'pill-closed';
      case 'hidden': return 'pill-pending';
      default: return 'pill-active';
    }
  }
}
