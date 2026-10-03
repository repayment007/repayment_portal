import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServicePackageService } from '../../../services/service-package';

@Component({
  selector: 'app-service-packages-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './service-packages-edit.html',
  styleUrl: './service-packages-edit.css',
})
export class ServicePackagesEdit implements OnInit {
  packageId: string | null = null;
  packageForm: any = {
    name: '',
    slug: '',
    price: null,
    pricePerTx: null,
    features: [''],
    isActive: true
  };

  errorMsg: string = '';
  loading: boolean = true;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private servicePackageService: ServicePackageService
  ) {}

  ngOnInit() {
    this.packageId = this.route.snapshot.paramMap.get('id');
    if (this.packageId) {
      this.loadPackage(this.packageId);
    } else {
      this.router.navigate(['/service-packages']);
    }
  }

  loadPackage(id: string) {
    this.servicePackageService.getById(id).subscribe({
      next: (res) => {
        const pkg = res.resultData || res;
        this.packageForm = {
          name: pkg.name || '',
          slug: pkg.slug || '',
          price: pkg.price,
          pricePerTx: pkg.pricePerTx,
          features: (pkg.features && pkg.features.length) ? pkg.features : [''],
          isActive: pkg.isActive !== undefined ? pkg.isActive : true
        };
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading package', err);
        this.errorMsg = 'Failed to load package details';
        this.loading = false;
      }
    });
  }

  addFeature() {
    if (!this.packageForm.features) {
      this.packageForm.features = [];
    }
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
    if (payload.features) {
        payload.features = payload.features.filter((f: string) => f && f.trim() !== '');
    }

    if (!this.packageId) return;

    this.servicePackageService.update(this.packageId, payload).subscribe({
      next: (res) => {
        this.router.navigate(['/service-packages']);
      },
      error: (err) => {
        console.error('Error updating package', err);
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
