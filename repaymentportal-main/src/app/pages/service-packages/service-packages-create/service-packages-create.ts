import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServicePackageService } from '../../../services/service-package';

@Component({
  selector: 'app-service-packages-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './service-packages-create.html',
  styleUrl: './service-packages-create.css',
})
export class ServicePackagesCreate {
  packageForm: any = {
    name: '',
    slug: '',
    price: null,
    pricePerTx: null,
    features: [''],
    isActive: true
  };

  errorMsg: string = '';

  constructor(private router: Router, private servicePackageService: ServicePackageService) {}

  addFeature() {
    this.packageForm.features.push('');
  }

  removeFeature(index: number) {
    this.packageForm.features.splice(index, 1);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  save() {
    this.errorMsg = '';
    
    if (!this.packageForm.slug && this.packageForm.name) {
      this.packageForm.slug = this.packageForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const payload = { ...this.packageForm };
    payload.features = payload.features.filter((f: string) => f && f.trim() !== '');

    this.servicePackageService.create(payload).subscribe({
      next: (res) => {
        this.router.navigate(['/service-packages']);
      },
      error: (err) => {
        console.error('Error saving package', err);
        const apiError = err.error;
        let msgs: string[] = [];
        if (apiError && apiError.error && apiError.error.details) {
          msgs = Array.isArray(apiError.error.details) ? apiError.error.details : [apiError.error.details];
        } else if (apiError && apiError.message) {
          msgs = Array.isArray(apiError.message) ? apiError.message : [apiError.message];
        } else {
          msgs = ['An unknown error occurred'];
        }
        this.errorMsg = msgs.join(', ');
      }
    });
  }
}
