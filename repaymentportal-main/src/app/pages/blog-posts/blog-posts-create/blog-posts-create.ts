import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../../../services/blog-post';

@Component({
  selector: 'app-blog-posts-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blog-posts-create.html',
  styleUrl: './blog-posts-create.css',
})
export class BlogPostsCreate {
  postForm: any = {
    author: '',
    title: '',
    slug: '',
    content: '',
    tags: [],
    status: 'DRAFT'
  };

  tagInput: string = '';
  isSaving = false;

  constructor(
    private router: Router,
    private blogPostService: BlogPostService
  ) {}

  generateSlug() {
    this.postForm.slug = this.postForm.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  addTag() {
    const tag = this.tagInput.trim().toLowerCase();
    if (tag && !this.postForm.tags.includes(tag)) {
      this.postForm.tags.push(tag);
    }
    this.tagInput = '';
  }

  removeTag(tag: string) {
    this.postForm.tags = this.postForm.tags.filter((t: string) => t !== tag);
  }

  save() {
    this.isSaving = true;
    this.blogPostService.create(this.postForm).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/blog-posts']);
      },
      error: (err) => {
        console.error('Error saving post:', err);
        alert('Failed to save article. Please try again.');
        this.isSaving = false;
      }
    });
  }
}
