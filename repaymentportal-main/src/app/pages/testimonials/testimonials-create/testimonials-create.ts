import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TestimonialService } from '../../../services/testimonial';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-testimonials-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './testimonials-create.html',
  styleUrl: './testimonials-create.css',
})
export class TestimonialsCreate implements OnInit {
  testimonialForm: any = {
    clientId: '',
    authorName: '',
    country: '',
    scamType: '',
    rating: 5,
    content: '',
    videoUrl: '',
    approved: false
  };

  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  showUserDropdown = false;
  selectedUserName = '';
  isLoadingUsers = false;
  isSaving = false;

  constructor(
    private router: Router,
    private testimonialService: TestimonialService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoadingUsers = true;
    this.userService.getAll().subscribe({
      next: (res: any) => {
        this.users = res.resultData || [];
        this.filteredUsers = this.users;
        this.isLoadingUsers = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.isLoadingUsers = false;
      }
    });
  }

  filterUsers() {
    if (!this.searchTerm) {
      this.filteredUsers = this.users;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(u => 
        (u.firstName?.toLowerCase().includes(term)) || 
        (u.lastName?.toLowerCase().includes(term)) || 
        (u.email?.toLowerCase().includes(term))
      );
    }
  }

  selectUser(user: any) {
    this.testimonialForm.clientId = user.id;
    this.selectedUserName = `${user.firstName} ${user.lastName}`;
    this.searchTerm = this.selectedUserName;
    this.showUserDropdown = false;
  }

  save() {
    this.isSaving = true;
    
    // Sanitize clientId: ensure it's null, not an empty string
    const payload = { ...this.testimonialForm };
    if (!payload.clientId) {
      payload.clientId = null;
    }

    this.testimonialService.create(payload).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/testimonials']);
      },
      error: (err) => {
        console.error('Error saving testimonial:', err);
        alert('Failed to save testimonial. Please try again.');
        this.isSaving = false;
      }
    });
  }
}
