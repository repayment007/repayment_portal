import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../../../services/blog-post';

@Component({
  selector: 'app-blog-posts-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blog-posts-list.html',
  styleUrl: './blog-posts-list.css',
})
export class BlogPostsList implements OnInit {
  posts: any[] = [];
  loading = true;

  constructor(private blogPostService: BlogPostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.blogPostService.getAll().subscribe({
      next: (res: any) => {
        this.posts = res.resultData || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching blog posts', err);
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

  deletePost(id: string) {
    if (confirm('Are you sure you want to delete this blog post?')) {
      this.blogPostService.delete(id).subscribe({
        next: () => this.loadPosts(),
        error: (err) => console.error('Error deleting post', err)
      });
    }
  }
}
