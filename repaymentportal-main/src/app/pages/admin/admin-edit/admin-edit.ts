import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-edit.html',
  styleUrl: './admin-edit.css',
})
export class AdminEdit {
  adminForm = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Super Admin',
    status: 'Active'
  };

  roles = ['Super Admin', 'Admin', 'Manager', 'Staff'];
  statuses = ['Active', 'Inactive', 'Suspended'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  saveAdmin() {
    console.log('Updating admin:', this.adminForm);
    this.router.navigate(['/admin']);
  }
}
