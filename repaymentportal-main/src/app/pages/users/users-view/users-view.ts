import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-users-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-view.html',
  styleUrl: './users-view.css',
})
export class UsersView implements OnInit {
  user: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUser(id);
    }
  }

  loadUser(id: string) {
    this.loading = true;
    this.userService.getById(id).subscribe({
      next: (res: any) => {
        this.user = res.resultData || res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching user', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string) {
    if (!status) return 'pill-active';
    switch (status.toLowerCase()) {
      case 'active': return 'pill-active';
      case 'inactive': return 'pill-closed';
      case 'pending': return 'pill-pending';
      default: return 'pill-active';
    }
  }
}
