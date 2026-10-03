import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminService } from '../../../services/admin';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-list.html',
  styleUrl: './admin-list.css',
})
export class AdminList implements OnInit {
  admins: any[] = [];
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.loading = true;
    this.adminService.getAll().subscribe({
      next: (res: any) => {
        this.admins = res.resultData || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching admins', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string) {
    if (!status) return '';
    switch (status.toLowerCase()) {
      case 'active': return 'pill-active';
      case 'inactive': return 'pill-pending';
      case 'suspended': return 'pill-closed';
      default: return '';
    }
  }
}
