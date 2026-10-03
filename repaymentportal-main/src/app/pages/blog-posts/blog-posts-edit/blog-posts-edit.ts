import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../../../services/blog-post';

@Component({
  selector: 'app-blog-posts-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blog-posts-edit.html',
  styleUrl: './blog-posts-edit.css',
})
export class BlogPostsEdit implements OnInit {
  postForm: any = {
    author: '',
    title: '',
    slug: '',
    content: '',
    tags: [],
    status: 'DRAFT'
  };

  id: string = '';
  tagInput: string = '';
  isLoading = true;
  isSaving = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogPostService: BlogPostService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.loadPost();
    }
  }

  loadPost() {
    this.isLoading = true;
    this.blogPostService.getById(this.id).subscribe({
      next: (res: any) => {
        const data = res.resultData || res;
        this.postForm = { ...data };
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading post', err);
        this.isLoading = false;
      }
    });
  }

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
    this.blogPostService.update(this.id, this.postForm).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/blog-posts', this.id]);
      },
      error: (err) => {
        console.error('Error updating post:', err);
        alert('Failed to update article. Please try again.');
        this.isSaving = false;
      }
    });
  }
}
