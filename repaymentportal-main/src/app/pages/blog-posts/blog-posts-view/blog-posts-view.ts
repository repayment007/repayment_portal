import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../../services/blog-post';

@Component({
  selector: 'app-blog-posts-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-posts-view.html',
  styleUrl: './blog-posts-view.css',
})
export class BlogPostsView implements OnInit {
  post: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPost(id);
    }
  }

  loadPost(id: string) {
    this.loading = true;
    this.blogPostService.getById(id).subscribe({
      next: (res: any) => {
        this.post = res.resultData || res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching blog post', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string) {
    if (!status) return '';
    switch (status.toUpperCase()) {
      case 'PUBLISHED': return 'pill-active';
      case 'DRAFT': return 'pill-pending';
      case 'SCHEDULED': return 'pill-new';
      default: return 'pill-pending';
    }
  }
}
