import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-create.html',
  styleUrl: './admin-create.css',
})
export class AdminCreate {
  adminForm = {
    name: '',
    email: '',
    role: 'Admin',
    status: 'Active',
    password: ''
  };

  roles = ['Super Admin', 'Admin', 'Manager', 'Staff'];
  statuses = ['Active', 'Inactive', 'Suspended'];

  constructor(private router: Router) {}

  saveAdmin() {
    console.log('Creating admin:', this.adminForm);
    this.router.navigate(['/admin']);
  }
}
