import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-posts.html',
  styleUrl: './blog-posts.css',
})
export class BlogPosts {
  posts = [
    { id: 1, title: 'Getting Started with Angular', author: 'Jane Smith', status: 'active', date: '2024-03-01' },
    { id: 2, title: 'Advanced CSS Techniques', author: 'John Doe', status: 'pending', date: '2024-03-05' },
    { id: 3, title: 'Understanding Standalone Components', author: 'Emily Davis', status: 'closed', date: '2024-03-10' },
  ];

  getStatusClass(status: string) {
    switch (status) {
      case 'active': return 'pill-active';
      case 'pending': return 'pill-pending';
      case 'closed': return 'pill-closed';
      case 'urgent': return 'pill-urgent';
      case 'new': return 'pill-new';
      default: return '';
    }
  }
}
