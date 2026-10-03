import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TestimonialService } from '../../../services/testimonial';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-testimonials-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './testimonials-edit.html',
  styleUrl: './testimonials-edit.css',
})
export class TestimonialsEdit implements OnInit {
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
  isLoading = true;
  isSaving = false;
  id: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testimonialService: TestimonialService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.loadData();
    }
  }

  loadData() {
    this.isLoading = true;
    // Load users first, then testimonial
    this.userService.getAll().subscribe({
      next: (res: any) => {
        this.users = res.resultData || [];
        this.filteredUsers = this.users;
        
        // Now load the testimonial
        this.testimonialService.getById(this.id).subscribe({
          next: (tRes: any) => {
            const data = tRes.resultData || tRes;
            this.testimonialForm = { ...data };
            
            // Set the selected user display name
            const user = this.users.find(u => u.id === data.clientId);
            if (user) {
              this.selectedUserName = `${user.firstName} ${user.lastName}`;
              this.searchTerm = this.selectedUserName;
            } else {
              this.searchTerm = data.authorName || '';
            }
            
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error loading testimonial', err);
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.isLoading = false;
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

    this.testimonialService.update(this.id, payload).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/testimonials', this.id]);
      },
      error: (err) => {
        console.error('Error saving testimonial:', err);
        alert('Failed to save testimonial. Please try again.');
        this.isSaving = false;
      }
    });
  }
}
